import React from "react";
import renderMenuItem from "./helpers/renderMenuItem";

/**
 * Renders a localized desktop navigation tree.
 *
 * @param {Object} props Component properties.
 * @param {string} [props.className=""] Classes applied to the navigation element.
 * @param {string} [props.listClassName="flex items-center gap-1"] Classes applied to the root list.
 * @param {Array<Object>} props.menu Localized menu entries from `getLocalizedMenu`.
 * @returns {import("react").JSX.Element} Main navigation element.
 * @throws {TypeError} If `menu` is not an array-like value that supports `map`.
 */
const MenuList = ({ className = "", listClassName = "flex items-center gap-1", menu }) => (
  <nav className={className} aria-label="Main navigation">
    <ul className={listClassName}>{menu.map((item) => renderMenuItem(item))}</ul>
  </nav>
);

export default MenuList;
