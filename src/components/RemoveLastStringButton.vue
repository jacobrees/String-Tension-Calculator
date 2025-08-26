<template>
  <button
    class="bg-[#2463eb] text-white p-2 rounded-md"
    @click="removeLastString"
  >
    Remove String
  </button>
</template>
<script>
export default {
  name: "RemoveLastStringButton",
  methods: {
    removeLastString() {
      this.$emit("remove-last-string");
    },
  },
};
</script>
