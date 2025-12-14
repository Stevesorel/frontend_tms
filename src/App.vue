<template>
  <section>
    <!-- Bannière -->
    <section id="slot">
      <h1 id="Home">TMS²</h1>
    </section>
    <!-- Header -->
    <header>
      <!-- Burger (mobile) -->
      <div id="men">
        <button id="menu" @click="toggleMenu" aria-label="Ouvrir le menu">&#9776</button>
      </div>
      <!-- Menu principal -->
      <nav id="main" :class="{ active: isOpen }" aria-expanded="isOpen">
        <a href="#Home" @click="closeMenu">🏡️Home</a>
        <a href="#formules" @click="closeMenu">❄️Formules</a>
        <a href="#processus" @click="closeMenu">🚣‍♂️️Processus</a>
        <a href="#contact" @click="closeMenu">☎️Contact</a>
      </nav>
      <!-- Logo -->
      <div id="img">
        <img src="../public/logo.svg" alt="logo" />
      </div>
    </header>

    <!-- Contenu -->
    <router-view />
    <Formule />
    <Processus />
    <Contact />
  </section>

  <footer>
    <div id="footer">
      <div>
        <p>&copy; 2025   TMS²    tout droits réservés</p>
      </div>

      <div>
      <a href="https://wa.me/237650536195" target="_blank">
         <img src="/whatsapp.jpeg" alt="WhatsApp" />
    </a>

    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=motcheyostevesoreltamwo@gmail.com&su=Contact" target="_blank">
        <img src="/email.png" alt="Gmail" />
    </a>

    <a href="https://www.linkedin.com/in/steve-motcheyo-3540a5360/" target="_blank">
        <img src="/linkdin.png" alt="LinkedIn" />
    </a>

        <!-- <a href=""><img src="/telegram.png" alt="logo"/></a> -->
        <!-- <a href=""><img src="/instagram.jpeg" alt="logo"/></a> -->
      </div>

      <div class="WOLF">
        Contactez nous via ces reseaux sociaux
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import Formule from './component/formule.vue'
import Processus from './component/processus.vue'
import Contact from './component/contact.vue'

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}
</script>

<style scoped>
/* ---------- Desktop defaults ---------- */
#men,
#img {
  display: none;
}

h1
{
  font-size: 30px;
  color: rgba(255, 255, 255, 0.89);
  background-color: rgb(0, 0, 0);
  padding: 10px;
  border-radius: 100%;
  border:3px solid rgb(255, 255, 255);
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
}

.WOLF {
  display: flex;
  justify-content: center;
  align-items: center;
}

#footer {
  background-color: black;
  display: flex;
  justify-content: space-between;
  color: aliceblue;
}
#footer div {
  display: flex;
  justify-content: center;
  align-items: center;
}
#footer img { width: 60px; }

footer {
  background-color: black;
  color: white;
  padding: 20px 20px;
}

#slot {
  height: 90px;
  background-color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

/* Header */
header {
  position: sticky;
  top: 0;
  padding: 20px ;
  display: flex;
  align-items: center;
  background-color: rgb(5, 5, 33);
  justify-content: center;
  z-index: 100;
  border-bottom: 2px solid black;
}

a
{
  cursor: pointer;
}

header a {
  padding: 7px 10px;
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-size: 20px;
  margin: 0 15px;
  border-radius: 30px;
  transition: 0.3s;
}
header a:hover {
  color: rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 0.276);
}

  #footer img {
    width: 35px;
    margin: 10px 10px;
    border-radius: 100px;
    cursor: pointer;
  }

/* ---------- Mobile ---------- */
@media screen and (max-width: 600px) {
  #footer { flex-direction: column; }

  header div img {
    width: 50px;
    border-radius: 100%;
  }

  #footer img {
    width: 35px;
    margin: 10px 10px;
    border-radius: 100px;
  }

  header {
    justify-content: space-between;
    padding: 15px;

  }

  /* burger button */
  #menu {
    font-size: 40px;
    color: white;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
  }

  /* menu caché par défaut (positionné relativement à header) */
  #main {
    position: absolute;
    z-index: 200;
    left: -1500px;            /* hors écran */
    top: 80px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px;
  background-color: rgb(5, 5, 33);
    transition: left 0.25s ease;
    box-sizing: border-box;
  }

  #main a {
    margin: 15px 0;
    border:1px solid white;
    width: 90%;
    text-align: center;
    padding: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.945);
  }

  /* quand on ouvre le menu */
  #main.active {
    left: 0;
  }

  /* afficher burger et logo en mobile */
  #men,
  #img {
    display: flex;
  }
}
</style>
