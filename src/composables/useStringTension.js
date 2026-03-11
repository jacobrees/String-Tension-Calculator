import { onMounted, reactive, ref, watch } from "vue";
import instrumentPresets from "@/data/instrumentPresets.js";
import notesFrequencies from "@/data/notesFrequencies.js";
import stringMasses from "@/data/stringMasses.js";

function clonePresetStrings(strings) {
  return strings.map((string) => ({ ...string }));
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
  const newOctave =
    parseInt(octave, 10) + Math.floor((noteIndex - semitones) / 12);
  return chromaticScale[newIndex] + newOctave;
}

export function useStringTension() {
  const instrumentType = ref("guitar");
  const lowScaleLength = ref(instrumentPresets.guitar.lowScaleLength);
  const highScaleLength = ref(instrumentPresets.guitar.highScaleLength);
  const gauges = ref(Object.keys(stringMasses.guitar));
  const strings = reactive([]);

  function calculateTension(index) {
    const string = strings[index];
    if (!string) {
      return;
    }

    const frequency = notesFrequencies[string.note];
    const massPerLength = stringMasses[instrumentType.value][string.gauge];
    const relativeScaleLength = Number(string.relativeScaleLength);

    if (
      !massPerLength ||
      !frequency ||
      !Number.isFinite(relativeScaleLength) ||
      relativeScaleLength <= 0
    ) {
      string.tension = null;
      return;
    }

    const massPerLengthKgM = (massPerLength / 0.0254) * 0.453592;
    const scaleLengthMeters = relativeScaleLength * 0.0254;
    const tensionNewtons =
      massPerLengthKgM * Math.pow(2 * scaleLengthMeters * frequency, 2);
    string.tension = tensionNewtons * 0.224809;
  }

  function calculateRelativeScaleLengths() {
    if (!strings.length) {
      return;
    }

    const low = Number(lowScaleLength.value);
    const high = Number(highScaleLength.value);

    if (
      !Number.isFinite(low) ||
      !Number.isFinite(high) ||
      low <= 0 ||
      high <= 0
    ) {
      strings.forEach((string) => {
        string.relativeScaleLength = null;
        string.tension = null;
      });
      return;
    }

    if (strings.length === 1) {
      strings[0].relativeScaleLength = high;
      calculateTension(0);
      return;
    }

    const totalScaleLength = low - high;
    strings.forEach((string, index) => {
      const relativeScaleLength =
        high + totalScaleLength * (index / (strings.length - 1));
      string.relativeScaleLength = Number.isFinite(relativeScaleLength)
        ? relativeScaleLength
        : null;
      calculateTension(index);
    });
  }

  function applyInstrumentPreset(type) {
    const preset = instrumentPresets[type];
    if (!preset) {
      return;
    }

    lowScaleLength.value = preset.lowScaleLength;
    highScaleLength.value = preset.highScaleLength;
    strings.splice(0, strings.length, ...clonePresetStrings(preset.strings));
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
    if (strings.length > 1) {
      strings.pop();
    }
    calculateRelativeScaleLengths();
  }

  watch([lowScaleLength, highScaleLength], calculateRelativeScaleLengths);
  watch(instrumentType, (newType) => {
    gauges.value = Object.keys(stringMasses[newType]);
    applyInstrumentPreset(newType);
  });

  onMounted(() => {
    applyInstrumentPreset(instrumentType.value);
  });

  return {
    gauges,
    highScaleLength,
    instrumentType,
    lowScaleLength,
    strings,
    addString,
    removeLastString,
    updateGauge,
    updateNote,
  };
}
