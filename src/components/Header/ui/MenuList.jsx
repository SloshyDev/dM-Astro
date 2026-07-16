import React from "react";
import renderMenuItem from "./helpers/renderMenuItem";

const MenuList = ({ className = "", listClassName = "flex items-center gap-1", menu }) => (
  <nav className={className} aria-label="Main navigation">
    <ul className={listClassName}>{menu.map((item) => renderMenuItem(item))}</ul>
  </nav>
);

export default MenuList;
