<template>
  <div class="note-selector w-full flex flex-col-reverse justify-center">
    <button class="bg-gray-200 py-1" @click="decrementNote">Decrement</button>
    <select
      class="py-1 border rounded-lg"
      :id="'note' + index"
      v-model="selectedNote"
      @change="updateNote"
    >
      <option
        class="text-center"
        v-for="(freq, note) in notes"
        :key="note"
        :value="note"
      >
        {{ note }}
      </option>
    </select>
    <button class="bg-gray-200 py-1" @click="incrementNote">Increment</button>
  </div>
</template>

<script>
import notesFrequencies from "@/utils/notesFrequencies.js";

export default {
  name: "NoteSelector",
  props: {
    index: {
      type: Number,
      required: true,
    },
    defaultNote: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedNote: this.defaultNote,
      notes: notesFrequencies,
    };
  },
  methods: {
    updateNote() {
      this.$emit("update-note", { index: this.index, note: this.selectedNote });
    },
    incrementNote() {
      const notesArray = Object.keys(this.notes);
      const currentIndex = notesArray.indexOf(this.selectedNote);
      const newIndex = (currentIndex + 1) % notesArray.length;
      this.selectedNote = notesArray[newIndex];
      this.updateNote();
    },
    decrementNote() {
      const notesArray = Object.keys(this.notes);
      const currentIndex = notesArray.indexOf(this.selectedNote);
      const newIndex =
        (currentIndex - 1 + notesArray.length) % notesArray.length;
      this.selectedNote = notesArray[newIndex];
      this.updateNote();
    },
  },
  watch: {
    selectedNote() {
      this.$emit("update-note", {
        index: this.index,
        note: this.selectedNote,
      });
    },
  },
};
</script>
