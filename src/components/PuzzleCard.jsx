import React from "react";
import PropTypes from "prop-types";

const PuzzleCard = ({
  position = "middle", // Default to middle
  className = "",
  
  children,
  ...props
}) => {
  const baseStyles = `
    relative overflow-visible
    before:content-[''] before:absolute before:block
    before:w-[15%] before:aspect-square
    after:content-[''] after:absolute after:block
    after:w-[15%] after:aspect-square
  `;

  const positionStyles = {
    top: `
      rounded-2xl mb-8
      after:bg-light dark:after:bg-dark after:rounded-full
      after:left-1/2 after:-translate-x-1/2
      after:bottom-0 after:translate-y-1/2
    `,
    bottom: `
      rounded-2xl mt-8
      before:bg-[#4A1818] before:rounded-full
      before:left-1/2 before:-translate-x-1/2
      before:top-0 before:-translate-y-1/2
    `,
    left: `
      rounded-2xl mr-8
      after:bg-[#4A1818] after:rounded-full
      after:top-1/2 after:-translate-y-1/2
      after:right-0 after:translate-x-1/2
    `,
    right: `
      rounded-2xl ml-8
      before:bg-light dark:before:bg-dark before:rounded-full
      before:top-1/2 before:-translate-y-1/2
      before:left-0 before:-translate-x-1/2
    `,
    middle: `
      rounded-2xl my-8 mx-8
      before:bg-[#4A1818] before:rounded-full
      before:left-1/2 before:-translate-x-1/2
      before:top-0 before:-translate-y-1/2
      after:bg-light dark:after:bg-dark after:rounded-full
      after:left-1/2 after:-translate-x-1/2
      after:bottom-0 after:translate-y-1/2
    `,
  };

  return (
    <div
      className={`w-full max-w-2xl bg-[#4A1818] text-white p-8 ${baseStyles} ${positionStyles[position]} ${className}`}
      {...props}
    >
      <div className="relative z-20">{children}</div>
    </div>
  );
};

PuzzleCard.propTypes = {
  position: PropTypes.oneOf(["top", "bottom", "left", "right", "middle"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PuzzleCard;