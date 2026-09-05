<script setup>
import { ref } from 'vue'
import SwitchToggle from './switch.vue'

const route = useRoute()
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const navItems = [
  { label: 'Servicios', to: '/services' },
  { label: 'Vinculacion', to: '/vinculation' },
  { label: 'Certificaciones', to: '/certifications' }
]

const isActive = (path) => route.path === path
</script>

<template>
  <div class="header-capsule liquid-glass-capsule">
    <div class="nav-left">
      <NuxtLink to="/more" class="back-btn" aria-label="Volver al hub">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
    </div>

    <nav class="nav-center">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-section-btn"
        :class="{ active: isActive(item.to) }"
        @click="closeMenu"
      >
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div class="nav-right">
      <NuxtLink to="/" class="more-btn" :class="{ active: isActive('/') }" aria-label="Ir al portfolio">
        <span>+</span>
      </NuxtLink>
      <div class="nav-divider"></div>
      <SwitchToggle />
      <button class="hamburger-menu" @click="toggleMenu" aria-label="Menu de navegacion">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div v-if="menuOpen" class="mobile-dropdown liquid-glass-panel" @click="closeMenu">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to + '-mobile'"
        :to="item.to"
        class="mobile-item"
        :class="{ 'mobile-item-active': isActive(item.to) }"
      >
        <span>{{ item.label }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="mobile-item mobile-more-item" :class="{ 'mobile-item-active': isActive('/') }">
        <span>+ Mas</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
* {
  -webkit-tap-highlight-color: transparent;
}

a {
  text-decoration: none;
  color: inherit;
}

.header-capsule {
  width: min(1180px, 94%);
  position: fixed;
  top: max(16px, env(safe-area-inset-top, 16px));
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  overflow: visible;
}

@media (min-width: 480px) {
  .header-capsule {
    padding: 10px 24px;
  }
}

.nav-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.back-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--liquid-border);
  color: var(--font-color);
  text-decoration: none;
  transition: all 0.25s ease;
}

.back-btn:hover {
  background: rgba(var(--primary-rgb), 0.2);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.4);
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-section-btn {
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--font-color);
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.nav-section-btn:hover {
  background: rgba(var(--primary-rgb), 0.12);
  color: var(--primary-color);
  transform: translateY(-1px);
}

.nav-section-btn.active {
  background: rgba(var(--primary-rgb), 0.2);
  color: var(--primary-color);
  border-color: rgba(var(--primary-rgb), 0.4);
  box-shadow: 0 0 12px rgba(var(--primary-rgb), 0.25);
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.more-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--background-color);
  background: linear-gradient(135deg, var(--primary-color), color-mix(in srgb, var(--primary-color) 80%, var(--gradient-color)));
  box-shadow: 0 2px 10px rgba(var(--primary-rgb), 0.35);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.more-btn:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 4px 16px rgba(var(--primary-rgb), 0.55);
}

.more-btn.active {
  box-shadow: 0 0 16px rgba(var(--primary-rgb), 0.6), 0 2px 10px rgba(var(--primary-rgb), 0.35);
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
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  gap: 6px;
  padding: 0;
  width: 44px;
  height: 44px;
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
  min-height: 44px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--font-color);
  border-left: 3px solid transparent;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
}

.mobile-item:hover {
  background: rgba(var(--primary-rgb), 0.12);
  border-left-color: var(--primary-color);
  color: var(--primary-color);
  padding-left: 30px;
}

.mobile-item-active {
  background: rgba(var(--primary-rgb), 0.1);
  border-left-color: var(--primary-color);
  color: var(--primary-color);
  font-weight: 700;
}

.mobile-more-item {
  border-top: 1px solid var(--liquid-border);
  margin-top: 6px;
  padding-top: 14px;
  color: var(--primary-color);
  font-weight: 700;
}

@media (min-width: 769px) and (max-width: 1000px) {
  .nav-center {
    gap: 2px;
  }

  .nav-section-btn {
    padding: 7px 12px;
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .nav-center {
    display: none;
  }

  .more-btn {
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
