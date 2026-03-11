<script setup>
const emit = defineEmits(["add-string", "remove-last-string"]);

function addString() {
  emit("add-string");
}

function removeLastString() {
  emit("remove-last-string");
}
</script>

<template>
  <div class="flex">
    <button
      @click="addString"
      class="bg-[#2463eb] text-white p-2 rounded-md mr-5"
    >
      Add String
    </button>
    <button
      @click="removeLastString"
      class="bg-[#2463eb] text-white p-2 rounded-md"
    >
      Remove String
    </button>
  </div>
</template>
