<script setup>
import Header from '~/components/utils/header.vue'
</script>

<template>
  <div>
    <div class="head">
      <Header />
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
