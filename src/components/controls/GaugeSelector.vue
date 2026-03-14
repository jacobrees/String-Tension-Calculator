<script setup>
import { ref } from "vue";

const props = defineProps({
  idPrefix: { type: String, required: false, default: "gauge" },
  index: { type: Number, required: true },
  defaultGauge: { type: String, required: false, default: null },
  gauges: { type: Array, default: () => [] },
});

const emit = defineEmits(["update-gauge"]);
const gaugeSelect = ref(null);

function openGaugeSelect() {
  if (!gaugeSelect.value) {
    return;
  }

  if (typeof gaugeSelect.value.showPicker === "function") {
    gaugeSelect.value.showPicker();
    return;
  }

  gaugeSelect.value.focus();
  gaugeSelect.value.click();
}
</script>

<template>
  <div class="gauge-selector w-full">
    <label class="sr-only" :for="`${props.idPrefix}${props.index}`">
      String {{ props.index + 1 }} gauge
    </label>
    <div
      class="h-10 w-full flex items-stretch rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:border-[var(--color-accent)]"
    >
      <select
        ref="gaugeSelect"
        class="h-full flex-1 appearance-none bg-transparent px-2 text-center text-base font-semibold text-[var(--color-text)] [text-align-last:center] hover:cursor-pointer focus-visible:outline-none"
        :id="`${props.idPrefix}${props.index}`"
        :name="`${props.idPrefix}${props.index}`"
        :value="props.defaultGauge"
        @change="emit('update-gauge', { gauge: $event.target.value })"
      >
        <option v-for="gauge in gauges" :key="gauge" :value="gauge">
          {{ gauge }}
        </option>
      </select>

      <button
        type="button"
        class="w-9 border-l border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        :aria-label="`Open gauge options for string ${props.index + 1}`"
        @click="openGaugeSelect"
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
</template>
