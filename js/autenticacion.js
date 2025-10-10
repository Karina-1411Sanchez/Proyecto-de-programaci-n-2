import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);

const btnRegister = document.getElementById("btnRegister");
if (btnRegister) {
  btnRegister.addEventListener("click", async () => {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert(" Usuario registrado: " + userCredential.user.email);
      window.location.href = "perfil.html"; 
    } catch (error) {
      alert(" Error en registro: " + error.message);
    }
  });
}

const btnLogin = document.getElementById("btnLogin");
if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert(" Bienvenido: " + userCredential.user.email);
      window.location.href = "/PROYECTO-DE-PROGRAMACI-N-2/perfil.html";
      document.getElementById("btnLogout").style.display = "block"; 
    } catch (error) {
      alert(" Error en login: " + error.message);
    }
  });
}

const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert(" Sesión cerrada");
      window.location.href = "/PROYECTO-DE-PROGRAMACI-N-2/index.html";
      document.getElementById("btnLogout").style.display = "none"; 
    } catch (error) {
      alert(" Error al cerrar sesión: " + error.message);
    }
  });
}
