<script>
  import { Moon, Github, Linkedin } from "lucide-svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<header class="border-b border-neutral-200">
  <nav
    class="flex items-center justify-between px-4 h-24 max-w-[1800px] mx-auto"
  >
    <!-- Left - Logo & Text -->
    <a
      href="/"
      class="group flex items-center gap-4 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
    >
      <div class="group-hover:bg-neutral-900">Waleed</div>
    </a>

    <!-- Right - Social & Contact -->
    <div class="flex items-center gap-6">
      <!-- Center - Navigation -->
      <ul class="flex gap-8 font-serif">
        {#each ["ABOUT", "WORK", "CONTACT"] as item}
          <li>
            <a
              href="/{item.toLowerCase()}"
              class="block p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              {item}
            </a>
          </li>
        {/each}
      </ul>

      <!-- Social Icons -->
      <div class="flex items-center h-24">
        <div class="flex flex-col h-24 w-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center h-full p-2 hover:bg-accent transition-all duration-200"
          >
            <Github class="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center h-full p-2 hover:bg-accent transition-all duration-200"
          >
            <Linkedin class="w-5 h-5" />
          </a>
        </div>

        <ThemeToggle class="" />
      </div>

      <!-- Contact Info -->
      <div class="group p-2 rounded-lg hover:bg-neutral-100 transition-colors">
        <div class="text-right">
          <p class="font-serif">Coding globally from Qatar.</p>
          <p class="text-sm">
            Available for freelance work →
            <a
              href="/contact"
              class="font-medium group-hover:text-neutral-700 transition-colors"
            >
              Hire me
            </a>
          </p>
        </div>
      </div>
    </div>
  </nav>
</header>
