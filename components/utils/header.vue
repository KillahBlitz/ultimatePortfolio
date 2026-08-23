<script setup>
import { ref, computed } from 'vue'
import SwitchToggle from './switch.vue'

const { data: profileData } = await useFetch('/api/profile')
const socialLinks = computed(() => profileData.value?.social || [
    { name: 'GitHub', url: 'https://github.com/KillahBlitz', icon: '/icons/logo_gh.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/monroy-jacobo', icon: '/icons/logo_ln.png' },
    { name: 'Instagram', url: 'https://www.instagram.com/kinasis_dev/', icon: '/icons/logo_ig.png' }
])

const menuOpen = ref(false)

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
    menuOpen.value = false
}

const scrollTo = (id, event) => {
    if (event) event.preventDefault()
    closeMenu()
    if (typeof document !== 'undefined') {
        const el = document.querySelector(id)
        if (el) {
            const headerOffset = 90
            const elementPosition = el.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
            if (typeof window !== 'undefined' && window.history) {
                window.history.pushState(null, '', id)
            }
        }
    }
}
</script>

<template>
    <div class="header-capsule liquid-glass-capsule">
        <div class="nav-left">
            <a href="#about" class="nav-link-btn" @click="scrollTo('#about', $event)">
                <span>About</span>
            </a>
            <a href="#services" class="nav-link-btn" @click="scrollTo('#services', $event)">
                <span>Services</span>
            </a>
            <a href="#projects" class="nav-link-btn" @click="scrollTo('#projects', $event)">
                <span>Projects</span>
            </a>
            <a href="#experience" class="nav-link-btn" @click="scrollTo('#experience', $event)">
                <span>Experience</span>
            </a>
            <a href="#skills" class="nav-link-btn" @click="scrollTo('#skills', $event)">
                <span>Skills</span>
            </a>
            <a href="#certificates" class="nav-link-btn" @click="scrollTo('#certificates', $event)">
                <span>Certificates</span>
            </a>

            <div class="social-icons-group">
                <a
                    v-for="item in socialLinks"
                    :key="item.name"
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-icon-btn"
                    :aria-label="item.name"
                >
                    <img :src="item.icon" :alt="item.name" />
                </a>
            </div>
        </div>

        <div class="nav-right">
            <a href="#contact" class="contact-cta-btn" @click="scrollTo('#contact', $event)">
                <span>Contact</span>
            </a>
            <div class="nav-divider"></div>
            <SwitchToggle />
            <button class="hamburger-menu" @click="toggleMenu" aria-label="Toggle Navigation Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <div v-if="menuOpen" class="mobile-dropdown liquid-glass-panel">
            <a href="#about" class="mobile-item" @click="scrollTo('#about', $event)">
                <span>About Me</span>
            </a>
            <a href="#services" class="mobile-item" @click="scrollTo('#services', $event)">
                <span>Services</span>
            </a>
            <a href="#projects" class="mobile-item" @click="scrollTo('#projects', $event)">
                <span>Projects</span>
            </a>
            <a href="#experience" class="mobile-item" @click="scrollTo('#experience', $event)">
                <span>Experience</span>
            </a>
            <a href="#skills" class="mobile-item" @click="scrollTo('#skills', $event)">
                <span>Skills</span>
            </a>
            <a href="#certificates" class="mobile-item" @click="scrollTo('#certificates', $event)">
                <span>Certificates</span>
            </a>
            <a href="#contact" class="mobile-item mobile-contact-item" @click="scrollTo('#contact', $event)">
                <span>Contact Me</span>
            </a>
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}

.header-capsule {
    width: min(1180px, 94%);
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px;
    box-sizing: border-box;
    transition: all 0.3s ease;
}

.nav-left {
    display: flex;
    align-items: center;
    gap: 8px;
}

.nav-link-btn {
    padding: 9px 18px;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--font-color);
    background: transparent;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.nav-link-btn:hover {
    background: rgba(var(--primary-rgb), 0.15);
    color: var(--primary-color);
    box-shadow: 0 0 12px rgba(var(--primary-rgb), 0.25);
    transform: translateY(-1px);
}

.social-icons-group {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 12px;
}

.social-icon-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--liquid-border);
    transition: all 0.25s ease;
}

.social-icon-btn img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    transition: all 0.3s ease;
}

.dark-mode .social-icon-btn img {
    filter: invert(1);
}

.social-icon-btn:hover {
    background: rgba(var(--primary-rgb), 0.2);
    border-color: var(--primary-color);
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.4);
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.contact-cta-btn {
    padding: 9px 22px;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--background-color);
    background: linear-gradient(135deg, var(--primary-color), color-mix(in srgb, var(--primary-color) 80%, var(--gradient-color)));
    box-shadow: 0 2px 10px rgba(var(--primary-rgb), 0.35);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-flex;
    align-items: center;
}

.contact-cta-btn:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 4px 16px rgba(var(--primary-rgb), 0.55);
}

.nav-divider {
    width: 1.5px;
    height: 26px;
    background: var(--liquid-border);
}

.hamburger-menu {
    display: none;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    gap: 6px;
    padding: 6px;
}

.hamburger-menu span {
    display: block;
    width: 26px;
    height: 2.5px;
    background-color: var(--primary-color);
    border-radius: 2px;
    transition: all 0.3s ease;
}

.mobile-dropdown {
    position: absolute;
    top: calc(100% + 14px);
    left: 0;
    right: 0;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 18px;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.mobile-item {
    padding: 14px 28px;
    font-size: 1rem;
    font-weight: 600;
    color: var(--font-color);
    border-left: 3px solid transparent;
    transition: all 0.25s ease;
}

.mobile-item:hover {
    background: rgba(var(--primary-rgb), 0.12);
    border-left-color: var(--primary-color);
    color: var(--primary-color);
    padding-left: 30px;
}

.mobile-contact-item {
    border-top: 1px solid var(--liquid-border);
    margin-top: 6px;
    padding-top: 14px;
    color: var(--primary-color);
    font-weight: 700;
}

@media (min-width: 901px) and (max-width: 1140px) {
    .nav-left {
        gap: 4px;
    }

    .nav-link-btn {
        padding: 7px 12px;
        font-size: 0.88rem;
    }
}

@media (max-width: 900px) {
    .nav-link-btn {
        display: none;
    }

    .contact-cta-btn {
        display: none;
    }

    .nav-divider {
        display: none;
    }

    .hamburger-menu {
        display: flex;
    }
}
</style>