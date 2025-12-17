// src/components/StructuredData.tsx
"use client";

import React from "react";
import { OrganizationSchema, NavigationSchema } from "@/lib/schemas";

/**
 * Exports:
 *  - named export `StructuredData` (used by your layout)
 *  - default export (keeps compatibility if any file imports default)
 *
 * Both scripts insert JSON-LD safely via dangerouslySetInnerHTML.
 */

export function StructuredData(): React.ReactElement {
  const organizationSchema = OrganizationSchema();
  const navigationSchema = NavigationSchema();

  return (
    <>
      {/* Organization Schema (JSON-LD) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Navigation Schema (JSON-LD) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationSchema),
        }}
      />
    </>
  );
}

export default StructuredData;
