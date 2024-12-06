<template>
  <div id="app">
    <div v-for="(string, index) in strings" :key="string.id">
      <GuitarStringSelector
        :string="string"
        :index="index + 1"
        @update-gauge="updateGauge"
      />
      <NotesFrequenciesSelector :index="index" />
    </div>
    <AddStringButton @add-string="addString" />
    <RemoveLastStringButton @remove-last-string="removeLastString" />
  </div>
</template>

<script>
import AddStringButton from "./components/AddStringButton.vue";
import GuitarStringSelector from "./components/GuitarStringSelector.vue";
import RemoveLastStringButton from "./components/RemoveLastStringButton.vue";
import NotesFrequenciesSelector from "./components/NotesFrequenciesSelector.vue"; // Import the NotesFrequenciesSelector

export default {
  name: "App",
  components: {
    GuitarStringSelector,
    AddStringButton,
    RemoveLastStringButton,
    NotesFrequenciesSelector, // Register the NotesFrequenciesSelector component
  },
  data() {
    return {
      strings: Array(6).fill({ id: 1, label: "", type: "plain", gauge: "" }),
    };
  },
  methods: {
    removeLastString() {
      this.strings.pop();
    },
    addString() {
      const newStringNumber = this.strings.length + 1;
      this.strings.push({
        id: newStringNumber,
        label: `String ${newStringNumber}`,
        type: "plain", // Default to plain string
        gauge: "", // Initialize gauge as empty
      });
    },
    updateGauge({ stringId, gauge }) {
      const stringToUpdate = this.strings.find((str) => str.id === stringId);
      if (stringToUpdate) {
        stringToUpdate.gauge = gauge;
      }
    },
  },
};
</script>
