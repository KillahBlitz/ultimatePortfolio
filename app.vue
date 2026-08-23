<script setup>
import Background from '~/components/utils/background.vue'
import Header from '~/components/utils/header.vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
})
</script>

<template>
  <div>
    <div class="head">
      <Header />
    </div>
    <ClientOnly>
      <Background />
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<style scoped>
.head {
  padding-top: 20px;
  position: relative;
  z-index: 1;
}
</style>
