<script setup>
import { ref, watch, onMounted } from 'vue'

const isDarkMode = ref(false)

const applyMode = (dark) => {
  if (typeof document === 'undefined') return
  if (dark) {
    document.documentElement.classList.add('dark-mode')
    document.body.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
    document.body.classList.remove('dark-mode')
  }
}

watch(isDarkMode, (newValue) => {
  if (typeof window !== 'undefined') {
    applyMode(newValue)
    localStorage.setItem('darkMode', String(newValue))
  }
})

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    isDarkMode.value = savedMode === 'true'
  } else {
    isDarkMode.value = document.documentElement.classList.contains('dark-mode')
  }
  applyMode(isDarkMode.value)
})
</script>

<template>
  <div class="toggle-switch">
    <input type="checkbox" id="toggle" class="toggle-input" v-model="isDarkMode" />
    <label for="toggle" class="toggle-label"></label>
  </div>
</template>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--primary-color);
  transition: 0.4s;
  border-radius: 28px;
}

.toggle-label::before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: var(--background-color);
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Ccircle cx="12" cy="12" r="5"/%3E%3Cline x1="12" y1="1" x2="12" y2="3"/%3E%3Cline x1="12" y1="21" x2="12" y2="23"/%3E%3Cline x1="4.22" y1="4.22" x2="5.64" y2="5.64"/%3E%3Cline x1="18.36" y1="18.36" x2="19.78" y2="19.78"/%3E%3Cline x1="1" y1="12" x2="3" y2="12"/%3E%3Cline x1="21" y1="12" x2="23" y2="12"/%3E%3Cline x1="4.22" y1="19.78" x2="5.64" y2="18.36"/%3E%3Cline x1="18.36" y1="5.64" x2="19.78" y2="4.22"/%3E%3C/svg%3E');
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.4s;
  border-radius: 50%;
  color: var(--primary-color);
}

.toggle-input:checked + .toggle-label::before {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"%3E%3Cpath d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/%3E%3C/svg%3E');
  transform: translateX(28px);
}

.toggle-input:focus + .toggle-label {
  box-shadow: 0 0 1px var(--primary-color);
}
</style>