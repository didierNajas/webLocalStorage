# Pokédex

Una Pokédex web que consume la [PokéAPI](https://pokeapi.co/) y guarda tus favoritos en `localStorage`. Sin backend, sin dependencias de build — solo HTML, CSS y JavaScript modular.

🔗 **[Ver demo en vivo](https://didiernajas.github.io/webLocalStorage/)**

---

## Qué hace

- Busca cualquier Pokémon por nombre o número
- Muestra imagen oficial, tipos, y barras de stats
- El color de la card cambia según el tipo del Pokémon
- Guarda y elimina favoritos (persisten aunque cierres el navegador)
- Funciona en móvil

## Tecnologías

- HTML5 semántico
- CSS con custom properties (`var()`)
- JavaScript ES Modules (sin bundler)
- Bootstrap 5 para el grid y el toast
- localStorage como capa de persistencia
- PokéAPI (gratuita, sin auth)

## Estructura

```
pokeApiWebStorage/
├── index.html
├── style.css
└── js/
    ├── main.js        # punto de entrada, conecta todo
    ├── api.js         # fetch a la PokéAPI
    ├── storage.js     # lectura/escritura en localStorage
    ├── ui.js          # renderizado y manipulación del DOM
    └── constants.js   # colores por tipo, labels de stats
```

Cada módulo tiene una sola responsabilidad. Si la API cambia de URL, solo tocas `api.js`. Si cambian los colores de los tipos, solo tocas `constants.js`.

## Correr en local

No necesita instalación. Clona el repo y abre `index.html` con un servidor local (Live Server de VSCode funciona bien). No abrir directo como `file://` porque los módulos ES requieren HTTP.

```bash
git clone https://github.com/didierNajas/webLocalStorage.git
cd webLocalStorage
# abrir con Live Server o cualquier servidor estático
```

## Notas

- La PokéAPI es pública y gratuita, no necesita API key
- Los favoritos se guardan en el navegador del usuario, no en ningún servidor
- Las imágenes vienen del artwork oficial de la PokéAPI
