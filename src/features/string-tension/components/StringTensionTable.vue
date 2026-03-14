<script setup>
import AddRemoveStringButtons from "@/components/controls/AddRemoveStringButtons.vue";
import GaugeSelector from "@/components/controls/GaugeSelector.vue";
import NoteSelector from "@/components/controls/NoteSelector.vue";

const props = defineProps({
  canRemove: { type: Boolean, default: true },
  gauges: { type: Array, default: () => [] },
  strings: { type: Array, required: true },
});

defineEmits([
  "update-note",
  "update-gauge",
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
      <p class="text-sm mt-1 text-[var(--color-text-muted)]">
        All tensions shown in lb
      </p>
    </div>

    <div class="md:hidden px-5 py-5 space-y-4 bg-[var(--color-surface)]">
      <article
        v-for="(string, index) in strings"
        :key="string.id"
        class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3"
      >
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-sm font-semibold text-[var(--color-text)]">
            String {{ string.label }}
          </h3>
          <p
            class="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2.5 py-1 text-sm font-semibold tabular-nums text-[var(--color-text)]"
          >
            {{ string.tension !== null ? string.tension.toFixed(2) : "N/A" }} lb
          </p>
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
              :gauges="gauges"
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
            class="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2.5 py-2"
          >
            <dt
              class="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
            >
              Tension (lb)
            </dt>
            <dd
              class="mt-0.5 font-semibold tabular-nums text-[var(--color-text)]"
            >
              {{ string.tension !== null ? string.tension.toFixed(2) : "N/A" }}
            </dd>
          </div>
        </dl>
      </article>
    </div>

    <div class="hidden md:block p-4 bg-[var(--color-surface)]">
      <div
        class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full table-fixed text-[14px] lg:text-[15px]">
            <caption class="sr-only">
              String tension analysis table showing string number, note, gauge,
              scale length, and tension.
            </caption>
            <thead>
              <tr
                class="border-b border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-text)]"
              >
                <th
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1.5 text-center whitespace-nowrap w-[70px]"
                >
                  String
                </th>
                <th
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1.5 text-center whitespace-nowrap w-[170px]"
                >
                  Note
                </th>
                <th
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1.5 text-center whitespace-nowrap w-[170px]"
                >
                  Gauge
                </th>
                <th
                  scope="col"
                  class="border-r border-[var(--color-border)] py-2 px-1.5 text-right whitespace-nowrap w-[110px]"
                >
                  Scale (in)
                </th>
                <th
                  scope="col"
                  class="py-2 px-1.5 text-right whitespace-nowrap w-[105px]"
                >
                  Tension (lb)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(string, index) in strings"
                :key="string.id"
                class="border-b border-[var(--color-border)] last:border-b-0 bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)]/60"
              >
                <th
                  scope="row"
                  class="border-r border-[var(--color-border)] p-0.5 bg-[var(--color-surface-soft)] text-[var(--color-text)] font-semibold text-center align-middle w-[70px]"
                >
                  {{ string.label }}
                </th>
                <td
                  class="border-r border-[var(--color-border)] p-0.5 align-middle w-[170px]"
                >
                  <NoteSelector
                    :index="index"
                    :defaultNote="string.note"
                    @update-note="$emit('update-note', index, $event)"
                  />
                </td>
                <td
                  class="border-r border-[var(--color-border)] p-0.5 align-middle w-[170px]"
                >
                  <GaugeSelector
                    id-prefix="desktopGauge"
                    :index="index"
                    :defaultGauge="string.gauge"
                    :gauges="gauges"
                    @update-gauge="$emit('update-gauge', index, $event)"
                  />
                </td>
                <td
                  class="border-r border-[var(--color-border)] text-right px-1.5 w-[110px] tabular-nums bg-[var(--color-surface-soft)] text-[var(--color-text-muted)] align-middle whitespace-nowrap"
                >
                  {{
                    typeof string.relativeScaleLength === "number"
                      ? string.relativeScaleLength.toFixed(2)
                      : "N/A"
                  }}
                </td>
                <td
                  class="font-semibold bg-[var(--color-surface)] text-right px-1.5 w-[105px] tabular-nums align-middle whitespace-nowrap"
                >
                  <span
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
