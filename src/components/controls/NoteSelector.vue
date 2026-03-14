<script setup>
import { computed } from "vue";
import notesFrequencies from "@/data/notesFrequencies.js";

const props = defineProps({
  index: { type: Number, required: true },
  defaultNote: { type: String, required: true },
});

const emit = defineEmits(["update-note"]);

const notesArray = Object.keys(notesFrequencies);
const currentNote = computed(() =>
  notesArray.includes(props.defaultNote)
    ? props.defaultNote
    : (notesArray[0] ?? ""),
);

function emitNoteByIndex(index) {
  if (!notesArray.length) {
    return;
  }

  const normalizedIndex =
    ((index % notesArray.length) + notesArray.length) % notesArray.length;
  emit("update-note", { note: notesArray[normalizedIndex] });
}

function incrementNote() {
  const currentIndex = notesArray.indexOf(currentNote.value);
  emitNoteByIndex(currentIndex + 1);
}

function decrementNote() {
  const currentIndex = notesArray.indexOf(currentNote.value);
  emitNoteByIndex(currentIndex - 1);
}
</script>

<template>
  <div
    class="note-selector w-full flex items-center"
    role="group"
    :aria-label="'String ' + (props.index + 1) + ' note controls'"
  >
    <button
      type="button"
      class="h-10 w-10 rounded-l-md border border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] text-lg font-semibold leading-none text-[var(--color-text)] hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      :aria-label="'Lower note for string ' + (props.index + 1)"
      @click="decrementNote"
    >
      -
    </button>

    <output
      class="h-10 flex-1 border-y border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2 text-center text-base font-semibold text-[var(--color-text)] flex items-center justify-center"
      aria-live="polite"
    >
      {{ currentNote }}
    </output>

    <button
      type="button"
      class="h-10 w-10 rounded-r-md border border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] text-lg font-semibold leading-none text-[var(--color-text)] hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      :aria-label="'Raise note for string ' + (props.index + 1)"
      @click="incrementNote"
    >
      +
    </button>
  </div>
</template>
