<template>
  <div class="string-selector">
    <label :for="'string' + index">String {{ index }} Note:</label>
    <select :id="'string' + index" v-model="selectedNote" @change="updateNote">
      <option v-for="(freq, note) in notes" :key="note" :value="note">
        {{ note }}
      </option>
    </select>
    <p>
      Selected Frequency:
      {{ notes[selectedNote] ? notes[selectedNote] : "Frequency not found" }} Hz
    </p>
  </div>
</template>

<script>
import notesFrequencies from "@/utils/notesFrequencies.js";

export default {
  name: "NotesFrequenciesSelector",
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
      selectedNote: this.defaultNote || "E4",
      notes: notesFrequencies,
    };
  },
  methods: {
    updateNote() {
      // Emit the updated selected note to the parent component
      this.$emit("update-note", { index: this.index, note: this.selectedNote });
    },
  },
};
</script>

<style scoped>
/* Add styles for string-selector here */
</style>
