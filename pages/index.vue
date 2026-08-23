<script setup>
import { onMounted } from 'vue'
import AboutMe from '~/components/aboutMe/aboutMe.vue'
import Services from '~/components/services/services.vue'
import Projects from '~/components/projects/projects.vue'
import Experience from '~/components/experience/experience.vue'
import Skills from '~/components/skills/skills.vue'
import Certificates from '~/components/certificates/certificates.vue'
import Contact from '~/components/contactMe/contact.vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
})
</script>

<template>
  <main class="main-content-flow">
    <div id="about">
      <AboutMe />
    </div>
    <div id="services">
      <Services />
    </div>
    <div id="projects">
      <Projects />
    </div>
    <div id="experience">
      <Experience />
    </div>
    <div id="skills">
      <Skills />
    </div>
    <div id="certificates">
      <Certificates />
    </div>
    <div id="contact">
      <Contact />
    </div>
    <div id="null"></div>
  </main>
</template>

<style scoped>
.main-content-flow {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#contact {
  margin-bottom: 80px;
}

#null {
  height: 40px;
}
</style>
