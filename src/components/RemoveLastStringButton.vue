<template>
  <button @click="removeLastString">Remove Last String</button>
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
