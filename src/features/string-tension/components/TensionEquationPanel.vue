<template>
  <section class="panel w-full">
    <div class="px-3.5 py-3.5">
      <h2
        class="text-[19px] leading-tight text-[var(--color-text)] font-semibold"
      >
        String Tension Equation
      </h2>
      <p class="text-[13px] leading-[1.4] text-[var(--color-text-muted)]">
        Core tension relation in SI units before display conversion.
      </p>

      <div
        class="mt-2.5 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-2.5 py-2.5 overflow-x-auto"
      >
        <p
          class="text-[17px] sm:text-[18px] text-[var(--color-text)] font-bold whitespace-nowrap tracking-tight"
        >
          T = μ × (2Lf)<sup>2</sup>
        </p>
      </div>

      <div class="grid grid-cols-1 gap-1.5 mt-2.5 text-[12px] sm:text-[13px]">
        <p
          class="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1.5"
        >
          <strong class="text-[var(--color-text)]">T</strong>: tension in
          newtons
        </p>
        <p
          class="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1.5"
        >
          <strong class="text-[var(--color-text)]">μ</strong>: mass per length
          in kg/m
        </p>
        <p
          class="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1.5"
        >
          <strong class="text-[var(--color-text)]">L</strong>: scale length in
          meters
        </p>
        <p
          class="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1.5"
        >
          <strong class="text-[var(--color-text)]">f</strong>: frequency in Hz
        </p>
      </div>
    </div>
  </section>
</template>
