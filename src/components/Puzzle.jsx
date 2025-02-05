import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shuffle, CheckCircle2 } from "lucide-react";

const getRandomRotation = () => Math.floor(Math.random() * 4) * 90;
const getRandomOffset = (max = 100) => (Math.random() * 2 - 1) * max;

const isClose = (a, b, margin = 5) => Math.abs(a - b) <= margin;
const isPieceCorrect = (piece) => {
  return isClose(piece.x, 0) && isClose(piece.y, 0) && isClose(piece.rotation % 360, 0);
};

const PuzzlePieces = () => {
  const [pieces, setPieces] = useState([
    { id: 0, x: getRandomOffset(), y: getRandomOffset(), rotation: getRandomRotation() },
    { id: 1, x: getRandomOffset(), y: getRandomOffset(), rotation: getRandomRotation() },
    { id: 2, x: getRandomOffset(), y: getRandomOffset(), rotation: getRandomRotation() },
    { id: 3, x: getRandomOffset(), y: getRandomOffset(), rotation: getRandomRotation() },
  ]);
  const [assembled, setAssembled] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Trigger complete animation 1 second after initial render.
  useEffect(() => {
    const timer = setTimeout(() => {
      setPieces(prevPieces =>
        prevPieces.map(piece => ({ ...piece, x: 0, y: 0, rotation: 0 }))
      );
      setAssembled(true);
      setCompleted(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isComplete = pieces.every(isPieceCorrect);
    if (isComplete && !completed) {
      setCompleted(true);
    } else if (!isComplete && completed) {
      setCompleted(false);
    }
  }, [pieces, completed]);

  // Rotate without modifying x and y.
  const handleRotate = (id) => {
    setPieces(pieces.map(piece => 
      piece.id === id 
        ? { ...piece, rotation: piece.rotation + 90 }
        : piece
    ));
  };

  const handleShuffle = () => {
    setPieces(pieces.map(piece => ({
      ...piece,
      x: getRandomOffset(),
      y: getRandomOffset(),
      rotation: getRandomRotation()
    })));
    setCompleted(false);
    setAssembled(false);
  };

  const handleComplete = () => {
    setPieces(pieces.map(piece => ({
      ...piece,
      x: 0,
      y: 0,
      rotation: 0
    })));
    setCompleted(true);
    setAssembled(true);
  };

  const colors = {
    0: "#A63D40",
    1: "#D0D1AC",
    2: "#151515",
    3: "#EAEBD5"
  };

  const paths = {
    0: "M236.5,306.5v-73h-73c0-24.85-20.15-45-45-45s-45,20.15-45,45H.5v236h236v-73c-24.85,0-45-20.15-45-45s20.15-45,45-45Z",
    1: "M307.5,233.5h-73v73c-24.85,0-45,20.15-45,45s20.15,45,45,45v73h236v-236h-73c0,24.85-20.15,45-45,45s-45-20.15-45-45Z",
    2: "M163.5,236.5h73v-73c24.85,0,45-20.15,45-45s-20.15-45-45-45V.5H.5v236h73c0-24.85,20.15-45,45-45s45,20.15,45,45Z",
    3: "M234.5,163.5v73h73c0,24.85,20.15,45,45,45s45-20.15,45-45h73V.5h-236v73c24.85,0,45,20.15,45,45s-20.15,45-45,45Z"
  };

  return (
    <div className="puzzle-container">
      <div className="controls flex gap-4 mb-4">
        <button 
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </button>
        <button 
          onClick={handleComplete}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" />
          Complete
        </button>
      </div>
      
      <div className="border border-black">
        <svg 
          viewBox="0 0 471 470" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full" 
          style={{ overflow: "visible" }}
        >
          {Object.keys(paths).map(key => {
            const piece = pieces.find(p => p.id === +key);
            return (
              <motion.g
                key={key}
                drag={!assembled}
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{ x: piece.x, y: piece.y, rotate: piece.rotation }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  if (!assembled) handleRotate(piece.id);
                }}
                onDragEnd={(e, info) => {
                  // Calculate new positions based on drag offset.
                  const newX = piece.x + info.offset.x;
                  const newY = piece.y + info.offset.y;
                  const snapThreshold = 5;
                  // Instead of checking rotation, we now snap x, y and always set rotation to 0
                  if (Math.abs(newX) < snapThreshold && Math.abs(newY) < snapThreshold) {
                    setPieces(prev =>
                      prev.map(p =>
                        p.id === piece.id ? { ...p, x: 0, y: 0, rotation: 0 } : p
                      )
                    );
                  } else {
                    setPieces(prev =>
                      prev.map(p =>
                        p.id === piece.id ? { ...p, x: newX, y: newY } : p
                      )
                    );
                  }
                }}
                className="cursor-move"
              >
                <path
                  className="cls-1"
                  fill={colors[key]}
                  stroke="#000"
                  strokeMiterlimit="10"
                  d={paths[key]}
                />
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default PuzzlePieces;