import SocialIcons from "./SocialIcons";
import MenuList from "./ui/MenuList";
import { GlobeAltIcon } from "@heroicons/react/16/solid";
import { getLanguageLinks, getLocalizedMenu } from "./menuData";

const LanguageLinks = ({ lang, pathname }) => {
  const links = getLanguageLinks(pathname);
  const languages = [
    { code: "en", label: "English", icon: "EN", href: links.en },
    { code: "es", label: "Español", icon: "ES", href: links.es },
  ];

  return (
    <nav aria-label="Language selector">
      <ul className="flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm">
        <li>
          <GlobeAltIcon className="size-4 text-[#316663]" aria-hidden="true" />
        </li>
        {languages.map((language) => (
          <li key={language.code}>
            <a
              href={language.href}
              aria-label={language.label}
              aria-current={lang === language.code ? "page" : undefined}
              className={`flex size-7 items-center justify-center rounded-full text-[0.65rem] font-semibold transition-colors ${
                lang === language.code ? "bg-[#316663] text-white" : "text-[#316663] hover:bg-gray-200"
              }`}>
              {language.icon}
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
    <header className="sticky top-0 w-screen justify-between border-b-2 border-b-gray-200 bg-gray-100 px-4 py-2 shadow-md xl:flex">
      <div className="flex w-full justify-between">
        <nav className="flex gap-3" aria-label="Header">
          <a href="/" className="contents">
            <img src="/Logo.svg" className="w-35" alt="dataMares" />
          </a>
          <MenuList menu={menu} className="hidden xl:contents" />
        </nav>

        <div className="flex items-center gap-3">
          <LanguageLinks lang={lang} pathname={pathname} />
          <SocialIcons />
        </div>
      </div>
      <MenuList menu={menu} className="block xl:hidden" />
    </header>
  );
};

export default Header;
