<template>
    <section class="principale" id="contact">
        <div class="container">
            <div class="header-section">
                <h1>Contactez-nous</h1>
                <p class="slogan">Prêt à démarrer votre projet? Parlons-en !</p>
            </div>

            <div class="contact-form" @submit.prevent="register">
                <div class="form-group">
                    <label for="name">Nom ou organisation </label>
                    <div class="input-wrapper">
                        <span class="icon"></span>
                        <input 
                            type="text" 
                            v-model="Name" 
                            id="name" 
                            placeholder="Votre nom" 
                            required
                        >
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <span class="icon"></span>
                        <input 
                            type="email" 
                            v-model="Email" 
                            id="email" 
                            placeholder="votre@email.com" 
                            required
                        >
                    </div>
                </div>

                <div class="form-group">
                    <label for="telephone">Téléphone WhatsApp</label>
                    <div class="input-wrapper">
                        <span class="icon"></span>
                        <input 
                            type="tel" 
                            v-model="Telephone" 
                            id="telephone" 
                            placeholder="+237 650 536 195" 
                            required
                        >
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="site">Type de site</label>
                    <div class="input-wrapper">
                        <span class="icon">🌐</span>
                        <select v-model="Site" id="site" required>
                            <option value="" disabled>Choisir un type de site</option>
                            <option value="vitrine">Site Vitrine</option>
                            <option value="e-commerce">E-commerce</option>
                            <option value="site-sur-mesure">Site sur Mesure</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="description">Description du projet</label>
                    <textarea 
                        v-model="Description" 
                        id="description" 
                        placeholder="Décrivez votre projet en détail..."
                        rows="5"
                        required
                    ></textarea>
                </div>
                
                <button 
                    @click="register"
                    class="submit-btn"
                    :class="{ 'loading': isLoading }"
                    :disabled="isLoading"
                >
                    <span v-if="!isLoading">
                        <span class="btn-icon">✨</span>
                        Envoyer la demande
                    </span>
                    <span v-else class="loading-text">
                        <span class="spinner"></span>
                        Envoi en cours...
                    </span>
                </button>

                <transition name="fade">
                    <div v-if="result.message" class="alert alert-success">
                        <span class="alert-icon" style="color:pink;">✅</span>
                        {{ result.message }}
                    </div>
                </transition>

                <transition name="fade">
                    <div v-if="result.error" class="alert alert-error">
                        <span class="alert-icon">⚠️</span>
                        {{ result.error }}
                    </div>
                </transition>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            Name: "",
            Email: "",
            Telephone: "",
            Site: "",
            Description: "",
            result: {
                message: null,
                error: null
            },
            isLoading: false,
            
            // URL de l'API (à adapter selon l'environnement)
            API_BASE_URL:  "https://tms-final.duckdns.org/api" // Exemple: "http://localhost:4000/api/auth" ou import.meta.env.VITE_API_BASE_URL
        }
    },
    methods: {
        async register() {
            // Validation des champs
            if (!this.validateForm()) {
                return;
            }
            
            this.isLoading = true;
            this.result = { message: null, error: null };
            
            try {
                const res = await fetch(`${this.API_BASE_URL}/command`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: this.Name.trim(),
                        email: this.Email.trim().toLowerCase(),
                        telephone: this.Telephone.trim(),
                        site: this.Site.trim(),
                        description: this.Description.trim()
                    })
                })
                
                const data = await res.json();

                if (res.ok) {
                    this.result.message = data.message || "Inscription réussie !";
                    
                    // Notification de succès
                    alert("✅ Votre demande a été envoyée avec succès !\nNous vous contacterons bientôt via WhatsApp ou par email.");
                    
                    // Réinitialiser le formulaire
                    this.resetForm();
                    
                    // Rediriger ou faire autre chose si nécessaire
                    // window.location.href = "/confirmation";
                    
                } else if (res.status === 409) {
                    this.result.error = data.error || "❌ Cet email est déjà utilisé.";
                    alert("❌ Cet email est déjà enregistré. Veuillez utiliser un autre email.");
                    
                } else if (res.status === 400) {
                    this.result.error = data.error || "❌ Veuillez remplir tous les champs obligatoires.";
                    alert("❌ Veuillez remplir tous les champs obligatoires (*).");
                    
                } else if (res.status === 500) {
                    this.result.error = data.error || "❌ Erreur serveur interne.";
                    alert("❌ Une erreur serveur est survenue. Veuillez réessayer plus tard.");
                    
                } else {
                    this.result.error = `Erreur (${res.status}): ${data.error || 'Erreur inconnue'}`;
                    alert(`❌ Erreur (${res.status}): ${data.error || 'Veuillez réessayer'}`);
                }

            } catch (networkError) {
                console.error('Erreur réseau:', networkError);
                this.result.error = "❌ Impossible de se connecter au serveur.";
                alert("❌ Impossible de se connecter au serveur. Vérifiez votre connexion internet.");
                
            } finally {
                this.isLoading = false;
            }
        },
        
        validateForm() {
            // Validation de base
            if (!this.Name.trim()) {
                alert("⚠️ Le nom est obligatoire");
                return false;
            }
            
            if (!this.Email.trim()) {
                alert("⚠️ L'email est obligatoire");
                return false;
            }
            
            // Validation email simple
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.Email.trim())) {
                alert("⚠️ Veuillez entrer un email valide");
                return false;
            }
            
            if (!this.Telephone.trim()) {
                alert("⚠️ Le téléphone est obligatoire");
                return false;
            }
            
            // Validation téléphone (au moins 8 chiffres)
            const phoneDigits = this.Telephone.replace(/\D/g, '');
            if (phoneDigits.length < 8) {
                alert("⚠️ Veuillez entrer un numéro de téléphone valide");
                return false;
            }
            
            if (!this.Site.trim()) {
                alert("⚠️ Le site web est obligatoire");
                return false;
            }
            
            // // Validation URL simple
            // const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            // if (!urlRegex.test(this.Site.trim()) && !this.Site.includes('.')) {
            //     alert("⚠️ Veuillez entrer une URL valide (ex: example.com)");
            //     return false;
            // }
            
            if (!this.Description.trim()) {
                alert("⚠️ La description est obligatoire");
                return false;
            }
            
            return true;
        },
        
        resetForm() {
            this.Name = "";
            this.Email = "";
            this.Telephone = "";
            this.Site = "";
            this.Description = "";
            
            // Réinitialiser les messages après 5 secondes
            setTimeout(() => {
                this.result.message = null;
                this.result.error = null;
            }, 5000);
        },
        
        // Optionnel: formatage du téléphone
        formatPhoneNumber() {
            // Enlever tout sauf les chiffres
            let numbers = this.Telephone.replace(/\D/g, '');
            
            // Formater selon la longueur
            if (numbers.length <= 2) {
                this.Telephone = numbers;
            } else if (numbers.length <= 4) {
                this.Telephone = numbers.replace(/(\d{2})(\d{0,2})/, '$1 $2');
            } else if (numbers.length <= 6) {
                this.Telephone = numbers.replace(/(\d{2})(\d{2})(\d{0,2})/, '$1 $2 $3');
            } else {
                this.Telephone = numbers.replace(/(\d{2})(\d{2})(\d{2})(\d{0,2})/, '$1 $2 $3 $4');
            }
        },
        
        // Optionnel: tester la connexion à l'API
        async testConnection() {
            try {
                const res = await fetch(`${this.API_BASE_URL}/all`);
                if (res.ok) {
                    console.log('✅ Connexion API OK');
                } else {
                    console.warn('⚠️ Connexion API problématique');
                }
            } catch (error) {
                console.error('❌ Impossible de joindre l\'API:', error);
            }
        }
    },
    
    mounted() {
        // Tester la connexion au démarrage (optionnel)
        // this.testConnection();
        
        // Récupérer l'URL API depuis l'environnement
        if (import.meta.env.VITE_API_BASE_URL) {
            console.log('🌐 URL API:', import.meta.env.VITE_API_BASE_URL);
        }
    }
}
</script>

<style scoped>
/* Variables de couleur */
:root {
    --color-dark-bg: #0f172a;
    --color-card-bg: #1e293b;
    --color-input-bg: #334155;
    --color-text-light: #f1f5f9;
    --color-text-secondary: #94a3b8;
    --color-accent: #00c896;
    --color-accent-hover: #00e0a8;
    --color-border: #475569;
    --color-success: #10b981;
    --color-error: #ef4444;
}

/* Structure générale */
.principale {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 60px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    width: 100%;
    max-width: 650px;
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

span
{
    color:white;
}

/* En-tête */
.header-section {
    text-align: center;
    margin-bottom: 40px;
}

h1 {
    font-size: 2.8em;
    font-weight: 700;
    color:white;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
}

.slogan {
    font-size: 1.15em;
    color:gray;
    font-weight: 400;
}

/* Formulaire */
.contact-form {
    background: var(--color-card-bg);
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
}

.form-group {
    margin-bottom: 24px;
    /* border:1px solid rgb(106, 98, 98); */
    padding: 10px;
}

label {
    display: block;
    font-size: 0.95em;
    font-weight: 1000;
    color:white;
    letter-spacing: 0.3px;
    margin:14px 0px;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid rgb(140, 140, 140);
    border-radius: 14px;
}

.icon {
    position: absolute;
    left: 16px;
    font-size: 1.2em;
    pointer-events: none;
    z-index: 1;
}

input:not([type="submit"]),
textarea,
select {
    width: 100%;
    font-size: 1em;
    padding: 14px 16px 14px 48px;
    border-radius: 14px;
    /* border: 0.1px solid white; */
    background-color: var(--color-text-light);
    color:white;
    transition: all 0.3s ease;
    font-family: inherit;
}

textarea {
    padding-left: 16px;
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
}

::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.7;
}

input:focus,
textarea:focus,
select:focus {
    outline: none;
    border-color: var(--color-accent);
    background-color: #1a2737;
    box-shadow: 0 0 0 4px rgba(0, 200, 150, 0.036);
}

select {
    appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%2394a3b8" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-size: 20px;
    cursor: pointer;
}

/* Bouton Submit */
.submit-btn {
    width: 100%;
    padding: 16px 32px;
    margin-top: 12px;
    background: linear-gradient(135deg, var(--color-accent) 0%, #00a87a 100%);
    color: white;
    font-size: 1.1em;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 200, 150, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.submit-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--color-accent-hover) 0%, #00c896 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 200, 150, 0.4);
}

.submit-btn:active:not(:disabled) {
    transform: translateY(0);
}

.submit-btn:disabled {
    background: #475569;
    cursor: not-allowed;
    box-shadow: none;
}

.btn-icon {
    font-size: 1.2em;
}

/* Animation de chargement */
.spinner {
    width: 18px;
    height: 18px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Alertes */
.alert {
    margin-top: 20px;
    padding: 16px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
    animation: slideIn 0.4s ease-out;
}



@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.alert-success {
    background: rgba(16, 185, 129, 0.15);
    color: var(--color-success);
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.alert-error {
    background: rgba(239, 68, 68, 0.15);
    color: var(--color-error);
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.alert-icon {
    font-size: 1.3em;
    color:white;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Responsive */
@media screen and (max-width: 768px) {
    .principale {
        padding: 40px 16px;
    }

    h1 {
        font-size: 2.2em;
    }

    .slogan {
        font-size: 1em;
    }

    .contact-form {
        padding: 28px 24px;
    }

    input:not([type="submit"]),
    textarea,
    select {
        font-size: 16px;
    }
}

@media screen and (max-width: 480px) {
    h1 {
        font-size: 1.9em;
    }

    .contact-form {
        padding: 24px 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }
}
</style>