/**
 * storage.js
 * Capa de acceso a localStorage.
 * Toda operación de lectura/escritura de favoritos pasa por aquí.
 */

import { STORAGE_KEY } from "./constants.js";

/**
 * Devuelve el array de favoritos guardados.
 * @returns {Array}
 */
export function getFavoritos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/**
 * Guarda el array de favoritos completo en localStorage.
 * @param {Array} favoritos
 */
export function setFavoritos(favoritos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
}

/**
 * Agrega un Pokémon a favoritos si no existe ya.
 * @param {{ id: number, name: string, image: string, types: string[] }} pokemon
 * @returns {boolean} true si se agregó, false si ya existía
 */
export function addFavorito(pokemon) {
  const favoritos = getFavoritos();
  if (favoritos.some((f) => f.id === pokemon.id)) return false;
  favoritos.push(pokemon);
  setFavoritos(favoritos);
  return true;
}

/**
 * Elimina un Pokémon de favoritos por su id.
 * @param {number} id
 */
export function removeFavorito(id) {
  const favoritos = getFavoritos().filter((f) => f.id !== id);
  setFavoritos(favoritos);
}

/**
 * Elimina todos los favoritos.
 */
export function clearFavoritos() {
  localStorage.removeItem(STORAGE_KEY);
}
