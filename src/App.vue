<template>
  <div id="app">
    <div v-for="(string, index) in strings" :key="string.id">
      <!-- Adjusting index here -->
      <GuitarStringSelector
        :string="string"
        :index="index + 1" 
        @update-gauge="updateGauge"
      />
      <NotesFrequenciesSelector
        :index="index + 1"
        :defaultNote="string.note"
        @update-note="updateStringNote"
      />
    </div>
    <AddStringButton @add-string="addString" />
    <RemoveLastStringButton @remove-last-string="removeLastString" />
  </div>
</template>

<script>
import AddStringButton from "./components/AddStringButton.vue";
import GuitarStringSelector from "./components/GuitarStringSelector.vue";
import RemoveLastStringButton from "./components/RemoveLastStringButton.vue";
import NotesFrequenciesSelector from "./components/NotesFrequenciesSelector.vue";

export default {
  name: "App",
  components: {
    GuitarStringSelector,
    AddStringButton,
    RemoveLastStringButton,
    NotesFrequenciesSelector,
  },
  data() {
    return {
      strings: [
        { id: 1, label: "String 1", type: "plain", gauge: ".010", note: "E4" },
        { id: 2, label: "String 2", type: "plain", gauge: ".013", note: "B3" },
        { id: 3, label: "String 3", type: "plain", gauge: ".017", note: "G3" },
        { id: 4, label: "String 4", type: "wound", gauge: ".026", note: "D3" },
        { id: 5, label: "String 5", type: "wound", gauge: ".036", note: "A2" },
        { id: 6, label: "String 6", type: "wound", gauge: ".046", note: "E2" },
      ],
    };
  },
  methods: {
    updateStringNote({ index, note }) {
      console.log(`Updating string ${index} to note ${note}`); // Add log for debugging
      this.strings[index].note = note;
    },
    removeLastString() {
      if (this.strings.length > 0) {
        this.strings.pop(); // Ensure the array has strings before removing
      }
    },
    addString() {
      const newStringNumber = this.strings.length + 1;
      this.strings.push({
        id: newStringNumber,
        label: `String ${newStringNumber}`,
        type: "plain",
        gauge: ".010",
        note: "E2", // Default note
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
