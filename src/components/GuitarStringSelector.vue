<template>
  <div class="string-selector">
    <!-- Select the note for the string -->
    <label :for="'string' + index">String {{ index }} Note:</label>
    <select :id="'string' + index" v-model="selectedNote" @change="updateNote">
      <option v-for="(freq, note) in notes" :key="note" :value="note">
        {{ note }}
      </option>
    </select>

    <!-- Select the gauge for the string -->
    <label :for="'gauge' + index">String {{ index }} Gauge:</label>
    <select :id="'gauge' + index" v-model="selectedGauge" @change="updateGauge">
      <optgroup label="Plain">
        <option v-for="gauge in plainGauges" :key="gauge" :value="gauge">
          {{ gauge }}
        </option>
      </optgroup>
      <optgroup label="Wound">
        <option v-for="gauge in woundGauges" :key="gauge" :value="gauge">
          {{ gauge }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script>
import notesFrequencies from "@/utils/notesFrequencies.js";
import stringMasses from "@/utils/stringMasses.js";

export default {
  name: "GuitarStringSelector",
  props: {
    index: {
      type: Number,
      required: true,
    },
    defaultNote: {
      type: String,
      required: true,
    },
    scaleLength: {
      type: Number,
      required: true,
    },
    defaultGauge: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedNote: this.defaultNote,
      selectedGauge: this.defaultGauge,
      tension: null,
      notes: notesFrequencies,
      plainGauges: Object.keys(stringMasses.plain), // Plain string gauges
      woundGauges: Object.keys(stringMasses.wound), // Wound string gauges
    };
  },
  methods: {
    updateNote() {
      this.$emit("update-note", { index: this.index, note: this.selectedNote });
    },

    updateGauge() {
      this.$emit("update-gauge", {
        index: this.index,
        gauge: this.selectedGauge,
      });
    },
  },

  watch: {
    selectedNote() {
      this.$emit("update-note", {
        index: this.index,
        note: this.selectedNote,
      });
    },
    selectedGauge() {
      this.$emit("update-gauge", {
        index: this.index,
        gauge: this.selectedGauge,
      });
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
