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
          gauge: ".010",
          note: "E4",
          tension: null,
        },
        {
          id: 2,
          label: "String 2",
          type: "plain",
          gauge: ".013",
          note: "B3",
          tension: null,
        },
        {
          id: 3,
          label: "String 3",
          type: "plain",
          gauge: ".017",
          note: "G3",
          tension: null,
        },
        {
          id: 4,
          label: "String 4",
          type: "wound",
          gauge: ".026",
          note: "D3",
          tension: null,
        },
        {
          id: 5,
          label: "String 5",
          type: "wound",
          gauge: ".036",
          note: "A2",
          tension: null,
        },
        {
          id: 6,
          label: "String 6",
          type: "wound",
          gauge: ".046",
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

      // Log details for debugging
      console.log(`Calculating Tension for String ${index + 1}`);
      console.log(`Note: ${string.note}`);
      console.log(`Gauge: ${string.gauge}`);
      console.log(`Type: ${string.type}`);
      console.log(`Frequency: ${frequency} Hz`);

      // Get the mass per unit length in kg/m
      let massPerLength;
      if (string.type === "plain") {
        massPerLength = stringMasses.plain[string.gauge] / 1000; // Convert g/m to kg/m
      } else if (string.type === "wound") {
        massPerLength = stringMasses.wound[string.gauge] / 1000; // Convert g/m to kg/m
      } else {
        throw new Error("Invalid string type");
      }

      console.log(`Mass per length: ${massPerLength} kg/m`);

      // Convert scale length to meters
      const scaleLengthMeters = this.scaleLength * 0.0254; // Ensure this conversion is correct
      console.log(`Scale length: ${scaleLengthMeters} m`);

      // Calculate tension in Newtons using the formula T = μ * (2Lf)^2
      const tensionNewtons =
        massPerLength * Math.pow(2 * scaleLengthMeters * frequency, 2);

      console.log(`Tension in Newtons: ${tensionNewtons}`);

      // Convert Newtons to pounds
      const tensionPounds = tensionNewtons * 0.224809;

      console.log(`Tension in Pounds: ${tensionPounds}`);

      // Set the calculated tension for the string
      this.strings[index].tension = tensionPounds;

      console.log(`Final Tension: ${tensionPounds.toFixed(2)} lbs`);
    },
    addString() {
      // ... existing code ...
      this.strings.push({
        note: newNote,
        tension: null,
        gauge: ".010", // Default gauge
        type: "plain", // Default to plain string
        label: `String ${this.strings.length + 1}`,
      });
      // Calculate tension for the new string
      this.calculateTension(this.strings.length - 1);
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
