<template>
  <section class="panel w-full">
    <div class="px-4 sm:px-5 py-4">
      <h2
        class="text-[22px] leading-tight text-[var(--color-text)] font-semibold"
      >
        String Tension Equation
      </h2>
      <p class="text-sm text-[var(--color-text-muted)]">
        Core tension relation in SI units before display conversion.
      </p>

      <div
        class="mt-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-3 sm:px-4 py-3 overflow-x-auto"
      >
        <p
          class="text-[20px] sm:text-[22px] text-[var(--color-text)] font-bold whitespace-nowrap tracking-tight"
        >
          T = μ × (2Lf)<sup>2</sup>
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2 mt-3 text-sm"
      >
        <p
          class="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
        >
          <strong class="text-[var(--color-text)]">T</strong>: tension in
          newtons
        </p>
        <p
          class="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
        >
          <strong class="text-[var(--color-text)]">μ</strong>: mass per length
          in kg/m
        </p>
        <p
          class="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
        >
          <strong class="text-[var(--color-text)]">L</strong>: scale length in
          meters
        </p>
        <p
          class="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
        >
          <strong class="text-[var(--color-text)]">f</strong>: frequency in Hz
        </p>
      </div>
    </div>
  </section>
</template>
