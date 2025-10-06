import { ref } from 'vue'

export function useFavorites(storageKey = 'favorites') {
  const favorites = ref([])

  function loadFavorites() {
    const favs = localStorage.getItem(storageKey)
    favorites.value = favs ? JSON.parse(favs) : []
  }

  function saveFavorites() {
    localStorage.setItem(storageKey, JSON.stringify(favorites.value))
  }

  function isFavorite(pokemon) {
    return favorites.value.some(fav => fav.name === pokemon.name)
  }

  function toggleFavorite(pokemon) {
    if (isFavorite(pokemon)) {
      favorites.value = favorites.value.filter(fav => fav.name !== pokemon.name)
    } else {
      favorites.value.push(pokemon)
    }
    saveFavorites()
  }

  return {
    favorites,
    loadFavorites,
    saveFavorites,
    isFavorite,
    toggleFavorite
  }
}
