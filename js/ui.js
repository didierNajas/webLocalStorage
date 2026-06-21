/**
 * ui.js
 * Funciones puras de renderizado y manipulación del DOM.
 * No accede a localStorage ni a la API directamente.
 */

import { TYPE_COLORS, STAT_COLORS, STAT_LABELS } from "./constants.js";

// ─── Selectores del DOM ───────────────────────────────────────────────────────

export const dom = {
  input:           document.getElementById("input"),
  btnBuscar:       document.getElementById("btnBuscar"),
  resultWrapper:   document.getElementById("resultWrapper"),
  loadingSpinner:  document.getElementById("loadingSpinner"),
  pokeData:        document.getElementById("pokeData"),
  pokeCardHeader:  document.getElementById("pokeCardHeader"),
  pokeNumber:      document.getElementById("pokeNumber"),
  pokeName:        document.getElementById("pokeName"),
  pokeTypes:       document.getElementById("pokeTypes"),
  pokeImg:         document.getElementById("pokeImg"),
  pokeStats:       document.getElementById("pokeStats"),
  btnFavoritos:    document.getElementById("btnFavoritos"),
  btnEliminarTodos:document.getElementById("btnEliminarTodos"),
  favoritosGrid:   document.getElementById("mostrarFavoritos"),
  favoritosHeader: document.getElementById("favoritosHeader"),
  favCount:        document.getElementById("favCount"),
  emptyFavoritos:  document.getElementById("emptyFavoritos"),
  toastEl:         document.getElementById("toastMsg"),
  toastText:       document.getElementById("toastText"),
};

// ─── Toast ────────────────────────────────────────────────────────────────────

/**
 * Muestra una notificación flotante.
 * @param {string} message
 * @param {"success"|"warning"|"error"} type
 */
export function showToast(message, type = "success") {
  dom.toastEl.className = `toast align-items-center border-0 text-white toast-${type}`;
  dom.toastText.textContent = message;
  const toast = new bootstrap.Toast(dom.toastEl, { delay: 2800 });
  toast.show();
}

// ─── Helpers de formato ───────────────────────────────────────────────────────

/**
 * Formatea un número de Pokédex: 25 → "#025"
 * @param {number} n
 * @returns {string}
 */
export function formatPokeNumber(n) {
  return "#" + String(n).padStart(3, "0");
}

/**
 * Obtiene los dos colores dominantes de los tipos de un Pokémon.
 * @param {Array} types - Array de objetos tipo { type: { name } }
 * @returns {{ c1: string, c2: string }}
 */
export function getTypeGradient(types) {
  const c1 = TYPE_COLORS[types[0]?.type?.name] || "var(--color-primary)";
  const c2 = types[1]
    ? TYPE_COLORS[types[1].type.name] || c1
    : "var(--color-bg)";
  return { c1, c2 };
}

// ─── Builders de HTML ─────────────────────────────────────────────────────────

/**
 * Genera los badges de tipos para la card principal.
 * @param {Array} types
 * @returns {string} HTML
 */
export function buildTypeBadges(types) {
  return types
    .map((t) => {
      const name  = t.type.name;
      const color = TYPE_COLORS[name] || "#777";
      return `<span class="type-badge"
                    style="background:${color}20; border-color:${color}60; color:${color};">
                ${name}
              </span>`;
    })
    .join("");
}

/**
 * Genera las barras de estadísticas.
 * @param {Array} stats
 * @returns {string} HTML
 */
export function buildStatBars(stats) {
  return stats
    .map((s) => {
      const key   = s.stat.name;
      const val   = s.base_stat;
      const pct   = Math.round((val / 255) * 100);
      const color = STAT_COLORS[key] || "#aaa";
      const label = STAT_LABELS[key] || key;
      return `
        <div class="stat-row">
          <div class="stat-label">
            <span>${label}</span>
            <span>${val}</span>
          </div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill" style="width:${pct}%; background:${color};"></div>
          </div>
        </div>`;
    })
    .join("");
}

/**
 * Genera el HTML de una card de favorito.
 * @param {{ id: number, name: string, image: string, types: string[] }} pokemon
 * @returns {string} HTML
 */
export function buildFavCard(pokemon) {
  const typeColor = TYPE_COLORS[pokemon.types?.[0]] || "var(--color-primary)";
  const typeBadges = (pokemon.types || [])
    .map((t) => {
      const c = TYPE_COLORS[t] || "#777";
      return `<span class="fav-type-badge" style="background:${c};">${t}</span>`;
    })
    .join("");

  return `
    <div class="fav-card" style="--type-color: ${typeColor};">
      <button class="fav-delete-btn" data-id="${pokemon.id}" title="Eliminar de favoritos" aria-label="Eliminar ${pokemon.name} de favoritos">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
      </button>
      <div class="fav-card-header" style="background: linear-gradient(135deg, ${typeColor}55, transparent);">
        <img src="${pokemon.image}" alt="${pokemon.name}" loading="lazy" width="80" height="80" />
      </div>
      <div class="fav-card-body">
        <span class="fav-card-number">${formatPokeNumber(pokemon.id)}</span>
        <p class="fav-card-name">${pokemon.name}</p>
        <div class="fav-card-types">${typeBadges}</div>
      </div>
    </div>`;
}

// ─── Actualización de la sección de resultado ─────────────────────────────────

/** Muestra el spinner y oculta el resultado anterior. */
export function showSearchLoading() {
  dom.resultWrapper.hidden  = false;
  dom.loadingSpinner.hidden = false;
  dom.pokeData.hidden       = true;
}

/** Oculta el spinner y muestra los datos del Pokémon buscado. */
export function showSearchResult(data) {
  const { c1, c2 } = getTypeGradient(data.types);
  dom.pokeCardHeader.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
  dom.pokeNumber.textContent  = formatPokeNumber(data.id);
  dom.pokeName.textContent    = data.name;
  dom.pokeTypes.innerHTML     = buildTypeBadges(data.types);
  dom.pokeImg.src             = data.sprites.other["official-artwork"]?.front_default
                                || data.sprites.front_default;
  dom.pokeImg.alt             = data.name;
  dom.pokeStats.innerHTML     = buildStatBars(data.stats);

  dom.loadingSpinner.hidden   = true;
  dom.pokeData.hidden         = false;
}

/** Oculta la card de resultado completa (en caso de error). */
export function hideSearchResult() {
  dom.resultWrapper.hidden  = true;
  dom.loadingSpinner.hidden = true;
}

// ─── Actualización de la lista de favoritos ───────────────────────────────────

/**
 * Renderiza la lista de favoritos en el DOM.
 * @param {Array} favoritos
 */
export function renderFavoritos(favoritos) {
  dom.favoritosGrid.innerHTML = "";

  const isEmpty = favoritos.length === 0;
  dom.emptyFavoritos.hidden = !isEmpty;

  // Toggling del header con display:none !important requiere el atributo hidden
  if (isEmpty) {
    dom.favoritosHeader.hidden = true;
    return;
  }

  dom.favoritosHeader.hidden = false;
  dom.favCount.textContent   = `${favoritos.length} guardado${favoritos.length !== 1 ? "s" : ""}`;

  const fragment = document.createDocumentFragment();

  favoritos.forEach((pokemon) => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = buildFavCard(pokemon);
    fragment.appendChild(col);
  });

  dom.favoritosGrid.appendChild(fragment);
}

/**
 * Registra la delegación de eventos del grid de favoritos.
 * Debe llamarse UNA sola vez al inicializar la app.
 * @param {(id: number) => void} onDelete
 */
export function initFavGridEvents(onDelete) {
  dom.favoritosGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".fav-delete-btn");
    if (!btn) return;
    e.stopPropagation();
    onDelete(Number(btn.dataset.id));
  });
}
