<template>
  <div class="welcome-container">
    <img :src="pikachuImg" alt="Pikachu" class="welcome-pikachu"/>
    <h2 class="welcome-title">{{ title }}</h2>
    <p class="welcome-desc">{{ description }}</p>
    <BaseButton class="welcome-btn" @click="goToList">
      {{ buttonText }}
    </BaseButton>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import pikachuImg from '../assets/images/hello-pikachu.svg'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const title = 'Welcome to Pokédex'
const description = 'The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.'
const buttonText = 'Get started'

function goToList() {
  router.push('/list')
}
</script>

<style scoped>


.welcome-container {
  min-height: 100vh;
  background: #F9F9F9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
}
.welcome-pikachu {
  width: 325px;
  height: 288px;
  flex-shrink: 0;
  margin-bottom: 18px;
  margin-top: 0;
  display: block;
}
.welcome-title {
  margin: 38px 0 6px 0;
  text-align: center;
  color: #353535;
  font-family: 'Lato', Arial, sans-serif;
font-size: 26px;
font-style: normal;
font-weight: 700;
line-height: normal;
}
.welcome-desc {
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Lato', Arial, sans-serif;
  width: 315px;
height: 82px;
flex-shrink: 0;
color: #5E5E5E;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 150%;
}

.welcome-btn {
  background: #F22539;
  color: #fff;
  border: none;
  border-radius: 60px;
  padding: 12px 32px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Montserrat', Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(242,37,57,0.08);
}
.welcome-btn:hover {
  background: #e22b2b;
}
@media (min-width: 768px) {
  .welcome-desc {
    width: 570px;
  }
}
</style>
