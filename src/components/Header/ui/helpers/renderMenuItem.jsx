import React from "react";
import SubMenu from "../SubMenu";
import Link from "../Link";

/**
 * Converts a localized menu node into either a link or a recursive submenu.
 *
 * @param {Object | null | undefined} item Localized menu node from `getLocalizedMenu`.
 * @param {boolean} [nested=false] Whether the node belongs to a nested flyout.
 * @returns {import("react").ReactNode} Rendered menu entry, or `null` for an empty node.
 * @throws {TypeError} If `item.submenu` exists but does not support `map`.
 */
const renderMenuItem = (item, nested = false) => {
  if (!item) return null;

  if (item.submenu) {
    return (
      <SubMenu key={item.label} bgColor="gray" label={item.label} nested={nested}>
        {item.submenu.map((child) => renderMenuItem(child, true))}
      </SubMenu>
    );
  }

  return <Link key={item.page ?? item.label} scientificName={item.scientificName} bgHover="bg-gray-200" label={item.label} page={item.page} />;
};

export default renderMenuItem;
