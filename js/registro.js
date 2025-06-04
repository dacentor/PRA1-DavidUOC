import { User } from "../js/clases.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistro");
  const emailInput = document.getElementById("email");

  // Validación automática del dominio @uoc.edu
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

    // Validaciones básicas
    if (!nombre || !apellidos || !username || !email || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Validar email
    const emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!emailValido) {
      alert("El email no tiene un formato válido.");
      return;
    }

    // Validar contraseña segura
    const contraseñaSegura = password.length >= 8 &&
                              /\d/.test(password) &&
                              /[A-Z]/i.test(password) &&
                              /[^\w\s]/.test(password);

    if (!contraseñaSegura) {
      alert("La contraseña debe tener al menos 8 caracteres, una letra, un número y un carácter especial.");
      return;
    }

    // Verificar si ya existe el usuario
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.some(u => u._username === username);
    if (existe) {
      alert("Ese nombre de usuario ya está registrado.");
      return;
    }

    // Crear nuevo usuario
    const nuevoUsuario = new User(nombre, apellidos, email, username, password);
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente. Serás redirigido al login.");
    window.location.href = "/";
  });
});