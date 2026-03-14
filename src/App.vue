<script setup>
import FooterSection from "@/components/layout/Footer.vue";
import TopNavigation from "@/components/layout/TopNavigation.vue";
import { useStringTension } from "@/composables/useStringTension.js";
import InstrumentConfiguration from "@/features/string-tension/components/InstrumentConfiguration.vue";
import StringTensionTable from "@/features/string-tension/components/StringTensionTable.vue";
import TensionEquationPanel from "@/features/string-tension/components/TensionEquationPanel.vue";

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
  <div id="app" class="pb-6">
    <TopNavigation />
    <main class="py-5 space-y-5">
      <div class="app-shell">
        <InstrumentConfiguration
          v-model:lowScaleLength="lowScaleLength"
          v-model:highScaleLength="highScaleLength"
          v-model:instrumentType="instrumentType"
        />
      </div>

      <div class="app-shell">
        <div
          class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start"
        >
          <StringTensionTable
            :can-remove="strings.length > 1"
            :gauges="gauges"
            :strings="strings"
            @add-string="addString"
            @remove-last-string="removeLastString"
            @update-note="updateNote"
            @update-gauge="updateGauge"
          />
          <TensionEquationPanel class="xl:sticky xl:top-5" />
        </div>
      </div>
    </main>
  </div>
  <FooterSection />
</template>
