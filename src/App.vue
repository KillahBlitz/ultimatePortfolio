<script setup>
import AboutMe from './components/aboutMe/aboutMe.vue';
import Certificates from './components/certificates/certificates.vue';
import Contact from './components/contactMe/contact.vue';
import Experience from './components/experience/experience.vue';
import Projects from './components/projects/projects.vue';
import Skills from './components/skills/skills.vue';
import background from './components/utils/background.vue';
import Header from './components/utils/header.vue';
</script>

<template>
    <div class="head">
        <Header />
    </div>
    <background />
    <div id="about">
        <AboutMe />
    </div>
    <div id="experience">
        <Experience />
    </div>
    <div id="skills">
        <Skills />
    </div>
    <div id="projects">
        <Projects />
    </div>
    <div id="certificates">
        <Certificates />
    </div>
    <div id="contact">
        <Contact />
    </div>
    <div id="null"></div>
</template>

<style scoped>
.head {
    padding-top: 15px;
    position: relative;
    z-index: 1;
}

#contact {
    margin-bottom: 100px;
}

#null {
    height: 50px;
}
</style>
