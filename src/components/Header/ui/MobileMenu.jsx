import { Bars3Icon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import SocialIcons from "../SocialIcons";

/**
 * Renders one item in the mobile navigation drawer.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.item Localized menu node.
 * @param {string} props.item.label Visible item label.
 * @param {string} [props.item.page] Destination path for a leaf item.
 * @param {string} [props.item.scientificName] Optional scientific name.
 * @param {Array<Object>} [props.item.submenu] Nested menu nodes.
 * @param {() => void} props.closeMenu Callback that closes and resets the drawer.
 * @param {(item: Object) => void} props.openSubmenu Callback that navigates into a submenu.
 * @returns {import("react").JSX.Element} A submenu button or destination link.
 */
const MobileMenuItem = ({ item, closeMenu, openSubmenu }) => {
  const hasSubmenu = item.submenu?.length;

  if (hasSubmenu) {
    return (
      <li>
        <button
          type="button"
          onClick={() => openSubmenu(item)}
          className="flex min-h-12 w-full items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 text-left text-base font-medium text-gray-950">
          <span>{item.label}</span>
          <ChevronRightIcon className="size-5 shrink-0 text-[#316663]" />
        </button>
      </li>
    );
  }

  return (
    <li>
      <a href={item.page} onClick={closeMenu} className="block min-h-12 border-b border-gray-200 px-4 py-3 text-base text-gray-950">
        {item.label}
        {item.scientificName && <span className="block text-sm text-[#316663] italic">{item.scientificName}</span>}
      </a>
    </li>
  );
};

/**
 * Renders the small-screen navigation trigger and hierarchical slide-out drawer.
 * The component maintains a breadcrumb stack and closes when Escape is pressed.
 *
 * @param {Object} props Component properties.
 * @param {import("react").ReactNode} props.languageLinks Language selector displayed in the drawer header.
 * @param {Array<Object>} props.menu Localized root menu nodes.
 * @returns {import("react").JSX.Element} Mobile navigation trigger and conditional drawer.
 * @throws {TypeError} If `menu` or a nested submenu does not support `map`.
 */
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
        className="flex size-10 items-center justify-center rounded-full bg-white text-[#316663] shadow-sm transition-colors hover:bg-gray-200 min-[900px]:hidden">
        <Bars3Icon className="size-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 min-[900px]:hidden">
          <button type="button" aria-label="Close main navigation overlay" onClick={closeMenu} className="absolute inset-0 bg-gray-950/35" />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation menu"
            className="absolute top-0 right-0 flex h-dvh w-[min(24rem,calc(100vw-2rem))] flex-col bg-gray-100 shadow-xl">
            <div className="flex min-h-16 items-center justify-between gap-3 border-b border-gray-200 px-4">
              <div className="flex min-w-0 items-center gap-3">
                <p className="text-sm font-semibold tracking-wide text-[#316663] uppercase">Menu</p>
                {languageLinks}
              </div>
              <button
                type="button"
                aria-label="Close main navigation"
                onClick={closeMenu}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#316663] shadow-sm transition-colors hover:bg-gray-200">
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Main navigation">
              {breadcrumb.length > 0 && (
                <ol className="flex items-center gap-1 overflow-x-auto border-b border-gray-200 px-4 py-3 text-sm text-gray-600">
                  <li>
                    <button type="button" onClick={() => goToBreadcrumb(0)} className="font-medium whitespace-nowrap text-[#316663]">
                      Menu
                    </button>
                  </li>
                  {breadcrumb.map((item, index) => (
                    <li key={item.id ?? item.label} className="flex items-center gap-1">
                      <ChevronRightIcon className="size-4 shrink-0 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => goToBreadcrumb(index + 1)}
                        className={`whitespace-nowrap ${index === breadcrumb.length - 1 ? "font-semibold text-gray-950" : "text-[#316663]"}`}>
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

            <div className="border-t border-gray-200 px-4 py-4">
              <SocialIcons />
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
