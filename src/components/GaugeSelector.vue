<template>
  <div class="gauge-selector w-full relative flex justify-center">
    <select
      class="bg-white block appearance-none text-center w-full py-1 border rounded-lg [text-align-last:center] pr-6"
      :id="'gauge' + index"
      v-model="selectedGauge"
      @change="updateGauge"
    >
      <option v-for="gauge in gauges" :key="gauge" :value="gauge">
        {{ gauge }}
      </option>
    </select>
    <span
      class="pointer-events-none text-[12px] absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
    >
      ▼
    </span>
  </div>
</template>

<script>
export default {
  name: "GaugeSelector",
  props: {
    index: { type: Number, required: true },
    defaultGauge: { type: String, required: true },
    gauges: { type: Array, default: () => [] }, // Pass gauges from parent
  },
  data() {
    return {
      selectedGauge: this.defaultGauge,
    };
  },
  watch: {
    selectedGauge(newVal) {
      this.$emit("update-gauge", { index: this.index, gauge: newVal });
    },
    defaultGauge(newVal) {
      this.selectedGauge = newVal; // Update if parent resets default
    },
  },
  methods: {
    emitGaugeUpdate() {
      this.$emit("update-gauge", {
        index: this.index,
        gauge: this.selectedGauge,
      });
    },
  },
};
</script>
