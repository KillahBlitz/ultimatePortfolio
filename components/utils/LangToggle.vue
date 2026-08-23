<script setup>
import { ref, onMounted } from 'vue'

const currentLang = ref('en')

const clearGoogleTransCookies = () => {
  if (typeof document === 'undefined') return
  const hostname = window.location.hostname
  const hostParts = hostname.split('.')
  const domains = ['', hostname, '.' + hostname]
  for (let i = 0; i < hostParts.length; i++) {
    domains.push('.' + hostParts.slice(i).join('.'))
  }
  const paths = ['/', window.location.pathname, '']
  const names = ['googtrans', 'googtrans_es', 'googtrans_en']

  names.forEach(name => {
    paths.forEach(p => {
      domains.forEach(d => {
        const dStr = d ? '; domain=' + d : ''
        const pStr = p ? '; path=' + p : '; path=/'
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0${pStr}${dStr}`
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=-99999999${pStr}${dStr}`
      })
    })
  })
}

const setLanguage = (lang) => {
  if (currentLang.value === lang) return
  currentLang.value = lang

  if (typeof document !== 'undefined') {
    if (lang === 'en') {
      clearGoogleTransCookies()
      const select = document.querySelector('.goog-te-combo')
      if (select) {
        select.value = ''
        select.dispatchEvent(new Event('change'))
      }
      setTimeout(() => {
        clearGoogleTransCookies()
        window.location.reload()
      }, 100)
    } else {
      const domain = window.location.hostname === 'localhost' ? '' : '; domain=' + window.location.hostname
      document.cookie = `googtrans=/en/${lang}; path=/${domain}`
      document.cookie = `googtrans=/en/${lang}; path=/`

      const select = document.querySelector('.goog-te-combo')
      if (select) {
        select.value = lang
        select.dispatchEvent(new Event('change'))
      } else {
        window.location.reload()
      }
    }
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/i)
    if (match && match[1] && match[1].toLowerCase() === 'es') {
      currentLang.value = 'es'
    } else {
      currentLang.value = 'en'
    }
  }
})
</script>

<template>
  <div class="lang-toggle-capsule notranslate" translate="no">
    <button
      class="lang-btn"
      :class="{ active: currentLang === 'en' }"
      @click="setLanguage('en')"
      aria-label="Switch to English"
    >
      EN
    </button>
    <span class="lang-sep">|</span>
    <button
      class="lang-btn"
      :class="{ active: currentLang === 'es' }"
      @click="setLanguage('es')"
      aria-label="Cambiar a Español"
    >
      ES
    </button>
  </div>
</template>

<style scoped>
.lang-toggle-capsule {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--liquid-surface-base);
  border: 1px solid var(--liquid-border);
  backdrop-filter: var(--liquid-blur-subtle);
  -webkit-backdrop-filter: var(--liquid-blur-subtle);
  box-shadow: var(--neu-shadow);
  transition: all 0.25s ease;
}

.lang-btn {
  background: transparent;
  border: none;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--font-color);
  opacity: 0.55;
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 999px;
  transition: all 0.2s ease;
  line-height: 1;
}

.lang-btn:hover {
  opacity: 1;
  color: var(--primary-color);
}

.lang-btn.active {
  opacity: 1;
  color: var(--background-color);
  background: var(--primary-color);
  box-shadow: 0 0 8px rgba(var(--primary-rgb), 0.4);
}

.lang-sep {
  font-size: 0.72rem;
  color: var(--font-color);
  opacity: 0.3;
}
</style>
