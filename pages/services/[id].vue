<script setup>
import { useContactForm } from '~/components/contactMe/contact.js'

definePageMeta({
  layout: 'more'
})

const route = useRoute()
const id = Number(route.params.id)

const { data: services } = await useFetch('/api/services')

const service = ref(
  (services.value || []).find(s => Number(s.id) === id) ?? null
)

const catalogPathStr = service.value?.data?.image_catalog ?? ''

const { data: rawImages } = await useFetch(
  `/api/services/catalog?path=${encodeURIComponent(catalogPathStr)}`
)

const carouselImages = computed(() => {
  if (rawImages.value?.length) return rawImages.value
  if (service.value?.image) return [service.value.image]
  return []
})

const currentImage = ref(0)
const totalImages = computed(() => carouselImages.value.length)

function nextImage() {
  currentImage.value = (currentImage.value + 1) % totalImages.value
}

function prevImage() {
  currentImage.value = (currentImage.value - 1 + totalImages.value) % totalImages.value
}

const formattedPrice = computed(() => {
  const price = service.value?.data?.price
  if (!price) return ''
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price)
})

const finalPrice = computed(() => {
  const d = service.value?.data
  if (!d) return 0
  return d.price - (d.price * d.discount)
})

const formattedFinalPrice = computed(() =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(finalPrice.value)
)

const discountPercentage = computed(() =>
  service.value?.data ? Math.round(service.value.data.discount * 100) : 0
)

const { formData: contactFormData } = useContactForm()

const contactOpen = ref(false)
const lightboxOpen = ref(false)

function openContact() {
  contactFormData.value.message = `Hola, estoy interesado en el servicio: ${service.value?.data?.tittle || ''}\n\n`
  contactOpen.value = true
}

watch(contactOpen, (open) => {
  if (!open) contactFormData.value.message = ''
})

function openLightbox() {
  if (carouselImages.value.length) lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

onMounted(() => {
  const onKey = (e) => { if (e.key === 'Escape') closeLightbox() }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <main class="service-detail">
    <div v-if="service" class="service-layout">
      <div class="carousel-section liquid-glass-panel">
        <div class="carousel-viewport">
          <img
            v-if="carouselImages.length"
            :key="currentImage"
            :src="carouselImages[currentImage]"
            :alt="service.data?.tittle"
            class="carousel-image"
            @click="openLightbox"
          />
          <div v-else class="carousel-placeholder">
            Sin imágenes disponibles
          </div>
        </div>

        <div v-if="totalImages > 1" class="carousel-controls">
          <button class="carousel-btn" @click="prevImage">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span class="carousel-counter">{{ currentImage + 1 }} / {{ totalImages }}</span>
          <button class="carousel-btn" @click="nextImage">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div v-if="totalImages > 1" class="carousel-dots">
          <button
            v-for="(_, i) in carouselImages"
            :key="i"
            class="carousel-dot"
            :class="{ active: i === currentImage }"
            @click="currentImage = i"
          />
        </div>
      </div>

      <div class="info-section">
        <h1 class="service-title">{{ service.data?.tittle }}</h1>

        <p class="service-description">{{ service.data?.description }}</p>

        <div v-if="service.data?.points?.length" class="service-points">
          <h2>Incluye</h2>
          <ul>
            <li v-for="(point, i) in service.data.points" :key="i">{{ point }}</li>
          </ul>
        </div>

        <div class="service-pricing">
          <div v-if="service.data?.discount > 0" class="price-with-discount">
            <span class="original-price">{{ formattedPrice }}</span>
            <span class="discount-badge">-{{ discountPercentage }}%</span>
            <span class="final-price">{{ formattedFinalPrice }}</span>
          </div>
          <div v-else class="price-normal">
            <span class="final-price">{{ formattedPrice }}</span>
          </div>
        </div>

        <button class="liquid-glass-btn-primary contact-btn" @click="openContact">
          Contactar
        </button>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Servicio no encontrado.</p>
    </div>
  </main>

  <Teleport to="body">
    <div v-if="contactOpen" class="contact-modal-overlay" @click.self="contactOpen = false">
      <div class="contact-modal-inner">
        <button class="contact-modal-close" @click="contactOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <ContactMeContact />
      </div>
    </div>
  </Teleport>

  <Teleport to="body">
    <div v-if="lightboxOpen" class="lightbox-overlay" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <img
        :src="carouselImages[currentImage]"
        :alt="service?.data?.tittle"
        class="lightbox-image"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.service-detail {
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

.service-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.carousel-section {
  padding: 16px;
}

.carousel-viewport {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
}

.carousel-placeholder {
  color: var(--font-color);
  opacity: 0.5;
  font-size: 0.95rem;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
}

.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--liquid-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--font-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.carousel-btn:hover {
  background: rgba(var(--primary-rgb), 0.2);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.carousel-counter {
  font-size: 0.9rem;
  color: var(--font-color);
  opacity: 0.7;
  font-weight: 600;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: var(--liquid-border);
  transition: all 0.25s ease;
  padding: 0;
}

.carousel-dot.active {
  background: var(--primary-color);
  transform: scale(1);
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.service-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--font-color);
  margin: 0;
  text-align: justify;
}

.service-description {
  font-size: 1rem;
  color: var(--font-color);
  opacity: 0.8;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
}

.service-points h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--font-color);
  margin: 0 0 8px 0;
}

.service-points ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-points li {
  font-size: 0.95rem;
  color: var(--font-color);
  opacity: 0.85;
  padding-left: 20px;
  position: relative;
}

.service-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-color);
}

.service-pricing {
  margin-top: 4px;
}

.price-with-discount {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.price-normal {
  display: flex;
  align-items: center;
}

.original-price {
  font-size: 1.1rem;
  color: var(--font-color);
  opacity: 0.5;
  text-decoration: line-through;
}

.discount-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(var(--primary-rgb), 0.15);
  color: var(--primary-color);
  font-size: 0.85rem;
  font-weight: 700;
}

.final-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
}

.contact-btn {
  width: 100%;
  text-align: center;
}

.not-found {
  color: var(--font-color);
  opacity: 0.6;
  text-align: center;
  padding-top: 40px;
}

.contact-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.2s ease;
  overflow-y: auto;
}

.contact-modal-inner {
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 20px;
}

.contact-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.contact-modal-close:hover {
  background: rgba(0, 0, 0, 0.6);
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.2s ease;
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.6);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

@media (max-width: 768px) {
  .service-detail {
    padding-top: 90px;
  }

  .service-layout {
    grid-template-columns: 1fr;
  }

  .service-title {
    font-size: 1.5rem;
  }

  .final-price {
    font-size: 1.5rem;
  }
}
</style>
