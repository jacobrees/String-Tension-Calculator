<template>
  <div>
    <label :for="'string-selector-' + index">String {{ index }}:</label>
    <select
      :id="'string-selector-' + index"
      v-model="selectedOption"
      @change="updateSelection"
    >
      <option disabled value="">Select a string type and gauge</option>

      <!-- Plain Strings Group -->
      <optgroup label="Plain Strings">
        <option
          v-for="(gauge, index) in plainGauges"
          :key="'plain-' + index"
          :value="'plain - ' + gauge"
        >
          Plain - {{ gauge }}
        </option>
      </optgroup>

      <!-- Wound Strings Group -->
      <optgroup label="Wound Strings">
        <option
          v-for="(gauge, index) in woundGauges"
          :key="'wound-' + index"
          :value="'wound - ' + gauge"
        >
          Wound - {{ gauge }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script>
import stringMasses from "@/utils/stringMasses.js";

export default {
  name: "GuitarStringSelector",
  props: {
    string: Object,
    index: Number,
  },
  data() {
    return {
      // Default the selected option to 'wound - .046' for new strings
      selectedOption: `${this.string.type || "wound"} - ${
        this.string.gauge || ".046"
      }`,
    };
  },
  computed: {
    plainGauges() {
      return Object.keys(stringMasses.plain);
    },
    woundGauges() {
      return Object.keys(stringMasses.wound);
    },
  },
  methods: {
    updateSelection() {
      const [type, gauge] = this.selectedOption.split(" - ");
      this.string.type = type.toLowerCase(); // Set type as 'plain' or 'wound'
      this.string.gauge = gauge; // Set selected gauge
      this.$emit("update-gauge", {
        stringId: this.string.id,
        gauge: this.string.gauge,
      });
    },
  },
  watch: {
    selectedOption(newValue) {
      this.updateSelection();
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
