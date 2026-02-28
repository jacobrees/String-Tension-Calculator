<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  index: { type: Number, required: true },
  defaultGauge: { type: String, required: false, default: null },
  gauges: { type: Array, default: () => [] },
});

const emit = defineEmits(["update-gauge"]);

const selectedGauge = ref(props.defaultGauge);

watch(selectedGauge, (newVal) => {
  emit("update-gauge", { index: props.index, gauge: newVal });
});

watch(
  () => props.defaultGauge,
  (newVal) => {
    selectedGauge.value = newVal;
  },
);
</script>

<template>
  <div class="gauge-selector w-full relative flex justify-center">
    <select
      class="bg-white block appearance-none text-center w-full py-1 border rounded-lg [text-align-last:center] pr-6 hover:cursor-pointer"
      :id="'gauge' + index"
      v-model="selectedGauge"
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
