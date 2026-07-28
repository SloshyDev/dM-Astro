import React from "react";
import SubMenu from "../SubMenu";
import Link from "../Link";

const renderMenuItem = (item, nested = false) => {
  if (!item) return null;

  if (item.submenu) {
    return (
      <SubMenu key={item.label} bgColor="zinc" label={item.label} nested={nested}>
        {item.submenu.map((child) => renderMenuItem(child, true))}
      </SubMenu>
    );
  }

  return <Link key={item.page ?? item.label} scientificName={item.scientificName} label={item.label} page={item.page} />;
};

export default renderMenuItem;
