import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const STORAGE_KEY = "datamares-theme";
const THEMES = [
  { value: "light", label: "Claro", icon: "sun" },
  { value: "dark", label: "Oscuro", icon: "moon" },
  { value: "system", label: "Sistema", icon: "computer" },
];

const resolveTheme = (preference, systemTheme) => {
  if (preference === "system") return systemTheme.matches ? "dark" : "light";
  return preference;
};

const ThemeSelector = () => {
  const [preference, setPreference] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);
      setPreference(THEMES.some(({ value }) => value === storedTheme) ? storedTheme : "system");
    } catch {
      setPreference("system");
    }
  }, []);

  useEffect(() => {
    if (!preference) return undefined;

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const theme = resolveTheme(preference, systemTheme);
      document.documentElement.dataset.theme = theme;
      document.documentElement.dataset.themePreference = preference;
      document.documentElement.style.colorScheme = theme;
    };

    applyTheme();

    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // The selection still works when storage is unavailable.
    }

    if (preference !== "system") return undefined;
    systemTheme.addEventListener("change", applyTheme);
    return () => systemTheme.removeEventListener("change", applyTheme);
  }, [preference]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeSelector = (event) => {
      if (event.type === "keydown" && event.key !== "Escape") return;
      if (event.type === "pointerdown" && containerRef.current?.contains(event.target)) return;
      setIsOpen(false);
    };

    document.addEventListener("keydown", closeSelector);
    document.addEventListener("pointerdown", closeSelector);
    return () => {
      document.removeEventListener("keydown", closeSelector);
      document.removeEventListener("pointerdown", closeSelector);
    };
  }, [isOpen]);

  const selectedTheme = THEMES.find(({ value }) => value === preference) ?? THEMES[2];

  return (
    <div ref={containerRef} className="theme-selector fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div
          className="theme-selector__menu absolute bottom-full left-0 mb-2 w-40 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 text-zinc-900 shadow-xl dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          role="menu">
          {THEMES.map(({ value, label, icon }) => {
            const isSelected = preference === value;

            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  setPreference(value);
                  setIsOpen(false);
                }}
                className={`theme-selector__option flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-teal-700 text-white dark:bg-teal-300 dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                }`}>
                <Icon name={icon} className="size-5" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        aria-label="Seleccionar tema"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="theme-selector__trigger flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-bold tracking-wide text-teal-700 uppercase shadow-lg transition-all hover:scale-105 dark:border-zinc-700 dark:bg-zinc-800 dark:text-teal-300">
        <Icon name={selectedTheme.icon} className="size-5" aria-hidden="true" />
        {selectedTheme.label}
      </button>
    </div>
  );
};

export default ThemeSelector;
