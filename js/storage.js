import { STORAGE_KEY } from "./constants.js";

export function getFavoritos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setFavoritos(favoritos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
}

// Devuelve false si el pokémon ya estaba guardado
export function addFavorito(pokemon) {
  const lista = getFavoritos();
  if (lista.some(f => f.id === pokemon.id)) return false;
  lista.push(pokemon);
  setFavoritos(lista);
  return true;
}

export function removeFavorito(id) {
  setFavoritos(getFavoritos().filter(f => f.id !== id));
}

export function clearFavoritos() {
  localStorage.removeItem(STORAGE_KEY);
}
