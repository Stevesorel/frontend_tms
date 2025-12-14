
<template>

    <section id="slot1">
        
        <h1>CONTACTEZ NOUS SUR WHATSAPP POUR EN DISCUTER PLUS EN DETAILS </h1>
        <p>     
            WHATSAPP : +237 650536195
        </p>
        <router-link to="/" id="formule">Back</router-link>
        
    </section>

</template>

<style scoped>

#slot1
{
    min-height: 50vh;
    background-color: rgb(0, 0, 0);
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    flex-direction: column;
    background-image:url('../../public/vue.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding:20px;
}
h1
{
    font-size: 40px;
    color: rgb(255, 255, 255);
    text-align: center;
}
p
{
    font-size: 25px;
    color: azure;
    text-align: center;
}
a
{
    padding: 15px 30px;
    font-size: 20px;
    border-radius: 50px;
    border-color: rgb(69, 35, 117);
    border: none;
    background-color: rgb(38, 11, 101);
    color: white;
    transition: 0.3s;
    font-weight: bold;
    text-decoration: none;
}
a:hover
{
    scale: 0.9;
}
</style>

<script setup>

</script>