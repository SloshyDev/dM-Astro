import React, { useEffect, useState } from "react";

const ViewPort = () => {
  const [viewport, setViewPort] = useState(window.innerWidth);

  useEffect(() => {
    const updateViewPort = () => setViewPort(window.innerWidth);
    window.addEventListener("resize", updateViewPort);
    return () => window.removeEventListener("resize", updateViewPort);
  }, []);

  return <div className="absolute right-0 bottom-0 m-4 rounded-2xl bg-dm-aqua-ocean p-3 text-xl font-black text-white">{viewport}</div>;
};

export default ViewPort;
