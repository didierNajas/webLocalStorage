import { fetchPokemon }                                   from "./api.js";
import { addFavorito, removeFavorito, clearFavoritos,
         getFavoritos }                                   from "./storage.js";
import { dom, showToast, showSearchLoading,
         showSearchResult, hideSearchResult,
         renderFavoritos, initFavGridEvents }             from "./ui.js";

let pokemonActual = null;

async function handleSearch() {
  const query = dom.input.value.trim();
  if (!query) {
    showToast("Escribe un nombre o número primero", "warning");
    return;
  }

  showSearchLoading();

  try {
    const data    = await fetchPokemon(query);
    pokemonActual = data;
    showSearchResult(data);
  } catch {
    hideSearchResult();
    showToast("Pokémon no encontrado. Verifica el nombre o número.", "error");
  }
}

function refreshFavoritos() {
  renderFavoritos(getFavoritos());
}

function handleSaveFavorito() {
  if (!pokemonActual) {
    showToast("Primero busca un Pokémon", "warning");
    return;
  }

  const added = addFavorito({
    id:    pokemonActual.id,
    name:  pokemonActual.name,
    image: pokemonActual.sprites.other["official-artwork"]?.front_default
           || pokemonActual.sprites.front_default,
    types: pokemonActual.types.map(t => t.type.name),
  });

  if (!added) {
    showToast("Este Pokémon ya está en favoritos", "warning");
    return;
  }

  refreshFavoritos();
  showToast(`¡${pokemonActual.name} guardado en favoritos!`, "success");
}

function handleDeleteFavorito(id) {
  removeFavorito(id);
  refreshFavoritos();
  showToast("Pokémon eliminado de favoritos", "warning");
}

function handleClearFavoritos() {
  if (getFavoritos().length === 0) {
    showToast("No hay favoritos que eliminar", "warning");
    return;
  }
  clearFavoritos();
  refreshFavoritos();
  showToast("Todos los favoritos eliminados", "warning");
}

dom.btnBuscar.addEventListener("click", handleSearch);
dom.input.addEventListener("keydown", e => {
  if (e.key === "Enter") handleSearch();
});
dom.btnFavoritos.addEventListener("click", handleSaveFavorito);
dom.btnEliminarTodos.addEventListener("click", handleClearFavoritos);

document.addEventListener("DOMContentLoaded", () => {
  initFavGridEvents(handleDeleteFavorito);
  refreshFavoritos();
});
