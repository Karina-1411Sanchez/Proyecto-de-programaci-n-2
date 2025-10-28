import { auth, db } from "./firebase-config.js";
import {
  signOut,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const nombreEl = document.getElementById("perfilNombre");
const correoEl = document.getElementById("perfilCorreo");
const tabla = document.getElementById("tablaEmociones");
const fotoPerfil = document.getElementById("fotoPerfil");
const inputFoto = document.getElementById("inputFoto");
const btnCambiar = document.getElementById("btnCambiar");
const btnEliminarFoto = document.getElementById("eliminarFoto");
const btnEliminarCuenta = document.getElementById("eliminarCuentaBtn");
const btnCerrarSesion = document.getElementById("cerrarSesionBtn");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  nombreEl.textContent = user.displayName || "Usuario sin nombre";
  correoEl.textContent = user.email;

  const fotoGuardada = localStorage.getItem(`fotoPerfil_${user.uid}`);
  fotoPerfil.src = fotoGuardada || "img/Logo.png";

  try {
    const registrosRef = collection(db, "emociones", user.uid, "registros");
    const q = query(registrosRef, orderBy("fecha", "desc"), limit(7));
    const snapshot = await getDocs(q);

    tabla.innerHTML = "";
    if (snapshot.empty) {
      tabla.innerHTML = `<tr><td colspan="3">Aún no has realizado ningún cuestionario 🌱</td></tr>`;
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const fila = `
        <tr>
          <td>${data.dia || "—"}</td>
          <td>${data.emociones?.animo || "—"}</td>
          <td>${data.consejo || "—"}</td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    tabla.innerHTML = `<tr><td colspan="3">Error al cargar datos 😞</td></tr>`;
  }
});

btnCerrarSesion?.addEventListener("click", async () => {
  await signOut(auth);
  localStorage.clear();
  window.location.href = "index.html";
});

// Cambiar foto
btnCambiar?.addEventListener("click", () => inputFoto.click());

inputFoto?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Por favor selecciona una imagen válida.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (ev) => {
    fotoPerfil.src = ev.target.result;
    const user = auth.currentUser;
    if (user) localStorage.setItem(`fotoPerfil_${user.uid}`, ev.target.result);
  };
  reader.readAsDataURL(file);
});

// Eliminar foto
btnEliminarFoto?.addEventListener("click", () => {
  const confirmar = confirm("¿Deseas eliminar tu foto de perfil?");
  if (confirmar) {
    const user = auth.currentUser;
    if (user) localStorage.removeItem(`fotoPerfil_${user.uid}`);
    fotoPerfil.src = "img/Logo.png";
  }
});

btnEliminarCuenta?.addEventListener("click", async () => {
  const confirmar = confirm(
    "¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer."
  );
  if (!confirmar) return;

  try {
    const user = auth.currentUser;
    if (!user) {
      alert("No hay usuario autenticado.");
      return;
    }

    //Eliminar los registros en Firestore
    const registrosRef = collection(db, "emociones", user.uid, "registros");
    const snapshot = await getDocs(registrosRef);
    for (const docu of snapshot.docs) {
      await deleteDoc(doc(db, "emociones", user.uid, "registros", docu.id));
    }

    // Eliminar foto
    localStorage.removeItem(`fotoPerfil_${user.uid}`);
    localStorage.clear();

    //Eliminar cuenta de Firebase
    await deleteUser(user);

    //cierra sesión y redirige
    await signOut(auth);
    alert("Tu cuenta ha sido eliminada correctamente.");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
    if (error.code === "auth/requires-recent-login") {
      alert("Por seguridad, vuelve a iniciar sesión antes de eliminar tu cuenta.");
      await signOut(auth);
      window.location.href = "index.html";
    } else {
      alert("Ocurrió un error al intentar eliminar tu cuenta.");
    }
  }
});
