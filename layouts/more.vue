<script setup>
import HeaderMore from '~/components/utils/headerMore.vue'
</script>

<template>
  <div>
    <div class="head">
      <HeaderMore />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.head {
  padding-top: 20px;
  position: relative;
  z-index: 1;
}
</style>
