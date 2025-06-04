document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistro");
  const emailInput = document.getElementById("email");


  emailInput.addEventListener("input", () => {
    if (emailInput.value.includes("@") && !emailInput.value.includes("@uoc.edu")) {
      emailInput.value = emailInput.value.replace("@", "@uoc.edu");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Validaciones
    if (!nombre || !apellidos || !direccion || !username) {
      alert("Los campos Nombre, Apellidos, Dirección y Usuario son obligatorios.");
      return;
    }
    const emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!emailValido) {
      alert("El email no tiene un formato válido.");
      return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/i.test(password) || !/[^\w\s]/.test(password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una letra, un número y un carácter especial.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.some(u => u._username === username);
    if (existe) {
      alert("Ese nombre de usuario ya está registrado.");
      return;
    }

    const nuevoUsuario = new User(nombre, apellidos, direccion, poblacion, codigoPostal, email, username, password);
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario registrado correctamente. Serás redirigido al login.");
    window.location.href = "index.html";
  });
});