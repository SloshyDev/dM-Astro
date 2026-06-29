import React from "react";

const Link = ({ label, page, bgHover, key }) => {
  return (
    <li>
      <a href={`${page}`} className={`block w-full rounded-md bg-gray-100 px-3 py-1 transition-colors focus-within:${bgHover} hover:${bgHover}`}>
        {label}
      </a>
    </li>
  );
};

export default Link;
