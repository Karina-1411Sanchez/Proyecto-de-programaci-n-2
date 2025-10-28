import { auth } from "./firebase-config.js";
import { verificarSesion } from "./autenticacion.js";

verificarSesion();

window.addEventListener("DOMContentLoaded", () => {
  const mensaje = localStorage.getItem("consejo");
  const contenedor = document.getElementById("resultado");
  contenedor.textContent = mensaje || "Gracias por compartir tus emociones 💜";

  document.getElementById("avatar").src = "../img/avatar.png";
});
