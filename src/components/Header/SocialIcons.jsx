import React from "react";
import FacebookIcon from "../../Assets/FacebookIcon";
import TwitterIcon from "../../Assets/TwitterIcon";
import MailIcon from "../../Assets/MailIcon";

const SocialIcons = () => {
  return (
    <nav className="contents">
      <ul className="flex gap-2">
        <FacebookIcon link={"https://www.facebook.com/datamares/"} />
        <TwitterIcon link={"https://twitter.com/dataMares"} />
        <MailIcon link={"mailto:direccion@datamares.org"} />
      </ul>
    </nav>
  );
};

export default SocialIcons;
