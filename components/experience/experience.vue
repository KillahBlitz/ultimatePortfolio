<script setup>
import { ref, computed } from 'vue'
import './experience.css'

const { data: rawExperienceData } = await useFetch('/api/experience')

const experienceData = computed(() => {
  if (Array.isArray(rawExperienceData.value?.experience)) return rawExperienceData.value.experience
  if (Array.isArray(rawExperienceData.value)) return rawExperienceData.value
  return []
})
const educationData = computed(() => {
  if (Array.isArray(rawExperienceData.value?.education)) return rawExperienceData.value.education
  return []
})

const activeExperienceIndex = ref(0)

const toggleExperience = (index) => {
  activeExperienceIndex.value = activeExperienceIndex.value === index ? null : index
}
</script>

<template>
  <section class="liquid-glass-panel experience-section">
    <div class="section-header">
      <h2>Professional Experience</h2>
      <p>Professional background and technical responsibilities across real-world projects.</p>
    </div>

    <div class="timeline-container">
      <div
        v-for="(item, index) in experienceData"
        :key="item._id"
        class="timeline-item"
        :class="{ active: activeExperienceIndex === index }"
        @click="toggleExperience(index)"
      >
        <div class="timeline-node">
          <img :src="item.image" :alt="item.company" />
        </div>

        <div class="liquid-glass-card timeline-card">
          <div class="timeline-card-header">
            <h3>{{ item.company }}</h3>
            <span class="timeline-dates">{{ item.dates }}</span>
          </div>

          <div class="timeline-position">{{ item.position }}</div>

          <ul class="timeline-responsibilities">
            <li v-for="(resp, i) in item.responsibilities" :key="i">
              <span class="timeline-bullet">▸</span>
              <span>{{ resp }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="section-header">
      <h2>Education &amp; Learning</h2>
      <p>Engineering academic background and ongoing technical development.</p>
    </div>

    <div class="education-grid">
      <div
        v-for="item in educationData"
        :key="item._id"
        class="liquid-glass-card education-card"
      >
        <div class="education-icon-wrapper">
          <img :src="item.image" :alt="item.institution" />
        </div>
        <h3 class="education-name">{{ item.institution }}</h3>
        <div class="education-subtitle">{{ item.subtitle }}</div>
        <div class="education-date">{{ item.date }}</div>
        <p class="education-desc">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
