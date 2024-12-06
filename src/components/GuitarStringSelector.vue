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


export default {
 

  name: "GuitarStringSelector",
  props: {
    string: Object,
    index: Number,
  },
  data() {
    return {
      selectedOption: `${this.string.type} - ${this.string.gauge}`, // Default to string type and gauge
      stringMasses: {
        plain: {
          ".008": 0.32,
          ".009": 0.4,
          ".0095": 0.43,
          ".010": 0.45,
          ".0105": 0.48,
          ".011": 0.5,
          ".0115": 0.53,
          ".012": 0.55,
          ".013": 0.61,
          ".0135": 0.64,
          ".014": 0.68,
          ".015": 0.73,
          ".016": 0.8,
          ".017": 0.85,
          ".018": 0.9,
          ".019": 0.95,
          ".020": 1.0,
          ".021": 1.05,
          ".022": 1.1,
          ".023": 1.2,
          ".024": 1.3,
        },
        wound: {
          ".016": 1.2,
          ".017": 1.28,
          ".018": 1.35,
          ".019": 1.43,
          ".020": 1.5,
          ".021": 1.58,
          ".022": 1.65,
          ".023": 1.73,
          ".024": 1.8,
          ".025": 1.88,
          ".026": 1.95,
          ".027": 2.03,
          ".028": 2.1,
          ".029": 2.18,
          ".030": 2.25,
          ".031": 2.33,
          ".032": 2.41,
          ".033": 2.49,
          ".034": 2.56,
          ".035": 2.64,
          ".036": 2.72,
          ".037": 2.79,
          ".038": 2.87,
          ".039": 2.94,
          ".040": 3.02,
          ".041": 3.09,
          ".042": 3.17,
          ".043": 3.24,
          ".044": 3.32,
          ".045": 3.39,
          ".046": 3.47,
          ".047": 3.54,
          ".048": 3.62,
          ".049": 3.69,
          ".050": 3.77,
          ".051": 3.84,
          ".052": 3.92,
          ".053": 3.99,
          ".054": 4.07,
          ".055": 4.14,
          ".056": 4.22,
          ".057": 4.29,
          ".058": 4.37,
          ".059": 4.44,
          ".060": 4.52,
          ".061": 4.59,
          ".062": 4.67,
          ".063": 4.74,
          ".064": 4.82,
          ".065": 4.89,
          ".066": 4.97,
          ".067": 5.04,
          ".068": 5.12,
          ".069": 5.19,
          ".070": 5.27,
          ".071": 5.34,
          ".072": 5.42,
          ".073": 5.49,
          ".074": 5.57,
          ".075": 5.64,
          ".076": 5.72,
          ".077": 5.79,
          ".078": 5.87,
          ".079": 5.94,
          ".080": 6.02,
          ".081": 6.09,
          ".082": 6.17,
          ".083": 6.24,
          ".084": 6.32,
          ".085": 6.39,
          ".086": 6.47,
          ".087": 6.54,
          ".088": 6.62,
          ".089": 6.69,
          ".090": 6.77,
          ".091": 6.84,
          ".092": 6.92,
          ".093": 6.99,
          ".094": 7.07,
          ".095": 7.14,
          ".096": 7.22,
          ".097": 7.29,
          ".098": 7.37,
          ".099": 7.44,
          ".100": 7.52,
          ".101": 7.59,
          ".102": 7.67,
          ".103": 7.74,
          ".104": 7.82,
          ".105": 7.89,
          ".106": 7.97,
          ".107": 8.04,
          ".108": 8.12,
          ".109": 8.19,
          ".110": 8.27,
          ".111": 8.34,
          ".112": 8.42,
          ".113": 8.49,
          ".114": 8.57,
          ".115": 8.64,
          ".116": 8.72,
          ".117": 8.79,
          ".118": 8.87,
          ".119": 8.94,
          ".120": 9.02,
        },
      },
    };
  },
  computed: {
    plainGauges() {
      return Object.keys(this.stringMasses.plain);
    },
    woundGauges() {
      return Object.keys(this.stringMasses.wound);
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
