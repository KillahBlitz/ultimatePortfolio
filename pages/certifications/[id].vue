<script setup>
definePageMeta({
  layout: 'more'
})

const route = useRoute()
const id = Number(route.params.id)

const { data: certifications } = await useFetch('/api/certifications')

const cert = ref(
  (certifications.value || []).find(c => Number(c.id) === id) ?? null
)

function parseDate(value) {
  if (!value) return null
  if (typeof value === 'string') return new Date(value)
  if (value.$date) return new Date(value.$date)
  return null
}

function formatDate(value) {
  const d = parseDate(value)
  if (!d || isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }).format(d)
}

const obtainedDate = computed(() => formatDate(cert.value?.data?.date))
const vigencyDate = computed(() => formatDate(cert.value?.data?.vigency))

const imageUrl = computed(() => {
  const img = cert.value?.data?.image
  if (!img) return cert.value?.image || null
  return img.startsWith('/') ? img : `/${img}`
})
</script>

<template>
  <main class="cert-detail">
    <div v-if="cert">

      <div class="cert-header">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="cert.data?.cert"
          class="cert-header-image"
        />
        <h1 class="cert-name">{{ cert.data?.cert }}</h1>
      </div>

      <div class="cert-dates">
        <div class="date-card liquid-glass-panel">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="date-icon">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <div>
            <span class="date-label">Obtenida</span>
            <span class="date-value">{{ obtainedDate }}</span>
          </div>
        </div>
        <div v-if="vigencyDate" class="date-card liquid-glass-panel">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="date-icon">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <div>
            <span class="date-label">Vigente hasta</span>
            <span class="date-value">{{ vigencyDate }}</span>
          </div>
        </div>
      </div>

      <div class="cert-body">

        <div class="cert-section liquid-glass-panel">
          <h2 class="section-label">Descripción</h2>
          <p class="cert-description">{{ cert.data?.description }}</p>
        </div>

        <div v-if="cert.data?.points?.length" class="cert-section liquid-glass-panel">
          <h2 class="section-label">Competencias validadas</h2>
          <ul class="points-grid">
            <li v-for="(point, i) in cert.data.points" :key="i">{{ point }}</li>
          </ul>
        </div>

      </div>
    </div>

    <div v-else class="not-found">
      <p>Certificación no encontrada.</p>
    </div>
  </main>
</template>

<style scoped>
.cert-detail {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 100px;
  padding-bottom: 80px;
  padding-inline: 3%;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
}

.cert-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-bottom: 8px;
}

.cert-header-image {
  height: 160px;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 28px rgba(var(--primary-rgb), 0.3));
}

.cert-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--font-color);
  text-align: center;
  margin: 0;
  line-height: 1.3;
}

.cert-dates {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.date-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
}

.date-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.date-card div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.date-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--primary-color);
}

.date-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--font-color);
}

.cert-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 12px;
}

.cert-section {
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary-color);
  margin: 0;
}

.cert-description {
  font-size: 1rem;
  color: var(--font-color);
  opacity: 0.88;
  line-height: 1.8;
  margin: 0;
  text-align: justify;
}

.points-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 32px;
}

.points-grid li {
  font-size: 0.93rem;
  color: var(--font-color);
  opacity: 0.88;
  padding-left: 20px;
  position: relative;
  line-height: 1.5;
}

.points-grid li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--primary-color);
}

.not-found {
  color: var(--font-color);
  opacity: 0.6;
  text-align: center;
  padding-top: 40px;
}

@media (max-width: 700px) {
  .cert-detail {
    padding-top: 90px;
  }

  .cert-name {
    font-size: 1.35rem;
  }

  .cert-header-image {
    height: 120px;
  }

  .cert-dates {
    grid-template-columns: 1fr;
  }

  .cert-section {
    padding: 20px;
  }

  .points-grid {
    grid-template-columns: 1fr;
  }
}
</style>
