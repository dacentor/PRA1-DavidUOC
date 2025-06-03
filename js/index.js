document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  const btnRegistro = document.getElementById("btnRegistro");

  // Redirigir si ya hay sesión activa
  if (localStorage.getItem("usuarioActivo")) {
    window.location.href = "films.html";
    return;
  }

  // Ir a la página de registro
  btnRegistro.addEventListener("click", () => {
    window.location.href = "registro.html";
  });

  // Validar login
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u._username === username && u._password === password);

    if (usuario) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      window.location.href = "films.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
});