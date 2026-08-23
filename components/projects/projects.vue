<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import './projects.css'

const { data: rawProjectsData } = await useFetch('/api/projects')

const projectsList = computed(() => rawProjectsData.value?.projects || (Array.isArray(rawProjectsData.value) ? rawProjectsData.value : []))
const catalog = computed(() => rawProjectsData.value?.catalog || {})

const activeFilter = ref('all')
const withAI = ref(false)
const currentPage = ref(0)
const itemsPerPage = 4

const selectedProject = ref(null)
const currentImageIndex = ref(0)
let autoplayTimer = null

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'fullstack', label: 'FullStack' },
  { key: 'backend', label: 'Backend & Systems' },
  { key: 'ai', label: 'AI & Data' },
  { key: 'frontend', label: 'Frontend' }
]

const filteredProjects = computed(() => {
  let result = projectsList.value
  if (activeFilter.value !== 'all') {
    if (activeFilter.value === 'ai') {
      result = result.filter(p => p.category === 'ai' || p.category === 'data_science')
    } else if (activeFilter.value === 'backend') {
      result = result.filter(p => ['backend', 'compilers', 'desktop', 'cybersecurity'].includes(p.category))
    } else {
      result = result.filter(p => p.category === activeFilter.value)
    }
  }
  if (withAI.value) {
    result = result.filter(p => p.agents === true)
  }
  return result
})

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage) || 1)

const paginatedProjects = computed(() => {
  const start = currentPage.value * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

const isPrevPageDisabled = computed(() => currentPage.value === 0)
const isNextPageDisabled = computed(() => currentPage.value >= totalPages.value - 1)

const setFilter = (key) => {
  activeFilter.value = key
  currentPage.value = 0
}

const toggleAI = () => {
  withAI.value = !withAI.value
  currentPage.value = 0
}

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

const getProjectImages = (project) => {
  if (!project) return []
  if (Array.isArray(project.images) && project.images.length) return project.images
  if (project.image) return [project.image]
  return []
}

const getProjectFirstImage = (project) => {
  const imgs = getProjectImages(project)
  return imgs[0] || '/projects/csharp_compiler.png'
}

const startAutoplay = () => {
  stopAutoplay()
  if (!selectedProject.value) return
  const imgs = getProjectImages(selectedProject.value)
  if (imgs.length <= 1) return
  autoplayTimer = setInterval(() => {
    nextModalImage()
  }, 3500)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const nextModalImage = () => {
  if (!selectedProject.value) return
  const imgs = getProjectImages(selectedProject.value)
  if (!imgs.length) return
  currentImageIndex.value = (currentImageIndex.value + 1) % imgs.length
}

const prevModalImage = () => {
  if (!selectedProject.value) return
  const imgs = getProjectImages(selectedProject.value)
  if (!imgs.length) return
  currentImageIndex.value = (currentImageIndex.value - 1 + imgs.length) % imgs.length
}

const openProjectModal = (project) => {
  selectedProject.value = project
  currentImageIndex.value = 0
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
  startAutoplay()
}

const closeProjectModal = () => {
  stopAutoplay()
  selectedProject.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const handleKeydown = (e) => {
  if (!selectedProject.value) return
  if (e.key === 'Escape') {
    closeProjectModal()
  } else if (e.key === 'ArrowRight') {
    nextModalImage()
  } else if (e.key === 'ArrowLeft') {
    prevModalImage()
  }
}

watch(selectedProject, (newVal) => {
  if (newVal) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  stopAutoplay()
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <section class="projects-section">
    <div class="projects-header">
      <h2 class="projects-title">Featured Projects</h2>
      <p class="projects-subtitle">A showcase of practical projects ranging from compilers and microservices to reactive web applications and AI-powered solutions.</p>
    </div>

    <div class="filter-bar">
      <div class="filter-tabs-container">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="filter-tab"
          :class="{ active: activeFilter === cat.key }"
          @click="setFilter(cat.key)"
        >
          {{ cat.label }}
        </button>
      </div>

      <button
        class="ai-toggle-btn"
        :class="{ active: withAI }"
        @click="toggleAI"
        :aria-pressed="withAI"
      >
        <span class="ai-toggle-icon">✦</span>
        With AI
      </button>
    </div>

    <div v-if="!paginatedProjects.length" class="empty-state">
      <p>No projects match the selected filters.</p>
    </div>

    <template v-else>
      <Transition name="project-grid-fade" mode="out-in">
        <div :key="activeFilter + '-' + String(withAI) + '-' + currentPage" class="projects-grid">
          <div
            v-for="project in paginatedProjects"
            :key="project._id || project.projectId"
            class="liquid-glass-card project-card"
            @click="openProjectModal(project)"
          >
            <div class="project-image-wrapper">
              <img
                :src="getProjectFirstImage(project)"
                :alt="project.title"
                class="project-image"
              />
              <span v-if="project.agents" class="ai-badge">✦ AI</span>
              <div class="project-card-overlay">
                <span class="view-detail-hint">View Details</span>
              </div>
            </div>

            <div class="project-card-body">
              <h3 class="project-name">{{ project.title }}</h3>
              <p class="project-desc">{{ project.description || project.problem }}</p>

              <div class="project-tech-row">
                <div
                  v-for="tech in (project.technologies || project.tecnologies || [])"
                  :key="tech"
                  class="tech-badge-icon"
                  :title="tech"
                >
                  <img :src="catalog[tech]" :alt="tech" />
                </div>
              </div>

              <div class="project-actions-row" @click.stop>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-action-btn liquid-glass-btn-secondary"
                >
                  <img :src="catalog['github']" alt="GitHub" />
                  <span>Repository</span>
                </a>
                <a
                  v-if="project.website"
                  :href="project.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-action-btn liquid-glass-btn-primary"
                >
                  <img :src="catalog['web']" alt="Demo" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div v-if="totalPages > 1" class="carousel-footer">
        <div class="carousel-pagination-controls">
          <button
            class="carousel-arrow arrow-prev"
            @click="prevPage"
            :disabled="isPrevPageDisabled"
            aria-label="Previous projects"
          >
            &#8249;
          </button>

          <div class="carousel-dots">
            <button
              v-for="pageIdx in totalPages"
              :key="pageIdx"
              class="carousel-dot"
              :class="{ active: pageIdx - 1 === currentPage }"
              @click="currentPage = pageIdx - 1"
              :aria-label="'Go to page ' + pageIdx"
            />
          </div>

          <button
            class="carousel-arrow arrow-next"
            @click="nextPage"
            :disabled="isNextPageDisabled"
            aria-label="Next projects"
          >
            &#8250;
          </button>
        </div>
        <span class="carousel-counter">{{ currentPage + 1 }} / {{ totalPages }}</span>
      </div>
    </template>

    <div class="liquid-glass-panel projects-cta-banner">
      <div class="projects-cta-text">
        <h3>Explore More Projects</h3>
        <p>
          Want to see all of my 40+ projects and repositories? Click
          <a
            href="https://github.com/KillahBlitz?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            class="projects-cta-link"
          >here</a>
          to visit my GitHub profile.
        </p>
      </div>
      <a
        href="https://github.com/KillahBlitz?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        class="liquid-glass-btn-primary projects-cta-btn"
      >
        <img :src="catalog['github']" alt="GitHub" />
        <span>View 40+ Projects on GitHub</span>
      </a>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedProject"
        class="project-modal-overlay"
        @click="closeProjectModal"
      >
        <div
          class="liquid-glass-panel project-modal-window"
          @click.stop
          @mouseenter="stopAutoplay"
          @mouseleave="startAutoplay"
        >
          <button
            class="modal-close-btn"
            @click="closeProjectModal"
            aria-label="Close modal"
          >
            ×
          </button>

          <div class="modal-carousel-wrapper">
            <div class="modal-carousel-viewport">
              <Transition name="modal-img-fade" mode="out-in">
                <img
                  :key="currentImageIndex"
                  :src="getProjectImages(selectedProject)[currentImageIndex]"
                  :alt="selectedProject.title"
                  class="modal-project-image"
                />
              </Transition>

              <span v-if="selectedProject.agents" class="ai-badge modal-ai-badge">✦ AI</span>

              <template v-if="getProjectImages(selectedProject).length > 1">
                <button
                  class="modal-nav-arrow arrow-left"
                  @click="prevModalImage"
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
                <button
                  class="modal-nav-arrow arrow-right"
                  @click="nextModalImage"
                  aria-label="Next image"
                >
                  &#8250;
                </button>

                <div class="modal-dots-track">
                  <button
                    v-for="(_, imgIdx) in getProjectImages(selectedProject)"
                    :key="imgIdx"
                    class="modal-dot"
                    :class="{ active: imgIdx === currentImageIndex }"
                    @click="currentImageIndex = imgIdx"
                    :aria-label="'Go to image ' + (imgIdx + 1)"
                  />
                </div>
                <span class="modal-img-counter">
                  {{ currentImageIndex + 1 }} / {{ getProjectImages(selectedProject).length }}
                </span>
              </template>
            </div>
          </div>

          <div class="modal-details-body">
            <div class="modal-header-row">
              <h3 class="modal-project-title">{{ selectedProject.title }}</h3>
              <span class="liquid-glass-badge modal-category-badge">
                {{ selectedProject.category }}
              </span>
            </div>

            <p class="modal-project-description">
              {{ selectedProject.problem || selectedProject.description }}
            </p>

            <div class="modal-tech-section">
              <h4 class="modal-section-title">Technologies Used</h4>
              <div class="modal-tech-grid">
                <div
                  v-for="tech in (selectedProject.technologies || selectedProject.tecnologies || [])"
                  :key="tech"
                  class="modal-tech-item"
                  :title="tech"
                >
                  <img :src="catalog[tech]" :alt="tech" class="modal-tech-img" />
                  <span class="modal-tech-label">{{ tech }}</span>
                </div>
              </div>
            </div>

            <div class="modal-actions-row">
              <a
                v-if="selectedProject.github"
                :href="selectedProject.github"
                target="_blank"
                rel="noopener noreferrer"
                class="liquid-glass-btn-secondary modal-btn"
              >
                <img :src="catalog['github']" alt="GitHub" />
                <span>GitHub Repository</span>
              </a>
              <a
                v-if="selectedProject.website"
                :href="selectedProject.website"
                target="_blank"
                rel="noopener noreferrer"
                class="liquid-glass-btn-primary modal-btn"
              >
                <img :src="catalog['web']" alt="Demo" />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
</style>