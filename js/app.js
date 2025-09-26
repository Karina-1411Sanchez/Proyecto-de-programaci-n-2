import { app } from "./firebaseConfig.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const auth = getAuth(app);

const emailRegistro = document.getElementById("emailRegistro");
const passwordRegistro = document.getElementById("passwordRegistro");
const btnRegistro = document.getElementById("btnRegistro");

const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
const btnLogin = document.getElementById("btnLogin");

const btnLogout = document.getElementById("btnLogout");

btnRegistro.addEventListener("click", async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      emailRegistro.value, 
      passwordRegistro.value
    );
    alert("Usuario registrado: " + userCredential.user.email);
  } catch (error) {
    alert("Error: " + error.message);
  }
});

btnLogin.addEventListener("click", async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      emailLogin.value, 
      passwordLogin.value
    );
    alert("Bienvenido: " + userCredential.user.email);
    btnLogout.style.display = "block";
  } catch (error) {
    alert("Error: " + error.message);
  }
});

btnLogout.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Sesión cerrada");
    btnLogout.style.display = "none";
  } catch (error) {
    alert("Error: " + error.message);
  }
});