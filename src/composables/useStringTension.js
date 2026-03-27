import { onMounted, reactive, ref, watch } from "vue";
import instrumentPresets from "@/data/instrumentPresets.js";
import notesFrequencies from "@/data/notesFrequencies.js";
import stringMasses from "@/data/stringMasses.js";

function clonePresetStrings(strings) {
  return strings.map((string) => ({ ...string }));
}

function parseGaugeValue(gauge) {
  if (typeof gauge !== "string") {
    return null;
  }

  const parsedValue = Number.parseFloat(gauge);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function findClosestGauge(currentGauge, nextGaugeOptions) {
  const currentGaugeValue = parseGaugeValue(currentGauge);
  if (currentGaugeValue === null || !nextGaugeOptions.length) {
    return nextGaugeOptions[0] ?? null;
  }

  return nextGaugeOptions.reduce((closestGauge, candidateGauge) => {
    const closestGaugeValue = parseGaugeValue(closestGauge);
    const candidateGaugeValue = parseGaugeValue(candidateGauge);

    if (candidateGaugeValue === null) {
      return closestGauge;
    }

    if (closestGaugeValue === null) {
      return candidateGauge;
    }

    const closestDifference = Math.abs(closestGaugeValue - currentGaugeValue);
    const candidateDifference = Math.abs(
      candidateGaugeValue - currentGaugeValue,
    );

    return candidateDifference < closestDifference
      ? candidateGauge
      : closestGauge;
  }, nextGaugeOptions[0]);
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
  if (typeof note !== "string") {
    return null;
  }

  const match = note.match(/^([A-G][#b]?)(-?\d+)$/);
  if (!match) {
    return null;
  }

  const [, noteName, octave] = match;
  const noteIndex = chromaticScale.indexOf(noteName);
  if (noteIndex < 0) {
    return null;
  }

  const newIndex = (noteIndex - semitones + 12) % 12;
  const newOctave =
    parseInt(octave, 10) + Math.floor((noteIndex - semitones) / 12);
  return chromaticScale[newIndex] + newOctave;
}

export function useStringTension() {
  const instrumentType = ref("guitar");
  const lowScaleLength = ref(instrumentPresets.guitar.lowScaleLength);
  const highScaleLength = ref(instrumentPresets.guitar.highScaleLength);
  const strings = reactive([]);

  function canSelectStringType() {
    return instrumentType.value === "guitar";
  }

  function getResolvedStringType(index) {
    if (instrumentType.value !== "guitar") {
      return "bass";
    }

    if (!canSelectStringType(index)) {
      return "guitar";
    }

    return strings[index]?.stringType === "bass" ? "bass" : "guitar";
  }

  function getGaugeOptions(index) {
    return Object.keys(stringMasses[getResolvedStringType(index)] ?? {});
  }

  function normalizeString(index) {
    const string = strings[index];
    if (!string) {
      return;
    }

    string.stringType = getResolvedStringType(index);
  }

  function syncGaugeWithStringType(index) {
    const string = strings[index];
    if (!string) {
      return;
    }

    const nextGaugeOptions = getGaugeOptions(index);
    if (!nextGaugeOptions.length) {
      string.gauge = null;
      string.tension = null;
      return;
    }

    if (string.gauge !== null && !nextGaugeOptions.includes(string.gauge)) {
      string.gauge = findClosestGauge(string.gauge, nextGaugeOptions);
    }
  }

  function calculateTension(index) {
    const string = strings[index];
    if (!string) {
      return;
    }

    const frequency = notesFrequencies[string.note];
    const massPerLength =
      stringMasses[getResolvedStringType(index)]?.[string.gauge];
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
    strings.forEach((_, index) => {
      normalizeString(index);
      syncGaugeWithStringType(index);
    });
    calculateRelativeScaleLengths();
  }

  function updateNote(index, data) {
    const string = strings[index];
    if (!string) {
      return;
    }

    string.note = data.note;
    calculateTension(index);
  }

  function updateGauge(index, data) {
    const string = strings[index];
    if (!string) {
      return;
    }

    string.gauge = data.gauge;
    calculateTension(index);
  }

  function updateStringType(index, data) {
    const string = strings[index];
    if (!string || !canSelectStringType(index)) {
      return;
    }

    string.stringType = data.stringType === "bass" ? "bass" : "guitar";
    syncGaugeWithStringType(index);
    calculateTension(index);
  }

  function addString() {
    const lastString = strings[strings.length - 1];
    const presetStrings =
      instrumentPresets[instrumentType.value]?.strings ?? [];
    const fallbackPresetNote =
      presetStrings[presetStrings.length - 1]?.note ?? "E2";
    const baseNote = lastString?.note ?? fallbackPresetNote;
    const newNote = getNoteBelow(baseNote, 5) ?? baseNote;

    strings.push({
      id: strings.length + 1,
      label: `${strings.length + 1}`,
      gauge: null,
      note: newNote,
      stringType: instrumentType.value === "bass" ? "bass" : "guitar",
      tension: null,
      relativeScaleLength: null,
    });
    normalizeString(strings.length - 1);
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
    applyInstrumentPreset(newType);
  });

  onMounted(() => {
    applyInstrumentPreset(instrumentType.value);
  });

  return {
    highScaleLength,
    instrumentType,
    lowScaleLength,
    strings,
    addString,
    canSelectStringType,
    getGaugeOptions,
    removeLastString,
    updateGauge,
    updateNote,
    updateStringType,
  };
}
