<script setup>
import { computed } from "vue";
import AddRemoveStringButtons from "@/components/controls/AddRemoveStringButtons.vue";
import GaugeSelector from "@/components/controls/GaugeSelector.vue";
import NoteSelector from "@/components/controls/NoteSelector.vue";
import StringTypeSelector from "@/components/controls/StringTypeSelector.vue";

const props = defineProps({
  canRemove: { type: Boolean, default: true },
  canSelectStringType: { type: Function, required: true },
  getGaugeOptions: { type: Function, required: true },
  instrumentType: { type: String, required: true },
  strings: { type: Array, required: true },
});

const showStringTypeColumn = computed(() => props.instrumentType === "guitar");

defineEmits([
  "update-note",
  "update-gauge",
  "update-string-type",
  "add-string",
  "remove-last-string",
]);
</script>

<template>
  <div
    class="bg-[var(--color-surface)] w-full rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden"
  >
    <div
      class="px-5 py-4 bg-[var(--color-surface-soft)] border-b border-[var(--color-border)]"
    >
      <h2
        class="text-[24px] leading-tight text-[var(--color-text)] font-semibold"
      >
        String Tension Analysis
      </h2>
      <p class="text-sm text-[var(--color-text-muted)] mt-1">
        Set each string's note and gauge to see live tension values.
      </p>
    </div>

    <div
      class="lg:hidden px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--color-surface)]"
    >
      <article
        v-for="(string, index) in strings"
        :key="string.id"
        class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3 shadow-sm"
      >
        <div class="flex items-center gap-2">
          <h3 class="text-sm font-semibold text-[var(--color-text)]">
            String {{ string.label }}
          </h3>
        </div>

        <div class="mt-3 grid grid-cols-1 gap-3">
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1"
            >
              Note
            </p>
            <NoteSelector
              :index="index"
              :defaultNote="string.note"
              @update-note="$emit('update-note', index, $event)"
            />
          </div>

          <div v-if="props.canSelectStringType(index)">
            <p
              class="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1"
            >
              String Type
            </p>
            <StringTypeSelector
              id-prefix="mobileStringType"
              :index="index"
              :defaultStringType="string.stringType"
              @update-string-type="$emit('update-string-type', index, $event)"
            />
          </div>

          <div>
            <p
              class="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1"
            >
              Gauge
            </p>
            <GaugeSelector
              id-prefix="mobileGauge"
              :index="index"
              :defaultGauge="string.gauge"
              :gauges="props.getGaugeOptions(index)"
              @update-gauge="$emit('update-gauge', index, $event)"
            />
          </div>
        </div>

        <dl class="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div
            class="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2.5 py-2"
          >
            <dt
              class="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
            >
              Scale (in)
            </dt>
            <dd
              class="mt-0.5 font-semibold tabular-nums text-[var(--color-text)]"
            >
              {{
                typeof string.relativeScaleLength === "number"
                  ? string.relativeScaleLength.toFixed(2)
                  : "N/A"
              }}
            </dd>
          </div>
          <div
            class="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-tint)] px-2.5 py-2"
          >
            <dt
              class="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
            >
              Tension (lb)
            </dt>
            <dd
              class="mt-1 text-lg font-bold tracking-tight tabular-nums text-[var(--color-text)]"
            >
              {{ string.tension !== null ? string.tension.toFixed(2) : "N/A" }}
            </dd>
          </div>
        </dl>
      </article>
    </div>

    <div class="hidden lg:block p-4 bg-[var(--color-surface)]">
      <div
        class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] overflow-hidden shadow-sm"
      >
        <div class="overflow-x-auto">
          <table class="w-full table-fixed text-[14px]">
            <caption class="sr-only">
              String tension analysis table showing string number, note, gauge,
              scale length, tension, and string type for eligible guitar
              strings.
            </caption>
            <thead>
              <tr
                class="border-b border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-text)] uppercase tracking-[0.06em]"
              >
                <th
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1 text-center whitespace-nowrap w-[60px]"
                >
                  String
                </th>
                <th
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1 text-center whitespace-nowrap w-[150px]"
                >
                  Note
                </th>
                <th
                  v-if="showStringTypeColumn"
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1 text-center whitespace-nowrap w-[126px]"
                >
                  String Type
                </th>
                <th
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1 text-center whitespace-nowrap w-[148px]"
                >
                  Gauge
                </th>
                <th
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1 text-right whitespace-nowrap w-[92px]"
                >
                  Scale (in)
                </th>
                <th
                  scope="col"
                  class="py-2 px-1 text-right whitespace-nowrap w-[96px]"
                >
                  Tension (lb)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(string, index) in strings"
                :key="string.id"
                class="border-b border-[var(--color-border)] last:border-b-0 bg-[var(--color-surface)] transition-colors hover:bg-[var(--color-surface-muted)]/80"
              >
                <th
                  scope="row"
                  class="border-r border-[var(--color-border)] p-0.5 bg-[var(--color-surface-soft)] text-[var(--color-text)] font-semibold text-center align-middle w-[60px]"
                >
                  {{ string.label }}
                </th>
                <td
                  class="border-r border-[var(--color-border)] p-0.5 align-middle w-[150px]"
                >
                  <NoteSelector
                    :index="index"
                    :defaultNote="string.note"
                    @update-note="$emit('update-note', index, $event)"
                  />
                </td>
                <td
                  v-if="showStringTypeColumn"
                  class="border-r border-[var(--color-border)] p-0.5 align-middle w-[126px]"
                >
                  <StringTypeSelector
                    v-if="props.canSelectStringType(index)"
                    id-prefix="desktopStringType"
                    :index="index"
                    :defaultStringType="string.stringType"
                    @update-string-type="
                      $emit('update-string-type', index, $event)
                    "
                  />
                  <p
                    v-else
                    class="h-10 flex items-center justify-center px-2 text-center text-base font-semibold text-[var(--color-text)]"
                  >
                    Guitar
                  </p>
                </td>
                <td
                  class="border-r border-[var(--color-border)] p-0.5 align-middle w-[148px]"
                >
                  <GaugeSelector
                    id-prefix="desktopGauge"
                    :index="index"
                    :defaultGauge="string.gauge"
                    :gauges="props.getGaugeOptions(index)"
                    @update-gauge="$emit('update-gauge', index, $event)"
                  />
                </td>
                <td
                  class="border-r border-[var(--color-border)] text-right px-1 w-[92px] tabular-nums bg-[var(--color-surface-soft)] align-middle whitespace-nowrap"
                >
                  <span
                    class="inline-block text-base font-semibold tabular-nums text-[var(--color-text)]"
                  >
                    {{
                      typeof string.relativeScaleLength === "number"
                        ? string.relativeScaleLength.toFixed(2)
                        : "N/A"
                    }}
                  </span>
                </td>
                <td
                  class="bg-[var(--color-surface-tint)] text-right px-1 w-[96px] tabular-nums align-middle whitespace-nowrap"
                >
                  <span
                    class="inline-block text-[17px] font-bold tracking-tight leading-none"
                    :class="
                      string.tension === null
                        ? 'text-[var(--color-text-muted)]'
                        : 'text-[var(--color-text)]'
                    "
                  >
                    {{
                      string.tension !== null
                        ? string.tension.toFixed(2)
                        : "N/A"
                    }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      class="px-5 py-5 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] flex justify-center sm:justify-start"
    >
      <AddRemoveStringButtons
        :can-remove="props.canRemove"
        @add-string="$emit('add-string')"
        @remove-last-string="$emit('remove-last-string')"
      />
    </div>
  </div>
</template>
