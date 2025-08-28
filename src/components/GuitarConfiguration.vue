<template>
  <div
    class="bg-white w-full max-w-[1200px] mx-auto px-5 my-5 rounded-lg py-5 border-solid border-2"
  >
    <h3 class="text-[22px]">Guitar Configuration</h3>
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-col pr-[70px]">
        <label class="text-[12px]" for="lowScaleLength"
          >Low Scale Length (inches):</label
        >
        <input
          class="w-[200px] border-solid border-2 rounded-md appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          type="number"
          :value="lowScaleLength"
          @input="$emit('update:lowScaleLength', +$event.target.value)"
        />
      </div>
      <div class="flex flex-col pr-[70px]">
        <label class="text-[12px]" for="highScaleLength"
          >High Scale Length (inches):</label
        >
        <input
          class="w-[200px] border-solid border-2 rounded-md appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          type="number"
          :value="highScaleLength"
          @input="$emit('update:highScaleLength', +$event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuitarConfiguration",
  props: {
    lowScaleLength: Number,
    highScaleLength: Number,
  },
  emits: ["update:lowScaleLength", "update:highScaleLength"],
};
</script>
