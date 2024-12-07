<template>
    <div class="note-selector">
      <!-- Select the note for the string -->
      <label :for="'note' + index">String {{ index }} Note:</label>
      <select :id="'note' + index" v-model="selectedNote" @change="updateNote">
        <option v-for="(freq, note) in notes" :key="note" :value="note">
          {{ note }}
        </option>
      </select>
      <!-- Arrow keys for navigation -->
      <button @click="decrementNote">⬇️</button>
      <button @click="incrementNote">⬆️</button>
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
        const newIndex = (currentIndex - 1 + notesArray.length) % notesArray.length;
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
  
  <style scoped>
  /* Add your styles here */
  </style>
  