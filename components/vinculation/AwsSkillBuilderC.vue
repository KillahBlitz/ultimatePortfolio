<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  routeImageBase: { type: String, required: true },
  title: { type: String, default: '' },
  updateDate: { type: [String, Object], default: null },
  content: { type: Object, default: () => ({}) }
})

const headerImg = computed(() => `/${props.routeImageBase}/header.png`)
const logoImg = computed(() => `/${props.routeImageBase}/logo.png`)

function formatDate(value) {
  if (!value) return ''
  const raw = typeof value === 'string' ? value : value.$date
  const d = new Date(raw)
  if (isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }).format(d)
}

const formattedDate = computed(() => formatDate(props.updateDate))

const coverImgRef = ref(null)
const coverClipStyle = ref({})

function applyCrop() {
  const img = coverImgRef.value
  if (!img || !img.naturalWidth) return
  const displayH = (img.naturalHeight / img.naturalWidth) * img.offsetWidth
  coverClipStyle.value = { height: (displayH * 0.75) + 'px' }
}

const profileImg = computed(() => `/${props.routeImageBase}/profile.png`)
const qrImg = computed(() => `/${props.routeImageBase}/qr.png`)
const profileUrl = computed(() => props.content?.urlProfile ?? '#')
const badgeGoal = computed(() => props.content?.badgeGoal ?? 21)
const statBadges = computed(() => props.content?.badges ?? 0)
const statArticles = computed(() => props.content?.articles ?? 0)
const statWishlist = computed(() => props.content?.wishlist ?? 0)
const articlesList = computed(() => props.content?.articlesList ?? [])
const socialLinks = computed(() => props.content?.socialLinks ?? {})
const authorName = computed(() => props.content?.authorName ?? '')
const bio = computed(() => props.content?.bio ?? [])

const displayedBadges = ref(0)
const displayedArticles = ref(0)
const displayedWishlist = ref(0)
const progressWidth = ref('0%')
const progressLabel = ref('0')

function animateCounter(setter, target) {
  const duration = 2000
  const startTime = performance.now()
  function step(now) {
    const t = Math.min((now - startTime) / duration, 1)
    setter(Math.floor((1 - Math.pow(1 - t, 3)) * target))
    if (t < 1) requestAnimationFrame(step)
    else setter(target)
  }
  requestAnimationFrame(step)
}

function triggerAnimations() {
  animateCounter(v => { displayedBadges.value = v }, statBadges.value)
  animateCounter(v => { displayedArticles.value = v }, statArticles.value)
  animateCounter(v => { displayedWishlist.value = v }, statWishlist.value)
  setTimeout(() => {
    const pct = badgeGoal.value > 0 ? (statBadges.value / badgeGoal.value) * 100 : 0
    progressWidth.value = pct + '%'
    progressLabel.value = `${statBadges.value} / ${badgeGoal.value}`
  }, 200)
}

const statsRef = ref(null)
let observer = null
let triggered = false

onMounted(() => {
  const img = coverImgRef.value
  if (img) {
    if (img.complete && img.naturalWidth) applyCrop()
    else img.addEventListener('load', applyCrop)
    window.addEventListener('resize', applyCrop)
  }

  observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true
      triggerAnimations()
    }
  }, { threshold: 0.2 })
  if (statsRef.value) observer.observe(statsRef.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', applyCrop)
  observer?.disconnect()
})

const likedArticles = ref(new Set())

function handleLike(index, url) {
  if (likedArticles.value.has(index)) return
  likedArticles.value = new Set([...likedArticles.value, index])
  if (url && url !== '#') {
    setTimeout(() => window.open(url, '_blank', 'noopener'), 600)
  }
}
</script>

<template>
  <div class="aws-campaign">

    <div class="cover-outer">
      <div class="cover-clip" :style="coverClipStyle">
        <img ref="coverImgRef" :src="headerImg" alt="portada" class="cover-img" />
      </div>
      <img :src="logoImg" alt="logo" class="logo-img" />
    </div>

    <div class="meta-row">
      <div class="meta-info">
        <h1 class="meta-title">{{ title }}</h1>
        <span v-if="formattedDate" class="meta-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          Actualizado: {{ formattedDate }}
        </span>
      </div>
    </div>

    <div class="hero-section mb-5">
      <div class="row align-items-center gy-4">
        <div class="col-lg-7">
          <span class="pill-aws mb-3 d-inline-block">Meta 2026: Certificación AWS</span>
          <h1 class="campaign-title mb-3">
            Rumbo a mi Certificación AWS:<br />
            <span class="text-aws">Acompáñame a desbloquear {{ badgeGoal }} insignias técnicas</span>
          </h1>
          <p class="campaign-sub mb-4">
            AWS premia el aprendizaje constante: cuando la comunidad interactúa con mi perfil y contenido en Skill Builder, desbloqueo insignias que me acercan a un voucher gratuito de certificación cloud.
          </p>
          <div class="d-flex flex-wrap gap-3">
            <a :href="profileUrl" target="_blank" rel="noopener" class="btn btn-aws btn-lg">
              Ir a mi perfil AWS
            </a>
            <a href="#como-ayudar" class="btn btn-aws-outline btn-lg">
              Ver cómo ayudar
            </a>
          </div>
        </div>
        <div class="col-lg-5 d-flex justify-content-center">
          <div class="hero-globe">
            <div class="text-center">
              <div class="globe-count">{{ displayedBadges }}</div>
              <div class="globe-goal">/ {{ badgeGoal }} insignias</div>
              <div class="globe-label">AWS Skill Builder</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref="statsRef" class="mb-5">
      <div class="aws-card p-4 p-md-5 mb-4">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <span class="fw-semibold fs-5">Meta: {{ badgeGoal }} insignias</span>
          <span class="fw-bold text-aws fs-4">{{ progressLabel }}</span>
        </div>
        <div class="progress-track mb-2">
          <div class="progress-fill" :style="{ width: progressWidth }"></div>
        </div>
        <div class="d-flex justify-content-between">
          <small class="text-dim">0 insignias</small>
          <small class="text-dim">Meta: {{ badgeGoal }} insignias</small>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-md-4">
          <div class="aws-card metric-card p-4 text-center h-100">
            <div class="metric-icon">🏅</div>
            <div class="metric-num text-aws">{{ displayedBadges }}</div>
            <div class="metric-label">Insignias Obtenidas</div>
            <div class="metric-sub">de {{ badgeGoal }} necesarias para el voucher</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="aws-card metric-card p-4 text-center h-100">
            <div class="metric-icon">📝</div>
            <div class="metric-num text-sky">{{ displayedArticles }}</div>
            <div class="metric-label">Artículos Publicados</div>
            <div class="metric-sub">necesitan tus likes para sumar insignias</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="aws-card metric-card p-4 text-center h-100">
            <div class="metric-icon">⭐</div>
            <div class="metric-num text-pink">{{ displayedWishlist }}</div>
            <div class="metric-label">Wishlists Publicadas</div>
            <div class="metric-sub">artículos en formato wishlist, necesitan tu like</div>
          </div>
        </div>
      </div>
    </div>

    <div id="como-ayudar" class="mb-5">
      <div class="text-center mb-4">
        <span class="pill-aws mb-2 d-inline-block">Te toma menos de 1 minuto</span>
        <h2 class="section-title">Cómo puedes apoyarme</h2>
        <p class="section-sub">No necesitas cuenta ni dinero. Solo 3 acciones simples.</p>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-md-4">
          <div class="aws-card p-4 h-100 d-flex flex-column">
            <div class="d-flex align-items-start gap-3 mb-3">
              <div class="step-badge">1</div>
              <h5 class="fw-bold mb-0 mt-1">Sígueme en mi perfil</h5>
            </div>
            <p class="flex-grow-1 text-dim">Entra a mi perfil de AWS Builder Center y presiona <strong>Follow</strong>. Cada seguidor suma directamente a mi progreso de insignias.</p>
            <a :href="profileUrl" target="_blank" rel="noopener" class="btn btn-aws w-100 mt-2">
              Ir a seguirme
            </a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="aws-card p-4 h-100 d-flex flex-column">
            <div class="d-flex align-items-start gap-3 mb-3">
              <div class="step-badge">2</div>
              <h5 class="fw-bold mb-0 mt-1">Dale Like a mis artículos</h5>
            </div>
            <p class="flex-grow-1 text-dim">Abre cualquiera de mis artículos técnicos sobre Cloud y deja un like o reacción. Solo toma segundos y cada interacción me acerca a una insignia.</p>
            <div class="info-chip chip-orange">
              ❤️ Los likes en artículos son la acción más impactante
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="aws-card p-4 h-100 d-flex flex-column">
            <div class="d-flex align-items-start gap-3 mb-3">
              <div class="step-badge">3</div>
              <h5 class="fw-bold mb-0 mt-1">Dale Like a mis Wishlists</h5>
            </div>
            <p class="flex-grow-1 text-dim">Tengo artículos guardados en formato Wishlist. Son publicaciones como los artículos normales, solo que con otro formato. Entra y deja tu like, es igual de sencillo.</p>
            <div class="info-chip chip-blue">
              ⭐ Son artículos, solo dales like
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4 align-items-stretch">
        <div class="col-md-8">
          <div class="profile-card h-100">
            <img :src="profileImg" :alt="`Perfil AWS Skill Builder de ${authorName}`" class="profile-img" loading="lazy" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="qr-card p-4 h-100 d-flex flex-column align-items-center justify-content-center gap-4">
            <div class="text-center">
              <h4 class="fw-bold mb-1">¡Escanea desde tu móvil!</h4>
              <p class="text-dim mb-0">Apunta la cámara al QR para ir directo a mi perfil de AWS Community.</p>
            </div>
            <img :src="qrImg" alt="Código QR — Perfil AWS" class="qr-img" loading="lazy" />
            <a :href="profileUrl" target="_blank" rel="noopener" class="btn btn-aws-outline w-100">
              Abrir perfil en el navegador
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="articlesList.length > 0" class="mb-5">
      <div class="text-center mb-4">
        <span class="pill-sky mb-2 d-inline-block">Contenido técnico</span>
        <h2 class="section-title">Mis Artículos Técnicos</h2>
        <p class="section-sub">Lee, aprende y deja tu like. Cada interacción me acerca a la certificación.</p>
      </div>

      <div class="row g-4">
        <div v-for="(article, i) in articlesList" :key="i" class="col-md-6 col-lg-3">
          <div class="article-card h-100 d-flex flex-column">
            <div class="p-4 flex-grow-1">
              <span class="pill-sky mb-3 d-inline-block">{{ article.topic }}</span>
              <h5 class="article-title mb-2">{{ article.title }}</h5>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <div class="article-meta">{{ article.readTime }} min de lectura</div>
            </div>
            <div class="p-4 pt-0">
              <button
                class="btn w-100"
                :class="likedArticles.has(i) ? 'btn-liked' : 'btn-aws'"
                :disabled="likedArticles.has(i)"
                @click="handleLike(i, article.url)"
              >
                {{ likedArticles.has(i) ? '¡Gracias! Like registrado' : 'Leer y dar Like' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="bio.length > 0 || authorName" class="mb-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="text-center mb-4">
            <span class="pill-aws mb-2 d-inline-block">Mi historia</span>
            <h2 class="section-title">Por qué hago esto</h2>
          </div>
          <div class="aws-card p-4 p-lg-5">
            <div v-if="authorName" class="d-flex align-items-center gap-3 mb-4">
              <div class="author-avatar">{{ authorName.charAt(0) }}</div>
              <div>
                <div class="fw-bold fs-5">{{ authorName }}</div>
                <div class="text-dim" style="font-size: 0.88rem;">Desarrollador & Entusiasta de Cloud Computing</div>
              </div>
            </div>
            <p v-for="(paragraph, i) in bio" :key="i" class="bio-p" :class="{ 'mb-0': i === bio.length - 1 }">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="socialLinks.linkedin || socialLinks.github || socialLinks.portfolio" class="text-center pt-2 pb-4">
      <div class="d-flex flex-wrap justify-content-center gap-3">
        <a v-if="socialLinks.linkedin" :href="socialLinks.linkedin" target="_blank" rel="noopener" class="btn btn-social">
          LinkedIn
        </a>
        <a v-if="socialLinks.github" :href="socialLinks.github" target="_blank" rel="noopener" class="btn btn-social">
          GitHub
        </a>
        <a v-if="socialLinks.portfolio" :href="socialLinks.portfolio" target="_blank" rel="noopener" class="btn btn-social">
          Portfolio
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped>
.cover-outer {
  position: relative;
  width: 100%;
  margin-bottom: 90px;
}

.cover-clip {
  overflow: hidden;
  border-radius: 16px;
}

.cover-img {
  width: 100%;
  height: auto;
  display: block;
}

.logo-img {
  position: absolute;
  bottom: -80px;
  left: 40px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--background-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.meta-row {
  padding-inline: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--liquid-border);
  margin-bottom: 40px;
}

.meta-info {
  display: flex;
  align-items: baseline;
  gap: 20px;
  flex-wrap: wrap;
  padding-left: 220px;
}

.meta-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--font-color);
  margin: 0;
  line-height: 1.2;
}

.meta-date {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.82rem;
  color: var(--font-color);
  opacity: 0.55;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .cover-outer {
    margin-bottom: 60px;
  }

  .logo-img {
    width: 96px;
    height: 96px;
    bottom: -48px;
    left: 16px;
  }

  .meta-row {
    padding-inline: 16px;
  }

  .meta-info {
    padding-left: 124px;
    gap: 8px;
    flex-direction: column;
    align-items: flex-start;
  }

  .meta-title {
    font-size: 1.2rem;
  }
}

.aws-campaign {
  --sb-purple: #A855F7;
  --sb-cyan: #22D3EE;
  --sb-pink: #F472B6;
  --sb-purple-soft: rgba(168, 85, 247, 0.12);
  --sb-cyan-soft: rgba(34, 211, 238, 0.1);
  --sb-pink-soft: rgba(244, 114, 182, 0.1);
  --sb-border: var(--liquid-border);
  --sb-card: var(--glass-bg);
  color: var(--font-color);
}

.hero-section {
  padding: 48px 0 24px;
  background: radial-gradient(ellipse 60% 50% at 0% 30%, rgba(168, 85, 247, 0.07) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 100% 70%, rgba(34, 211, 238, 0.06) 0%, transparent 70%);
  border-radius: 20px;
}

.campaign-title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--font-color);
}

.text-aws  { color: var(--sb-purple); }
.text-sky  { color: var(--sb-cyan); }
.text-pink { color: var(--sb-pink); }
.text-dim  { color: var(--font-color); opacity: 0.6; }

.campaign-sub {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--font-color);
  opacity: 0.65;
  max-width: 540px;
}

.btn-aws {
  background: linear-gradient(135deg, var(--sb-purple), var(--sb-cyan));
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  transition: opacity 0.25s, transform 0.25s, box-shadow 0.25s;
}

.btn-aws:hover, .btn-aws:focus {
  opacity: 0.88;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.35);
}

.btn-aws:disabled {
  opacity: 0.6;
  cursor: default;
  transform: none;
}

.btn-aws-outline {
  background: transparent;
  color: var(--sb-cyan);
  border: 1.5px solid var(--sb-cyan);
  font-weight: 600;
  border-radius: 10px;
  transition: background 0.25s, color 0.25s, transform 0.25s;
}

.btn-aws-outline:hover, .btn-aws-outline:focus {
  background: var(--sb-cyan-soft);
  color: var(--sb-cyan);
  transform: translateY(-2px);
}

.btn-liked {
  background: linear-gradient(135deg, var(--sb-pink), #c026d3);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: default;
}

.btn-social {
  background: transparent;
  color: var(--font-color);
  border: 1px solid var(--sb-border);
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 10px 20px;
  transition: color 0.25s, border-color 0.25s, transform 0.25s;
  opacity: 0.7;
}

.btn-social:hover {
  color: var(--sb-purple);
  border-color: rgba(168, 85, 247, 0.4);
  opacity: 1;
  transform: translateY(-2px);
}

.hero-globe {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: 1.5px solid rgba(168, 85, 247, 0.3);
  background: radial-gradient(circle at 30% 30%, rgba(244, 114, 182, 0.12), rgba(168, 85, 247, 0.1), rgba(34, 211, 238, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  animation: globePulse 4s ease-in-out infinite;
}

@keyframes globePulse {
  0%, 100% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.12); }
  50% { box-shadow: 0 0 60px rgba(168, 85, 247, 0.28); }
}

.globe-count {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--sb-purple), var(--sb-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.globe-goal {
  font-size: 1rem;
  opacity: 0.55;
  color: var(--font-color);
}

.globe-label {
  font-size: 0.78rem;
  opacity: 0.45;
  color: var(--font-color);
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.pill-aws {
  background: var(--sb-purple-soft);
  color: var(--sb-purple);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 50px;
  padding: 5px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pill-sky {
  background: var(--sb-cyan-soft);
  color: var(--sb-cyan);
  border: 1px solid rgba(34, 211, 238, 0.3);
  border-radius: 50px;
  padding: 5px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.aws-card {
  background: var(--sb-card);
  border: 1px solid var(--sb-border);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.metric-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
  cursor: default;
}

.metric-card:hover {
  transform: translateY(-5px);
  border-color: rgba(168, 85, 247, 0.3);
}

.metric-icon  { font-size: 2.2rem; margin-bottom: 10px; }
.metric-num   { font-size: 2.4rem; font-weight: 800; line-height: 1; }
.metric-label { font-size: 1rem; font-weight: 600; margin-top: 6px; color: var(--font-color); }
.metric-sub   { font-size: 0.82rem; opacity: 0.55; margin-top: 4px; color: var(--font-color); }

.progress-track {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  height: 12px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sb-purple), var(--sb-cyan));
  border-radius: 50px;
  width: 0%;
  transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-title {
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-weight: 800;
  color: var(--font-color);
  margin-bottom: 6px;
}

.section-sub {
  opacity: 0.6;
  color: var(--font-color);
  max-width: 500px;
  margin: 0 auto;
}

.step-badge {
  width: 40px;
  height: 40px;
  min-width: 40px;
  background: linear-gradient(135deg, var(--sb-purple), var(--sb-cyan));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #fff;
  font-size: 1rem;
}

.info-chip {
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.85rem;
  font-weight: 500;
}

.chip-orange {
  background: var(--sb-purple-soft);
  border: 1px solid rgba(168, 85, 247, 0.2);
  color: var(--font-color);
}

.chip-blue {
  background: var(--sb-cyan-soft);
  border: 1px solid rgba(34, 211, 238, 0.2);
  color: var(--font-color);
}

.profile-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--sb-border);
  transition: box-shadow 0.3s ease;
}

.profile-card:hover {
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.18);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 300px;
}

.qr-card {
  background: var(--glass-bg);
  border: 1px solid var(--sb-border);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.qr-card:hover {
  border-color: rgba(34, 211, 238, 0.35);
  box-shadow: 0 0 40px rgba(34, 211, 238, 0.12);
}

.qr-img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 12px;
  background: #fff;
  padding: 10px;
  animation: qrGlow 3s ease-in-out infinite;
}

@keyframes qrGlow {
  0%, 100% { box-shadow: 0 0 18px rgba(34, 211, 238, 0.2); }
  50% { box-shadow: 0 0 36px rgba(34, 211, 238, 0.45); }
}

.article-card {
  background: var(--liquid-surface-base);
  border: 1px solid var(--sb-border);
  border-radius: 16px;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-6px);
  border-color: rgba(168, 85, 247, 0.28);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
}

.article-title {
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.45;
  color: var(--font-color);
}

.article-excerpt {
  font-size: 0.86rem;
  line-height: 1.65;
  opacity: 0.6;
  color: var(--font-color);
}

.article-meta {
  font-size: 0.8rem;
  opacity: 0.45;
  color: var(--font-color);
}

.author-avatar {
  width: 52px;
  height: 52px;
  min-width: 52px;
  background: linear-gradient(135deg, var(--sb-pink), var(--sb-purple));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.3rem;
  color: #fff;
}

.bio-p {
  font-size: 0.96rem;
  line-height: 1.82;
  opacity: 0.75;
  color: var(--font-color);
  margin-bottom: 1rem;
}
</style>
