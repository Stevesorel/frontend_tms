<template>
  <div class="app-container">
    <!-- Header en tant que composant -->
    <Header />
    
    <!-- Contenu principal -->
    <main class="main-content">
      <Noel />
      <Home />
      <Formule />
      <Processus />
      <Contact />
      <Footer />
    </main>
    
    <!-- Footer -->
    
  </div>
</template>

<script setup>
import Header from './component/Header.vue'
import Formule from './component/formule.vue'
import Processus from './component/processus.vue'
import Contact from './component/contact.vue'
import Home from './component/views/home.vue'
import Noel from './component/views/noel.vue'
import Footer from './component/footer.vue'
</script>

<style>
/* Styles globaux pour l'application */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  /* max-width: 1200px; */
  margin: 0 auto;
  width: 100%;
}

/* Reset et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

/* Smooth scrolling pour les ancres */
html {
  scroll-behavior: smooth;
}

/* Focus visible pour l'accessibilité */
:focus {
  outline: 1px solid #2a9d8f;
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* Responsive typography */
@media screen and (max-width: 768px) {
  .main-content {
    /* padding: 15px; */
  }
}

@media screen and (max-width: 480px) {
  .main-content {
    /* padding: 10px; */
  }
}
</style>