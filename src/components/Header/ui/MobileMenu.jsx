import { Bars3Icon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import SocialIcons from "../SocialIcons";

const MobileMenuItem = ({ item, closeMenu, openSubmenu }) => {
  const hasSubmenu = item.submenu?.length;

  if (hasSubmenu) {
    return (
      <li>
        <button
          type="button"
          onClick={() => openSubmenu(item)}
          className="flex min-h-12 w-full items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 text-left text-base font-medium text-gray-950 transition-colors hover:bg-gray-200 dark:border-slate-700 dark:text-gray-100 dark:hover:bg-slate-700">
          <span>{item.label}</span>
          <ChevronRightIcon className="size-5 shrink-0 text-[#316663] dark:text-[#70b7b1]" />
        </button>
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.page}
        onClick={closeMenu}
        className="block min-h-12 border-b border-gray-200 px-4 py-3 text-base text-gray-950 transition-colors hover:bg-gray-200 dark:border-slate-700 dark:text-gray-100 dark:hover:bg-slate-700">
        {item.label}
        {item.scientificName && <span className="block text-sm text-[#316663] italic dark:text-[#70b7b1]">{item.scientificName}</span>}
      </a>
    </li>
  );
};

const MobileMenu = ({ languageLinks, menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const currentItems = breadcrumb.at(-1)?.submenu ?? menu;
  const closeMenu = () => {
    setIsOpen(false);
    setBreadcrumb([]);
  };
  const openMenu = () => {
    setBreadcrumb([]);
    setIsOpen(true);
  };
  const openSubmenu = (item) => setBreadcrumb((current) => [...current, item]);
  const goToBreadcrumb = (index) => setBreadcrumb((current) => current.slice(0, index));

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Open main navigation"
        aria-expanded={isOpen}
        onClick={openMenu}
        className="flex size-10 items-center justify-center rounded-full bg-white text-[#316663] shadow-sm transition-colors hover:bg-gray-200 min-[900px]:hidden dark:bg-slate-800 dark:text-[#70b7b1] dark:hover:bg-slate-700">
        <Bars3Icon className="size-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 min-[900px]:hidden">
          <button type="button" aria-label="Close main navigation overlay" onClick={closeMenu} className="absolute inset-0 bg-gray-950/35" />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation menu"
            className="absolute top-0 right-0 flex h-dvh w-[min(24rem,calc(100vw-2rem))] flex-col bg-gray-100 shadow-xl dark:bg-slate-900">
            <div className="flex min-h-16 items-center justify-between gap-3 border-b border-gray-200 px-4 dark:border-slate-700">
              <div className="flex min-w-0 items-center gap-3">
                <p className="text-sm font-semibold tracking-wide text-[#316663] uppercase dark:text-[#70b7b1]">Menu</p>
                {languageLinks}
              </div>
              <button
                type="button"
                aria-label="Close main navigation"
                onClick={closeMenu}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#316663] shadow-sm transition-colors hover:bg-gray-200 dark:bg-slate-800 dark:text-[#70b7b1] dark:hover:bg-slate-700">
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Main navigation">
              {breadcrumb.length > 0 && (
                <ol className="flex items-center gap-1 overflow-x-auto border-b border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">
                  <li>
                    <button type="button" onClick={() => goToBreadcrumb(0)} className="font-medium whitespace-nowrap text-[#316663] dark:text-[#70b7b1]">
                      Menu
                    </button>
                  </li>
                  {breadcrumb.map((item, index) => (
                    <li key={item.id ?? item.label} className="flex items-center gap-1">
                      <ChevronRightIcon className="size-4 shrink-0 text-gray-400 dark:text-slate-500" />
                      <button
                        type="button"
                        onClick={() => goToBreadcrumb(index + 1)}
                        className={`whitespace-nowrap ${
                          index === breadcrumb.length - 1 ? "font-semibold text-gray-950 dark:text-gray-100" : "text-[#316663] dark:text-[#70b7b1]"
                        }`}>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ol>
              )}
              <ul>
                {currentItems.map((item) => (
                  <MobileMenuItem key={item.id ?? item.page ?? item.label} item={item} closeMenu={closeMenu} openSubmenu={openSubmenu} />
                ))}
              </ul>
            </nav>

            <div className="border-t border-gray-200 px-4 py-4 dark:border-slate-700">
              <SocialIcons />
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
