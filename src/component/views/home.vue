<template>
  <section 
    id="home" 
    class="home" 
    aria-labelledby="hero-title"
    role="region"
    @keydown.left="prevSlide"
    @keydown.right="nextSlide"
    tabindex="0"
  >
    <!-- Slider optimisé avec lazy loading -->
    <div class="bg-slider">
      <div
        v-for="(img, index) in images"
        :key="img.src"
        class="bg-slide"
        :class="{ 
          active: index === currentIndex,
          loaded: img.loaded
        }"
        :data-src="img.src"
        :data-index="index"
        :style="index === currentIndex ? { '--bg-url': `url(${img.src})` } : {}"
        role="img"
        :aria-label="img.alt"
        :aria-hidden="index !== currentIndex"
      />
    </div>

    <div class="overlay" aria-hidden="true"></div>

    <div class="content">
      <header class="hero-text">
        <div class="trust-pill" role="note" aria-label="Note moyenne des clients">
          <span class="sr-only">Note moyenne : </span>
          ⭐ Expert Web noté 4.9/5 par nos clients
        </div>
        
        <h1 id="hero-title">
          Transformez vos visiteurs en clients grâce à un
          <span class="gradient-text">site web professionnel et performant</span>
        </h1>

        <p class="lead-text">
          Plus qu'un design, nous créons des outils de vente. Nos sites sont 
          <strong>optimisés SEO</strong> pour vous placer en tête des résultats Google.
        </p>

        <div class="btn-group">
          <button 
            @click="scrollToContact" 
            class="primary-btn"
            aria-label="Démarrer mon projet - Demander un devis gratuit"
          >
            <span>Démarrer mon projet</span>
            <span class="btn-icon" aria-hidden="true">🚀</span>
          </button>
          <a 
            href="https://chez-yves.vercel.app/"
            @click="scrollToPortfolio" 
            target="_blank"
            class="secondary-btn"
            aria-label="Voir nos réalisations"
          >
            <span>Voir nos réalisations</span>
                       <span class="btn-icon" aria-hidden="true">🚀</span>

        </a>
        </div>

        <div class="trust-badges" role="list" aria-label="Avantages">
          <span role="listitem">✅ <span class="badge-text">Devis gratuit 24h</span></span>
          <span role="listitem">🔒 <span class="badge-text">Paiement apres livraison</span></span>

          <span role="listitem">🛠️ <span class="badge-text">Support 7j/7</span></span>
        </div>
      </header>

      <section 
        class="services-section" 
        aria-labelledby="services-title"
        role="region"
      >
        <h2 id="services-title" class="section-title">
          <!-- Nos solutions web pour votre croissance -->
          <span class="sr-only">, trois services disponibles</span>
        </h2>
        <div class="services">
          <article 
            v-for="(service, index) in services" 
            :key="service.title" 
            class="service-card"
            :aria-label="service.title"
            :aria-posinset="index + 1"
            :aria-setsize="services.length"
          >
            <div class="service-icon" aria-hidden="true">{{ service.icon }}</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <div class="service-features" role="list">
              <span 
                v-for="feature in service.features" 
                :key="feature"
                role="listitem"
              >
                {{ feature }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section 
        class="why-us-section" 
        aria-labelledby="why-title"
        role="region"
      >
        <h2 id="why-title" class="section-title">
          Pourquoi nous choisir ?
          <span class="sr-only">, statistiques et avantages</span>
        </h2>

        <div class="stats-bar" role="list" aria-label="Statistiques">
          <div 
            v-for="stat in stats" 
            :key="stat.label" 
            class="stat-item"
            role="listitem"
          >
            <div class="stat-number">{{ stat.value }}</div>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>

        <div class="why-grid">
          <article 
            v-for="(item, index) in whyUs" 
            :key="item.title" 
            class="why-card"
            :aria-label="item.title"
            :aria-posinset="index + 1"
            :aria-setsize="whyUs.length"
          >
            <div class="why-icon" aria-hidden="true">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>
    </div>

    <!-- Contrôles du slider pour accessibilité -->
    <div class="slider-controls">
      <button 
        @click="prevSlide" 
        class="slider-control prev"
        aria-label="Image précédente"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button 
        @click="nextSlide" 
        class="slider-control next"
        aria-label="Image suivante"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>

    <!-- Indicateurs de slide -->
    <div class="slider-indicators" role="tablist" aria-label="Images du carrousel">
      <button
        v-for="(img, index) in images"
        :key="`indicator-${img.src}`"
        @click="goToSlide(index)"
        class="slider-indicator"
        :class="{ active: index === currentIndex }"
        :aria-label="`Aller à l'image ${index + 1}: ${img.alt}`"
        :aria-selected="index === currentIndex"
        role="tab"
      />
    </div>

    <!-- Annonceur pour lecteurs d'écran -->
    <div id="slide-announcer" class="sr-only" aria-live="polite" aria-atomic="true"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

// Données externalisées dans le composant pour l'exemple
// En production, mettre dans un fichier séparé : src/data/homeData.js
const images = ref([
  { 
    src: '/re.svg', 
    alt: 'Création de site internet professionnel à haute conversion',
    loaded: false
  },
  { 
    src: '/abo.svg', 
    alt: 'Expert en développement boutique e-commerce SEO',
    loaded: false
  }
])

const currentIndex = ref(0)
let intervalId = null
let sliderPaused = false

// Navigation slider
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

// Pause au survol pour UX
const pauseSlider = () => {
  sliderPaused = true
  clearInterval(intervalId)
}

const resumeSlider = () => {
  sliderPaused = false
  startSlider()
}

// Lazy loading des images
const preloadImages = () => {
  images.value.forEach((img, index) => {
    const image = new Image()
    image.onload = () => {
      images.value[index].loaded = true
    }
    image.onerror = () => {
      console.error(`Erreur de chargement de l'image: ${img.src}`)
      images.value[index].loaded = true // Marquer comme chargé même en erreur
    }
    image.src = img.src
  })
}

// Navigation clavier améliorée
const handleKeydown = (e) => {
  switch(e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      prevSlide()
      break
    case 'ArrowRight':
      e.preventDefault()
      nextSlide()
      break
    case ' ':
    case 'Spacebar':
      e.preventDefault()
      if (sliderPaused) resumeSlider()
      else pauseSlider()
      break
  }
}

const startSlider = () => {
  intervalId = setInterval(nextSlide, 5000)
}

// Scroll smooth vers les sections
const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  } else {
    // Fallback si la section n'existe pas encore
    window.location.hash = 'contact'
  }
}

const scrollToPortfolio = () => {
  const portfolioSection = document.getElementById('portfolio')
  if (portfolioSection) {
    portfolioSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  } else {
    // Fallback si la section n'existe pas encore
    window.location.hash = 'portfolio'
  }
}

// Injection des données structurées JSON-LD pour Google
const injectSchema = () => {
  // Vérifier si on est côté client
  if (typeof window === 'undefined') return
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Création de sites web",
    "provider": {
      "@type": "LocalBusiness",
      "name": "tms-company",
      "image": `${window.location.origin}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR"
      },
      "telephone": "+33-XX-XX-XX-XX",
      "priceRange": "€€"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "description": "Expert en création de sites vitrines et e-commerce optimisés pour le SEO et la vente.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Devis gratuit sous 24h"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150"
    }
  }
  
  // Vérifier si le script existe déjà
  const existingScript = document.querySelector('script[type="application/ld+json"][data-home-schema]')
  if (existingScript) {
    existingScript.remove()
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-home-schema', 'true')
  script.textContent = JSON.stringify(schema, null, 2)
  document.head.appendChild(script)
}

// Métadonnées SEO dynamiques (pour Vue standard)
const updateMetaTags = () => {
  if (typeof document === 'undefined') return
  
  // Mettre à jour le titre
  document.title = 'Création de sites web professionnels | tms-company'
  
  // Mettre à jour la meta description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    document.head.appendChild(metaDescription)
  }
  metaDescription.content = 'Boostez votre CA avec nos sites web optimisés SEO. Devis gratuit sous 24h. Sites vitrines et e-commerce.'
  
  // Mettre à jour les meta Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]')
  const ogDescription = document.querySelector('meta[property="og:description"]')
  
  if (ogTitle) ogTitle.content = 'Création de sites web professionnels | tms-company'
  if (ogDescription) ogDescription.content = 'Boostez votre CA avec nos sites web optimisés SEO'
}

// Données statiques
const services = ref([
  { 
    icon: '🌐', 
    title: 'Site Vitrine', 
    description: 'Idéal pour les artisans et PME.', 
    features: ['SEO optimisé', 'Mobile-first', 'Contact rapide'] 
  },
  { 
    icon: '🛒', 
    title: 'Boutique E-commerce', 
    description: 'Vendez vos produits 24h/24.', 
    features: ['Paiement sécurisé', 'Gestion stocks', 'Relance panier'] 
  },
  { 
    icon: '📈', 
    title: 'Audit & SEO', 
    description: 'Remontez en 1ère page Google.', 
    features: ['Analyse technique', 'Mots-clés', 'Netlinking'] 
  }
])

const stats = ref([
  { value: '250', label: 'Sites créés' },
  { value: 'x3', label: 'Trafic client moyen' },
  { value: '24h', label: 'Réponse devis' }
])

const whyUs = ref([
  { 
    icon: '🎨', 
    title: 'Design Unique', 
    text: 'Pas de template. Un site qui vous ressemble.' 
  },
  { 
    icon: '🛡️', 
    title: 'Maintenance Sécurisée', 
    text: 'Mises à jour et sécurité SSL incluses.' 
  },
  { 
    icon: '💰', 
    title: 'ROI Garanti', 
    text: 'Un site conçu pour rapporter de l\'argent.' 
  }
])

// Annoncer le changement de slide pour les lecteurs d'écran
const announceSlideChange = () => {
  const announcer = document.getElementById('slide-announcer')
  if (announcer) {
    announcer.textContent = `Image ${currentIndex.value + 1} de ${images.value.length}: ${images.value[currentIndex.value].alt}`
  }
}

// Lifecycle hooks
onMounted(() => {
  startSlider()
  preloadImages()
  injectSchema()
  updateMetaTags()
  document.addEventListener('keydown', handleKeydown)
  announceSlideChange()
  
  // Ajouter les événements de pause au survol
  const slider = document.querySelector('.home')
  if (slider) {
    slider.addEventListener('mouseenter', pauseSlider)
    slider.addEventListener('mouseleave', resumeSlider)
    slider.addEventListener('focusin', pauseSlider)
    slider.addEventListener('focusout', resumeSlider)
  }
})

onUnmounted(() => {
  clearInterval(intervalId)
  document.removeEventListener('keydown', handleKeydown)
  
  const slider = document.querySelector('.home')
  if (slider) {
    slider.removeEventListener('mouseenter', pauseSlider)
    slider.removeEventListener('mouseleave', resumeSlider)
    slider.removeEventListener('focusin', pauseSlider)
    slider.removeEventListener('focusout', resumeSlider)
  }
})

// Watch pour l'accessibilité des annonces de changement de slide
watch(currentIndex, (newIndex, oldIndex) => {
  if (newIndex !== oldIndex) {
    announceSlideChange()
  }
})
</script>

<style scoped>
/* Variables CSS pour la cohérence */
.home {
  --color-primary: #6a1b9a;
  --color-primary-hover: #8e24aa;
  --color-accent: #00ffff;
  --color-accent-secondary: #bc66ff;
  --bg-overlay: linear-gradient(135deg, rgba(20, 5, 55, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%);
  --transition-speed: 0.3s;
  --border-radius: 1.25rem; /* 20px */
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Reset et bases */
.home {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh; /* Support mobile moderne */
  padding: clamp(4rem, 8vw, 6rem) 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  outline: none; /* Pour focus custom */
}

.home:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.bg-slider, .overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
}

/* Slider optimisé */
.bg-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;
}

.bg-slide.active {
  opacity: 1;
}

.bg-slide.active:not(.loaded) {
  background-color: rgba(0, 0, 0, 0.1);
}

.bg-slide.active.loaded {
  background-image: var(--bg-url);
}

.overlay {
  background: var(--bg-overlay);
  backdrop-filter: blur(2px);
}

/* Contenu principal */
.content {
  max-width: 75rem; /* 1200px */
  width: 100%;
  color: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: clamp(4rem, 10vw, 6rem);
}

/* Hero Section */
.hero-text {
  text-align: center;
  max-width: 56.25rem; /* 900px */
  margin: 0 auto;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.trust-pill {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(0, 255, 255, 0.4);
  border-radius: 3.125rem; /* 50px */
  font-size: clamp(0.875rem, 2vw, 1rem);
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  color: var(--color-accent);
  font-weight: 600;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.6s ease-out 0.2s both;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientShift 3s ease-in-out infinite;
}

.lead-text {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: #e0e0e0;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 48rem; /* 768px */
  margin-left: auto;
  margin-right: auto;
}

/* Boutons */
.btn-group {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.primary-btn, .secondary-btn {
  padding: 1.125rem 2.1875rem; /* 18px 35px */
  border-radius: 3.125rem; /* 50px */
  font-weight: 700;
  text-decoration: none;
  transition: all var(--transition-speed) ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  min-height: 3.5rem;
}

.primary-btn {
  background: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-lg);
}

.primary-btn:hover, .primary-btn:focus {
  transform: translateY(-3px);
  background: var(--color-primary-hover);
  box-shadow: 0 15px 30px rgba(106, 27, 154, 0.4);
}

.primary-btn:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

.secondary-btn {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.9);
  color: white;
}

.secondary-btn:hover, .secondary-btn:focus {
  background: white;
  color: black;
  border-color: white;
}

.secondary-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.btn-icon {
  font-size: 1.2em;
}

/* Badges de confiance */
.trust-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5625rem; /* 25px */
  font-size: clamp(0.875rem, 1.5vw, 0.9375rem);
  color: #ccc;
  flex-wrap: wrap;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 3.125rem; /* 50px */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease-out 0.4s both;
}

.trust-badges span {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.badge-text {
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;

}

/* Grilles */
.services, .why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: 1.5625rem; /* 25px */
}

.service-card, .why-card {
  background: rgba(255, 255, 255, 0.05);
  padding: clamp(2rem, 4vw, 2.5rem);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  backdrop-filter: blur(10px);
}

.service-card:hover, .service-card:focus-within {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-0.625rem); /* -10px */
  border-color: rgba(0, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.service-icon, .why-icon {
  font-size: 3rem;
  margin-bottom: 1.25rem;
  display: inline-block;
}

.service-card h3, .why-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.service-card p, .why-card p {
  color: #d1d1d1;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem; /* 10px */
  justify-content: center;
  margin-top: 1.25rem;
}

.service-features span {
  background: rgba(0, 255, 255, 0.1);
  color: var(--color-accent);
  padding: 0.375rem 0.75rem;
  border-radius: 0.625rem; /* 10px */
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(0, 255, 255, 0.2);
}

/* Statistiques */
.stats-bar {
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.05);
  padding: clamp(2rem, 4vw, 2.5rem);
  border-radius: var(--border-radius);
  margin-bottom: 2.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  flex: 1;
  min-width: 10rem;
}

.stat-number {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #ccc;
  font-size: 1rem;
  font-weight: 500;
}

/* Contrôles du slider */
.slider-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
  z-index: 3;
}

.slider-control {
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  font-size: 1.5rem;
  backdrop-filter: blur(10px);
}

.slider-control:hover, .slider-control:focus {
  background: rgba(0, 0, 0, 0.8);
  border-color: var(--color-accent);
  transform: scale(1.1);
}

.slider-control:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Indicateurs de slide */
.slider-indicators {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  z-index: 3;
}

.slider-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  padding: 0;
}

.slider-indicator:hover, .slider-indicator:focus {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.slider-indicator.active {
  background: var(--color-accent);
  transform: scale(1.2);
}

.slider-indicator:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

/* Classes utilitaires */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Responsive */
@media (max-width: 48rem) { /* 768px */
  .home {
    padding: 3rem 1rem;
  }
  
  .btn-group {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-group button {
    width: 100%;
    max-width: 20rem;
  }
  
  .stats-bar {
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
  }
  
  .trust-badges {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .slider-controls {
    display: none; /* Cacher sur mobile pour économiser l'espace */
  }
  
  .service-card, .why-card {
    padding: 1.5rem;
  }
}

/* Support tactile */
@media (hover: none) and (pointer: coarse) {
  .service-card:hover {
    transform: none;
  }
  
  .slider-control {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }
}

/* Mode préférence mouvement réduit */
@media (prefers-reduced-motion: reduce) {
  .home *,
  .home *::before,
  .home *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .bg-slide {
    transition: none;
  }
}

/* Dark mode support (si le site a un toggle) */
@media (prefers-color-scheme: dark) {
  .service-card, .why-card, .stats-bar {
    background: rgba(0, 0, 0, 0.3);
  }
}

/* Support navigateurs plus anciens */
@supports not (backdrop-filter: blur(10px)) {
  .trust-pill,
  .service-card,
  .why-card,
  .stats-bar,
  .slider-control {
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>