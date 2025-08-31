<template>
  <button
    class="bg-[#2463eb] text-white p-2 rounded-md mr-5"
    @click="addString"
  >
    Add String
  </button>
  <button
    class="bg-[#2463eb] text-white p-2 rounded-md"
    @click="removeLastString"
  >
    Remove String
  </button>
</template>

<script>
export default {
  name: "AddRemoveStringButtons",
  methods: {
    addString() {
      this.$emit("add-string");
    },
    removeLastString() {
      this.$emit("remove-last-string");
    },
  },
};
</script>
