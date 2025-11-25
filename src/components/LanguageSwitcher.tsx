"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "fr", name: "Français" },
];

export function LanguageSwitcher() {
  const { language, setLanguage, isLoading } = useLanguage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-2">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-4 py-2 rounded ${
            language === lang.code
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}

