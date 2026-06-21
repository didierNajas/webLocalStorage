import { API_BASE_URL } from "./constants.js";

// Busca un pokémon por nombre o número en la PokéAPI
export async function fetchPokemon(query) {
  const res = await fetch(`${API_BASE_URL}/pokemon/${query.toLowerCase().trim()}`);
  if (!res.ok) throw new Error(`No se encontró: ${query}`);
  return res.json();
}
