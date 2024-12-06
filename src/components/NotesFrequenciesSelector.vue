<template>
  <div class="string-selector">
    <label :for="'string' + index">String {{ index + 1 }} Note:</label>
    <select :id="'string' + index" v-model="selectedNote">
      <option v-for="(freq, note) in notes" :key="note" :value="note">
        {{ note }}
      </option>
    </select>
    <p>Selected Frequency: {{ notes[selectedNote] }} Hz</p>
  </div>
</template>

<script>
export default {
  name: "NotesFrequenciesSelector",
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedNote: null, // Initialize selected note to null
      notes: {
        "A#0": 29.14,
        B0: 30.87,
        "C#1": 34.65,
        "D#1": 38.89,
        E1: 41.2,
        "F#1": 46.25,
        "G#1": 51.91,
        "A#1": 58.27,
        B1: 61.74,
        "C#2": 69.3,
        "D#2": 77.78,
        E2: 82.41,
        "F#2": 92.5,
        "G#2": 103.83,
        "A#2": 116.54,
        B2: 123.47,
        "C#3": 138.59,
        "D#3": 155.56,
        E3: 164.81,
        "F#3": 185.0,
        "G#3": 207.65,
        "A#3": 233.08,
        B3: 246.94,
        "C#4": 277.18,
        "D#4": 311.13,
        E4: 329.63,
        "F#4": 369.99,
        "G#4": 415.3,
        "A#4": 466.16,
        B4: 493.88,
        "C#5": 554.37,
        "D#5": 622.25,
        E5: 659.26,
        "F#5": 740.0,
        "G#5": 830.61,
      },
    };
  },
};
</script>

<style scoped>
/* Add styles for string-selector here */
</style>
