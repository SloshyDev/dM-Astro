import React from "react";
import FacebookIcon from "../../Assets/FacebookIcon";
import TwitterIcon from "../../Assets/TwitterIcon";
import MailIcon from "../../Assets/MailIcon";
import InstagramIcon from "../../Assets/InstagramIcon";
import TableuIcon from "../../Assets/TableuIcon";

const SocialIcons = ({ showTableau = true, size = "size-4" }) => {
  return (
    <nav className="contents">
      <ul className="flex gap-2">
        {showTableau && <TableuIcon link={"https://public.tableau.com/app/profile/datamares"} />}
        <MailIcon size={size} link={"mailto:direccion@datamares.org"} />
        <FacebookIcon size={size} link={"https://www.facebook.com/datamares/"} />
        <TwitterIcon size={size} link={"https://twitter.com/dataMares"} />
        <InstagramIcon size={size} link={"https://www.instagram.com/datamares_/"} />
      </ul>
    </nav>
  );
};

export default SocialIcons;
