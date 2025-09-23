// SiteLanguageDropdown.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { key: "en", label: "English" },
  { key: "tel", label: "Telugu" },
  { key: "hin", label: "Hindi" },
  { key: "ben", label: "Bengali" },
  { key: "mar", label: "Marathi" },
  { key: "mal", label: "Malayalam" },
];

export default function SiteLanguageDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    LANGUAGES.find(l => l.key === i18n.language) || LANGUAGES[0]
  );

  function handleSelect(lang) {
    setSelected(lang);
    setOpen(false);
    i18n.changeLanguage(lang.key); // This changes language globally
  }

  return (
    <div className="relative inline-block bg-amber-50">
      <button
        className="uppercase font-semibold text-sm text-black select-none px-3 py-2 rounded focus:outline-none focus:ring focus:ring-[#58cc02]"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        id="site-language-button"
      >
        Language: {selected.label}
      </button>
      {open && (
        <ul
          className="absolute right-2.5 top-full mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-xl  py-2  z-[999] "
          role="listbox"
          aria-labelledby="site-language-button"
        >
          {LANGUAGES.map((lang) => (
            <li
              key={lang.key}
              className={`px-4 py-2 cursor-pointer hover:bg-[#dcfce7] hover:text-[#58cc02] transition ${
                selected.key === lang.key
                  ? "bg-[#f0fdf4] text-[#58cc02] font-bold"
                  : "text-gray-700"
              }`}
              role="option"
              aria-selected={selected.key === lang.key}
              tabIndex={0}
              onClick={() => handleSelect(lang)}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(lang);
              }}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
