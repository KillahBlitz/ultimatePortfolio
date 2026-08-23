<script setup>
import './aboutMe.css'
import { computed } from 'vue'

const { data: rawProfile } = await useFetch('/api/profile')

const profile = computed(() => rawProfile.value || {})
const avatarImage = computed(() => profile.value?.avatar || '/aboutMe/profile.jpeg')
const authorName = computed(() => profile.value?.shortName || profile.value?.fullName || 'Jacobo Monroy')
const roleTitle = computed(() => profile.value?.title || 'Computer Engineering & Jr FullStack Developer')
const bioParagraphs = computed(() => Array.isArray(profile.value?.bio) ? profile.value.bio : [])
const cvLink = computed(() => profile.value?.cv?.path || '/CV/CV_JACOBO_MONROY_C.pdf')
const cvFilename = computed(() => profile.value?.cv?.filename || 'CV_JACOBO_MONROY_C.pdf')
const socialLinks = computed(() => profile.value?.social || [])
</script>

<template>
  <section class="about-me-section">
    <div class="liquid-glass-panel about-me-container">
      <div class="image-space">
        <div class="avatar-wrapper">
          <div class="avatar-glow-ring"></div>
          <div class="image-container">
            <img :src="avatarImage" :alt="authorName" class="profile-image" />
          </div>
        </div>
      </div>

      <div class="info-content">
        <div class="status-badge-container">
          <span class="liquid-glass-badge">
            <span class="pulse-dot"></span>
            Available for Projects &amp; Engineering Roles
          </span>
        </div>

        <div class="presentation-content">
          <h2 class="greeting-title">About Me</h2>
          <h1 class="author-name">{{ authorName }}</h1>
          <h3 class="role-title">{{ roleTitle }}</h3>
        </div>

        <div class="description-container">
          <p v-for="(paragraph, index) in bioParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>

        <div class="actions-container">
          <a :href="cvLink" :download="cvFilename" class="liquid-glass-btn-primary">
            Download CV
          </a>
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-pill"
            :aria-label="social.name"
          >
            <img :src="social.icon" :alt="social.name" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
