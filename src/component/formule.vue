<template>
  <section id="formules">
    <div class="section-header">
      <h1>Nos formules</h1>
      <p>Choisissez la solution qui correspond le mieux à vos besoins</p>
    </div>

    <div class="cards-container">
      <div v-for="(element, index) in site" :key="element.name" class="card" :class="`card-${index + 1}`">
        <!-- BADGE POPULAIRE -->
        <div v-if="element.popular" class="popular-badge">
          <span>Populaire</span>
        </div>
        
        <!-- HEADER -->
        <div class="card-header">
          <div class="icon-container">
            <i :class="element.icon"></i>
          </div>
          <h2>{{ element.name }}</h2>
          <p class="conquis">{{ element.conquis }}</p>
        </div>

        <!-- PRIX -->
        <div class="price-section">
          <div class="price">{{ element.price }}</div>
          <!-- <div v-if="element.dollarPrice" class="price">{{ element.dollarPrice }}</div>
          <div v-if="element.euroPrice" class="price">{{ element.euroPrice }}</div> -->
          <div v-if="element.oldPrice" class="old-price">{{ element.oldPrice }}</div>
        </div>

        <!-- DETAILS -->
        <div class="card-body">
          <ul>
            <li v-for="(feature, key) in element.features" :key="key">
              <i class="check-icon">✓</i>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
        <!-- BUTTON -->
        <div class="card-footer">
          <a href="#contact" :class="{ 'popular': element.popular }">{{ element.button }}</a>
          <p v-if="element.note" class="note">{{ element.note }}</p>
        </div>
      </div>
    </div>
    <!-- SECTION INFORMATIONS COMPLÉMENTAIRES -->
    <div class="additional-info">
      <h3>Informations complémentaires</h3>
      <div class="info-grid">
        <div class="info-item">
          <i class="info-icon">🔄</i>
          <h4>Maintenance incluse</h4>
          <p>Mise à jour et maintenance pendant 6 mois après livraison</p>
        </div>
        <div class="info-item">
          <i class="info-icon">🔒</i>
          <h4>Hébergement offert</h4>
          <p>3 ans d'hébergement inclus avec tous nos forfaits</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      site: [
        {
          name: "Site Vitrine",
          conquis: "Parfait pour présenter votre activité",
          price: "15.000 FCFA",
          oldPrice: "20.000 FCFA",
          dollarPrice:"30$",
          euroPrice:"30 &euro;",
          icon: "icon-display",
          popular: true,
          features: [
            "5 pages personnalisables",
            "Design responsive",
            "Formulaire de contact inclus",
            "Optimisation SEO de base",
            "Intégration des réseaux sociaux",
            "Hébergement 1 an offert"
          ],
          button: "Commander",
          note: "Paiement en 2 fois possible"
        },
        {
          name: "Site E-commerce",
          conquis: "Vendez vos produits en ligne",
          price: "80.000 FCFA",
          oldPrice: "100.000 FCFA",
          icon: "icon-cart",
          popular: true,
          features: [
            "Jusqu'à 20 produits",
            "Paiement sécurisé",
            "Gestion des stocks",
            "Panier d'achat",
            "Interface administrateur",
            "Hébergement 1 an offert",
            "Maintenance 3 mois incluse"
          ],
          button: "Commander",
          note: "Meilleure vente"
        },
        {
          name: "Site sur Mesure",
          conquis: "Une solution adaptée à vos besoins",
          price: "Sur devis",
          icon: "icon-custom",
          popular: false,
          features: [
            "Développement personnalisé",
            "Fonctionnalités avancées",
            "Formation à l'utilisation",
            "Maintenance incluse 6 mois",
            "Support technique prioritaire",
            "Hébergement 1 an offert",
            "Révisions illimitées"
          ],
          button: "Nous contacter",
          note: "Devis gratuit sous 48h"
        }
      ]
    }
  }
}
</script>

<style scoped>
/* SECTION */
#formules {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%);
  color: #fff;
  text-align: center;
}

.section-header h1 {
  font-size: 42px;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #00ffff, #6a1b9a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-header p {
  font-size: 18px;
  margin-bottom: 60px;
  color: #aaa;
  max-width: 600px;
}

/* GRID ALIGNÉ */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 80px;
}

/* CARTES */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  min-height: 550px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
}

/* BADGE POPULAIRE */
.popular-badge {
  position: absolute;
  top: 20px;
  right: -30px;
  background: linear-gradient(135deg, #ff8a00, #ff2070);
  color: white;
  padding: 8px 40px;
  font-size: 14px;
  font-weight: bold;
  transform: rotate(45deg);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* HEADER CARTE */
.card-header {
  margin-bottom: 20px;
}

.icon-container {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  background: rgba(255, 255, 255, 0.1);
}

.card-1 .icon-container {
  background: linear-gradient(135deg, #431d8c, #6a1b9a);
}

.card-2 .icon-container {
  background: linear-gradient(135deg, #ff8a00, #ff2070);
}

.card-3 .icon-container {
  background: linear-gradient(135deg, #00b09b, #96c93d);
}

.card-header h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.card-header .conquis {
  font-size: 16px;
  color: #00ffff;
  margin-bottom: 15px;
}

/* SECTION PRIX */
.price-section {
  margin-bottom: 25px;
}

.price {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
}

.old-price {
  font-size: 18px;
  color: #aaa;
  text-decoration: line-through;
}

/* BODY CARTE */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.card-body ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.card-body li {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 15px;
  color: #ccc;
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #009133;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 12px;
  flex-shrink: 0;
}

/* FOOTER CARTE */
.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-footer a {
  width: 100%;
  background-color: #009133;
  color: #fff;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  margin-bottom: 10px;
  text-decoration: none;
}

.card-footer button:hover {
  transform: scale(1.05);
  background-color: #00b74a;
}

.card-footer button.popular {
  background: linear-gradient(135deg, #ff8a00, #ff2070);
}

.card-footer button.popular:hover {
  background: linear-gradient(135deg, #ff9a2e, #ff3a7f);
}

.note {
  font-size: 14px;
  color: #aaa;
  font-style: italic;
}

/* SECTION INFORMATIONS COMPLÉMENTAIRES */
.additional-info {
  max-width: 1200px;
  width: 100%;
  margin-top: 40px;
}

.additional-info h3 {
  font-size: 32px;
  margin-bottom: 40px;
  color: #fff;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.info-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  transition: transform 0.3s;
}

.info-item:hover {
  transform: translateY(-5px);
}

.info-icon {
  font-size: 40px;
  margin-bottom: 15px;
  display: block;
}

.info-item h4 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #fff;
}

.info-item p {
  font-size: 15px;
  color: #ccc;
  line-height: 1.5;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .section-header h1 {
    font-size: 32px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .card {
    min-height: auto;
    padding: 20px;
  }
}
</style>