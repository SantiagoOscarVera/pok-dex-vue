<template>
  <Teleport to="body">
    <div class="modal" v-if="show">
      <div class="modal-content">
        <BaseButton
          class="modal-close modal-close-size"
          :icon="closeButtonSvg"
          :iconAlt="closeAltText"
          @click="$emit('close')"
        />
        <div class="modal-img-bg" :style="{ backgroundImage: `url(${backgroundDesktop})` }">
          <img v-if="pokemonImg" :src="pokemonImg" class="modal-img-poke" :alt="pokemonImgAlt" />
        </div>
        <div class="modal-body">
          <div class="modal-details">
            <p>
              <span class="feature-label">{{ nameLabel }}</span>
              <span class="feature-value">{{ capitalize(pokemonData?.name) }}</span>
            </p>
            <p>
              <span class="feature-label">{{ weightLabel }}</span>
              <span class="feature-value">{{ pokemonData?.weight }}</span>
            </p>
            <p>
              <span class="feature-label">{{ heightLabel }}</span>
              <span class="feature-value">{{ pokemonData?.height }}</span>
            </p>
            <p>
              <span class="feature-label">{{ typesLabel }}</span>
              <span class="feature-value">{{ pokemonTypes }}</span>
            </p>

          </div>
          <div class="modal-actions">
            <BaseButton
              class="modal-share"
              :disabled="!pokemonData"
              @click="shareToClipboard"
            >
              {{ copied ? copiedText : shareTextBtn }}
            </BaseButton>
            <button class="modal-star" :class="{ fav: isFavorite }" @click="$emit('toggle-fav')">
            <img v-if="isFavorite" :src="activeFavSvg" :alt="favAltText" class="modal-star-icon" />
            <img v-else :src="disabledFavSvg" :alt="notFavAltText" class="modal-star-icon" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import closeButtonSvg from '../assets/images/close-button.svg';
import activeFavSvg from '../assets/images/active-fav.svg';
import disabledFavSvg from '../assets/images/disabled-fav.svg';
import backgroundDesktop from '../assets/images/background-desktop.svg';
import { computed, watch, ref } from 'vue'
import { capitalize } from '../utils/string'
import BaseButton from './BaseButton.vue'
/**
 * @typedef {Object} PokemonModalProps
 * @property {boolean} show
 * @property {Object} pokemon
 * @property {boolean} isFavorite
 */

const props = defineProps({
  show: { type: Boolean, required: true },
  pokemon: { type: [Object, null], required: true },
  isFavorite: { type: Boolean, required: true }
})

const emit = defineEmits({
  close: null,
  'toggle-fav': null
})

defineOptions({ name: 'PokemonModal' })
const pokemonData = ref(null)
const pokemonImg = ref('')

const closeAltText = 'Close modal'
const nameLabel = 'Name:'
const weightLabel = 'Weight:'
const heightLabel = 'Height:'
const typesLabel = 'Types:'
const shareTextBtn = 'Share to my friends'
const copiedText = 'Copied!'
const favAltText = 'Favorite'
const notFavAltText = 'Not favorite'
const pokemonImgAlt = computed(() => pokemonData.value ? `Image of ${capitalize(pokemonData.value.name)}` : 'Pokemon image')

const shareText = computed(() => {
  if (!pokemonData.value) return ''
  const name = capitalize(pokemonData.value.name)
  const weight = pokemonData.value.weight
  const height = pokemonData.value.height
  const types = pokemonData.value.types.map(t => capitalize(t.type.name)).join(', ')
  return `${nameLabel} ${name}, ${weightLabel} ${weight}, ${heightLabel} ${height}, ${typesLabel} ${types}`
})

const copied = ref(false)

async function shareToClipboard() {
  try {
    await navigator.clipboard.writeText(shareText.value)
    copied.value = true
    setTimeout(() => copied.value = false, 1500)
  } catch (e) {
    const temp = document.createElement('textarea')
    temp.value = shareText.value
    document.body.appendChild(temp)
    temp.select()
    document.execCommand('copy')
    document.body.removeChild(temp)
    copied.value = true
    setTimeout(() => copied.value = false, 1500)
  }
}

const pokemonTypes = computed(() => {
  if (!pokemonData.value) return ''
  return pokemonData.value.types.map(t => capitalize(t.type.name)).join(', ')
})

defineExpose({ shareToClipboard })

watch(() => props.pokemon, async (poke) => {
  if (!poke) return
  pokemonData.value = null
  pokemonImg.value = ''
  try {
    const res = await fetch(poke.url)
    const data = await res.json()
    pokemonData.value = data
    pokemonImg.value = data.sprites.other['official-artwork'].front_default
  } catch (e) {
    pokemonData.value = null
    pokemonImg.value = ''
  }
}, { immediate: true })
</script>

<style scoped>
  .modal-close-size {
    width: 32px;
    height: 32px;
  }
  .modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: #00000099;
    display: flex;
    align-items: center;
    z-index: 100;
    place-content: center;
  }
  .modal-content {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.13);
    overflow: hidden;
    position: relative;
    animation: modalIn 0.18s;
    width: 315px;
    height: 490px;
    flex-shrink: 0;
  }
  @keyframes modalIn {
    from { transform: translateY(40px) scale(0.97); opacity: 0; }
    to { transform: none; opacity: 1; }
  }
  .modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    padding: 0;
    cursor: pointer;
    z-index: 2;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-close:hover {
    background: none;
  }
  .modal-img-bg {
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-bottom: 1px solid #e0e0e0;
    width: 315px;
    height: 220px;
  }
  .modal-img-poke {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  object-fit: contain;
  z-index: 2;
  }
  .modal-body {
    padding: 0 30px;
  }
  .modal-details {
    margin: 18px 0 0 0;
  }
  .modal-details p {
    margin: 0 0 8px 0;
    font-size: 1.08rem;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 6px;
  }
  .feature-label {
    color: #5E5E5E;
    font-family: 'Lato', Arial, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-right: 4px;
  }

    .feature-value {
    color: #5E5E5E;
    font-family: 'Lato', Arial, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
  .modal-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 22px;
  }
  .modal-share {
    background: #F22539;
    color: #fff;
    border: none;
    border-radius: 24px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.2s;
    text-align: center;
    font-family: 'Lato', Arial, sans-serif;
    font-size: 18px;
    font-style: normal;
  }
  .modal-share:hover {
    background: #e22b2b;
  }
  .modal-star {
    background: none;
    cursor: pointer;
    transition: color 0.2s;
    display: flex;
    padding: 0px;
  }
  .modal-star.fav {
    color: #ffb300;
    text-shadow: 0 1px 2px #e2a200;
  }
.modal-star-icon {
  width: 40px;
  height: 40px;
}
@media (min-width: 768px) {
  .modal-content, .modal-img-bg {
    width: 570px;
  }
}
</style>

