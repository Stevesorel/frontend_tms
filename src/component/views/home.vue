<template>
  <section id="home" :style="{ backgroundImage: `url(${currentImage})` }">
    <div class="overlay"></div>

    <div class="content">
      <!-- TEXTE PRINCIPAL -->
      
      <div class="hero-text">
        <h1>
          Transformez vos visiteurs en clients grâce à un site web
          <span class="gradient-text">professionnel et rentable</span>
        </h1>

        <p class="lead-text">
          Vous avez une activité mais pas encore un site capable d'attirer,
          convaincre et vendre à votre place ?  
          Nous concevons des sites modernes, rapides et optimisés pour vous
          faire gagner en crédibilité, visibilité et chiffre d'affaires.
        </p>

        <div class="highlight-box">
          <p class="highlight">
            Aujourd'hui, plus de <strong>80% des clients</strong> recherchent une entreprise sur
            Internet avant de la contacter. Ne laissez pas vos concurrents
            prendre votre place.
          </p>
        </div>

    
        <div class="btn-group">
          <a href="#contact" class="primary-btn">
            <span>Obtenir mon site web maintenant</span>
          <i class="btn-icon">🚀</i> 
          </a>
     
            <!-- <a href="./index.html" target="_blank" class="secondary-btn">
               <span>Voir nos réalisations</span> 
               <i class="btn-icon">✨</i> 
            </a> -->
      
        </div>
      </div>

       <!-- INDICATEURS DIAPORAMA -->
      <div class="slider-indicators">
        <button 
          v-for="(image, index) in images" 
          :key="index"
          :class="['indicator', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></button>
      </div> 

      <!-- SERVICES -->
      <div class="services-section">
        <h2 class="section-title">Nos solutions web</h2>
        <div class="services">
          <div class="service-card">
            <div class="service-icon">🌐</div>
            <h3>Site vitrine</h3>
            <p>
              Présentez votre activité avec un design professionnel,
              responsive et attractif.
            </p>
            <div class="service-features">
              <span>Design personnalisé</span>
              <span>SEO intégré</span>
              <span>Formulaire de contact</span>
            </div>
          </div>

          <div class="service-card">
            <div class="service-icon">🛒</div>
            <h3>Site e-commerce</h3>
            <p>
              Vendez vos produits en ligne avec un système sécurisé et simple à gérer.
            </p>
            <div class="service-features">
              <span>Paiement sécurisé</span>
              <span>Gestion des stocks</span>
              <span>Panier intelligent</span>
            </div>
          </div>

          <div class="service-card">
            <div class="service-icon">⚙️</div>
            <h3>Application web</h3>
            <p>
              Nous développons des solutions sur mesure adaptées à votre activité.
            </p>
            <div class="service-features">
              <span>Développement sur mesure</span>
              <span>Interface admin</span>
              <span>Maintenance incluse</span>
            </div>
          </div>

          <div class="service-card">
            <div class="service-icon">📈</div>
            <h3>SEO & Performance</h3>
            <p>
              Votre site est rapide, bien référencé et optimisé pour Google.
            </p>
            <div class="service-features">
              <span>Audit SEO</span>
              <span>Optimisation vitesse</span>
              <span>Reporting mensuel</span>
            </div>
          </div>
        </div>
      </div>

      <!-- POURQUOI NOUS CHOISIR ? -->
      <div class="why-us-section">
        <h2 class="section-title">Pourquoi nous choisir ?</h2>
        
        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Projets livrés</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">Clients satisfaits</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24h</div>
            <div class="stat-label">Support réactif</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">3ans</div>
            <div class="stat-label">Garantie</div>
          </div>
        </div>

        <div class="why-grid">
          <div class="why-card">
            <div class="why-icon">🎨</div>
            <h3>Design sur mesure</h3>
            <p>Un design unique parfaitement adapté à votre marque et à votre identité visuelle.</p>
          </div>

          <div class="why-card">
            <div class="why-icon">📱</div>
            <h3>100% Responsive</h3>
            <p>Compatible avec tous les appareils : téléphone, tablette et ordinateur.</p>
          </div>

          <div class="why-card">
            <div class="why-icon">⏱️</div>
            <h3>Livraison rapide</h3>
            <p>Mise en ligne rapide avec un suivi personnalisé et des délais respectés.</p>
          </div>

          <div class="why-card">
            <div class="why-icon">💰</div>
            <h3>Prix accessible</h3>
            <p>Des offres adaptées à tous les budgets avec un excellent rapport qualité-prix.</p>
          </div>

          <div class="why-card">
            <div class="why-icon">🛡️</div>
            <h3>Sécurité garantie</h3>
            <p>Sites sécurisés avec certificat SSL et protection des données.</p>
          </div>

          <div class="why-card">
            <div class="why-icon">🔧</div>
            <h3>Maintenance incluse</h3>
            <p>Support technique et maintenance pendant 3 mois après la livraison.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Liste des images du diaporama
const images = ref([
  '/abo.svg',
  '/re.svg'
]);

const currentIndex = ref(0);
const currentImage = ref(images.value[currentIndex.value]);
let intervalId = null;

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
  currentImage.value = images.value[currentIndex.value];
};

const goToSlide = (index) => {
  currentIndex.value = index;
  currentImage.value = images.value[currentIndex.value];
  // Redémarre le diaporama après un clic manuel
  restartSlider();
};

const restartSlider = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(nextImage, 5000);
};

onMounted(() => {
  intervalId = setInterval(nextImage, 5000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
/* SECTION PRINCIPALE */

#pere-noel {
  position: absolute;
 font-size: 90px;
}

#home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 40px 20px;
  transition: background-image 1s ease-in-out;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(38, 11, 101, 0.85) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(38, 11, 101, 0.6) 100%
  );
}

.content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* TEXTE HERO */
.hero-text {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: 3.5rem;
  color: #ffffff;
  text-align: center;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
}

.gradient-text {
  background: linear-gradient(135deg, #00ffff, #6a1b9a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.lead-text {
  font-size: 1.3rem;
  color: #e0e0e0;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.highlight-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  margin: 2.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.highlight {
  font-weight: 600;
  color: #ffd700;
  font-size: 1.4rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  margin: 0;
  line-height: 1.5;
}

/* BOUTONS */
.btn-group {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.primary-btn, .secondary-btn {
  padding: 18px 35px;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
}

.primary-btn {
  background: linear-gradient(135deg, #431d8c, #6a1b9a);
  color: #fff;
  box-shadow: 0 8px 25px rgba(106, 27, 154, 0.4);
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(106, 27, 154, 0.6);
  scale: 1.05;
}

.secondary-btn {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  backdrop-filter: blur(10px);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  scale: 1.05;
}

.btn-icon {
  font-size: 1.2rem;
}

/* INDICATEURS DIAPORAMA */
.slider-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 2rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #fff;
  transform: scale(1.3);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* SERVICES */
.services-section {
  margin-top: 40px;
}

.section-title {
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
}

.services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service-card {
  background: rgba(255, 255, 255, 0.08);
  padding: 30px 25px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  cursor: default;
}

.service-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.service-card p {
  color: #ddd;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-features span {
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #ccc;
}

/* POURQUOI NOUS CHOISIR */
.why-us-section {
  margin-top: 60px;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 25px;
  margin-bottom: 4rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 25px 15px;
  border-radius: 15px;
  text-align: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: #00ffff;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.why-card {
  background: rgba(255, 255, 255, 0.08);
  padding: 30px 25px;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: default;
}

.why-card:hover {
  transform: translateY(-8px) scale(1.02);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
}

.why-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.why-card h3 {
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.why-card p {
  color: #ddd;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .lead-text {
    font-size: 1.1rem;
  }
  
  .highlight {
    font-size: 1.2rem;
  }
  
  .btn-group {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-btn, .secondary-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .services, .why-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  .content {
    gap: 40px;
  }
  
  .service-card, .why-card {
    padding: 20px 15px;
  }
}
</style>
