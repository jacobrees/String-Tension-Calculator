<template>
  <button @click="addString">Add String</button>
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
