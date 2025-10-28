import { auth, db } from "./firebase-config.js";
import { verificarSesion } from "./autenticacion.js";
import {
  doc,
  setDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

verificarSesion();

const form = document.getElementById("formCuestionario");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return alert("Debes iniciar sesión.");

  const emociones = {
    energia: form.energia.value,
    sueno: form.sueno.value,
    concentracion: form.concentracion.value,
    animo: form.animo.value,
  };

  let consejo = "";
  if (emociones.animo === "feliz") consejo = "Sigue manteniendo esa energía positiva 🌞";
  else if (emociones.animo === "triste") consejo = "Habla con alguien de confianza 💜";
  else if (emociones.animo === "estresado") consejo = "Tómate un descanso y respira profundo 🌿";
  else consejo = "Un día tranquilo para reflexionar ☁️";

  const fecha = new Date();
  const dia = fecha.toLocaleDateString("es-ES", { weekday: "long" });

  const docRef = doc(collection(db, "emociones", user.uid, "registros"));
  await setDoc(docRef, {
    dia,
    fecha: fecha.toISOString(),
    emociones,
    consejo,
  });

  window.location.href = "resultados.html";
});
