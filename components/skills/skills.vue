<script setup>
import { computed } from 'vue'
import './skills.css'

const { data: rawSkills } = await useFetch('/api/skills')

const skillsData = computed(() => {
  if (Array.isArray(rawSkills.value)) return rawSkills.value
  if (Array.isArray(rawSkills.value?.skills)) return rawSkills.value.skills
  return []
})

const standardCategories = computed(() => skillsData.value.filter(c => c.categoryId !== 'in_progress'))
const inProgressCategory = computed(() => skillsData.value.find(c => c.categoryId === 'in_progress'))
</script>

<template>
  <section class="skills-section">
    <div class="skills-header">
      <h2 class="skills-title">Skills &amp; Technologies</h2>
      <p class="skills-subtitle">Programming languages, frameworks, databases, and infrastructure tools I use to build digital solutions.</p>
    </div>

    <div class="skills-grid">
      <div
        v-for="cat in standardCategories"
        :key="cat._id"
        class="liquid-glass-card skill-category-card"
      >
        <h3 class="category-title">{{ cat.title }}</h3>
        <div class="tech-icons-grid">
          <div
            v-for="item in cat.items"
            :key="item.key"
            class="tech-item"
            :title="item.name"
          >
            <div class="tech-icon-wrapper">
              <img :src="item.icon" :alt="item.name" class="tech-img" />
            </div>
            <span class="tech-label">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="inProgressCategory" class="liquid-glass-panel in-progress-panel">
      <h3 class="in-progress-title">Continuous Learning &amp; In Progress</h3>
      <p class="in-progress-desc">{{ inProgressCategory.description }}</p>
      <div class="in-progress-grid">
        <div
          v-for="item in inProgressCategory.items"
          :key="item.key"
          class="tech-item"
        >
          <div class="tech-icon-wrapper">
            <img :src="item.icon" :alt="item.name" class="tech-img" />
          </div>
          <span class="tech-label">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
