const IconPath = ({ name }) => {
  if (name === "bars") return <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />;
  if (name === "close") return <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" d="m6 6 12 12M18 6 6 18" />;
  if (name === "chevronDown") return <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m6 9 6 6 6-6" />;
  if (name === "chevronRight") return <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m9 6 6 6-6 6" />;
  if (name === "sun") {
    return <>
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </>;
  }
  if (name === "moon") return <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 15.2A8 8 0 0 1 8.8 4 8 8 0 1 0 20 15.2Z" />;
  if (name === "computer") {
    return <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" d="M8 20h8M12 16v4" />
    </>;
  }
  return null;
};

const Icon = ({ name, className, ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <IconPath name={name} />
  </svg>
);

export default Icon;
