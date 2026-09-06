<script setup>
definePageMeta({
  layout: 'more'
})

const route = useRoute()
const id = Number(route.params.id)

const { data: item } = await useFetch(`/api/vinculation/${id}`)

const componentMap = {
  'awsSkillBuilderC.vue': resolveComponent('VinculationAwsSkillBuilderC'),
  'msAmbassador.vue': resolveComponent('VinculationMsAmbassador'),
}

const resolvedComponent = computed(() => {
  const name = item.value?.data?.component
  return name ? componentMap[name] ?? null : null
})

function parseDate(value) {
  if (!value) return null
  if (typeof value === 'string') return new Date(value)
  if (value.$date) return new Date(value.$date)
  return null
}
</script>

<template>
  <main class="vinculation-detail">
    <div v-if="item && resolvedComponent">
      <component
        :is="resolvedComponent"
        :route-image-base="item.data.routeImageBase"
        :title="item.data.tittle || item.data.title || item.title"
        :update-date="item.data.updateDate"
        :content="item.data"
      />
    </div>

    <div v-else-if="item && !resolvedComponent" class="not-found">
      <p>Componente no registrado: {{ item.data?.component }}</p>
    </div>

    <div v-else class="not-found">
      <p>Vinculación no encontrada.</p>
    </div>
  </main>
</template>

<style scoped>
.vinculation-detail {
  padding-top: 80px;
  padding-bottom: 80px;
  padding-inline: 3%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.not-found {
  color: var(--font-color);
  opacity: 0.6;
  text-align: center;
  padding-top: 40px;
}

@media (max-width: 600px) {
  .vinculation-detail {
    padding-top: 70px;
  }
}
</style>
