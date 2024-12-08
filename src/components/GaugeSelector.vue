<template>
  <div class="gauge-selector">
    <!-- Select the gauge for the string -->
    <label :for="'gauge' + index">String {{ index + 1 }} Gauge:</label>
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
import stringMasses from "@/utils/stringMasses.js";

export default {
  name: "GaugeSelector",
  props: {
    index: {
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
      selectedGauge: this.defaultGauge,
      plainGauges: Object.keys(stringMasses.plain), // Plain string gauges
      woundGauges: Object.keys(stringMasses.wound), // Wound string gauges
    };
  },
  methods: {
    updateGauge() {
      this.$emit("update-gauge", {
        index: this.index,
        gauge: this.selectedGauge,
      });
    },
  },
  watch: {
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
