import { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";

// Add helper function for quadrant-based positioning
const getQuadrantPosition = (quadrant, pieceSize = 100) => {
  const buffer = 20; // Space between pieces
  const quadrantSize = 200;
  
  // Define quadrant boundaries
  const quadrants = {
    topLeft: { x: [buffer, quadrantSize/2 - buffer], y: [buffer, quadrantSize/2 - buffer] },
    topRight: { x: [quadrantSize/2 + buffer, quadrantSize - buffer], y: [buffer, quadrantSize/2 - buffer] },
    bottomLeft: { x: [buffer, quadrantSize/2 - buffer], y: [quadrantSize/2 + buffer, quadrantSize - buffer] },
    bottomRight: { x: [quadrantSize/2 + buffer, quadrantSize - buffer], y: [quadrantSize/2 + buffer, quadrantSize - buffer] }
  };

  const q = quadrants[quadrant];
  return {
    x: Math.random() * (q.x[1] - q.x[0]) + q.x[0],
    y: Math.random() * (q.y[1] - q.y[0]) + q.y[0]
  };
};

const PuzzlePieces = () => {
  const PIECE_SIZE = 100; // Base size for each piece
  const PUZZLE_SIZE = PIECE_SIZE * 2; // Total puzzle size (2x2 grid)
  
  const [pieces, setPieces] = useState([
    // Top left piece
    { 
      id: 0, 
      ...getQuadrantPosition('topLeft'),
      rotation: 90, 
      targetX: 0,
      targetY: 0 
    },
    // Top right piece
    { 
      id: 1, 
      ...getQuadrantPosition('topRight'),
      rotation: 180,
      targetX: 75, // Adjacent to left piece
      targetY: 0 
    },
    // Bottom left piece
    { 
      id: 2, 
      ...getQuadrantPosition('bottomLeft'),
      rotation: 0,
      targetX: 0,
      targetY: 75 // Adjacent to top piece
    },
    // Bottom right piece
    { 
      id: 3, 
      ...getQuadrantPosition('bottomRight'),
      rotation: 270,
      targetX: 75, // Adjacent to left piece
      targetY: 82 // Adjacent to top piece
    },
  ]);

  const [assembled, setAssembled] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !assembled) {
        setPieces((prev) =>
          prev.map((piece) => ({
            ...piece,
            x: piece.targetX,
            y: piece.targetY,
            rotation: piece.rotation // Maintain correct rotation
          }))
        );
        setAssembled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [assembled]);

  const handleRotate = (id, event) => {
    if (event.altKey) {
      setPieces(pieces.map(piece => 
        piece.id === id 
          ? { ...piece, rotation: piece.rotation + 90 } 
          : piece
      ));
    }
  };

  const handleDragStart = (event, id) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if drag started in corner (20px radius from corners)
    const inCorner = (x < 20 || x > rect.width - 20) && 
                    (y < 20 || y > rect.height - 20);
    
    setDragStart({ x: event.clientX, y: event.clientY });
    setIsRotating(inCorner);
  };

  const handleDrag = (event, info, piece) => {
    if (isRotating && dragStart) {
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;
      const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
      
      setPieces(pieces.map(p => 
        p.id === piece.id 
          ? { ...p, rotation: rotation } 
          : p
      ));
    }
  };

  const handleDragEnd = (piece, info) => {
    const distance = Math.hypot(
      info.point.x - piece.targetX,
      info.point.y - piece.targetY
    );

    if (distance < 30) {
      setPieces(prev => prev.map(p => 
        p.id === piece.id 
          ? { ...p, x: p.targetX, y: p.targetY, rotation: 0 }
          : p
      ));
    }
  };

  return (
    <div className="relative w-[200px] h-[200px] mx-auto grid place-items-center border"> {/* Updated container size */}
          <div className="relative w-[200px] h-[200px]">

      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute cursor-grab active:cursor-grabbing"
          style={{
            width: PIECE_SIZE,
            height: 84,
            transformOrigin: 'center'
          }}
          drag={!assembled} // Disable drag when assembled
          dragConstraints={{ 
            left: 0,
            right: PUZZLE_SIZE - PIECE_SIZE,
            top: 0,
            bottom: PUZZLE_SIZE - PIECE_SIZE
          }}
          animate={{ 
            x: piece.x, 
            y: piece.y, 
            rotate: piece.rotation 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 100,
            damping: 20
          }}
          onDragEnd={(_, info) => handleDragEnd(piece, info)}
          whileDrag={{ scale: 1.1 }}
          whileHover={{ 
            scale: 1.05,
          }}
          title="Double-click + ALT to rotate"
        >
          {/* Rotation indicators in corners */}
          <div className="absolute top-0 left-0 w-5 h-5 rounded-full opacity-20 hover:opacity-50 bg-white" />
          <div className="absolute top-0 right-0 w-5 h-5 rounded-full opacity-20 hover:opacity-50 bg-white" />
          <div className="absolute bottom-0 left-0 w-5 h-5 rounded-full opacity-20 hover:opacity-50 bg-white" />
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full opacity-20 hover:opacity-50 bg-white" />
          {/* Puzzle Piece SVG */}
          <svg
            viewBox="0 0 237 282"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              fill="#fff"
              stroke="#000"
              strokeMiterlimit="10"
              d="M236.5,118.5V45.5h-73c0-24.85-20.15-45-45-45s-45,20.15-45,45H.5v236h236v-73c-24.85,0-45-20.15-45-45s20.15-45,45-45Z"
            />
          </svg>
        </motion.div>
      ))}
    </div>
    </div>
  );
};

export default PuzzlePieces;