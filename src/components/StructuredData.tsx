import { OrganizationSchema, NavigationSchema } from "@/lib/schemas";

export function StructuredData() {
  const organizationSchema = OrganizationSchema();
  const navigationSchema = NavigationSchema();

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Navigation Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationSchema),
        }}
      />
    </>
  );
}
