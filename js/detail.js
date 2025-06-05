
// Importa las constantes necesarias para acceder a la API de TMDB
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from './config.js'

// Espera a que se cargue completamente el DOM para ejecutar el script
document.addEventListener('DOMContentLoaded', async () => {
  // Obtiene el parámetro "id" de la URL (ej: detail.html?id=123)
  const params = new URLSearchParams(window.location.search)
  const movieId = params.get('id')

  // Referencia al contenedor donde se mostrará la información de la película
  const contenedor = document.getElementById('detallePelicula')

  // Validación rápida por si no se ha recibido un ID válido
  if (!movieId) {
    contenedor.innerHTML = '<p>ID de película no válido.</p>'
    return
  }

  try {
    // Petición a la API de TMDB para obtener la información detallada de una película concreta
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`)
    const peli = await res.json()

    // Rellenamos el contenedor con los datos obtenidos
    contenedor.innerHTML = `
      <h1>${peli.title}</h1>
      <img src="${IMAGE_BASE_URL + peli.poster_path}" alt="${peli.title}" width="300" />
      <p><strong>Fecha de estreno:</strong> ${peli.release_date}</p>
      <p><strong>Géneros:</strong> ${peli.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Popularidad:</strong> ${peli.popularity}</p>
      <p><strong>Votos:</strong> ${peli.vote_average} (${peli.vote_count} votos)</p>
      <p><strong>Resumen:</strong> ${peli.overview}</p>
    `
  } catch (error) {
    // Si ocurre algún error con la petición a la API, mostramos un mensaje de error
    console.error('Error al cargar detalle de película:', error)
    contenedor.innerHTML = '<p>Error al cargar la película.</p>'
  }
})