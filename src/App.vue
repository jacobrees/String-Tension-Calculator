<template>
  <div id="app">
    <TopNavigation />
    <GuitarConfiguration
      v-model:lowScaleLength="lowScaleLength"
      v-model:highScaleLength="highScaleLength"
    />
    <div
      class="bg-white w-full max-w-[1200px] mx-auto rounded-lg border-solid border-2"
    >
      <div class="px-5 bg-gray-50">
        <h3 class="text-[22px] py-1">String Tension Analysis</h3>
        <p class="text-[14px] pb-2">Individual string tensions</p>
      </div>

      <table class="w-full table-auto border-t border-gray-300">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="border-r">String</th>
            <th class="border-r">Note</th>
            <th class="border-r">Gauge</th>
            <th class="border-r hidden lg:table-cell">Relative Scale Length</th>
            <th>Tension</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b"
            v-for="(string, index) in strings"
            :key="string.id"
          >
            <td class="border-r">
              <p class="w-full flex flex-row justify-center">
                {{ string.label }}
              </p>
            </td>
            <td class="border-r">
              <NoteSelector
                :index="index"
                :defaultNote="string.note"
                @update-note="updateNote(index, $event)"
              />
            </td>
            <td class="border-r">
              <GaugeSelector
                :index="index"
                :defaultGauge="string.gauge"
                @update-gauge="updateGauge(index, $event)"
              />
            </td>
            <td class="border-r">
              <p class="w-full flex flex-row justify-center">
                {{
                  typeof string.relativeScaleLength === "number"
                    ? string.relativeScaleLength.toFixed(2)
                    : "N/A"
                }}
              </p>
            </td>
            <td class="hidden lg:table-cell">
              <p class="w-full flex flex-row justify-center">
                {{
                  string.tension !== null ? string.tension.toFixed(2) : "N/A"
                }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="w-full max-w-[1200px] mx-auto mt-5 flex flex-row justify-center lg:block"
    >
      <AddStringButton @add-string="addString" />
      <RemoveLastStringButton @remove-last-string="removeLastString" />
    </div>
  </div>
</template>

<script>
import TopNavigation from "./components/TopNavigation.vue";
import GuitarConfiguration from "./components/GuitarConfiguration.vue";
import AddStringButton from "./components/AddStringButton.vue";
import NoteSelector from "./components/NoteSelector.vue";
import GaugeSelector from "./components/GaugeSelector.vue";
import RemoveLastStringButton from "./components/RemoveLastStringButton.vue";
import stringMasses from "@/utils/stringMasses.js";
import notesFrequencies from "@/utils/notesFrequencies.js";

export default {
  name: "App",
  components: {
    TopNavigation,
    GuitarConfiguration,
    NoteSelector,
    GaugeSelector,
    AddStringButton,
    RemoveLastStringButton,
  },

  data() {
    return {
      lowScaleLength: 25.5, // Default low scale length
      highScaleLength: 25.5, // Default high scale length
      gauges: Object.keys(stringMasses),
      strings: [
        {
          id: 1,
          label: "1",
          gauge: "0.010p",
          note: "E4",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 2,
          label: "2",
          gauge: "0.013p",
          note: "B3",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 3,
          label: "3",
          gauge: "0.017p",
          note: "G3",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 4,
          label: "4",
          gauge: "0.026w",
          note: "D3",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 5,
          label: "5",
          gauge: "0.036w",
          note: "A2",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
        {
          id: 6,
          label: "6",
          gauge: "0.046w",
          note: "E2",
          tension: null,
          relativeScaleLength: null, // Default relative scale length
        },
      ],
    };
  },
  watch: {
    lowScaleLength() {
      this.calculateRelativeScaleLengths();
    },
    highScaleLength() {
      this.calculateRelativeScaleLengths();
    },
  },
  methods: {
    handleScaleUpdate({ low, high }) {
      this.lowScaleLength = low;
      this.highScaleLength = high;
      this.calculateRelativeScaleLengths();
    },

    updateNote(index, data) {
      this.strings[index].note = data.note;
      this.calculateTension(index);
    },

    updateGauge(index, data) {
      this.strings[index].gauge = data.gauge;
      this.calculateTension(index);
    },

    calculateTension(index) {
      const string = this.strings[index];
      const frequency = notesFrequencies[string.note];

      // Get the mass per unit length in lb/in
      let massPerLength = stringMasses[string.gauge];

      // Convert mass per unit length from lb/in to kg/m
      const massPerLengthKgM = (massPerLength / 0.0254) * 0.453592;

      // Convert scale length to meters
      const scaleLengthMeters = string.relativeScaleLength * 0.0254; // Ensure this conversion is correct

      // Calculate tension in Newtons using the formula T = μ * (2Lf)^2
      const tensionNewtons =
        massPerLengthKgM * Math.pow(2 * scaleLengthMeters * frequency, 2);

      // Convert Newtons to pounds
      const tensionPounds = tensionNewtons * 0.224809;

      // Set the calculated tension for the string
      this.strings[index].tension = tensionPounds;
    },

    addString() {
      const lastNote = this.strings[this.strings.length - 1].note;
      const newNote = this.getNoteBelow(lastNote, 5);
      this.strings.push({
        note: newNote,
        tension: null,
        gauge: "0.010", // Default gauge
        type: "plain", // Default to plain string
        label: `${this.strings.length + 1}`,
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
      const totalScaleLength = this.lowScaleLength - this.highScaleLength;
      this.strings.forEach((string, index) => {
        const position = index; // Start from 0
        string.relativeScaleLength =
          this.highScaleLength +
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
