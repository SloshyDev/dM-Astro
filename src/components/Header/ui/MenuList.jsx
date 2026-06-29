import React from "react";
import renderMenuItem from "./helpers/renderMenuItem";

const MenuList = ({ className = "", menu }) => (
  <nav className={className} aria-label="Main navigation">
    <ul className="flex items-center">{menu.map((item) => renderMenuItem(item))}</ul>
  </nav>
);

export default MenuList;
