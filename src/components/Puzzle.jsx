import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Return a random offset within a range.
const getRandomOffset = (max = 100) => (Math.random() * 2 - 1) * max;
const getRandomRotation = (max = 45) => (Math.random() * 2 - 1) * max;

const PuzzlePieces = () => {
  // Each piece starts off with a random x, y and rotation.
  const [pieces, setPieces] = useState([
    { id: 0, x: getRandomOffset(), y: getRandomOffset(), rotation: getRandomRotation() },
    { id: 1, x: getRandomOffset(), y: getRandomOffset(), rotation: getRandomRotation() },
    { id: 2, x: getRandomOffset(), y: getRandomOffset(), rotation: getRandomRotation() },
    { id: 3, x: getRandomOffset(), y: getRandomOffset(), rotation: getRandomRotation() },
  ]);
  const [assembled, setAssembled] = useState(false);

  // When scrolling past 200px, animate pieces to zero offset & rotation.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !assembled) {
        setPieces(pieces.map(piece => ({ ...piece, x: 0, y: 0, rotation: 0 })));
        setAssembled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [assembled, pieces]);

  // These are the four path elements from your final assembled SVG.
  const paths = {
    0: "M236.5,306.5v-73h-73c0-24.85-20.15-45-45-45s-45,20.15-45,45H.5v236h236v-73c-24.85,0-45-20.15-45-45s20.15-45,45-45Z",
    1: "M307.5,233.5h-73v73c-24.85,0-45,20.15-45,45s20.15,45,45,45v73h236v-236h-73c0,24.85-20.15,45-45,45s-45-20.15-45-45Z",
    2: "M163.5,236.5h73v-73c24.85,0,45-20.15,45-45s-20.15-45-45-45V.5H.5v236h73c0-24.85,20.15-45,45-45s45,20.15,45,45Z",
    3: "M234.5,163.5v73h73c0,24.85,20.15,45,45,45s45-20.15,45-45h73V.5h-236v73c24.85,0,45,20.15,45,45s-20.15,45-45,45Z"
  };

  return (
    <div className="mx-auto" style={{ width: "471px", height: "470px", border: "1px solid #000" }}>
      <svg viewBox="0 0 471 470" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ overflow: "visible" }}>
        {Object.keys(paths).map(key => {
          const piece = pieces.find(p => p.id === +key);
          return (
            <motion.g
              key={key}
              drag={!assembled}
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              style={{ originX: "50%", originY: "50%" }}
              animate={{ x: piece.x, y: piece.y, rotate: piece.rotation }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <path
                className="cls-1"
                fill="#fff"
                stroke="#000"
                strokeMiterlimit="10"
                d={paths[key]}
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default PuzzlePieces;