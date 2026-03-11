<script setup>
import notesFrequencies from "@/data/notesFrequencies.js";

const props = defineProps({
  index: { type: Number, required: true },
  defaultNote: { type: String, required: true },
});

const emit = defineEmits(["update-note"]);

const notes = notesFrequencies;
const notesArray = Object.keys(notes);

function updateNote(note) {
  emit("update-note", { note });
}

function incrementNote() {
  const currentIndex = notesArray.indexOf(props.defaultNote);
  const newIndex = (currentIndex + 1) % notesArray.length;
  updateNote(notesArray[newIndex]);
}

function decrementNote() {
  const currentIndex = notesArray.indexOf(props.defaultNote);
  const newIndex = (currentIndex - 1 + notesArray.length) % notesArray.length;
  updateNote(notesArray[newIndex]);
}
</script>

<template>
  <div
    class="note-selector w-full relative flex flex-col-reverse justify-center"
  >
    <button class="bg-gray-200 py-1" @click="decrementNote">Decrement</button>
    <select
      class="bg-white block appearance-none text-center w-full py-1 border rounded-lg [text-align-last:center] hover:cursor-pointer"
      :id="'note' + props.index"
      :value="props.defaultNote"
      @change="updateNote($event.target.value)"
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
