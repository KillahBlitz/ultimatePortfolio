<script setup>
import { ref, computed } from 'vue'
import './services.css'

const { data: rawServices } = await useFetch('/api/services')

const servicesList = computed(() => {
  if (Array.isArray(rawServices.value)) return rawServices.value
  if (rawServices.value?.services) return rawServices.value.services
  return []
})

const currentIndex = ref(0)
const total = computed(() => servicesList.value.length)

const currentService = computed(() => {
  if (!servicesList.value.length) return null
  return servicesList.value[currentIndex.value]
})

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const next = () => {
  if (currentIndex.value < total.value - 1) {
    currentIndex.value++
  }
}

const isPrevDisabled = computed(() => currentIndex.value === 0)
const isNextDisabled = computed(() => currentIndex.value === total.value - 1)
</script>

<template>
  <section class="services-section">
    <div class="services-header">
      <h2 class="services-title">Services &amp; Solutions</h2>
      <p class="services-subtitle">Tailor-made tech solutions, scalable software development, and modern architectures to bring high-impact ideas to life.</p>
    </div>

    <div v-if="currentService" class="services-carousel">
      <button
        class="carousel-arrow arrow-prev"
        @click="prev"
        :disabled="isPrevDisabled"
        aria-label="Previous service"
      >
        &#8249;
      </button>

      <Transition name="service-fade" mode="out-in">
        <div :key="currentService._id || currentService.id" class="liquid-glass-card service-card">
          <div class="service-card-top">
            <div class="service-icon-wrapper">
              <img :src="currentService.icon" :alt="currentService.title" class="service-icon" />
            </div>
            <span class="liquid-glass-badge">{{ currentService.badge || currentService.category }}</span>
          </div>

          <h3 class="service-name">{{ currentService.title }}</h3>
          <p class="service-description">{{ currentService.description }}</p>

          <ul class="service-features-list">
            <li
              v-for="(feature, i) in currentService.features"
              :key="'f' + i"
              class="service-feature-item"
            >
              <span class="feature-bullet">▸</span>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <div v-if="currentService.deliverables?.length" class="service-deliverables">
            <p class="deliverables-label">What I deliver:</p>
            <ul class="service-features-list">
              <li
                v-for="(item, i) in currentService.deliverables"
                :key="'d' + i"
                class="service-feature-item deliverable-item"
              >
                <span class="feature-bullet deliverable-bullet">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </Transition>

      <button
        class="carousel-arrow arrow-next"
        @click="next"
        :disabled="isNextDisabled"
        aria-label="Next service"
      >
        &#8250;
      </button>
    </div>

    <div v-if="total > 1" class="carousel-dots">
      <button
        v-for="(_, i) in servicesList"
        :key="i"
        class="carousel-dot"
        :class="{ active: i === currentIndex }"
        @click="currentIndex = i"
        :aria-label="'Go to service ' + (i + 1)"
      />
    </div>

    <div class="liquid-glass-panel services-cta-banner">
      <div class="cta-banner-text">
        <h3>Have a project in mind?</h3>
        <p>Let's work together to design, build, and deploy your next tech solution.</p>
      </div>
      <a href="#contact" class="liquid-glass-btn-primary">
        Let's Discuss Your Project
      </a>
    </div>
  </section>
</template>

<style scoped>
</style>
