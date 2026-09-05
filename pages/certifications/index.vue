<script setup>
definePageMeta({
  layout: 'more'
})

const { data: certifications } = await useFetch('/api/certifications')
</script>

<template>
  <main class="section-content">
    <h1 class="section-title">Certificaciones</h1>
    <div class="cards-grid">
      <UtilsItemCard
        v-for="(item, i) in certifications"
        :key="item.id"
        :item="item"
        :index="i"
        :to="'/certifications/' + item.id"
      />
    </div>
  </main>
</template>

<style scoped>
.section-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 100px;
  padding-bottom: 60px;
  padding-inline: 3%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--font-color);
  margin: 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 600px) {
  .section-content {
    padding-top: 90px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
