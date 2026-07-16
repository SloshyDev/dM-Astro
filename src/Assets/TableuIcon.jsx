import React from "react";

/**
 * Renders the branded Tableau profile link.
 *
 * @param {Object} props Component properties.
 * @param {string} props.link Destination Tableau URL.
 * @returns {import("react").JSX.Element} List item containing the Tableau image link.
 */
const TableuIcon = ({ link }) => {
  return (
    <li>
      <a href={link} aria-label="Tableau" target="_blank" rel="noopener noreferrer" className="">
        <img
          width={"300"}
          height={"40"}
          src="/TableuIcon.svg"
          alt=""
          className="w-50 transition-transform duration-150 focus-within:scale-105 hover:scale-105"
        />
      </a>
    </li>
  );
};

export default TableuIcon;
