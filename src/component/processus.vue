<template>
    <section class="process-section" id="processus">
        <div class="container">
            <!-- En-tête de section -->
            <div class="section-header">
                <h1 class="section-title">Notre processus de création</h1>
                <p class="section-subtitle">Comment nous travaillons pour concrétiser votre projet</p>
                <div class="divider"></div>
            </div>

            <!-- Grille des étapes -->
            <div class="process-grid">
                <div class="process-card" v-for="(element, index) in process" :key="element.number">
                    <!-- Numéro avec effet visuel -->
                    <div class="number-container">
                        <span class="number">{{ element.number }}</span>
                        <div class="number-glow"></div>
                    </div>
                    
                    <!-- Contenu de la carte -->
                    <div class="card-content">
                        <h2 class="card-title">{{ element.title }}</h2>
                        <p class="card-description">{{ element.messages }}</p>
                    </div>

                    <!-- Ligne de connexion (sauf pour le dernier élément) -->
                    <div v-if="index < process.length - 1" class="connection-line"></div>
                </div>
            </div>

            <!-- Appel à l'action -->
            <div class="cta-section">
                <p class="cta-text">Prêt à démarrer votre projet ?</p>
                <a href="#contact" class="cta-button">Commencer maintenant</a>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Section principale */
.process-section {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    padding: 80px 20px;
    position: relative;
    overflow: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* En-tête de section */
.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.section-title {
    font-size: 3rem;
    color: #ffffff;
    margin-bottom: 15px;
    font-weight: 700;
    background: linear-gradient(135deg, #3abc8c, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-subtitle {
    font-size: 1.2rem;
    color: #cccccc;
    margin-bottom: 25px;
}

.divider {
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #3abc8c, #00ffff);
    margin: 0 auto;
    border-radius: 2px;
}

/* Grille des processus */
.process-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
    position: relative;
}

/* Cartes de processus */
.process-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 40px 25px;
    text-align: center;
    position: relative;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.process-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(58, 188, 140, 0.2);
}

/* Conteneur du numéro */
.number-container {
    position: relative;
    margin-bottom: 20px;
}

.number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #3abc8c, #2a9d8f);
    border-radius: 50%;
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    position: relative;
    z-index: 2;
    box-shadow: 0 8px 20px rgba(58, 188, 140, 0.3);
    transition: all 0.3s ease;
}

.process-card:hover .number {
    transform: scale(1.1);
    box-shadow: 0 12px 30px rgba(58, 188, 140, 0.4);
}

.number-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90px;
    height: 90px;
    background: rgba(58, 188, 140, 0.2);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.7;
    }
    50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.3;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.7;
    }
}

/* Contenu de la carte */
.card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.card-title {
    font-size: 1.5rem;
    color: #ffffff;
    margin-bottom: 15px;
    font-weight: 600;
}

.card-description {
    font-size: 1rem;
    color: #cccccc;
    line-height: 1.6;
    margin: 0;
}

/* Ligne de connexion */
.connection-line {
    position: absolute;
    top: 50%;
    right: -15px;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #3abc8c, transparent);
    z-index: 1;
}

/* Appel à l'action */
.cta-section {
    text-align: center;
    padding: 40px 20px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.cta-text {
    font-size: 1.3rem;
    color: #ffffff;
    margin:20px 0px;
    font-weight: 500;
}

.cta-button {
    background: linear-gradient(135deg, #3abc8c, #2a9d8f);
    color: white;
    border: none;
    padding: 15px 35px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(58, 188, 140, 0.3);
    text-decoration: none;
    /* margin:20px; */
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(58, 188, 140, 0.4);
}

.cta-button:active {
    transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 768px) {
    .process-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .section-title {
        font-size: 2.2rem;
    }

    .process-card {
        padding: 30px 20px;
    }

    .connection-line {
        display: none;
    }

    .process-section {
        padding: 60px 15px;
    }
}

@media (max-width: 480px) {
    .section-title {
        font-size: 1.8rem;
    }

    .section-subtitle {
        font-size: 1rem;
    }

    .card-title {
        font-size: 1.3rem;
    }

    .card-description {
        font-size: 0.9rem;
    }

    .number {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
    }

    .number-glow {
        width: 80px;
        height: 80px;
    }
}
</style>

<script>
export default {
    data() {
        return {
            process: [
                {
                    number: "1",
                    title: "Consultation",
                    messages: "Nous échangeons sur vos besoins et objectifs pour comprendre votre vision"
                },
                {
                    number: "2",
                    title: "Conception",
                    messages: "Nous créons une maquette personnalisée de votre site adaptée à votre marque"
                },
                {
                    number: "3",
                    title: "Développement",
                    messages: "Nous donnons vie à votre site avec les technologies les plus adaptées"
                },
                {
                    number: "4",
                    title: "Livraison",
                    messages: "Nous vous formons et mettons votre site en ligne avec un suivi personnalisé"
                }
            ]
        }
    }
}
</script>