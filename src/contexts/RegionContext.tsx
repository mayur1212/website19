"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface RegionData {
  country?: string;
  city?: string;
  cinema?: string;
}

interface RegionContextType {
  region: RegionData;
  setRegion: (region: Partial<RegionData>) => Promise<void>;
  setCountry: (country: string) => Promise<void>;
  setCity: (city: string) => Promise<void>;
  setCinema: (cinema: string) => Promise<void>;
  isLoading: boolean;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

const DEFAULT_REGION: RegionData = {
  country: undefined,
  city: undefined,
  cinema: undefined,
};

export function RegionProvider({
  children,
  initialRegion,
}: {
  children: React.ReactNode;
  initialRegion?: RegionData;
}) {
  // Initialize region from localStorage or initialRegion
  const getInitialRegion = (): RegionData => {
    if (typeof window !== "undefined") {
      const storedRegion = localStorage.getItem("region");
      if (storedRegion) {
        try {
          return JSON.parse(storedRegion);
        } catch {
          return DEFAULT_REGION;
        }
      }
    }
    return initialRegion || DEFAULT_REGION;
  };

  const [region, setRegionState] = useState<RegionData>(getInitialRegion);
  const [isLoading, setIsLoading] = useState(true);

  // Sync localStorage with initialRegion on mount if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRegion = localStorage.getItem("region");
      if (!storedRegion && initialRegion) {
        localStorage.setItem("region", JSON.stringify(initialRegion));
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRegion = useCallback(async (newRegion: Partial<RegionData>) => {
    // Update local state using functional update to avoid stale closures
    setRegionState((prevRegion) => {
      const updatedRegion = { ...prevRegion, ...newRegion };
      
      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("region", JSON.stringify(updatedRegion));
      }
      
      // Sync with server session
      fetch("/api/region", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ region: updatedRegion }),
      }).catch((error) => {
        console.error("Failed to sync region with server:", error);
      });
      
      return updatedRegion;
    });
  }, []);

  const setCountry = useCallback(async (country: string) => {
    await setRegion({ country });
  }, [setRegion]);

  const setCity = useCallback(async (city: string) => {
    await setRegion({ city });
  }, [setRegion]);

  const setCinema = useCallback(async (cinema: string) => {
    await setRegion({ cinema });
  }, [setRegion]);

  return (
    <RegionContext.Provider
      value={{
        region,
        setRegion,
        setCountry,
        setCity,
        setCinema,
        isLoading,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}

