import React from "react";

/**
 * Renders one leaf entry in the desktop navigation menu.
 *
 * @param {Object} props Component properties.
 * @param {string} props.label Visible link label.
 * @param {string} props.page Destination path.
 * @param {string} props.bgHover Tailwind background utility used on hover and focus.
 * @param {string} [props.scientificName] Optional scientific name appended to the label.
 * @returns {import("react").JSX.Element} List item containing the navigation link.
 */
const Link = ({ label, page, bgHover, scientificName }) => {
  return (
    <li>
      <a
        href={`${page}`}
        className={`block w-full rounded-md bg-gray-100 px-3 py-1 whitespace-nowrap transition-colors focus-within:${bgHover} hover:${bgHover}`}>
        {label}
        {scientificName && <span className="text-[#316663] italic"> ({scientificName})</span>}
      </a>
    </li>
  );
};

export default Link;
