<template>
  <div v-if="showPromotion" id="noel" class="noel-promo-top">
    <!-- Flocons de neige animés en arrière-plan -->
    <div class="snow-background">
      <div v-for="n in 30" :key="n" 
           class="snow-particle" 
           :style="getSnowStyle(n)"></div>
    </div>
    
    <!-- Contenu principal -->
    <div class="promo-content-wrapper">
      <!-- Logo Noël -->
      <div class="christmas-icons">
        <span class="icon-large santa">🎅</span>
        <span class="icon-large tree">🎄</span>
      </div>
      
      <!-- Message principal -->
      <div class="promo-message">
        <h1 class="promo-title">
          <span class="sparkle">✨</span>
          OFFRE EXCEPTIONNELLE DE NOËL
          <span class="sparkle">✨</span>
        </h1>
        
        <div class="discount-display">
          <div class="discount-circle">
            <span class="discount-amount">-5%</span>
            <span class="discount-text">sur toutes nos offres</span>
          </div>
          
          <div class="gift-icons">
            <span class="gift">🎁</span>
            <span class="bell">🔔</span>
            <span class="gift">🎁</span>
          </div>
        </div>
        
        <p class="promo-subtitle">
          Le Père Noël vous offre une réduction spéciale pour célébrer les fêtes !
        </p>
      </div>
      
      <!-- Compteur Noël -->
      <div class="christmas-countdown">
        <div class="countdown-header">
          <span class="clock-icon">⏰</span>
          <h3>L'offre expire dans :</h3>
          <span class="clock-icon">⏰</span>
        </div>
        
        <div class="countdown-display">
          <div class="time-unit">
            <div class="time-value">{{ formattedTime.days }}</div>
            <div class="time-label">JOURS</div>
          </div>
          
          <div class="time-separator">:</div>
          
          <div class="time-unit">
            <div class="time-value">{{ formattedTime.hours }}</div>
            <div class="time-label">HEURES</div>
          </div>
          
          <div class="time-separator">:</div>
          
          <div class="time-unit">
            <div class="time-value">{{ formattedTime.minutes }}</div>
            <div class="time-label">MINUTES</div>
          </div>
          
          <div class="time-separator">:</div>
          
          <div class="time-unit">
            <div class="time-value">{{ formattedTime.seconds }}</div>
            <div class="time-label">SECONDES</div>
          </div>
        </div>
        
        <div class="deadline-info">
          <span class="calendar-icon">📅</span>
          Jusqu'au 31 décembre 23h59
          <span class="calendar-icon">📅</span>
        </div>
      </div>
      
      <!-- Bouton d'action -->
      <div class="action-buttons">
        <button class="primary-action" @click="goToContact">
          <span class="button-icon">🎅</span>
          Profiter de l'offre maintenant
          <span class="button-icon">🎄</span>
        </button>
        
        <button class="secondary-action" @click="showDetails = !showDetails">
          <span class="button-icon">ℹ️</span>
          {{ showDetails ? 'Masquer' : 'Voir' }} les détails
        </button>
      </div>
      
      <!-- Détails de l'offre -->
      <div v-if="showDetails" class="offer-details">
        <div class="details-content">
          <h4>🎁 Nos offres incluent :</h4>
          <div class="offer-list">
            <div class="offer-item">
              <span class="check-mark">✅</span>
              <span class="offer-name">Sites Vitrines</span>
              <span class="offer-price">-5%</span>
            </div>
            <div class="offer-item">
              <span class="check-mark">✅</span>
              <span class="offer-name">Sites E-commerce</span>
              <span class="offer-price">-5%</span>
            </div>
            <div class="offer-item">
              <span class="check-mark">✅</span>
              <span class="offer-name">Applications Web</span>
              <span class="offer-price">-5%</span>
            </div>
            <div class="offer-item">
              <span class="check-mark">✅</span>
              <span class="offer-name">Services SEO</span>
              <span class="offer-price">-5%</span>
            </div>
            <div class="offer-item">
              <span class="check-mark">✅</span>
              <span class="offer-name">Maintenance</span>
              <span class="offer-price">-5%</span>
            </div>
            <div class="offer-item">
              <span class="check-mark">✅</span>
              <span class="offer-name">Formations</span>
              <span class="offer-price">-5%</span>
            </div>
          </div>
          
          <div class="conditions">
            <p class="condition-note">
              <span class="info-icon">📝</span>
              <strong>Conditions :</strong> Offre valable pour toute commande passée avant le 31/12 à 23h59. 
              Non cumulable avec d'autres promotions.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Bouton fermer -->
      <!-- <button class="close-promo" @click="hidePromotion" title="Fermer">
        <span class="close-icon">×</span>
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const showPromotion = ref(true)
const showDetails = ref(false)
const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })

// Date limite : 31 décembre à 23h59 de l'année en cours
const getDeadline = () => {
  const now = new Date()
  const currentYear = now.getFullYear()
  return new Date(currentYear, 11, 31, 23, 59, 59) // 31 décembre 23:59:59
}

// Vérifier si nous sommes avant la date limite
const isBeforeDeadline = () => {
  const now = new Date()
  const deadline = getDeadline()
  return now < deadline
}

// Mettre à jour le compteur
const updateCountdown = () => {
  if (!isBeforeDeadline()) {
    showPromotion.value = false
    return
  }
  
  const now = new Date()
  const deadline = getDeadline()
  const diff = deadline - now
  
  if (diff <= 0) {
    showPromotion.value = false
    return
  }
  
  // Calculer le temps restant
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  timeLeft.value = { days, hours, minutes, seconds }
}

// Formatage du temps avec zéro devant
const formattedTime = computed(() => {
  return {
    days: String(timeLeft.value.days).padStart(2, '0'),
    hours: String(timeLeft.value.hours).padStart(2, '0'),
    minutes: String(timeLeft.value.minutes).padStart(2, '0'),
    seconds: String(timeLeft.value.seconds).padStart(2, '0')
  }
})

// Générer des styles aléatoires pour les flocons
const getSnowStyle = (index) => {
  const size = Math.random() * 8 + 4
  const duration = Math.random() * 15 + 10
  const delay = Math.random() * 5
  const left = Math.random() * 80
  const opacity = Math.random() * 0.6 + 0.2
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: opacity,
    borderRadius: '50%'
  }
}

// Navigation vers la page contact
const goToContact = () => {
  // Adapter selon votre routeur
  window.location.hash = '#contact'
  // Ou utiliser votre router Vue
  // router.push('/contact')
}

// Cacher la promotion
const hidePromotion = () => {
  showPromotion.value = false
  localStorage.setItem('noelPromoHidden', 'true')
}

// Vérifier si la promotion a été cachée manuellement
const checkIfHidden = () => {
  const hidden = localStorage.getItem('noelPromoHidden')
  if (hidden === 'true') {
    showPromotion.value = false
  }
}

// Initialisation
onMounted(() => {
  checkIfHidden()
  updateCountdown()
  
  // Vérifier périodiquement si nous devons encore afficher la promotion
  const checkInterval = setInterval(() => {
    if (!isBeforeDeadline()) {
      showPromotion.value = false
      clearInterval(checkInterval)
    }
  }, 60000) // Vérifier toutes les minutes
  
  // Mettre à jour le compteur chaque seconde
  const countdownInterval = setInterval(() => {
    updateCountdown()
    if (!showPromotion.value) {
      clearInterval(countdownInterval)
    }
  }, 1000)
  
  // Stocker les intervalles pour le nettoyage
  window.noelIntervals = {
    check: checkInterval,
    countdown: countdownInterval
  }
})

// Nettoyage
onUnmounted(() => {
  if (window.noelIntervals) {
    clearInterval(window.noelIntervals.check)
    clearInterval(window.noelIntervals.countdown)
  }
})
</script>

<style scoped>
.noel-promo-top {
 
  width: 100%;
  background: linear-gradient(135deg, 
    rgba(179, 0, 0, 0.95) 0%,
    rgba(0, 100, 0, 0.95) 100%);
  color: white;
  padding: 15px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  border-bottom: 3px solid gold;
  animation: fadeIn 0.8s ease-out;
  overflow: hidden;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-100%); }
  to { opacity: 1; transform: translateY(0); }
}

/* Flocons de neige en arrière-plan */
.snow-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.snow-particle {
  position: absolute;
  background: white;
  animation: snowfall linear infinite;
}

@keyframes snowfall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Contenu principal */
.promo-content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.christmas-icons {
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
}

.icon-large {
  font-size: 2.5rem;
  animation: bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
}

.santa {
  animation-delay: 0.2s;
}

.tree {
  animation-delay: 0.5s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.promo-message {
  text-align: center;
}

.promo-title {
  font-size: 1.8rem;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); }
  to { text-shadow: 
    0 0 10px #ffd700,
    0 0 20px #ffd700,
    2px 2px 4px rgba(0, 0, 0, 0.5); }
}

.sparkle {
  font-size: 1.8rem;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.discount-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
}

.discount-circle {
  background: linear-gradient(45deg, gold, #ffd700);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.8),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.discount-amount {
  font-size: 2.8rem;
  font-weight: 900;
  color: #b30000;
  line-height: 1;
}

.discount-text {
  font-size: 0.9rem;
  font-weight: bold;
  color: #b30000;
  margin-top: 5px;
  text-align: center;
}

.gift-icons {
  display: flex;
  gap: 15px;
}

.gift, .bell {
  font-size: 2rem;
  animation: wiggle 1.5s ease-in-out infinite;
}

.bell {
  animation-delay: 0.3s;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}

.promo-subtitle {
  font-size: 1.2rem;
  color: white;
  margin: 10px 0 0 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Compteur */
.christmas-countdown {
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: 800px;
  border: 2px solid rgba(255, 215, 0, 0.5);
  backdrop-filter: blur(5px);
}

.countdown-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}

.countdown-header h3 {
  font-size: 1.3rem;
  color: #ffd700;
  margin: 0;
  text-align: center;
}

.clock-icon {
  font-size: 1.5rem;
  animation: ring 2s ease-in-out infinite;
}

@keyframes ring {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}

.countdown-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
}

.time-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 5px;
  min-width: 70px;
  text-align: center;
  font-family: 'Courier New', monospace;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  border: 2px solid gold;
}

.time-label {
  font-size: 0.8rem;
  color: #ffd700;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.time-separator {
  font-size: 2rem;
  color: #ffd700;
  font-weight: bold;
  margin: 0 5px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.deadline-info {
  text-align: center;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(179, 0, 0, 0.3);
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}

.calendar-icon {
  font-size: 1.3rem;
  animation: pulse 2s infinite;
}

/* Boutons d'action */
.action-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.primary-action, .secondary-action {
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  border: none;
}

.primary-action {
  background: linear-gradient(45deg, #ff0000, #b30000);
  color: white;
  box-shadow: 0 5px 15px rgba(179, 0, 0, 0.4);
}

.primary-action:hover {
  background: linear-gradient(45deg, #b30000, #ff0000);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(179, 0, 0, 0.6);
}

.secondary-action {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 215, 0, 0.5);
}

.secondary-action:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.button-icon {
  font-size: 1.2rem;
}

/* Détails de l'offre */
.offer-details {
  width: 100%;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 20px;
  margin-top: 10px;
  animation: slideDown 0.5s ease;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.details-content h4 {
  color: #ffd700;
  font-size: 1.3rem;
  margin: 0 0 15px 0;
  text-align: center;
}

.offer-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .offer-list {
    grid-template-columns: 1fr;
  }
}

.offer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.offer-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.check-mark {
  color: #00ff00;
  font-size: 1.2rem;
  filter: drop-shadow(0 0 3px #00ff00);
}

.offer-name {
  flex: 1;
  color: white;
  font-weight: 500;
}

.offer-price {
  color: #ffd700;
  font-weight: bold;
  font-size: 1.1rem;
}

.conditions {
  padding-top: 15px;
  border-top: 1px solid rgba(255, 215, 0, 0.3);
}

.condition-note {
  color: #ffcccb;
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.info-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

/* Bouton fermer */
.close-promo {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 3;
}

.close-promo:hover {
  background: rgba(255, 0, 0, 0.8);
  transform: rotate(90deg) scale(1.1);
}

.close-icon {
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .noel-promo-top {
    padding: 12px 15px;
  }
  
  .promo-title {
    font-size: 1.3rem;
    flex-direction: column;
    gap: 8px;
  }
  
  .discount-display {
    flex-direction: column;
    gap: 15px;
  }
  
  .countdown-display {
    gap: 5px;
  }
  
  .time-unit {
    min-width: 55px;
  }
  
  .time-value {
    font-size: 1.8rem;
    min-width: 55px;
    padding: 8px 10px;
  }
  
  .time-separator {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-action, .secondary-action {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .christmas-icons {
    gap: 15px;
  }
  
  .icon-large {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .promo-title {
    font-size: 1.1rem;
  }
  
  .discount-circle {
    width: 100px;
    height: 100px;
  }
  
  .discount-amount {
    font-size: 2.2rem;
  }
  
  .countdown-display {
    flex-wrap: wrap;
  }
  
  .time-unit {
    min-width: 45px;
  }
  
  .time-value {
    font-size: 1.5rem;
    min-width: 45px;
    padding: 6px 8px;
  }
}
</style>