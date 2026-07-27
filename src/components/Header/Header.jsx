import SocialIcons from "./SocialIcons";
import MenuList from "./ui/MenuList";
import MobileMenu from "./ui/MobileMenu";
import { getLanguageLinks, getLocalizedMenu } from "./menuData";

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

const Header = ({ lang = "en", pathname = "/" }) => {
  const menu = getLocalizedMenu(lang);

  return (
    <header className="sticky top-0 z-40 w-screen border-b-2 border-b-dm-border-light bg-dm-surface-light px-4 py-2 shadow-md transition-colors dark:border-dm-border-dark dark:bg-dm-surface-dark">
      <div className="mx-auto flex w-full max-w-[2560px] items-center justify-between gap-4">
        <nav className="flex min-w-0 items-center gap-3" aria-label="Header">
          <a href="/" className="contents">
            <img src="/Logo.svg" width={834} height={32} className="w-35 shrink-0" alt="dataMares" />
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
        className="mt-2 hidden border-t border-dm-border-light pt-2 min-[900px]:block min-[1700px]:hidden dark:border-dm-border-dark"
        listClassName="flex flex-wrap items-center justify-start gap-x-5 gap-y-2"
      />
    </header>
  );
};

export default Header;
