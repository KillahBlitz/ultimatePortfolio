<script setup>
import SwitchToggle from './switch.vue'
</script>

<template>
  <div class="header-capsule liquid-glass-capsule">
    <div class="nav-left">
      <NuxtLink to="/" class="back-btn" aria-label="Volver al portfolio">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
    </div>
    <div class="nav-right">
      <SwitchToggle />
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
  padding: 10px 24px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  overflow: visible;
}

@media (max-width: 480px) {
  .header-capsule {
    padding: 10px 14px;
  }
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
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
</style>
