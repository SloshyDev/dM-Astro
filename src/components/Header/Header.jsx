import SocialIcons from "./SocialIcons";
import MenuList from "./ui/MenuList";

const menu = [
  { label: "About", page: "about" },
  { label: "News", page: "news" },
  {
    label: "dataPedia",
    submenu: [
      { label: "dataGrams", page: "datagrams" },
      { label: "dataGraphics", page: "datagraphics" },
      { label: "dataPics", page: "datapics" },
      { label: "dataPosters", page: "dataPosters" },
      { label: "Stories", page: "stories" },
    ],
  },
  { label: "dataKids", page: "datakids" },
  {
    label: "Biodiversity",
    submenu: [
      {
        label: "A day for the oceans",
        submenu: [
          { label: "A day for the oceans 2024", page: "a-day-for-the-oceans-2024" },
          { label: "A day for the oceans 2025", page: "a-day-for-the-oceans-2025" },
        ],
      },
      { label: "Dive Atlas", page: "dive-atlas" },
      { label: "Ecological Monitoring", page: "ecological-monitoring" },
      {
        label: "Natural Protected Areass",
        submenu: [{ label: "Cabo Pulmo National Park", page: "cabo-pulmo-national-park" }],
      },
    ],
  },
];

const Header = () => {
  return (
    <header className="w-screen justify-between border-b-2 border-b-gray-200 bg-gray-100 px-4 py-2 shadow-md xl:flex">
      <div className="flex w-full justify-between">
        <nav className="flex gap-3" aria-label="Header">
          <a href="/" className="contents">
            <img src="/Logo.svg" className="w-35" alt="dataMares" />
          </a>
          <MenuList menu={menu} className="hidden xl:contents" />
        </nav>

        <SocialIcons />
      </div>
      <MenuList menu={menu} className="block xl:hidden" />
    </header>
  );
};

export default Header;
