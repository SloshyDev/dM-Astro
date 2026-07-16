import SocialIcons from "./SocialIcons";
import MenuList from "./ui/MenuList";
import MobileMenu from "./ui/MobileMenu";
import { getLanguageLinks, getLocalizedMenu } from "./menuData";

/**
 * Renders links to the equivalent English and Spanish routes.
 *
 * @param {Object} props Component properties.
 * @param {string} [props.className=""] Optional classes applied to the navigation element.
 * @param {"en" | "es"} props.lang Active language used for `aria-current`.
 * @param {string} props.pathname Current URL pathname used to pair translated routes.
 * @returns {import("react").JSX.Element} Accessible language selector.
 * @throws {TypeError} If `pathname` is not a string.
 */
const LanguageLinks = ({ className = "", lang, pathname }) => {
  const links = getLanguageLinks(pathname);
  const languages = [
    { code: "en", label: "English", flag: "/Flags/US.svg", href: links.en },
    { code: "es", label: "Español", flag: "/Flags/MX.svg", href: links.es },
  ];

  return (
    <nav className={className} aria-label="Language selector">
      <ul className="flex items-center gap-2">
        {languages.map((language) => (
          <li key={language.code}>
            <a
              href={language.href}
              aria-label={language.label}
              aria-current={lang === language.code ? "page" : undefined}
              className="block rounded-full transition-transform duration-150 focus-within:scale-105 hover:scale-105">
              <img src={language.flag} alt="" className="size-8 rounded-full object-cover" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * Renders the responsive site header, localized navigation, social links, and mobile drawer.
 *
 * @param {Object} props Component properties.
 * @param {"en" | "es"} [props.lang="en"] Active site language.
 * @param {string} [props.pathname="/"] Current URL pathname.
 * @returns {import("react").JSX.Element} Hydratable site header.
 * @throws {TypeError} If `pathname` is not a string or localized menu data is malformed.
 */
const Header = ({ lang = "en", pathname = "/" }) => {
  const menu = getLocalizedMenu(lang);

  return (
    <header className="sticky top-0 z-40 w-screen border-b-2 border-b-gray-200 bg-gray-100 px-4 py-2 shadow-md">
      <div className="flex w-full items-center justify-between gap-4">
        <nav className="flex min-w-0 items-center gap-3" aria-label="Header">
          <a href="/" className="contents">
            <img src="/Logo.svg" className="w-35 shrink-0" alt="dataMares" />
          </a>
          <MenuList menu={menu} className="hidden min-[1700px]:contents" />
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden min-[900px]:contents">
            <SocialIcons />
          </div>
          <LanguageLinks className="hidden min-[900px]:block" lang={lang} pathname={pathname} />
          <MobileMenu languageLinks={<LanguageLinks lang={lang} pathname={pathname} />} menu={menu} />
        </div>
      </div>
      <MenuList
        menu={menu}
        className="mt-2 hidden border-t border-gray-200 pt-2 min-[900px]:block min-[1700px]:hidden"
        listClassName="flex flex-wrap items-center justify-start gap-x-5 gap-y-2"
      />
    </header>
  );
};

export default Header;
