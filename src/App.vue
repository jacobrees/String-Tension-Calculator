<template>
  <div id="app">
    <div>
      <label for="lowScaleLength">Low Scale Length (inches):</label>
      <input
        type="number"
        id="lowScaleLength"
        v-model="lowScaleLength"
        @input="calculateRelativeScaleLengths"
      />
    </div>
    <div>
      <label for="highScaleLength">High Scale Length (inches):</label>
      <input
        type="number"
        id="highScaleLength"
        v-model="highScaleLength"
        @input="calculateRelativeScaleLengths"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th>String</th>
          <th>Note</th>
          <th>Gauge</th>
          <th>Relative Scale Length</th>
          <th>Tension (lbs)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(string, index) in strings" :key="string.id">
          <td>{{ string.label }}</td>
          <td>
            <NoteSelector
              :index="index"
              :defaultNote="string.note"
              @update-note="updateNote(index, $event)"
            />
          </td>
          <td>
            <GaugeSelector
              :index="index"
              :defaultGauge="string.gauge"
              @update-gauge="updateGauge(index, $event)"
            />
          </td>
          <td>
            {{
              string.relativeScaleLength !== null
                ? string.relativeScaleLength.toFixed(2)
                : "N/A"
            }}
          </td>
          <td>
            {{ string.tension !== null ? string.tension.toFixed(2) : "N/A" }}
          </td>
        </tr>
      </tbody>
    </table>
    <AddStringButton @add-string="addString" />
    <RemoveLastStringButton @remove-last-string="removeLastString" />
  </div>
</template>

<script>
import AddStringButton from "./components/AddStringButton.vue";
import NoteSelector from "./components/NoteSelector.vue";
import GaugeSelector from "./components/GaugeSelector.vue";
import RemoveLastStringButton from "./components/RemoveLastStringButton.vue";
import stringMasses from "@/utils/stringMasses.js";
import notesFrequencies from "@/utils/notesFrequencies.js";

export default {
  name: "App",
  components: {
    NoteSelector,
    GaugeSelector,
    AddStringButton,
    RemoveLastStringButton,
  },
  data() {
    return {
      lowScaleLength: 25.5, // Default low scale length
      highScaleLength: 25.5, // Default high scale length
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
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 2,
          label: "String 2",
          type: "plain",
          gauge: "0.013",
          note: "B3",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 3,
          label: "String 3",
          type: "plain",
          gauge: "0.017",
          note: "G3",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 4,
          label: "String 4",
          type: "wound",
          gauge: "0.026",
          note: "D3",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 5,
          label: "String 5",
          type: "wound",
          gauge: "0.036",
          note: "A2",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 6,
          label: "String 6",
          type: "wound",
          gauge: "0.046",
          note: "E2",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
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
      const scaleLengthMeters = string.relativeScaleLength * 0.0254; // Ensure this conversion is correct

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
        relativeScaleLength: null, // Default relative scale length
      });
      // Calculate tension for the new string
      this.calculateTension(this.strings.length - 1);
      // Recalculate relative scale lengths
      this.calculateRelativeScaleLengths();
    },

    getNoteBelow(note, semitones) {
      const chromaticScale = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
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
      // Recalculate relative scale lengths
      this.calculateRelativeScaleLengths();
    },

    calculateRelativeScaleLengths() {
      const totalScaleLength = this.highScaleLength - this.lowScaleLength;
      this.strings.forEach((string, index) => {
        const position = index; // Start from 0
        string.relativeScaleLength =
          this.lowScaleLength +
          totalScaleLength * (position / (this.strings.length - 1));
        this.calculateTension(index);
      });
    },
  },
  mounted() {
    // Calculate tension for all strings on app start
    this.strings.forEach((string, index) => {
      this.calculateTension(index);
    });
    // Calculate relative scale lengths on app start
    this.calculateRelativeScaleLengths();
  },
};
</script>

<style scoped>
/* Add your styles here */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
