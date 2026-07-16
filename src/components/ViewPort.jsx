import React, { useEffect, useState } from "react";

/**
 * Displays the current browser width and updates it after resize events.
 * This client-only diagnostic component requires a browser environment.
 *
 * @returns {import("react").JSX.Element} Fixed viewport-width indicator.
 * @throws {ReferenceError} If rendered where `window` is unavailable; use Astro's `client:only` directive.
 */
const ViewPort = () => {
  const [viewport, setViewPort] = useState(window.innerWidth);

  useEffect(() => {
    const updateViewPort = () => setViewPort(window.innerWidth);
    window.addEventListener("resize", updateViewPort);
    return () => window.removeEventListener("resize", updateViewPort);
  }, []);

  return <div className="absolute bottom-0 m-4 rounded-2xl bg-blue-600 p-3 text-xl font-black text-white">{viewport}</div>;
};

export default ViewPort;
