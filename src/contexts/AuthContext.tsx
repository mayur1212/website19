"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@/lib/session";
import { isValidUser } from "@/lib/validators";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  // Initialize user from localStorage or initialUser
  const getInitialUser = (): User | null => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser) as unknown;
          // Validate the parsed user data using type guard
          if (isValidUser(parsed)) {
            return parsed;
          }
          return null;
        } catch {
          return null;
        }
      }
    }
    return initialUser || null;
  };

  const [user, setUserState] = useState<User | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState(true);

  // Sync localStorage with initialUser on mount if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (!storedUser && initialUser) {
        localStorage.setItem("user", JSON.stringify(initialUser));
      } else if (storedUser && !initialUser) {
        // If we have localStorage but no initialUser, clear it (user logged out)
        localStorage.removeItem("user");
        setUserState(null);
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (userData: User) => {
    // Update local state
    setUserState(userData);
    
    // Update localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    
    // Sync with server session
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userData }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error("Failed to sync user with server:", error);
      // Revert local state on error
      setUserState(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    // Clear local state
    setUserState(null);
    
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    
    // Clear server session
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to logout from server:", error);
    }
  }, []);

  const updateUser = useCallback(async (userData: Partial<User>) => {
    if (!user) {
      throw new Error("Cannot update user: not logged in");
    }

    // Update local state using functional update
    setUserState((prevUser) => {
      if (!prevUser) return null;
      
      const updatedUser = { ...prevUser, ...userData };
      
      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      // Sync with server session
      fetch("/api/auth/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: updatedUser }),
      }).catch((error) => {
        console.error("Failed to sync user update with server:", error);
      });
      
      return updatedUser;
    });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

