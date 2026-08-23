<script setup>
import './certificates.css'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { data: rawCertificates } = await useFetch('/api/certificates')

const certsDoc = computed(() => rawCertificates.value?.['en'] || rawCertificates.value || {})
const licenses = computed(() => certsDoc.value?.licenses || [])
const certificatesGallery = computed(() => certsDoc.value?.certificatesGallery || [])
const externalLinks = computed(() => certsDoc.value?.externalLinks || {})

const selectedCertificate = ref(null)

const openCertificate = (cert) => {
  selectedCertificate.value = cert
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeCertificate = () => {
  selectedCertificate.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && selectedCertificate.value) {
    closeCertificate()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <section class="liquid-glass-panel certificates-section">
    <div class="certificates-header">
      <h2 class="certificates-title">Licenses &amp; Certifications</h2>
      <p class="certificates-subtitle">Verified credentials and technical certificates validating expertise in engineering and software development.</p>
    </div>

    <div v-if="licenses.length" class="licenses-container">
      <h3 class="section-label">Verified Licenses</h3>
      <div class="licenses-grid">
        <a
          v-for="license in licenses"
          :key="license._id"
          :href="license.url"
          target="_blank"
          class="liquid-glass-card license-card"
        >
          <div class="license-badge-wrapper">
            <img :src="license.badge" :alt="license.platform" />
          </div>
          <div class="license-info">
            <h4>{{ license.platform }}</h4>
            <h5>{{ license.title }}</h5>
          </div>
        </a>
      </div>
    </div>

    <div v-if="certificatesGallery.length" class="gallery-container">
      <h3 class="section-label">Certificates Gallery</h3>
      <div class="certificates-scroll-track">
        <div
          v-for="cert in certificatesGallery"
          :key="cert._id || cert.certificateNumber"
          class="certificate-thumb-card"
          @click="openCertificate(cert)"
        >
          <img :src="cert.image" :alt="cert.title" />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedCertificate"
        class="certificate-modal-overlay"
        @click="closeCertificate"
      >
        <div class="liquid-glass-panel certificate-modal-window" @click.stop>
          <button class="modal-close-btn" @click="closeCertificate" aria-label="Close modal">×</button>
          <img :src="selectedCertificate.image" :alt="selectedCertificate.title" class="certificate-full-image" />
        </div>
      </div>
    </Teleport>

    <div class="cta-banner">
      <div class="cta-text">
        <p>Want to browse the full certificate repository or download my updated resume?</p>
      </div>
      <div class="cta-buttons-group">
        <a
          :href="externalLinks.driveFolder || 'https://drive.google.com/'"
          target="_blank"
          rel="noopener noreferrer"
          class="liquid-glass-btn-primary"
        >
          View All Certificates
        </a>
        <a
          :href="externalLinks.cvDownload || '/CV/CV_JACOBO_MONROY_C.pdf'"
          download
          class="liquid-glass-btn-secondary"
        >
          Download CV
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
