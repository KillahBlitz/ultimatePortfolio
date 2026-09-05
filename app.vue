<script setup>
import Background from '~/components/utils/background.vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,es', autoDisplay: false },
        'google_translate_element'
      )
    }

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.head.appendChild(script)
    }

    $fetch('/api/visit', {
      method: 'POST',
      body: {
        referrer: document.referrer || 'direct',
        language: navigator.language || 'unknown',
        screen: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        path: window.location.pathname
      }
    }).catch(() => {})
  }
})
</script>

<template>
  <div>
    <div id="google_translate_element" style="display:none"></div>
    <ClientOnly>
      <Background />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.goog-te-banner-frame.skiptranslate,
.goog-te-gadget,
.goog-te-banner-frame,
#goog-gt-tt {
  display: none !important;
}
body {
  top: 0px !important;
}
.skiptranslate > iframe {
  display: none !important;
}
</style>
