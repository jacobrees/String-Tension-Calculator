<script setup>
import { ref } from "vue";

const props = defineProps({
  lowScaleLength: Number,
  highScaleLength: Number,
  instrumentType: String,
});

const emit = defineEmits([
  "update:lowScaleLength",
  "update:highScaleLength",
  "update:instrumentType",
]);
const instrumentSelect = ref(null);

function openInstrumentSelect() {
  if (!instrumentSelect.value) {
    return;
  }

  if (typeof instrumentSelect.value.showPicker === "function") {
    instrumentSelect.value.showPicker();
    return;
  }

  instrumentSelect.value.focus();
  instrumentSelect.value.click();
}
</script>

<template>
  <div
    class="bg-[var(--color-surface)] w-full px-5 sm:px-6 py-5 rounded-xl border border-[var(--color-border)] shadow-sm"
  >
    <h2 class="text-[24px] text-[var(--color-text)] font-semibold">
      Instrument Configuration
    </h2>
    <p class="text-sm text-[var(--color-text-muted)] mt-1">
      Choose your instrument and scale lengths to calculate each string tension.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div
        class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3"
      >
        <label
          class="text-sm font-semibold text-[var(--color-text-muted)]"
          for="instrumentType"
        >
          Instrument
        </label>
        <div
          class="mt-1 h-11 w-full flex items-stretch rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:border-[var(--color-accent)]"
        >
          <select
            ref="instrumentSelect"
            class="h-full flex-1 appearance-none bg-transparent px-3 text-[18px] text-[var(--color-text)] hover:cursor-pointer focus-visible:outline-none"
            id="instrumentType"
            name="instrumentType"
            :value="props.instrumentType"
            @change="emit('update:instrumentType', $event.target.value)"
          >
            <option class="text-[20px]" value="guitar">Guitar</option>
            <option class="text-[20px]" value="bass">Bass</option>
          </select>

          <button
            type="button"
            class="w-9 border-l border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            aria-label="Open instrument options"
            @click="openInstrumentSelect"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.169l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3"
      >
        <label
          class="text-sm font-semibold text-[var(--color-text-muted)]"
          for="lowScaleLength"
        >
          Low Scale Length (inches)
        </label>
        <input
          class="mt-1 h-11 text-[18px] w-full border border-[var(--color-border-strong)] rounded-lg bg-[var(--color-surface)] px-3 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-[var(--color-accent)]"
          id="lowScaleLength"
          name="lowScaleLength"
          type="number"
          inputmode="decimal"
          :value="props.lowScaleLength"
          @input="emit('update:lowScaleLength', +$event.target.value)"
        />
      </div>

      <div
        class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3"
      >
        <label
          class="text-sm font-semibold text-[var(--color-text-muted)]"
          for="highScaleLength"
        >
          High Scale Length (inches)
        </label>
        <input
          class="mt-1 h-11 text-[18px] w-full border border-[var(--color-border-strong)] rounded-lg bg-[var(--color-surface)] px-3 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-[var(--color-accent)]"
          id="highScaleLength"
          name="highScaleLength"
          type="number"
          inputmode="decimal"
          :value="props.highScaleLength"
          @input="emit('update:highScaleLength', +$event.target.value)"
        />
      </div>
    </div>
  </div>
</template>
