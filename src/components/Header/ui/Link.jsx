import React from "react";

const Link = ({ label, page, scientificName }) => {
  return (
    <li>
      <a
        href={`${page}`}
        className="menu_link block w-full rounded-md bg-zinc-100 px-3 py-1 whitespace-nowrap transition-colors focus-within:bg-zinc-200 hover:bg-zinc-200 dark:bg-zinc-900 dark:focus-within:bg-zinc-700 dark:hover:bg-zinc-700">
        {label}
        {scientificName && <span className="text-teal-700 italic dark:text-teal-300"> ({scientificName})</span>}
      </a>
    </li>
  );
};

export default Link;
