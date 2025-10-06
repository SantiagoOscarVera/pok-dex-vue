<template>
  <li @click="onClick" class="pokemon-card card-pointer">
    <span>{{ capitalize(pokemon.name) }}</span>
    <BaseButton
      class="star-btn"
      :btnClass="{ fav: isFavorite(pokemon) }"
      :icon="isFavorite(pokemon) ? activeFav : disabledFav"
      :iconAlt="isFavorite(pokemon) ? favAltText : notFavAltText"
      @click="onToggleFavorite"
    />
  </li>
</template>

<script setup>
import { capitalize } from '../utils/string'

import BaseButton from './BaseButton.vue'

const props = defineProps({
  pokemon: { type: Object, required: true },
  isFavorite: { type: Function, required: true },
  activeFav: { type: String, required: true },
  disabledFav: { type: String, required: true },
  favAltText: { type: String, default: 'Fav' },
  notFavAltText: { type: String, default: 'Not fav' }
})
const emit = defineEmits(['click', 'toggle-favorite'])

function onClick() {
  emit('click', props.pokemon)
}
function onToggleFavorite() {
  emit('toggle-favorite', props.pokemon)
}
</script>

<style scoped>
.pokemon-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-pointer {
  cursor: pointer;
}
.star-btn {
  background: none;
  border: none;
  cursor: pointer;
}
.star-btn img {
  vertical-align: middle;
}
</style>
