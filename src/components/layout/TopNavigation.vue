<script setup>
import creatorIcon from "@/assets/nts-boxed-cutout-black.svg";

const creatorWebsiteUrl = "https://needthickerstrings.netlify.app";
</script>

<template>
  <header
    class="relative w-full flex flex-row justify-center items-center py-3 sm:py-3 border-b border-[var(--color-border)] navbar-bg"
  >
    <div
      class="w-full max-w-[1200px] grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 sm:gap-3 px-4 sm:px-6"
    >
      <div class="max-w-[760px] min-w-0 pr-2 sm:pr-4">
        <h1
          class="text-[22px] sm:text-[24px] leading-[1.1] text-[var(--color-text)] font-semibold"
        >
          String Tension Calculator
        </h1>
        <p
          class="mt-1.5 sm:mt-1.5 pt-0 text-[14px] sm:text-[14px] leading-[1.4] sm:leading-[1.45] text-[var(--color-text-muted)] max-w-[540px] sm:max-w-[600px]"
        >
          Calculate precise string tension of round wound, hex core, nickel
          plated steel guitar strings (Ernie Ball, D'Addario, Newtone Strings)
        </p>
      </div>

      <div
        class="shrink-0 flex items-center justify-end gap-1.5 md:gap-2 self-start"
      >
        <p
          class="hidden lg:block text-[13px] text-[var(--color-text-muted)] leading-[1.2] text-right"
        >
          <span class="block">Main website</span>
          <span class="block">
            Check it out
            <span class="inline-flex align-middle ml-0.5" aria-hidden="true">
              <svg
                class="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10H15M15 10L10.5 5.5M15 10L10.5 14.5"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </span>
        </p>
        <a
          :href="creatorWebsiteUrl"
          class="h-16 w-16 shrink-0 inline-flex items-center justify-center hover:opacity-80"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit NeedThickerStrings main website"
        >
          <img
            :src="creatorIcon"
            alt="NeedThickerStrings icon"
            class="h-full w-full object-contain"
          />
        </a>
      </div>
    </div>
  </header>
</template>
