<script setup>
import AddRemoveStringButtons from "@/components/controls/AddRemoveStringButtons.vue";
import FooterSection from "@/components/layout/Footer.vue";
import TopNavigation from "@/components/layout/TopNavigation.vue";
import { useStringTension } from "@/composables/useStringTension.js";
import InstrumentConfiguration from "@/features/string-tension/components/InstrumentConfiguration.vue";
import StringTensionTable from "@/features/string-tension/components/StringTensionTable.vue";

const {
  gauges,
  highScaleLength,
  instrumentType,
  lowScaleLength,
  strings,
  addString,
  removeLastString,
  updateGauge,
  updateNote,
} = useStringTension();
</script>

<template>
  <div id="app">
    <TopNavigation />
    <InstrumentConfiguration
      v-model:lowScaleLength="lowScaleLength"
      v-model:highScaleLength="highScaleLength"
      v-model:instrumentType="instrumentType"
    />

    <StringTensionTable
      :gauges="gauges"
      :strings="strings"
      @update-note="updateNote"
      @update-gauge="updateGauge"
    />

    <div
      class="w-full max-w-[1200px] mx-auto my-5 flex flex-row justify-center lg:block"
    >
      <AddRemoveStringButtons
        @add-string="addString"
        @remove-last-string="removeLastString"
      />
    </div>
  </div>
  <FooterSection />
</template>
