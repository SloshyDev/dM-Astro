import React from "react";

const MailIcon = ({ link }) => {
  return (
    <li>
      <a
        href={link}
        aria-label="Mail"
        className="block rounded-full bg-[#316564] p-2 transition-transform duration-150 focus-within:scale-105 focus-within:bg-[#2A5855] hover:scale-105 hover:bg-[#2A5855]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" className="stroke-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect width="20" height="16" x="2" y="4" rx="2" />
          </g>
        </svg>
      </a>
    </li>
  );
};

export default MailIcon;
