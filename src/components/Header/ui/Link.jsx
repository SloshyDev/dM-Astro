import React from "react";

const Link = ({ label, page, bgHover, scientificName }) => {
  return (
    <li>
      <a
        href={`${page}`}
        className={`block w-full rounded-md bg-gray-100 px-3 py-1 whitespace-nowrap transition-colors dark:bg-slate-900 dark:text-gray-100 dark:focus-within:bg-slate-700 dark:hover:bg-slate-700 focus-within:${bgHover} hover:${bgHover}`}>
        {label}
        {scientificName && <span className="text-[#316663] italic dark:text-[#70b7b1]"> ({scientificName})</span>}
      </a>
    </li>
  );
};

export default Link;
