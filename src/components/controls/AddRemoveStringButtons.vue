<script setup>
defineProps({
  canRemove: { type: Boolean, default: true },
});

const emit = defineEmits(["add-string", "remove-last-string"]);

function addString() {
  emit("add-string");
}

function removeLastString() {
  emit("remove-last-string");
}
</script>

<template>
  <div class="flex w-full sm:w-auto flex-col sm:flex-row gap-2 sm:gap-3">
    <button
      type="button"
      @click="addString"
      class="h-11 w-full sm:w-auto inline-flex items-center justify-center px-4 rounded-md bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)]"
    >
      Add String
    </button>
    <button
      type="button"
      @click="removeLastString"
      :disabled="!canRemove"
      class="h-11 w-full sm:w-auto inline-flex items-center justify-center px-4 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text)] font-medium hover:bg-[var(--color-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-surface)]"
    >
      Remove Last String
    </button>
  </div>
</template>
