import * as React from "react";

const TwitterIcon = ({ link, size }) => (
  <li>
    <a
      href={link}
      aria-label="Twitter"
      target="_blank"
      className="block rounded-full bg-teal-700 p-2 transition-transform duration-150 focus-within:scale-105 focus-within:bg-teal-800 hover:scale-105 hover:bg-teal-800">
      <svg xmlns="http://www.w3.org/2000/svg" className={size} viewBox="0 0 14 14">
        <g fill="none">
          <g clipPath="url(#SVGG1Ot4cAD)">
            <path
              className="fill-white"
              d="M11.025.656h2.147L8.482 6.03 14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"></path>
          </g>
          <defs>
            <clipPath id="SVGG1Ot4cAD">
              <path fill="#fff" d="M0 0h14v14H0z"></path>
            </clipPath>
          </defs>
        </g>
      </svg>
    </a>
  </li>
);

export default TwitterIcon;
