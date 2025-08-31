<template>
  <div class="gauge-selector w-full relative flex flex-row justify-center">
    <!-- Select the gauge for the string -->
    <select
      class="bg-white block appearance-none text-center w-full py-1 border rounded-lg [text-align-last:center]"
      :id="'gauge' + index"
      v-model="selectedGauge"
      @change="updateGauge"
    >
      <option v-for="gauge in gauges" :key="gauge" :value="gauge">
        {{ gauge }}
      </option>
    </select>
    <span
      class="pointer-events-none text-[12px] absolute inset-y-0 right-1 flex items-center text-gray-500"
    >
      ▼
    </span>
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
      gauges: Object.keys(stringMasses), // Wound string gauges
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