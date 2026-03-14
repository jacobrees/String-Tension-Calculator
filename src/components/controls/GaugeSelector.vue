<script setup>
const props = defineProps({
  index: { type: Number, required: true },
  defaultGauge: { type: String, required: false, default: null },
  gauges: { type: Array, default: () => [] },
});

const emit = defineEmits(["update-gauge"]);
</script>

<template>
  <div class="gauge-selector w-full relative flex justify-center">
    <label class="sr-only" :for="'gauge' + props.index">
      String {{ props.index + 1 }} gauge
    </label>
    <select
      class="bg-white block appearance-none text-center w-full py-1 border rounded-lg [text-align-last:center] pr-6 hover:cursor-pointer"
      :id="'gauge' + props.index"
      :name="'gauge' + props.index"
      :value="props.defaultGauge"
      @change="emit('update-gauge', { gauge: $event.target.value })"
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
