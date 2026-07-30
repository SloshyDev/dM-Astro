import React from "react";

/**
 * Presentational link wrapper. The parent owns URL resolution so it can apply
 * the appropriate rule for each CMS `TypeOfLink` value.
 */
const Link = ({ href, children, ...anchorProps }) => {
  if (!href) return children;

  return (
    <a href={href} {...anchorProps}>
      {children}
    </a>
  );
};

export default Link;
