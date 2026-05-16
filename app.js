const btnBuscar = document.getElementById("btnBuscar");
const mostrarPokemon = document.getElementById("mostrarPokemon");
const btnFavoritos = document.getElementById("btnFavoritos");
const btnEliminarTodos = document.getElementById("btnEliminarTodos"); 
const mostrarFavoritos = document.getElementById("mostrarFavoritos");


btnBuscar.addEventListener("click", function () {

  const nombre = document.getElementById("input").value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(res => res.json())
    .then(data => {

      console.log(data); //revisar
      pokemonActual = data;  // Guardar Pokémon
      mostrarPokemon.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${data.sprites.front_default}">
      `;
    })
    .catch(() => {
      alert("Pokemon no encontrado");
    });

});

btnEliminarTodos.addEventListener("click", function () {

localStorage.removeItem("favoritos");

updateFavoritesList();

});

function updateFavoritesList() {
    // Obtener contenedor
    const contenedor = document.getElementById("mostrarFavoritos");

    // Limpiar contenido previo
    contenedor.innerHTML = "";

    // Obtener favoritos desde localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Recorrer favoritos
    favoritos.forEach(pokemon =>
        {
        const div = document.createElement("div");

        div.innerHTML = `
            <p>${pokemon.name}</p>
            <img src="${pokemon.image}" width="100">
        `;

        contenedor.appendChild(div);
    });
}

// Variable global para almacenar el Pokémon actual
let pokemonActual = null;

// Función para guardar Pokémon en favoritos
function saveFavorite() {
    // Verificar si hay un Pokémon buscado
    if (!pokemonActual) {
        alert("Primero busca un Pokémon");
        return;
    }

    // Obtener lista de favoritos desde localStorage
    let favoritos = localStorage.getItem("favoritos");
    if (favoritos === null) {
        favoritos = [];  // Si no hay, crear array vacío
    } else {
        favoritos = JSON.parse(favoritos);  // Convertir string a array
    }

    // Verificar si el Pokémon ya existe en favoritos
    let existe = false;
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id === pokemonActual.id) {
            existe = true;  // Se encontró el Pokémon
            break;  // Salir del bucle
        }
    }

    // Si ya existe, mostrar alerta y salir
    if (existe) {
        alert("Este Pokémon ya está en favoritos");
        return;
    }

    // Crear objeto con los datos del Pokémon
    let nuevoFavorito = {
        id: pokemonActual.id,  // ID único del Pokémon
        name: pokemonActual.name,  // Nombre del Pokémon
        image: pokemonActual.sprites.front_default  // Imagen frontal
    };

    // Agregar al array de favoritos
    favoritos.push(nuevoFavorito);
    
    // Guardar en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    
    // Actualizar la lista en pantalla
    updateFavoritesList();
    
    // Mensaje de éxito
    alert("Pokémon agregado a favoritos");
}

// Event listener para el botón de favoritos
btnFavoritos.addEventListener("click", saveFavorite);


document.addEventListener("DOMContentLoaded", updateFavoritesList);