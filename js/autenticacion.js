import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  deleteUser
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

//Registra usuario
export async function registrarUsuario(email, password, nombre) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: nombre });
    alert("Registro exitoso 🎉");
    window.location.href = "cuestionario.html";
  } catch (error) {
    alert("Error al registrar: " + error.message);
  }
}

//inicia sesion
export async function iniciarSesion(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "cuestionario.html";
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
  }
}

//cierra cuentas
export async function cerrarSesion() {
  await signOut(auth);
  localStorage.clear();
  window.location.href = "index.html";
}
 
export function verificarSesion() {
  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "index.html";
  });
}
//elimiar cuenta
export async function eliminarCuenta() {
  const user = auth.currentUser;
  if (!user) {
    alert("No hay sesión activa.");
    return;
  }

  try {
    const registrosRef = collection(db, "emociones", user.uid, "registros");
    const snapshot = await getDocs(registrosRef);
    for (const docu of snapshot.docs) {
      await deleteDoc(doc(db, "emociones", user.uid, "registros", docu.id));
    }

    localStorage.removeItem(`fotoPerfil_${user.uid}`);
    localStorage.clear();
    await deleteUser(user);

    localStorage.setItem("mostrarLogin", "true");
    alert("Tu cuenta ha sido eliminada correctamente 🗑️");
    window.location.href = "index.html";
  } catch (error) {
    alert("Error al eliminar la cuenta: " + error.message);
  }
}
