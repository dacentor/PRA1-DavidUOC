// Importamos las constantes de configuración y las clases si se necesitan
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from './config.js'
import { Film, FilmList } from './clases.js'

document.addEventListener("DOMContentLoaded", () => {
  // Verifica sesión activa
  const usuarioActivo = localStorage.getItem("usuarioActivo")
  if (!usuarioActivo) {
    window.location.href = "index.html"
    return
  }

  // Referencias a elementos del DOM
  const contenedorPeliculas = document.getElementById("contenedorPeliculas")
  const contenedorGeneros = document.getElementById("contenedorGeneros")
  const btnAnterior = document.getElementById("btnAnterior")
  const btnSiguiente = document.getElementById("btnSiguiente")
  const spanPaginaActual = document.getElementById("paginaActual")

  // Variables de estado
  let page = 1
  let totalPages = 1            // Aún desconocido, se actualizará tras la petición
  let selectedGenres = []       // Array de IDs de géneros seleccionados
  let genresList = []           // Array con {id, name} de géneros

  // Carga géneros al inicio y mostrarlos como checkboxes
  const cargarGeneros = async () => {
    try {
      const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`)
      const data = await res.json()
      genresList = data.genres // [{id: 28, name: "Acción"}, {id: 12, name: "Aventura"}, ...]
      mostrarCheckboxesGeneros(genresList)
    } catch (error) {
      console.error("Error al cargar géneros:", error)
    }
  }

  // Pintar checkboxes de géneros en contenedorGeneros
  const mostrarCheckboxesGeneros = (generos) => {
    generos.forEach(genre => {
      const label = document.createElement("label")
      label.classList.add("gen-label")

      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.value = genre.id
      checkbox.addEventListener("change", (e) => {
        const id = parseInt(e.target.value)
        if (e.target.checked) {
          // Añadir género si se marcó
          selectedGenres.push(id)
        } else {
          // Quitar género si se desmarcó
          selectedGenres = selectedGenres.filter(g => g !== id)
        }
        // Al cambiar los géneros, volvemos a cargar la página 1 y recargamos
        page = 1
        cargarPeliculas()
      })

      label.appendChild(checkbox)
      label.appendChild(document.createTextNode(genre.name))
      contenedorGeneros.appendChild(label)
    })
  }

  // Función para cargar películas según page y selectedGenres
  const cargarPeliculas = async () => {
    try {
      // Construir parámetros de filtros
      const withGenresParam = selectedGenres.length > 0
        ? `&with_genres=${selectedGenres.join(',')}`
        : ''

      const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&page=${page}${withGenresParam}`
      )
      const data = await res.json()
      totalPages = data.total_pages  // Guardamos el total de páginas
      mostrarPeliculas(data.results)
      actualizarPaginacion()
    } catch (error) {
      console.error("Error al cargar películas:", error)
      contenedorPeliculas.innerHTML = "<p>Ocurrió un error al cargar las películas.</p>"
    }
  }

  // Mostrar las películas en pantalla
  const mostrarPeliculas = (peliculas) => {
    contenedorPeliculas.innerHTML = ''

    if (peliculas.length === 0) {
      contenedorPeliculas.innerHTML = "<p>No hay películas que mostrar.</p>"
      return
    }

    peliculas.forEach(peli => {
      const div = document.createElement("div")
      div.classList.add("pelicula-item")

      const fecha = new Date(peli.release_date)
      const opcionesFecha = { day: '2-digit', month: 'short', year: 'numeric' }
      const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha)

      div.innerHTML = `
        <img
          src="${IMAGE_BASE_URL + peli.poster_path}"
          alt="${peli.title}"
          width="200"
        />
    <a href="detail.html?id=${peli.id}">
  <img src="${IMAGE_BASE_URL + peli.poster_path}" alt="${peli.title}" width="200" />
</a>
        <p>Estreno: ${fechaFormateada}</p>
      `
      contenedorPeliculas.appendChild(div)
    })
  }

  // Actualizar los botones de paginación y el texto de la página actual
  const actualizarPaginacion = () => {
    spanPaginaActual.textContent = page

    // Habilitar/deshabilitar botones según el rango
    btnAnterior.disabled = page <= 1
    btnSiguiente.disabled = page >= totalPages
  }

  // Manejo de click en “Anterior”
  btnAnterior.addEventListener("click", () => {
    if (page > 1) {
      page--
      cargarPeliculas()
    }
  })

  // Manejo de click en “Siguiente”
  btnSiguiente.addEventListener("click", () => {
    if (page < totalPages) {
      page++
      cargarPeliculas()
    }
  })

  // Inicializar: cargar géneros y luego la primera página de películas
  cargarGeneros().then(() => cargarPeliculas())
})