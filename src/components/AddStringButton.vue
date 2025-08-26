<template>
  <button
    class="bg-[#2463eb] text-white p-2 rounded-md mr-5"
    @click="addString"
  >
    Add String
  </button>
</template>

<script>
export default {
  name: "AddStringButton",
  methods: {
    addString() {
      this.$emit("add-string");
    },
  },
};
</script>
