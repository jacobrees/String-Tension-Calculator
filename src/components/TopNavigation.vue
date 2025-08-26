<template>
  <div
    class="w-full flex flex-row justify-center items-center h-[110px] border-b-2 bg-white"
  >
    <div class="w-[1200px] flex flex-row justify-between items-center px-5">
      <div class="max-w-[600px]">
        <h2 class="text-[20px]">String Tension Calculator</h2>
        <p class="text-[14px]">
          Calculate precise string tension of hex core, nickel plated steel
          guitar strings (Ernie Ball, D'Addario, Newtone Strings)
        </p>
      </div>
      <div>
        <a
          target="_blank"
          href="https://github.com/jacobrees/String-Tension-Calculator"
          ><img
            class="w-[90px] h-[90px] invisible lg:visible"
            src="/github.svg"
            alt="Info Icon"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNavigation",
};
</script>
