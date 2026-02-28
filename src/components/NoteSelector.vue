<script setup>
import { ref, watch } from "vue";
import notesFrequencies from "@/utils/notesFrequencies.js";

const props = defineProps({
  index: { type: Number, required: true },
  defaultNote: { type: String, required: true },
});

const emit = defineEmits(["update-note"]);

const selectedNote = ref(props.defaultNote);
const notes = notesFrequencies;

function updateNote() {
  emit("update-note", { index: props.index, note: selectedNote.value });
}

function incrementNote() {
  const notesArray = Object.keys(notes);
  const currentIndex = notesArray.indexOf(selectedNote.value);
  const newIndex = (currentIndex + 1) % notesArray.length;
  selectedNote.value = notesArray[newIndex];
  updateNote();
}

function decrementNote() {
  const notesArray = Object.keys(notes);
  const currentIndex = notesArray.indexOf(selectedNote.value);
  const newIndex = (currentIndex - 1 + notesArray.length) % notesArray.length;
  selectedNote.value = notesArray[newIndex];
  updateNote();
}

watch(selectedNote, () => {
  updateNote();
});

watch(
  () => props.defaultNote,
  (newVal) => {
    selectedNote.value = newVal;
  },
);
</script>

<template>
  <div
    class="note-selector w-full relative flex flex-col-reverse justify-center"
  >
    <button class="bg-gray-200 py-1" @click="decrementNote">Decrement</button>
    <select
      class="bg-white block appearance-none text-center w-full py-1 border rounded-lg [text-align-last:center] hover:cursor-pointer"
      :id="'note' + props.index"
      v-model="selectedNote"
      @change="updateNote"
    >
      <option v-for="(freq, note) in notes" :key="note" :value="note">
        {{ note }}
      </option>
    </select>
    <span
      class="pointer-events-none text-[12px] absolute inset-y-0 right-1 flex items-center text-gray-500"
    >
      ▼
    </span>
    <button class="bg-gray-200 py-1" @click="incrementNote">Increment</button>
  </div>
</template>
