import { API_KEY, BASE_URL, IMAGE_BASE_URL } from './config.js'

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search)
  const movieId = params.get('id')

  const contenedor = document.getElementById('detallePelicula')

  if (!movieId) {
    contenedor.innerHTML = '<p>ID de película no válido.</p>'
    return
  }

  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`)
    const peli = await res.json()

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
    console.error('Error al cargar detalle de película:', error)
    contenedor.innerHTML = '<p>Error al cargar la película.</p>'
  }
})
