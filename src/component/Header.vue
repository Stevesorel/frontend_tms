<template>
  <!-- Header simple et épuré -->
  <header class="site-header">
    <!-- Logo principal -->
    <div class="logo-section">
      <div class="logo-wrapper">
        <h1 class="main-logo">TMS²</h1>
      </div>
    </div>

    <!-- Navigation simple -->
    <nav class="main-navigation" :class="{ 'menu-open': isOpen }">
      <!-- Bouton burger (mobile) -->
      <button 
        class="burger-button" 
        @click="toggleMenu"
        :aria-expanded="isOpen ? 'true' : 'false'"
        :aria-label="isOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
      >
        <span class="burger-icon">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </span>
      </button>

      <!-- Liens de navigation -->
      <div class="nav-links" :class="{ 'active': isOpen }">
        <div class="nav-container">
          <a 
            href="#noel" 
            class="nav-link"
            @click="handleNavClick($event, 'noel')"
          >
            <span class="link-text">Accueil</span>
          </a>
          
          <a 
            href="#formules" 
            class="nav-link"
            @click="handleNavClick($event, 'formules')"
          >
            <span class="link-text">Formules</span>
          </a>
          
          <a 
            href="#processus" 
            class="nav-link"
            @click="handleNavClick($event, 'processus')"
          >
            <span class="link-text">Processus</span>
          </a>
          
          <a 
            href="#contact" 
            class="nav-link"
            @click="handleNavClick($event, 'contact')"
          >
            <span class="link-text">Contact</span>
          </a>
        </div>
      </div>

      <!-- Bouton CTA simple -->
      <button class="cta-button" @click="scrollToContact">
        <span class="cta-text">Devis gratuit</span>
      </button>

      <!-- Overlay mobile -->
      <div 
        v-if="isOpen" 
        class="nav-overlay" 
        @click="closeMenu"
      ></div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function closeMenu() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function handleNavClick(event, section) {
  event.preventDefault()
  closeMenu()
  
  const targetElement = document.querySelector(`#${section}`)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

function scrollToContact() {
  closeMenu()
  const contactSection = document.querySelector('#contact')
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ===== HEADER ÉPURÉ ===== */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ===== LOGO SIMPLE ===== */
.logo-section {
  flex-shrink: 0;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.main-logo {
  font-size: 28px;
  font-weight: 800;
  color: rgb(86, 173, 255);
  margin: 0;
  letter-spacing: 1px;
  text-decoration: none;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ===== NAVIGATION SIMPLE ===== */
.main-navigation {
  display: flex;
  align-items: center;
  gap: 40px;
}
a{
    text-align: center;
}
/* Bouton burger (mobile seulement) */
.burger-button {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 101;
}

.burger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 24px;
  height: 18px;
}

.line {
  width: 100%;
  height: 2px;
  background: white;
  transition: transform 0.3s ease;
}

.menu-open .burger-icon .line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-open .burger-icon .line:nth-child(2) {
  opacity: 0;
}

.menu-open .burger-icon .line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Liens de navigation */
.nav-links {
  display: flex;
}

.nav-container {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.nav-link:hover {
  color: rgb(86, 173, 255);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(86, 173, 255);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Bouton CTA */
.cta-button {
  background: rgb(86, 173, 255);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.cta-button:hover {
  background: rgb(66, 153, 235);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(86, 173, 255, 0.3);
}

.cta-text {
  display: block;
}

/* Overlay mobile */
.nav-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

/* ===== RESPONSIVE DESIGN ===== */
@media screen and (max-width: 768px) {
  .site-header {
    padding: 15px 20px;
  }
  
  .main-navigation {
    gap: 20px;
  }
  
  .main-logo {
    font-size: 24px;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    padding: 80px 30px 30px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 100;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  .nav-links.active {
    transform: translateX(0);
  }
  
  .nav-container {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    background-color: rgb(80, 82, 89);
  }
  
  .nav-link {
    font-size: 18px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-link::after {
    display: none;
  }
  
  .burger-button {
    display: block;
  }
  
  .cta-button {
    position: fixed;
    bottom: 30px;
    left: 30px;
    right: 30px;
    width: calc(100% - 60px);
    padding: 15px;
    font-size: 16px;
    z-index: 101;
  }
  
  .nav-overlay {
    display: block;
  }
  
  /* Cacher le bouton CTA desktop */
  .main-navigation .cta-button:not(.mobile) {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .site-header {
    padding: 12px 15px;
  }
  
  .main-logo {
    font-size: 22px;
  }
  
  .nav-links {
    width: 100%;
  }
  
}

.link-text {
   text-align: center;
}

/* ===== ANIMATIONS SIMPLES ===== */
.nav-link,
.cta-button {
  transition: all 0.3s ease;
}

/* Focus states */
button:focus,
a:focus {
  /* outline: 2px solid rgb(86, 173, 255); */
  outline-offset: 3px;
  border-radius: 2px;
  border-bottom: 1px solid rgb(86, 173, 255);
}

/* Smooth transitions */
.nav-links {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.line {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>