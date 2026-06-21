/**
 * constants.js
 * Datos estáticos de la aplicación: colores por tipo, labels y colores de stats.
 * No contiene lógica, solo configuración.
 */

export const TYPE_COLORS = {
  normal:           "#9a9a74",
  fire:             "#f08030",
  water:            "#6890f0",
  electric:         "#f8d030",
  grass:            "#78c850",
  ice:              "#98d8d8",
  fighting:         "#c03028",
  poison:           "#a040a0",
  ground:           "#e0c068",
  flying:           "#a890f0",
  psychic:          "#f85888",
  bug:              "#a8b820",
  rock:             "#b8a038",
  ghost:            "#705898",
  dragon:           "#7038f8",
  dark:             "#705848",
  steel:            "#b8b8d0",
  fairy:            "#f0b6bc",
};

export const STAT_COLORS = {
  hp:               "#ff5959",
  attack:           "#f5ac78",
  defense:          "#fae078",
  "special-attack": "#9db7f5",
  "special-defense":"#a7db8d",
  speed:            "#fa92b2",
};

export const STAT_LABELS = {
  hp:               "HP",
  attack:           "ATK",
  defense:          "DEF",
  "special-attack": "SpA",
  "special-defense":"SpD",
  speed:            "SPD",
};

/** Clave usada en localStorage para el array de favoritos. */
export const STORAGE_KEY = "favoritos";

/** Base URL de la PokéAPI. */
export const API_BASE_URL = "https://pokeapi.co/api/v2";
