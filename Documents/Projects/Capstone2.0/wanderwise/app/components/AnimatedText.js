"use client";

import React, { useEffect, useRef } from "react";

const TypewriterText = () => {
  const text = ["Plan your dream trip with", "WanderWise"];
  const containerRef = useRef(null);

  useEffect(() => {
    const styleId = "typewriter-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @keyframes typewriter {
          0% { width: 0ch }
          80% { width: 100% }
          100% { width: 100% }
        }
        @keyframes blink {
          0%, 100% { border-color: transparent }
          50% { border-color: white }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-white font-mono overflow-hidden whitespace-nowrap border-r-4 border-white inline-block"
      style={{
        animation: "typewriter 4s steps(40, end) 1s infinite, blink 0.75s step-end infinite",
        width: "0ch",
      }}
    >
      <div className="text-4xl font-bold leading-tight w-full">
        Discover Your Next Trip
        <br />
        {/* <span className="text-teal-400">WanderWise</span> */}
      </div>
    </div>
  );
};

export default TypewriterText;
