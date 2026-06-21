import { TYPE_COLORS, STAT_COLORS, STAT_LABELS } from "./constants.js";

// Referencias al DOM agrupadas para no andar haciendo getElementById por todo el código
export const dom = {
  input:            document.getElementById("input"),
  btnBuscar:        document.getElementById("btnBuscar"),
  resultWrapper:    document.getElementById("resultWrapper"),
  loadingSpinner:   document.getElementById("loadingSpinner"),
  pokeData:         document.getElementById("pokeData"),
  pokeCardHeader:   document.getElementById("pokeCardHeader"),
  pokeNumber:       document.getElementById("pokeNumber"),
  pokeName:         document.getElementById("pokeName"),
  pokeTypes:        document.getElementById("pokeTypes"),
  pokeImg:          document.getElementById("pokeImg"),
  pokeStats:        document.getElementById("pokeStats"),
  btnFavoritos:     document.getElementById("btnFavoritos"),
  btnEliminarTodos: document.getElementById("btnEliminarTodos"),
  favoritosGrid:    document.getElementById("mostrarFavoritos"),
  favoritosHeader:  document.getElementById("favoritosHeader"),
  favCount:         document.getElementById("favCount"),
  emptyFavoritos:   document.getElementById("emptyFavoritos"),
  toastEl:          document.getElementById("toastMsg"),
  toastText:        document.getElementById("toastText"),
};

export function showToast(message, type = "success") {
  dom.toastEl.className = `toast align-items-center border-0 text-white toast-${type}`;
  dom.toastText.textContent = message;
  new bootstrap.Toast(dom.toastEl, { delay: 2800 }).show();
}

export function formatPokeNumber(n) {
  return "#" + String(n).padStart(3, "0");
}

function getTypeGradient(types) {
  const c1 = TYPE_COLORS[types[0]?.type?.name] || "var(--color-primary)";
  const c2 = types[1] ? TYPE_COLORS[types[1].type.name] || c1 : "var(--color-bg)";
  return { c1, c2 };
}

function buildTypeBadges(types) {
  return types.map(t => {
    const name  = t.type.name;
    const color = TYPE_COLORS[name] || "#777";
    return `<span class="type-badge" style="background:${color}20; border-color:${color}60; color:${color};">${name}</span>`;
  }).join("");
}

function buildStatBars(stats) {
  return stats.map(s => {
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
  }).join("");
}

export function buildFavCard(pokemon) {
  const typeColor  = TYPE_COLORS[pokemon.types?.[0]] || "var(--color-primary)";
  const typeBadges = (pokemon.types || []).map(t => {
    const c = TYPE_COLORS[t] || "#777";
    return `<span class="fav-type-badge" style="background:${c};">${t}</span>`;
  }).join("");

  return `
    <div class="fav-card" style="--type-color: ${typeColor};">
      <button class="fav-delete-btn" data-id="${pokemon.id}" title="Eliminar" aria-label="Eliminar ${pokemon.name} de favoritos">
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

export function showSearchLoading() {
  dom.resultWrapper.hidden  = false;
  dom.loadingSpinner.hidden = false;
  dom.pokeData.hidden       = true;
}

export function showSearchResult(data) {
  const { c1, c2 } = getTypeGradient(data.types);
  dom.pokeCardHeader.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
  dom.pokeNumber.textContent = formatPokeNumber(data.id);
  dom.pokeName.textContent   = data.name;
  dom.pokeTypes.innerHTML    = buildTypeBadges(data.types);
  dom.pokeImg.src            = data.sprites.other["official-artwork"]?.front_default
                               || data.sprites.front_default;
  dom.pokeImg.alt            = data.name;
  dom.pokeStats.innerHTML    = buildStatBars(data.stats);
  dom.loadingSpinner.hidden  = true;
  dom.pokeData.hidden        = false;
}

export function hideSearchResult() {
  dom.resultWrapper.hidden  = true;
  dom.loadingSpinner.hidden = true;
}

export function renderFavoritos(favoritos) {
  dom.favoritosGrid.innerHTML = "";
  const vacio = favoritos.length === 0;
  dom.emptyFavoritos.hidden  = !vacio;
  dom.favoritosHeader.hidden =  vacio;

  if (vacio) return;

  dom.favCount.textContent = `${favoritos.length} guardado${favoritos.length !== 1 ? "s" : ""}`;

  const fragment = document.createDocumentFragment();
  favoritos.forEach(pokemon => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = buildFavCard(pokemon);
    fragment.appendChild(col);
  });
  dom.favoritosGrid.appendChild(fragment);
}

// Se llama una sola vez al init, usa event delegation para no poner un listener por cada card
export function initFavGridEvents(onDelete) {
  dom.favoritosGrid.addEventListener("click", e => {
    const btn = e.target.closest(".fav-delete-btn");
    if (!btn) return;
    e.stopPropagation();
    onDelete(Number(btn.dataset.id));
  });
}
