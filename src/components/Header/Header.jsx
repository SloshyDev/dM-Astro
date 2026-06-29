import SocialIcons from "./SocialIcons";
import renderMenuItem from "./ui/helpers/renderMenuItem";

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
    <section role="menu" className="flex w-screen justify-between gap-4 border-b-2 border-b-gray-200 bg-gray-100 px-4 py-2 shadow-md">
      <nav className="flex gap-4">
        <a href="/">
          <img src="/Logo.svg" className="w-45" alt="" />
        </a>
        <nav>
          <ul className="flex items-center gap-2">{menu.map((item) => renderMenuItem(item))}</ul>
        </nav>
      </nav>
      <SocialIcons />
    </section>
  );
};

export default Header;
