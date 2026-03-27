<script setup>
import FooterSection from "@/components/layout/Footer.vue";
import TopNavigation from "@/components/layout/TopNavigation.vue";
import { useStringTension } from "@/composables/useStringTension.js";
import InstrumentConfiguration from "@/features/string-tension/components/InstrumentConfiguration.vue";
import StringTensionTable from "@/features/string-tension/components/StringTensionTable.vue";
import TensionEquationPanel from "@/features/string-tension/components/TensionEquationPanel.vue";

const {
  highScaleLength,
  instrumentType,
  lowScaleLength,
  strings,
  addString,
  canSelectStringType,
  getGaugeOptions,
  removeLastString,
  updateGauge,
  updateNote,
  updateStringType,
} = useStringTension();
</script>

<template>
  <TopNavigation />
  <main class="py-5 space-y-5 flex-1">
    <div class="app-shell">
      <InstrumentConfiguration
        v-model:lowScaleLength="lowScaleLength"
        v-model:highScaleLength="highScaleLength"
        v-model:instrumentType="instrumentType"
      />
    </div>

    <div class="app-shell">
      <div
        class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] 2xl:grid-cols-[minmax(0,1fr)_300px] gap-4 items-start"
      >
        <StringTensionTable
          :can-remove="strings.length > 1"
          :can-select-string-type="canSelectStringType"
          :get-gauge-options="getGaugeOptions"
          :instrument-type="instrumentType"
          :strings="strings"
          @add-string="addString"
          @remove-last-string="removeLastString"
          @update-note="updateNote"
          @update-gauge="updateGauge"
          @update-string-type="updateStringType"
        />
        <TensionEquationPanel class="xl:sticky xl:top-5" />
      </div>
    </div>
  </main>
  <FooterSection />
</template>
