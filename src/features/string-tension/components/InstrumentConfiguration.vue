<script setup>
const props = defineProps({
  lowScaleLength: Number,
  highScaleLength: Number,
  instrumentType: String,
});

const emit = defineEmits([
  "update:lowScaleLength",
  "update:highScaleLength",
  "update:instrumentType",
]);
</script>

<template>
  <div
    class="bg-white w-full max-w-[1200px] mx-auto px-5 my-5 rounded-lg py-5 border-solid border-2"
  >
    <h3 class="text-[22px]">Instrument Configuration</h3>
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-col pr-[70px]">
        <label class="text-[12px]" for="instrumentType">Instrument:</label>
        <div class="relative w-[200px]">
          <select
            class="text-[20px] bg-white block appearance-none rounded-lg w-[200px] border-solid border-2 hover:cursor-pointer"
            id="instrumentType"
            name="instrumentType"
            :value="props.instrumentType"
            @change="emit('update:instrumentType', $event.target.value)"
          >
            <option class="text-[20px]" value="guitar">Guitar</option>
            <option class="text-[20px]" value="bass">Bass</option>
          </select>
          <span
            class="pointer-events-none text-[12px] absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
          >
            ▼
          </span>
        </div>
      </div>
      <div class="flex flex-col pr-[70px]">
        <label class="text-[12px]" for="lowScaleLength"
          >Low Scale Length (inches):</label
        >
        <input
          class="text-[20px] w-[200px] border-solid border-2 rounded-md appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          id="lowScaleLength"
          name="lowScaleLength"
          type="number"
          :value="props.lowScaleLength"
          @input="emit('update:lowScaleLength', +$event.target.value)"
        />
      </div>
      <div class="flex flex-col pr-[70px]">
        <label class="text-[12px]" for="highScaleLength"
          >High Scale Length (inches):</label
        >
        <input
          class="!text-black text-[20px] w-[200px] border-solid border-2 rounded-md appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          id="highScaleLength"
          name="highScaleLength"
          type="number"
          :value="props.highScaleLength"
          @input="emit('update:highScaleLength', +$event.target.value)"
        />
      </div>
    </div>
  </div>
</template>
