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

onMounted(() => {
  const img = coverImgRef.value
  if (img) {
    if (img.complete && img.naturalWidth) applyCrop()
    else img.addEventListener('load', applyCrop)
    window.addEventListener('resize', applyCrop)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', applyCrop)
})

const courses = computed(() =>
  (props.content?.courses ?? []).map((item, i) => {
    if (typeof item === 'string') return { url: item, index: i + 1 }
    return { url: item.url ?? '#', index: i + 1, label: item.label }
  })
)

const contributorId = computed(() => props.content?.contributorId ?? '')

function courseUrl(url) {
  if (!url || url === '#') return '#'
  if (contributorId.value && !url.includes(contributorId.value)) {
    return url + (url.includes('?') ? '&' : '?') + contributorId.value
  }
  return url
}
</script>

<template>
  <div class="ms-page">

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

    <div class="section mb-5">
      <div class="row g-4 align-items-center">
        <div class="col-lg-7">
          <span class="pill-ms mb-3 d-inline-block">Programa global de Microsoft</span>
          <h2 class="section-title mb-3">¿Qué es el Microsoft Learn Student Ambassador?</h2>
          <p class="section-body mb-3">
            El programa <strong>Microsoft Learn Student Ambassador (MLSA)</strong> es una iniciativa global que selecciona a estudiantes apasionados por la tecnología para convertirse en líderes dentro de sus universidades y comunidades. Como embajador, organizo talleres, eventos y sesiones de aprendizaje para impulsar el conocimiento sobre tecnologías de Microsoft como Azure, IA, GitHub y más.
          </p>
          <p class="section-body mb-4">
            El programa reconoce el impacto con un sistema de niveles: a mayor actividad y alcance, mayor nivel. Cada nivel desbloquea beneficios exclusivos como créditos de Azure, certificaciones y acceso anticipado a herramientas de Microsoft.
          </p>
          <div class="d-flex flex-wrap gap-2">
            <span class="benefit-chip">☁️ Créditos Azure</span>
            <span class="benefit-chip">🎓 Certificaciones gratuitas</span>
            <span class="benefit-chip">🌐 Red global de estudiantes</span>
            <span class="benefit-chip">🛠️ Acceso anticipado a herramientas</span>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="ms-card p-4 h-100 d-flex flex-column gap-3">
            <div class="d-flex align-items-center gap-3">
              <div class="ms-icon-box">
                <svg width="22" height="22" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
                  <rect x="11" y="0" width="10" height="10" fill="#7FBA00"/>
                  <rect x="0" y="11" width="10" height="10" fill="#00A4EF"/>
                  <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
                </svg>
              </div>
              <span class="fw-bold fs-6">Mi rol como embajador</span>
            </div>

            <div class="level-progress-row">
              <div class="level-node active">
                <div class="level-dot"></div>
                <div class="level-name">Alpha</div>
                <div class="level-status">Nivel actual</div>
              </div>
              <div class="level-line"></div>
              <div class="level-node target">
                <div class="level-dot"></div>
                <div class="level-name">Associate</div>
                <div class="level-status">Mi meta</div>
              </div>
              <div class="level-line inactive"></div>
              <div class="level-node">
                <div class="level-dot inactive-dot"></div>
                <div class="level-name muted">Senior</div>
                <div class="level-status muted">Futuro</div>
              </div>
            </div>

            <p class="role-context">
              Actualmente soy <strong>Alpha Ambassador</strong>, el nivel de entrada del programa. Estoy construyendo mi trayectoria organizando eventos, creando contenido técnico y ampliando mi impacto en la comunidad estudiantil para alcanzar el nivel <strong>Associate</strong>.
            </p>

            <ul class="role-list">
              <li>Organizar talleres y eventos técnicos en mi universidad</li>
              <li>Crear y compartir contenido sobre tecnologías Microsoft</li>
              <li>Guiar a compañeros en su aprendizaje con Microsoft Learn</li>
              <li>Acumular actividad para avanzar al nivel Associate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="section mb-5">
      <div class="text-center mb-4">
        <span class="pill-ms mb-2 d-inline-block">Trayectoria</span>
        <h2 class="section-title">Niveles del programa</h2>
        <p class="section-sub">El progreso se mide por impacto real en la comunidad</p>
      </div>

      <div class="row g-4">
        <div class="col-md-4">
          <div class="tier-card tier-alpha h-100 p-4">
            <div class="tier-badge mb-3">Alpha</div>
            <h5 class="fw-bold mb-2">Nivel de entrada</h5>
            <p class="tier-desc">Punto de partida del programa. Se enfoca en organizar eventos y comenzar a construir comunidad en la universidad.</p>
            <div class="tier-tag">Nivel inicial</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="tier-card tier-associate h-100 p-4">
            <div class="tier-badge mb-3">Associate</div>
            <h5 class="fw-bold mb-2">Impacto creciente</h5>
            <p class="tier-desc">El embajador demuestra impacto consistente, liderando proyectos y colaborando con otros embajadores a nivel regional.</p>
            <div class="tier-tag">Nivel intermedio</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="tier-card tier-senior h-100 p-4">
            <div class="tier-badge mb-3">Senior</div>
            <h5 class="fw-bold mb-2">Liderazgo global</h5>
            <p class="tier-desc">Reconocimiento al liderazgo excepcional. Mentores de otros embajadores y representantes clave del programa a nivel mundial.</p>
            <div class="tier-tag">Nivel avanzado</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="courses.length > 0" class="section mb-4">
      <div class="text-center mb-4">
        <span class="pill-blue mb-2 d-inline-block">Microsoft Learn</span>
        <h2 class="section-title">Planes de aprendizaje</h2>
        <p class="section-sub">Contenido curado para que aprendas tecnologías Microsoft a tu ritmo, completamente gratis.</p>
      </div>

      <div class="row g-4">
        <div v-for="course in courses" :key="course.index" class="col-md-6 col-lg-4">
          <div class="course-card h-100 p-4 d-flex flex-column">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="learn-icon">
                <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
                  <rect x="11" y="0" width="10" height="10" fill="#7FBA00"/>
                  <rect x="0" y="11" width="10" height="10" fill="#00A4EF"/>
                  <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
                </svg>
              </div>
              <span class="pill-blue">Microsoft Learn</span>
            </div>
            <h5 class="course-title flex-grow-1 mb-3">
              {{ course.label ?? `Plan de Aprendizaje #${course.index}` }}
            </h5>
            <p class="course-desc mb-3">Ruta de aprendizaje estructurada con módulos interactivos, ejercicios prácticos y evaluaciones para validar tu progreso.</p>
            <a :href="courseUrl(course.url)" target="_blank" rel="noopener" class="btn btn-ms w-100 mt-auto">
              Ver plan de aprendizaje
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.ms-page {
  --ms-blue: #0078D4;
  --ms-navy: #1B3A6B;
  --ms-cyan: #50E6FF;
  --ms-light: #4FC3F7;
  --ms-border: var(--liquid-border);
  --ms-card: var(--glass-bg);
}

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

.section {
  padding: 0;
}

.section-title {
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-weight: 800;
  color: var(--font-color);
  margin-bottom: 6px;
}

.section-body {
  font-size: 0.96rem;
  line-height: 1.8;
  color: var(--font-color);
  opacity: 0.75;
}

.section-sub {
  font-size: 0.94rem;
  color: var(--font-color);
  opacity: 0.6;
  max-width: 500px;
  margin: 0 auto;
}

.pill-ms {
  background: rgba(0, 120, 212, 0.12);
  color: var(--ms-blue);
  border: 1px solid rgba(0, 120, 212, 0.28);
  border-radius: 50px;
  padding: 5px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pill-blue {
  background: rgba(80, 230, 255, 0.1);
  color: var(--ms-cyan);
  border: 1px solid rgba(80, 230, 255, 0.28);
  border-radius: 50px;
  padding: 5px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.benefit-chip {
  background: var(--glass-bg);
  border: 1px solid var(--ms-border);
  border-radius: 50px;
  padding: 6px 14px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--font-color);
  backdrop-filter: blur(8px);
}

.ms-card {
  background: var(--ms-card);
  border: 1px solid var(--ms-border);
  border-radius: 16px;
  backdrop-filter: blur(8px);
}

.ms-icon-box {
  width: 40px;
  height: 40px;
  background: var(--glass-bg);
  border: 1px solid var(--ms-border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.level-progress-row {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 12px 0;
}

.level-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.level-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ms-blue), var(--ms-cyan));
  box-shadow: 0 0 10px rgba(0, 120, 212, 0.5);
}

.inactive-dot {
  background: var(--liquid-border);
  box-shadow: none;
}

.level-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--font-color);
}

.level-name.muted {
  opacity: 0.35;
}

.level-status {
  font-size: 0.7rem;
  color: var(--ms-blue);
  font-weight: 600;
}

.level-status.muted {
  color: var(--font-color);
  opacity: 0.35;
}

.level-node.target .level-dot {
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
  animation: targetPulse 2s ease-in-out infinite;
}

.level-node.target .level-status {
  color: #8B5CF6;
}

@keyframes targetPulse {
  0%, 100% { box-shadow: 0 0 8px rgba(139, 92, 246, 0.4); }
  50% { box-shadow: 0 0 18px rgba(139, 92, 246, 0.7); }
}

.level-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, var(--ms-blue), #8B5CF6);
  margin-bottom: 22px;
}

.level-line.inactive {
  background: var(--liquid-border);
}

.role-context {
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--font-color);
  opacity: 0.75;
  margin: 0;
}

.role-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.role-list li {
  font-size: 0.9rem;
  color: var(--font-color);
  opacity: 0.8;
  padding-left: 20px;
  position: relative;
  line-height: 1.5;
}

.role-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ms-blue), var(--ms-cyan));
}

.tier-card {
  border-radius: 16px;
  border: 1px solid var(--ms-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tier-card:hover {
  transform: translateY(-5px);
}

.tier-alpha {
  background: linear-gradient(160deg, rgba(0, 196, 180, 0.08) 0%, rgba(46, 182, 125, 0.06) 100%);
  border-color: rgba(0, 196, 180, 0.2);
}

.tier-alpha:hover {
  box-shadow: 0 16px 36px rgba(0, 196, 180, 0.12);
}

.tier-associate {
  background: linear-gradient(160deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.06) 100%);
  border-color: rgba(139, 92, 246, 0.2);
}

.tier-associate:hover {
  box-shadow: 0 16px 36px rgba(139, 92, 246, 0.12);
}

.tier-senior {
  background: linear-gradient(160deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.06) 100%);
  border-color: rgba(245, 158, 11, 0.2);
}

.tier-senior:hover {
  box-shadow: 0 16px 36px rgba(245, 158, 11, 0.12);
}

.tier-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 50px;
}

.tier-alpha .tier-badge {
  background: rgba(0, 196, 180, 0.15);
  color: #00C4B4;
  border: 1px solid rgba(0, 196, 180, 0.3);
}

.tier-associate .tier-badge {
  background: rgba(139, 92, 246, 0.15);
  color: #8B5CF6;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.tier-senior .tier-badge {
  background: rgba(245, 158, 11, 0.15);
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.tier-desc {
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--font-color);
  opacity: 0.7;
}

.tier-tag {
  font-size: 0.78rem;
  color: var(--font-color);
  opacity: 0.45;
  font-weight: 600;
  margin-top: 12px;
}

.course-card {
  background: var(--glass-bg);
  border: 1px solid var(--ms-border);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 120, 212, 0.35);
  box-shadow: 0 16px 36px rgba(0, 120, 212, 0.1);
}

.learn-icon {
  width: 36px;
  height: 36px;
  background: var(--liquid-surface-base);
  border: 1px solid var(--ms-border);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.course-title {
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.45;
  color: var(--font-color);
}

.course-desc {
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--font-color);
  opacity: 0.6;
}

.btn-ms {
  background: linear-gradient(135deg, var(--ms-blue), #1e6ebf);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  transition: opacity 0.25s, transform 0.25s, box-shadow 0.25s;
}

.btn-ms:hover, .btn-ms:focus {
  opacity: 0.88;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 120, 212, 0.35);
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
</style>
