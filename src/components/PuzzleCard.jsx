import React from "react";
import PropTypes from "prop-types";

const PuzzleCard = ({ position = "top", className = "", children, ...props }) => {
  const positionClasses = {
    top: `
      mb-8 
      relative overflow-visible
      after:content-[''] after:absolute after:block
      after:w-20 after:h-20
      after:left-1/2 after:-translate-x-1/2
      after:bottom-0 after:translate-y-1/2
      after:bg-light dark:after:bg-dark  after:rounded-full
    `,
    bottom: `
      mt-8 
      relative overflow-visible
      before:content-[''] before:absolute before:block
      before:w-20 before:h-20
      before:left-1/2 before:-translate-x-1/2
      before:top-0 before:-translate-y-1/2
      before:bg-[#4A1818] before:rounded-full
    `,
  };

  return (
    <div className="relative">
      <div
        className={`w-full max-w-2xl bg-[#4A1818] text-white p-8 ${positionClasses[position]} ${className}`}
        {...props}
      >
        <div className="relative z-20">{children}</div>
      </div>
    </div>
  );
};

PuzzleCard.propTypes = {
  position: PropTypes.oneOf(["top", "bottom"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PuzzleCard;