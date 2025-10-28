import { auth } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Inicio de sesión exitoso");
    window.location.href = "cuestionario.html"; 
  } catch (error) {
    console.error(error);
    alert("Error al iniciar sesión: " + traducirError(error.code));
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.reload(); // Vuelve al login
  } catch (error) {
    console.error(error);
    alert("Error al registrarte: " + traducirError(error.code));
  }
});

// === OBSERVADOR DE SESIÓN ===
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario activo:", user.email);
  } else {
    console.log("Ningún usuario ha iniciado sesión");
  }
});

export async function cerrarSesion() {
  try {
    await signOut(auth);
    alert("Sesión cerrada correctamente");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

function traducirError(codigo) {
  const errores = {
    "auth/email-already-in-use": "El correo ya está registrado.",
    "auth/invalid-email": "El correo no es válido.",
    "auth/weak-password": "La contraseña es muy débil (mínimo 6 caracteres).",
    "auth/user-not-found": "No se encontró una cuenta con este correo.",
    "auth/wrong-password": "Contraseña incorrecta.",
  };
  return errores[codigo] || "Ocurrió un error inesperado.";
}
