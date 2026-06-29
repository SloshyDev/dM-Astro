import * as React from "react";

const FacebookIcon = ({ link, size }) => (
  <li>
    <a
      href={link}
      aria-label="Facebook"
      target="_blank"
      className="block rounded-full bg-[#316564] p-2 transition-transform duration-150 focus-within:scale-105 focus-within:bg-[#2A5855] hover:scale-105 hover:bg-[#2A5855]">
      <svg xmlns="http://www.w3.org/2000/svg" className={size} viewBox="0 0 24 24">
        <path className="fill-white" d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z"></path>
      </svg>
    </a>
  </li>
);

export default FacebookIcon;
