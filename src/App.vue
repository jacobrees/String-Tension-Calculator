<template>
  <div id="app">
    <div v-for="(string, index) in strings" :key="string.id">
      <GuitarStringSelector
        :key="index"
        :index="index"
        :defaultNote="string.note"
        :defaultGauge="string.gauge"
        :scaleLength="scaleLength"
        @update-note="updateNote(index, $event)"
        @update-gauge="updateGauge(index, $event)"
      />
      <p v-if="string.tension !== null">
        Tension: {{ string.tension.toFixed(2) }} lbs
      </p>
    </div>
    <AddStringButton @add-string="addString" />
    <RemoveLastStringButton @remove-last-string="removeLastString" />
  </div>
</template>

<script>
import AddStringButton from "./components/AddStringButton.vue";
import GuitarStringSelector from "./components/GuitarStringSelector.vue";
import RemoveLastStringButton from "./components/RemoveLastStringButton.vue";
import stringMasses from "@/utils/stringMasses.js";
import notesFrequencies from "@/utils/notesFrequencies.js";

export default {
  name: "App",
  components: {
    GuitarStringSelector,
    AddStringButton,
    RemoveLastStringButton,
  },
  data() {
    return {
      scaleLength: 25.5, // Ensure accurate scale length
      plainGauges: Object.keys(stringMasses.plain),
      woundGauges: Object.keys(stringMasses.wound),
      strings: [
        {
          id: 1,
          label: "String 1",
          type: "plain",
          gauge: "0.010",
          note: "E4",
          tension: null,
        },
        {
          id: 2,
          label: "String 2",
          type: "plain",
          gauge: "0.013",
          note: "B3",
          tension: null,
        },
        {
          id: 3,
          label: "String 3",
          type: "plain",
          gauge: "0.017",
          note: "G3",
          tension: null,
        },
        {
          id: 4,
          label: "String 4",
          type: "wound",
          gauge: "0.026",
          note: "D3",
          tension: null,
        },
        {
          id: 5,
          label: "String 5",
          type: "wound",
          gauge: "0.036",
          note: "A2",
          tension: null,
        },
        {
          id: 6,
          label: "String 6",
          type: "wound",
          gauge: "0.046",
          note: "E2",
          tension: null,
        },
      ],
    };
  },
  methods: {
    updateNote(index, data) {
      this.strings[index].note = data.note;
      this.calculateTension(index);
    },

    updateGauge(index, data) {
      this.strings[index].gauge = data.gauge;
      this.strings[index].type = this.woundGauges.includes(data.gauge)
        ? "wound"
        : "plain";
      console.log(
        `Updated string ${index + 1} to ${this.strings[index].type} type`
      );
      this.calculateTension(index);
    },

    calculateTension(index) {
      const string = this.strings[index];
      const frequency = notesFrequencies[string.note];

      // Get the mass per unit length in lb/in
      let massPerLength;
      if (string.type === "plain") {
        massPerLength = stringMasses.plain[string.gauge]; // Mass is already in lb/in
      } else if (string.type === "wound") {
        massPerLength = stringMasses.wound[string.gauge]; // Mass is already in lb/in
      } else {
        throw new Error("Invalid string type");
      }

      // Convert mass per unit length from lb/in to kg/m
      const massPerLengthKgM = (massPerLength / 0.0254) * 0.453592;

      // Convert scale length to meters
      const scaleLengthMeters = this.scaleLength * 0.0254; // Ensure this conversion is correct

      // Log details for debugging
      console.log(`Calculating Tension for String ${index + 1}`);
      console.log(`Note: ${string.note}`);
      console.log(`Gauge: ${string.gauge}`);
      console.log(`Type: ${string.type}`);
      console.log(`Frequency: ${frequency} Hz`);
      console.log(`Mass per length: ${massPerLengthKgM} kg/m`);
      console.log(`Scale length: ${scaleLengthMeters} m`);

      // Calculate tension in Newtons using the formula T = μ * (2Lf)^2
      const tensionNewtons =
        massPerLengthKgM * Math.pow(2 * scaleLengthMeters * frequency, 2);

      // Convert Newtons to pounds
      const tensionPounds = tensionNewtons * 0.224809;

      // Log the calculated tension in pounds
      console.log(`Tension in Pounds: ${tensionPounds}`);

      // Set the calculated tension for the string
      this.strings[index].tension = tensionPounds;

      // Log the final tension
      console.log(`Final Tension: ${tensionPounds.toFixed(2)} lbs`);
    },

    addString() {
      const lastNote = this.strings[this.strings.length - 1].note;
      const newNote = this.getNoteBelow(lastNote, 5);
      this.strings.push({
        note: newNote,
        tension: null,
        gauge: "0.010", // Default gauge
        type: "plain", // Default to plain string
        label: `String ${this.strings.length + 1}`,
      });
      // Calculate tension for the new string
      this.calculateTension(this.strings.length - 1);
    },

    getNoteBelow(note, semitones) {
      const chromaticScale = [
        "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
      ];
      const noteParts = note.match(/([A-G][#b]?)([0-9])/);
      const noteName = noteParts[1];
      const octave = parseInt(noteParts[2]);

      const noteIndex = chromaticScale.indexOf(noteName);
      const newIndex = (noteIndex - semitones + 12) % 12;
      const newOctave = octave + Math.floor((noteIndex - semitones) / 12);

      return chromaticScale[newIndex] + newOctave;
    },

    removeLastString() {
      if (this.strings.length > 1) {
        this.strings.pop();
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
