import { API_KEY, BASE_URL, IMAGE_BASE_URL } from './config.js'

//Obtener el ID desde la URL
const obtenerIdDesdeURL = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('id')
}

//Formatear fecha como "15 ene 2023"
const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr)
  const opciones = { day: '2-digit', month: 'short', year: 'numeric' }
  return fecha.toLocaleDateString('es-ES', opciones)
}

//Obtener datos de la película desde la API
const cargarDetalle = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`)
    const peli = await res.json()
    mostrarDetalle(peli)
  } catch (error) {
    console.error('Error al cargar detalle:', error)
    document.getElementById('detallePelicula').innerHTML = '<p>Error al cargar la película.</p>'
  }
}

// 🎬 Mostrar los datos en el HTML
const mostrarDetalle = (peli) => {
  const contenedor = document.getElementById('detallePelicula')
  const fecha = formatearFecha(peli.release_date)
  const generos = peli.genres.map(g => g.name).join(', ')

  contenedor.innerHTML = `
    <img src="${IMAGE_BASE_URL + peli.poster_path}" alt="${peli.title}" width="250" />
    <h2>${peli.title}</h2>
    <p><strong>Fecha de estreno:</strong> ${fecha}</p>
    <p><strong>Géneros:</strong> ${generos}</p>
    <p><strong>Puntuación:</strong> ${peli.vote_average} / 10</p>
    <p>${peli.overview}</p>
  `
}

//Verificar sesión y comenzar
const usuario = localStorage.getItem('usuarioActivo')
if (!usuario) {
  window.location.href = 'index.html'
} else {
  const idPelicula = obtenerIdDesdeURL()
  if (idPelicula) {
    cargarDetalle(idPelicula)
  } else {
    document.getElementById('detallePelicula').innerHTML = '<p>No se ha proporcionado una película válida.</p>'
  }
}