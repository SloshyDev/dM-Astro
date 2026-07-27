import React from "react";

const Link = ({ label, page, scientificName }) => {
  return (
    <li>
      <a
        href={`${page}`}
        className="block w-full rounded-md bg-dm-surface-light px-3 py-1 whitespace-nowrap transition-colors focus-within:bg-dm-interactive-soft/20 hover:bg-dm-interactive-soft/20 dark:bg-dm-surface-dark dark:text-white dark:focus-within:bg-dm-interactive/30 dark:hover:bg-dm-interactive/30">
        {label}
        {scientificName && <span className="text-dm-interactive italic dark:text-dm-interactive-soft"> ({scientificName})</span>}
      </a>
    </li>
  );
};

export default Link;
