<script setup>
definePageMeta({
  layout: 'more'
})

const { data: servicesData } = await useFetch('/api/services')
const { data: vinculationData } = await useFetch('/api/vinculation')
const { data: certificationsData } = await useFetch('/api/certifications')

const sections = computed(() => [
  {
    title: 'Servicios',
    route: '/services',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    items: servicesData.value || []
  },
  {
    title: 'Vinculacion',
    route: '/vinculation',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    items: vinculationData.value || []
  },
  {
    title: 'Certificaciones',
    route: '/certifications',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    items: certificationsData.value || []
  }
])
</script>

<template>
  <main class="more-content">
    <section v-for="section in sections" :key="section.title" class="hub-section">
      <div class="hub-section-header">
        <div class="hub-section-title-row">
          <span class="hub-section-icon" v-html="section.icon"></span>
          <h2>{{ section.title }}</h2>
        </div>
      </div>
      <div class="hub-cards-grid">
        <UtilsItemCard
          v-for="(item, i) in section.items"
          :key="item.title || item.name"
          :item="item"
          :index="i"
          :to="section.route + '/' + item.id"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.more-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: 100px;
  padding-bottom: 60px;
  padding-inline: 3%;
  max-width: 1180px;
  margin: 0 auto;
  min-height: 100vh;
}

.hub-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hub-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hub-section-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hub-section-title-row h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--font-color);
  margin: 0;
}

.hub-section-icon {
  color: var(--primary-color);
  display: flex;
  align-items: center;
}

.hub-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

@media (max-width: 600px) {
  .more-content {
    gap: 32px;
    padding-top: 90px;
  }

  .hub-cards-grid {
    grid-template-columns: 1fr;
  }

  .hub-section-title-row h2 {
    font-size: 1.25rem;
  }
}
</style>
