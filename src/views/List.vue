<template>
  <div class="list-root">
    <LoaderBall v-if="showLoader" />
    <PokemonModal
      :show="showModal"
      :pokemon="selectedPokemon"
      :isFavorite="selectedPokemon && isFavorite(selectedPokemon)"
      @close="closeModal"
      @toggle-fav="selectedPokemon && toggleFavorite(selectedPokemon)"
    />
  <section class="list-section" v-show="activeTab === 'all' && !showLoader">
      <SearchInput
        v-model="search"
        :placeholder="searchPlaceholder"
        :icon="searchIcon"
      />
  <div v-if="loading" class="loading">{{ loadingText }}</div>
  <ul v-else class="pokemon-list">
    <PokemonCard
      v-for="pokemon in filteredPokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
      :isFavorite="isFavorite"
      :activeFav="activeFav"
      :disabledFav="disabledFav"
      :favAltText="favAltText"
      :notFavAltText="notFavAltText"
      @click="openModal"
      @toggle-favorite="toggleFavorite"
    />
  </ul>
        <div v-if="!loading && filteredPokemons.length === 0" class="no-results-centered">
  <p class="no-results-title">{{ noResultsTitle }}</p>
  <p class="no-results-subtitle">{{ noResultsSubtitle }}</p>
  <BaseButton class="welcome-btn go-back-home-btn" @click="goHome">
    {{ goBackHomeText }}
  </BaseButton>
      </div>
  <div v-if="error" class="error-message">{{ error }}</div>
    </section>
  <section class="favorites-section" v-show="activeTab === 'favorites' && !showLoader">
    <SearchInput
      v-model="searchFavorites"
      :placeholder="searchPlaceholder"
      :icon="searchIcon"
    />
    <ul class="pokemon-list" v-if="filteredFavorites.length > 0">
      <PokemonCard
        v-for="pokemon in filteredFavorites"
        :key="pokemon.name"
        :pokemon="pokemon"
        :isFavorite="isFavorite"
        :activeFav="activeFav"
        :disabledFav="disabledFav"
        :favAltText="favAltText"
        :notFavAltText="notFavAltText"
        @click="openModal"
        @toggle-favorite="toggleFavorite"
      />
    </ul>
    <div v-else class="no-results-centered">
      <p class="no-results-title">{{ noResultsTitle }}</p>
      <p class="no-results-subtitle">{{ noResultsSubtitle }}</p>
      <BaseButton class="welcome-btn go-back-home-btn" @click="goHome">
        {{ goBackHomeText }}
      </BaseButton>
    </div>
  </section>
  <nav class="tab-bar" v-show="filteredPokemons.length > 0 && !showLoader">
    <BaseButton
      :btnClass="['tab-btn', { active: activeTab === 'all', inactive: activeTab !== 'all' }]"
      :icon="linesBtn"
      iconAlt="All"
  btnClass="tab-btn-margin"
      @click="() => activeTab = 'all'"
    >
  <span class="tab-btn-text">{{ allTabText }}</span>
    </BaseButton>
    <BaseButton
      :btnClass="['tab-btn', { active: activeTab === 'favorites', inactive: activeTab !== 'favorites' }]"
      :icon="starBtn"
      iconAlt="Fav"
  btnClass="tab-btn-margin"
      @click="() => activeTab = 'favorites'"
    >
  <span class="tab-btn-text">{{ favoritesTabText }}</span>
    </BaseButton>
  </nav>
  </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PokemonModal from '../components/PokemonModal.vue'
import LoaderBall from '../components/LoaderBall.vue'
import { useFavorites } from '../composables/useFavorites'
import searchIcon from '../assets/images/search-icon.svg'
import activeFav from '../assets/images/active-fav.svg'
import disabledFav from '../assets/images/disabled-fav.svg'
import linesBtn from '../assets/images/white-lines-button.svg'
import starBtn from '../assets/images/white-star-button.svg'

import SearchInput from '../components/SearchInput.vue'

import PokemonCard from '../components/PokemonCard.vue'

import BaseButton from '../components/BaseButton.vue'


const searchPlaceholder = 'Search'
const loadingText = 'Cargando...'
const favAltText = 'Fav'
const notFavAltText = 'Not fav'
const noResultsTitle = 'Uh-oh!'
const noResultsSubtitle = 'You look lost on your journey!'
const goBackHomeText = 'Go back home'
const noFavoritesText = 'No favorites yet'
const allTabText = 'All'
const favoritesTabText = 'Favorites'


const pokemons = ref([])
const loading = ref(true)
const error = ref('')
const activeTab = ref('all')

const showModal = ref(false)
const selectedPokemon = ref(null)
const search = ref('')
const searchFavorites = ref('')
const showLoader = ref(true)

const router = useRouter()
const { favorites, loadFavorites, isFavorite, toggleFavorite } = useFavorites()


const filteredPokemons = computed(() => {
  if (!search.value.trim()) return pokemons.value
  return pokemons.value.filter(p =>
    p.name.toLowerCase().includes(search.value.trim().toLowerCase())
  )
})

const filteredFavorites = computed(() => {
  if (!searchFavorites.value.trim()) return favorites.value
  return favorites.value.filter(p =>
    p.name.toLowerCase().includes(searchFavorites.value.trim().toLowerCase())
  )
})

function openModal(pokemon) {
  selectedPokemon.value = pokemon
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedPokemon.value = null
}

function goHome() {
  router.push('/')
}

onMounted(async () => {
  loadFavorites()
  loading.value = true
  setTimeout(() => {
    showLoader.value = false
  }, 1200)
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    if (!res.ok) throw new Error('Error al obtener datos')
    const data = await res.json()
    pokemons.value = data.results
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.go-back-home-btn {
  font-size: 18px;
  font-weight: 500;
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
.list-section {
  padding: 35px 0px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
}

.pokemon-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.pokemon-list li {
  width: 315px;
  height: 60px;
  background: #fff;
  margin: 10px auto;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Lato', Arial, sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: normal;
  color: #353535;
  border: none;
  transition: box-shadow 0.2s;
}

.pokemon-list li span {
  text-align: left;
  flex: 1;
  margin-left: 20px;
}

.pokemon-list li:last-child {
  border-bottom: none;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.star-btn img {
  vertical-align: middle;
}

.no-results {
  text-align: center;
  padding: 40px 20px;
  background-color: #fff3f3;
  border-radius: 8px;
  margin-top: 20px;
}

.no-results h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #d9534f;
}

.no-results p {
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
}

.favorites-section {
    padding: 35px 0px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 20px;
}

.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.07);
  padding: 0.5rem 0;
  z-index: 10;
  margin-top: 20px;
  height: 56px;
}
.tab-btn {
    margin: 0 8px;
    display: flex;
    width: 150px;
    height: 44px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    place-self: center;
}

.tab-btn.inactive {
  background-color: #BFBFBF ;
  color: #fff ;
}

.tab-btn-margin {
  margin-right: 8px;
}

.tab-btn-text {
  vertical-align: middle;
}

.error-message {
  color: red;
}

.no-favorites-message {
  text-align: center;
  color: #888;
}

.tab-btn img {
  vertical-align: middle;
  margin-right: 8px;
}
.no-results-centered {
  min-height: 812px;
  background: #F9F9F9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.list-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

@media (min-width: 768px) {
  .pokemon-list li {
    width: 570px;
  }
  .tab-btn {
    width: 275px;
  }
}
</style>

