// src/app/events/category/[category]/page.tsx

import React from "react";

type PageProps = {
  params: {
    category: string;
  };
};

export default function EventCategoryPage({ params }: PageProps) {
  const { category } = params;

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">
        Events in category: {category}
      </h1>
      <p className="text-zinc-600">
        Category-wise event listing page coming soon.
      </p>
    </div>
  );
}
