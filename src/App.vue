<template>
    <h2>String Tension Calculator</h2>
  <div>

    <StringSelector id="string-1" />
    <StringSelector id="string-2" />
    <StringSelector id="string-3" />
  </div>
</template>

<script>
import StringSelector from "./components/StringSelector.vue";

export default {
  components: {
    StringSelector,
  },
};
</script>
