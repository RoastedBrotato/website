<script>
  import { onMount } from "svelte";

  let isOpen = false;
  let isMobile = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  onMount(() => {
    const checkWidth = () => {
      isMobile = window.innerWidth < 768;
      isOpen = false; // Default closed on mobile
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  });
</script>

<nav class="bg-gray-800 text-white w-full">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16 items-center">
      <h1 class="text-xl font-bold">Waleed</h1>

      <button class="md:hidden text-2xl" on:click={toggleMenu}>
        {isOpen ? "✕" : "☰"}
      </button>

      <ul class="hidden md:flex space-x-8">
        <li><a href="/" class="hover:text-gray-300">Home</a></li>
        <li><a href="/projects" class="hover:text-gray-300">Projects</a></li>
        <li><a href="/blog" class="hover:text-gray-300">Blog</a></li>
        <li><a href="/about" class="hover:text-gray-300">About</a></li>
      </ul>
    </div>

    {#if isOpen}
      <div class="md:hidden">
        <ul class="py-2 space-y-2">
          <li>
            <a href="/" class="block hover:bg-gray-700 px-4 py-2">Home</a>
          </li>
          <li>
            <a href="/projects" class="block hover:bg-gray-700 px-4 py-2"
              >Projects</a
            >
          </li>
          <li>
            <a href="/blog" class="block hover:bg-gray-700 px-4 py-2">Blog</a>
          </li>
          <li>
            <a href="/about" class="block hover:bg-gray-700 px-4 py-2">About</a>
          </li>
        </ul>
      </div>
    {/if}
  </div>
</nav>
