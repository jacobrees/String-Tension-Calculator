<script setup>
import GaugeSelector from "@/components/controls/GaugeSelector.vue";
import NoteSelector from "@/components/controls/NoteSelector.vue";

defineProps({
  gauges: { type: Array, default: () => [] },
  strings: { type: Array, required: true },
});

defineEmits(["update-note", "update-gauge"]);
</script>

<template>
  <div
    class="bg-white w-full max-w-[1200px] mx-auto rounded-lg border-solid border-2"
  >
    <div class="px-5 bg-gray-50">
      <h3 class="text-[22px] py-1">String Tension Analysis</h3>
      <p class="text-[14px] pb-2">Individual string tensions in lb</p>
    </div>

    <table class="w-full table-auto border-t border-gray-300">
      <thead>
        <tr class="border-b border-gray-300">
          <th class="border-r">String</th>
          <th class="border-r">Note</th>
          <th class="border-r">Gauge</th>
          <th class="border-r hidden lg:table-cell">Scale Length</th>
          <th>Tension</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(string, index) in strings"
          :key="string.id"
          class="border-b"
        >
          <td class="border-r">
            <p class="w-full flex flex-row justify-center">
              {{ string.label }}
            </p>
          </td>
          <td class="border-r">
            <NoteSelector
              :index="index"
              :defaultNote="string.note"
              @update-note="$emit('update-note', index, $event)"
            />
          </td>
          <td class="border-r">
            <GaugeSelector
              :index="index"
              :defaultGauge="string.gauge"
              :gauges="gauges"
              @update-gauge="$emit('update-gauge', index, $event)"
            />
          </td>
          <td class="border-r hidden lg:table-cell text-center justify-center">
            {{
              typeof string.relativeScaleLength === "number"
                ? string.relativeScaleLength.toFixed(2)
                : "N/A"
            }}
          </td>
          <td>
            <p class="w-full flex flex-row justify-center">
              {{ string.tension !== null ? string.tension.toFixed(2) : "N/A" }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
