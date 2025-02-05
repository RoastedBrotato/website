<script>
  export let piece; // piece is an object
  export let handleDragStart;
  export let handleDrag;
  export let handleDragEnd;
</script>

<div
  class="absolute cursor-grab active:cursor-grabbing transition-all duration-500 w-32 h-32"
  style="transform: translate({$piece.position.x}px, {$piece.position
    .y}px) rotate({$piece.rotation}deg)"
  on:mousedown={(e) => handleDragStart(piece, e)}
  on:mousemove={handleDrag}
  on:mouseup={handleDragEnd}
  on:mouseleave={handleDragEnd}
>
  <svg viewBox="0 0 237 282">
    <path
      d="M.5,163.5v73h73c0,24.85,20.15,45,45,45s45-20.15,45-45h73V.5H.5v73c24.85,0,45,20.15,45,45S25.35,163.5.5,163.5Z"
      class="fill-current stroke-current stroke-2"
      class:text-purple-600={piece.id === 0}
      class:text-blue-600={piece.id === 1}
      class:text-pink-600={piece.id === 2}
      class:text-yellow-600={piece.id === 3}
    />
  </svg>
</div>
