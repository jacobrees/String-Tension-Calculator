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
        <p class="text-[14px] pb-2">Individual string tensions in lb</p>
      </div>

      <table class="w-full table-auto border-t border-gray-300">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="border-r">String</th>
            <th class="border-r">Note</th>
            <th class="border-r">Gauge</th>
            <th class="border-r hidden lg:table-cell">Scale Length</th>
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
            <td class="border-r hidden lg:table-cell">
              <p class="w-full flex flex-row justify-center">
                {{
                  typeof string.relativeScaleLength === "number"
                    ? string.relativeScaleLength.toFixed(2)
                    : "N/A"
                }}
              </p>
            </td>
            <td>
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
      class="w-full max-w-[1200px] mx-auto my-5 flex flex-row justify-center lg:block"
    >
      <AddRemoveStringButtons
        @add-string="addString"
        @remove-last-string="removeLastString"
      />
    </div>
  </div>
</template>

<script>
import TopNavigation from "./components/TopNavigation.vue";
import GuitarConfiguration from "./components/GuitarConfiguration.vue";
import AddRemoveStringButtons from "./components/AddRemoveStringButtons.vue";
import NoteSelector from "./components/NoteSelector.vue";
import GaugeSelector from "./components/GaugeSelector.vue";
import stringMasses from "@/utils/stringMasses.js";
import notesFrequencies from "@/utils/notesFrequencies.js";

export default {
  name: "App",
  components: {
    TopNavigation,
    GuitarConfiguration,
    NoteSelector,
    GaugeSelector,
    AddRemoveStringButtons,
  },

  data() {
    return {
      lowScaleLength: 25.5,
      highScaleLength: 25.5,
      gauges: Object.keys(stringMasses),
      strings: [
        {
          id: 1,
          label: "1",
          gauge: "0.010p",
          note: "E4",
          tension: null,
          relativeScaleLength: null,
        },
        {
          id: 2,
          label: "2",
          gauge: "0.013p",
          note: "B3",
          tension: null,
          relativeScaleLength: null,
        },
        {
          id: 3,
          label: "3",
          gauge: "0.017p",
          note: "G3",
          tension: null,
          relativeScaleLength: null,
        },
        {
          id: 4,
          label: "4",
          gauge: "0.026w",
          note: "D3",
          tension: null,
          relativeScaleLength: null,
        },
        {
          id: 5,
          label: "5",
          gauge: "0.036w",
          note: "A2",
          tension: null,
          relativeScaleLength: null,
        },
        {
          id: 6,
          label: "6",
          gauge: "0.046w",
          note: "E2",
          tension: null,
          relativeScaleLength: null,
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
      let massPerLength = stringMasses[string.gauge];
      const massPerLengthKgM = (massPerLength / 0.0254) * 0.453592;
      const scaleLengthMeters = string.relativeScaleLength * 0.0254;
      const tensionNewtons =
        massPerLengthKgM * Math.pow(2 * scaleLengthMeters * frequency, 2);
      const tensionPounds = tensionNewtons * 0.224809;
      this.strings[index].tension = tensionPounds;
    },

    addString() {
      const lastNote = this.strings[this.strings.length - 1].note;
      const newNote = this.getNoteBelow(lastNote, 5);
      this.strings.push({
        note: newNote,
        tension: null,
        gauge: "0.010",
        type: "plain",
        label: `${this.strings.length + 1}`,
        relativeScaleLength: null,
      });
      this.calculateTension(this.strings.length - 1);
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
    this.strings.forEach((string, index) => {
      this.calculateTension(index);
    });

    this.calculateRelativeScaleLengths();
  },
};
</script>
