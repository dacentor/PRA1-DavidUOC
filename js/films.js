document.addEventListener("DOMContentLoaded", () => {
  // Si no hay usuario logueado, redirige al login
  if (!localStorage.getItem("usuarioActivo")) {
    window.location.href = "index.html";
    return;
  }

  const contenedor = document.getElementById("contenedorPeliculas");

  // Función para cargar películas populares
  const cargarPeliculas = async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`);
      const data = await res.json();
      mostrarPeliculas(data.results);
    } catch (error) {
      console.error("Error al cargar películas:", error);
    }
  };

  // Mostrar cada película
  const mostrarPeliculas = (peliculas) => {
    contenedor.innerHTML = '';

    peliculas.forEach(peli => {
      const div = document.createElement("div");
      const fecha = new Date(peli.release_date);
      const fechaFormateada = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

      div.innerHTML = `
        <img src="${IMAGE_BASE_URL + peli.poster_path}" alt="${peli.title}" width="200" />
        <h3>${peli.title}</h3>
        <p>Estreno: ${fechaFormateada}</p>
      `;
      contenedor.appendChild(div);
    });
  };

  cargarPeliculas();
});