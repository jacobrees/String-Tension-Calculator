<script setup>
import { ref } from "vue";

const props = defineProps({
  idPrefix: { type: String, required: false, default: "stringType" },
  index: { type: Number, required: true },
  defaultStringType: { type: String, required: false, default: "guitar" },
});

const emit = defineEmits(["update-string-type"]);
const stringTypeSelect = ref(null);

function openStringTypeSelect() {
  if (!stringTypeSelect.value) {
    return;
  }

  if (typeof stringTypeSelect.value.showPicker === "function") {
    stringTypeSelect.value.showPicker();
    return;
  }

  stringTypeSelect.value.focus();
  stringTypeSelect.value.click();
}
</script>

<template>
  <div class="string-type-selector w-full">
    <label class="sr-only" :for="`${props.idPrefix}${props.index}`">
      String {{ props.index + 1 }} type
    </label>
    <div
      class="h-10 w-full flex items-stretch rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:border-[var(--color-accent)]"
    >
      <select
        ref="stringTypeSelect"
        class="h-full flex-1 appearance-none bg-transparent px-2 text-center text-base font-semibold text-[var(--color-text)] [text-align-last:center] hover:cursor-pointer focus-visible:outline-none"
        :id="`${props.idPrefix}${props.index}`"
        :name="`${props.idPrefix}${props.index}`"
        :value="props.defaultStringType"
        @change="
          emit('update-string-type', { stringType: $event.target.value })
        "
      >
        <option value="guitar">Guitar</option>
        <option value="bass">Bass</option>
      </select>

      <button
        type="button"
        class="w-9 border-l border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        :aria-label="`Open string type options for string ${props.index + 1}`"
        @click="openStringTypeSelect"
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
