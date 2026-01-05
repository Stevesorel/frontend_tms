<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Section copyright -->
      <div class="footer-section copyright-section">
        <div class="copyright-content">
          <p class="copyright-text">
            &copy; 2026 <span class="brand">Smartkms</span> - Tous droits réservés
          </p>
          <p class="company-info">
            Création de sites web professionnels et performants
          </p>
        </div>
      </div>

      <!-- Section réseaux sociaux -->
      <div class="footer-section social-section">
        <div class="social-container">
          <h3 class="social-title" id="social-links-title">
            <span class="social-icon" aria-hidden="true">🌐</span>
            Nos réseaux
          </h3>
          
          <div class="social-links" aria-labelledby="social-links-title">
            <!-- WhatsApp -->
            <a 
              href="https://wa.me/237650536195" 
              class="social-link whatsapp-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact WhatsApp (ouvre une nouvelle fenêtre)"
              @click="trackSocialClick('whatsapp')"
            >
              <div class="social-icon-wrapper">
                <img 
                  src="/whatsapp.jpeg" 
                  alt="Logo WhatsApp" 
                  class="social-logo"
                  loading="lazy"
                />
              </div>
              <span class="social-label">WhatsApp</span>
              <span class="social-hint">Contact rapide</span>
            </a>

            <!-- Email -->
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=motcheyostevesoreltamwo@gmail.com&su=Contact%20TMS%C2%B2" 
              class="social-link email-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Envoyer un email (ouvre une nouvelle fenêtre)"
              @click="trackSocialClick('email')"
            >
              <div class="social-icon-wrapper">
                <img 
                  src="/email.png" 
                  alt="Logo Gmail" 
                  class="social-logo"
                  loading="lazy"
                />
              </div>
              <span class="social-label">Email</span>
              <span class="social-hint">Devis & informations</span>
            </a>

            <!-- LinkedIn -->
            <a 
              href="https://www.linkedin.com/in/steve-motcheyo-3540a5360/" 
              class="social-link linkedin-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil LinkedIn (ouvre une nouvelle fenêtre)"
              @click="trackSocialClick('linkedin')"
            >
              <div class="social-icon-wrapper">
                <img 
                  src="/linkdin.png" 
                  alt="Logo LinkedIn" 
                  class="social-logo"
                  loading="lazy"
                />
              </div>
              <span class="social-label">LinkedIn</span>
              <span class="social-hint">Réseau professionnel</span>
            </a>

            <!-- Telegram (commenté) -->
            <!--
            <a href="" class="social-link telegram-link" target="_blank" rel="noopener noreferrer">
              <div class="social-icon-wrapper">
                <img src="/telegram.png" alt="Logo Telegram" class="social-logo" loading="lazy" />
              </div>
              <span class="social-label">Telegram</span>
            </a>
            -->

            <!-- Instagram (commenté) -->
            <!--
            <a href="" class="social-link instagram-link" target="_blank" rel="noopener noreferrer">
              <div class="social-icon-wrapper">
                <img src="/instagram.jpeg" alt="Logo Instagram" class="social-logo" loading="lazy" />
              </div>
              <span class="social-label">Instagram</span>
            </a>
            -->
          </div>
        </div>
      </div>

      <!-- Section CTA -->
      <div class="footer-section cta-section">
        <div class="cta-container">
          <div class="cta-icon" aria-hidden="true">💬</div>
          <h4 class="cta-title">Contactez-nous</h4>
          <p class="cta-text">
            Prêt à démarrer votre projet web ? Contactez-nous via ces réseaux sociaux
          </p>
          
          <button 
            class="cta-button"
            @click="scrollToContact"
            aria-label="Aller à la section contact"
          >
            <span class="button-icon" aria-hidden="true">🚀</span>
            <span class="button-text">Démarrer mon projet</span>
          </button>
        </div>
      </div>

      <!-- Retour en haut -->
      <button 
        class="back-to-top"
        @click="scrollToTop"
        aria-label="Retour en haut de la page"
        :class="{ 'visible': showBackToTop }"
      >
        <span class="arrow-icon" aria-hidden="true">↑</span>
        <span class="back-text">Haut</span>
      </button>

      <!-- Mentions légales -->
      <div class="legal-links">
        <!-- <a 
          href="#" 
          class="legal-link"
          @click.prevent="openModal('mentions')"
          aria-label="Voir les mentions légales"
        >
          Mentions légales
        </a>
        <span class="separator">•</span>
        <a 
          href="#" 
          class="legal-link"
          @click.prevent="openModal('confidentialite')"
          aria-label="Voir la politique de confidentialité"
        >
          Confidentialité
        </a>
        <span class="separator">•</span>
        <a 
          href="#" 
          class="legal-link"
          @click.prevent="openModal('cookies')"
          aria-label="Gérer les cookies"
        >
          Cookies
        </a> -->
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// États
const showBackToTop = ref(false)

// Suivi des clics sur les réseaux sociaux
const trackSocialClick = (platform) => {
  // Ici, vous pouvez intégrer Google Analytics, Facebook Pixel, etc.
  console.log(`Social click tracked: ${platform}`)
  
  // Exemple avec Google Analytics (à décommenter si configuré)
  /*
  if (window.gtag) {
    window.gtag('event', 'social_click', {
      event_category: 'Social',
      event_label: platform,
      value: 1
    })
  }
  */
}

// Défilement vers le haut
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Défilement vers la section contact
const scrollToContact = () => {
  const contactSection = document.querySelector('#contact')
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// Ouvrir les modales (à implémenter selon vos besoins)
const openModal = (type) => {
  // À implémenter selon votre système de modales
  console.log(`Opening modal: ${type}`)
  alert(`Fonctionnalité ${type} à implémenter`)
}

// Gestion du bouton "Retour en haut"
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// Cycle de vie
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Initial check
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Exposer les méthodes si besoin
defineExpose({
  scrollToTop,
  scrollToContact,
  trackSocialClick
})
</script>

<style scoped>
/* ===== FOOTER PRINCIPAL ===== */
.site-footer {
  background: linear-gradient(135deg, #000000 0%, #0a0a2a 100%);
  color: white;
  padding: 40px 20px 30px;
  border-top: 3px solid #00d4ff;
  /* margin-top: 60px; */
  position: relative;
  overflow: hidden;
}

.site-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
}

/* ===== CONTAINER PRINCIPAL ===== */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  position: relative;
}

/* ===== SECTIONS DU FOOTER ===== */
.footer-section {
  padding: 25px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.footer-section:hover {
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
}

/* Section Copyright */
.copyright-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.copyright-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.copyright-text {
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.copyright-text .brand {
  color: #00d4ff;
  font-weight: 700;
  font-size: 1.2em;
}

.company-info {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* Section Réseaux Sociaux */
.social-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.social-title {
  margin: 0;
  font-size: 18px;
  color: #00d4ff;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.social-icon {
  font-size: 20px;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 15px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link:hover {
  transform: translateY(-5px) scale(1.05);
  border-color: currentColor;
}

.social-link:focus {
  outline: 3px solid #00d4ff;
  outline-offset: 2px;
  border-radius: 10px;
}

/* Couleurs spécifiques pour chaque réseau */
.whatsapp-link:hover {
  background: rgba(37, 211, 102, 0.1);
  color: #25D366;
  border-color: #25D366;
}

.email-link:hover {
  background: rgba(234, 67, 53, 0.1);
  color: #EA4335;
  border-color: #EA4335;
}

.linkedin-link:hover {
  background: rgba(10, 102, 194, 0.1);
  color: #0A66C2;
  border-color: #0A66C2;
}

.social-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.social-link:hover .social-icon-wrapper {
  transform: scale(1.1);
  border-color: currentColor;
}

.social-logo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.social-link:hover .social-logo {
  transform: scale(1.1);
}

.social-label {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 5px;
  transition: color 0.3s ease;
}

.social-link:hover .social-label {
  color: currentColor;
}

.social-hint {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 1.3;
}

/* Section CTA */
.cta-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
}

.cta-icon {
  font-size: 40px;
  margin-bottom: 10px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.cta-title {
  margin: 0;
  font-size: 20px;
  color: #00d4ff;
  font-weight: 700;
}

.cta-text {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  max-width: 250px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #00d4ff, #6a11cb);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 212, 255, 0.4);
}

.cta-button:focus {
  outline: 3px solid white;
  outline-offset: 2px;
}

.button-icon {
  font-size: 18px;
}

.button-text {
  font-size: 15px;
}

/* ===== BOUTON RETOUR EN HAUT ===== */
.back-to-top {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 212, 255, 0.2);
  border: 2px solid rgba(0, 212, 255, 0.5);
  color: #00d4ff;
  padding: 10px 15px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: rgba(0, 212, 255, 0.3);
  transform: translateY(-3px);
}

.back-to-top:focus {
  outline: 2px solid #00d4ff;
  outline-offset: 2px;
}

.arrow-icon {
  font-size: 18px;
}

.back-text {
  font-size: 14px;
}

/* ===== LIENS LÉGAUX ===== */
.legal-links {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
}

.legal-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 13px;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 5px;
}

.legal-link:hover {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
}

.legal-link:focus {
  outline: 2px solid #00d4ff;
  outline-offset: 2px;
}

.separator {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
}

/* ===== RESPONSIVE DESIGN ===== */
@media screen and (max-width: 1024px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  .cta-section {
    grid-column: span 2;
  }
  
  .social-links {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .cta-section {
    grid-column: 1;
  }
  
  .social-links {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  
  .social-link {
    padding: 12px 8px;
  }
  
  .social-icon-wrapper {
    width: 45px;
    height: 45px;
  }
  
  .social-logo {
    width: 25px;
    height: 25px;
  }
  
  .back-to-top {
    position: static;
    margin-top: 20px;
    align-self: center;
    opacity: 1;
    visibility: visible;
    transform: none;
  }
  
  .back-to-top.visible {
    opacity: 1;
    transform: none;
  }
  
  .site-footer {
    padding: 30px 15px 25px;
  }
  
  .footer-section {
    padding: 20px;
  }
  
  .legal-links {
    gap: 10px;
  }
  
  .legal-link {
    font-size: 12px;
    padding: 4px 8px;
  }
}

@media screen and (max-width: 480px) {
  .social-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .footer-section {
    padding: 15px;
  }
  
  .copyright-text {
    font-size: 14px;
  }
  
  .company-info {
    font-size: 13px;
  }
  
  .social-title {
    font-size: 16px;
  }
  
  .cta-title {
    font-size: 18px;
  }
  
  .cta-text {
    font-size: 13px;
  }
  
  .cta-button {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .social-link {
    padding: 10px 6px;
  }
  
  .social-label {
    font-size: 13px;
  }
  
  .social-hint {
    font-size: 10px;
  }
  
  .cta-icon {
    font-size: 35px;
  }
  
  .legal-links {
    gap: 8px;
    font-size: 11px;
  }
}

/* ===== ANIMATIONS & TRANSITIONS ===== */
.footer-section,
.social-link,
.cta-button,
.back-to-top,
.legal-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles pour l'accessibilité */
button:focus,
a:focus {
  outline: 3px solid #00d4ff;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Animation d'apparition des sections */
.footer-section {
  animation: slideUp 0.5s ease-out;
  animation-fill-mode: both;
}

.footer-section:nth-child(1) { animation-delay: 0.1s; }
.footer-section:nth-child(2) { animation-delay: 0.2s; }
.footer-section:nth-child(3) { animation-delay: 0.3s; }

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
