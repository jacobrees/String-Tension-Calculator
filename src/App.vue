<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import TopNavigation from "./components/TopNavigation.vue";
import GuitarConfiguration from "./components/GuitarConfiguration.vue";
import AddRemoveStringButtons from "./components/AddRemoveStringButtons.vue";
import NoteSelector from "./components/NoteSelector.vue";
import GaugeSelector from "./components/GaugeSelector.vue";
import FooterSection from "./components/Footer.vue";
import stringMasses from "@/utils/stringMasses.js";
import notesFrequencies from "@/utils/notesFrequencies.js";

const lowScaleLength = ref(25.5);
const highScaleLength = ref(25.5);
const instrumentType = ref("guitar");
const gauges = ref(Object.keys(stringMasses.guitar));
const strings = reactive([]);

watch([lowScaleLength, highScaleLength], calculateRelativeScaleLengths);
watch(instrumentType, (newType) => {
  gauges.value = Object.keys(stringMasses[newType]);
  setDefaultStrings();
});

function setDefaultStrings() {
  if (instrumentType.value === "guitar") {
    lowScaleLength.value = 25.5;
    highScaleLength.value = 25.5;

    strings.splice(
      0,
      strings.length,
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
      }
    );
  } else {
    lowScaleLength.value = 34.0;
    highScaleLength.value = 34.0;

    strings.splice(
      0,
      strings.length,
      {
        id: 1,
        label: "1",
        gauge: "0.045w",
        note: "G2",
        tension: null,
        relativeScaleLength: null,
      },
      {
        id: 2,
        label: "2",
        gauge: "0.060w",
        note: "D2",
        tension: null,
        relativeScaleLength: null,
      },
      {
        id: 3,
        label: "3",
        gauge: "0.080w",
        note: "A1",
        tension: null,
        relativeScaleLength: null,
      },
      {
        id: 4,
        label: "4",
        gauge: "0.105w",
        note: "E1",
        tension: null,
        relativeScaleLength: null,
      }
    );
  }
  calculateRelativeScaleLengths();
}

function updateNote(index, data) {
  strings[index].note = data.note;
  calculateTension(index);
}

function updateGauge(index, data) {
  strings[index].gauge = data.gauge;
  calculateTension(index);
}

function calculateTension(index) {
  const string = strings[index];
  const frequency = notesFrequencies[string.note];
  const massPerLength = stringMasses[instrumentType.value][string.gauge];

  if (!massPerLength || string.relativeScaleLength == null) {
    string.tension = null;
    return;
  }

  const massPerLengthKgM = (massPerLength / 0.0254) * 0.453592;
  const scaleLengthMeters = string.relativeScaleLength * 0.0254;
  const tensionNewtons =
    massPerLengthKgM * Math.pow(2 * scaleLengthMeters * frequency, 2);
  string.tension = tensionNewtons * 0.224809; // Convert N to lb
}

function addString() {
  const lastNote = strings[strings.length - 1].note;
  const newNote = getNoteBelow(lastNote, 5);
  strings.push({
    id: strings.length + 1,
    label: `${strings.length + 1}`,
    gauge: null,
    note: newNote,
    tension: null,
    relativeScaleLength: null,
  });
  calculateRelativeScaleLengths();
}

function removeLastString() {
  if (strings.length > 1) strings.pop();
  calculateRelativeScaleLengths();
}

function getNoteBelow(note, semitones) {
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
  const [noteName, octave] = note.match(/([A-G][#b]?)([0-9])/).slice(1, 3);
  const noteIndex = chromaticScale.indexOf(noteName);
  const newIndex = (noteIndex - semitones + 12) % 12;
  const newOctave = parseInt(octave) + Math.floor((noteIndex - semitones) / 12);
  return chromaticScale[newIndex] + newOctave;
}

function calculateRelativeScaleLengths() {
  const totalScaleLength = lowScaleLength.value - highScaleLength.value;
  strings.forEach((string, index) => {
    string.relativeScaleLength =
      highScaleLength.value + totalScaleLength * (index / (strings.length - 1));
    calculateTension(index);
  });
}

onMounted(() => {
  setDefaultStrings();
});
</script>

<template>
  <div id="app">
    <TopNavigation />
    <GuitarConfiguration
      v-model:lowScaleLength="lowScaleLength"
      v-model:highScaleLength="highScaleLength"
      v-model:instrumentType="instrumentType"
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
            v-for="(string, index) in strings"
            :key="string.id"
            class="border-b"
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
                :gauges="gauges"
                @update-gauge="updateGauge(index, $event)"
              />
            </td>
            <td
              class="border-r hidden lg:table-cell text-center justify-center"
            >
              {{
                typeof string.relativeScaleLength === "number"
                  ? string.relativeScaleLength.toFixed(2)
                  : "N/A"
              }}
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
  <FooterSection />
</template>
