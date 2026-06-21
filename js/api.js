/**
 * api.js
 * Comunicación con la PokéAPI.
 * Aísla los fetch para que el resto del código no dependa de la URL directamente.
 */

import { API_BASE_URL } from "./constants.js";

/**
 * Busca un Pokémon por nombre o número.
 * @param {string} query - Nombre (ej: "pikachu") o número (ej: "25")
 * @returns {Promise<Object>} Datos crudos de la PokéAPI
 * @throws {Error} Si el Pokémon no existe o falla la red
 */
export async function fetchPokemon(query) {
  const res = await fetch(`${API_BASE_URL}/pokemon/${query.toLowerCase().trim()}`);
  if (!res.ok) throw new Error(`Pokémon "${query}" no encontrado (status ${res.status})`);
  return res.json();
}
