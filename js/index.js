document.addEventListener("DOMContentLoaded", () => {
  const authContainer = document.querySelector(".auth-buttons");

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuarioActivo) {
    // Si hay usuario logueado, mostrar mensaje y botón de logout
    authContainer.innerHTML = `
      <span>Hola, ${usuarioActivo._username}</span>
      <button id="logout">Cerrar sesión</button>
    `;

    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      location.reload();
    });
  } else {
    // Si NO hay sesión activa, asignar eventos a los botones
    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");

    btnRegistro?.addEventListener("click", () => {
      window.location.href = "html/registro.html"; // ✅ Ruta correcta
    });

    btnLogin?.addEventListener("click", () => {
      window.location.href = "html/login.html"; // ✅ Ruta correcta
    });
  }
});
