// --- IMPORTACIONES (Firebase v10 Modular) ---
import { auth, database } from "./firebase-config.js";
import { 
  GoogleAuthProvider, 
  signInWithCredential, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// --- INICIALIZACIÓN DE GOOGLE Y EVENTOS ---
window.onload = function () {
  
  // 1. Inicializar Partículas (Visual)
  if(window.particlesJS) {
      window.particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded');
      });
  }

  // 2. Inicializar Google Identity Services (Tu código solicitado)
  google.accounts.id.initialize({
    client_id: "382420208590-vr9dpgg06t8uqu1rfsnsetfjqv7qm7ta.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: false
  });

  // Nota: No usamos renderButton aquí porque usamos tu botón personalizado del HTML
  // Pero dejamos el prompt listo para llamarlo.
};

// --- LÓGICA DE LOGIN CON GOOGLE (Tu lógica solicitada) ---
async function handleCredentialResponse(response) {
  try {
    const idToken = response.credential;
    
    // Convertir token de Google → credencial Firebase
    const credential = GoogleAuthProvider.credential(idToken);

    // Login en Firebase
    const result = await signInWithCredential(auth, credential);
    const user = result.user;

    console.log("Usuario logueado:", user.displayName);

    // Guardar en Firebase Database (Tu lógica solicitada)
    await set(ref(database, "usuarios/" + user.uid), {
      nombre: user.displayName,
      email: user.email,
      foto: user.photoURL,
      uid: user.uid,
      ultimo_acceso: new Date().toISOString() // Agregué esto para rastrear accesos
    });

    // Mostrar Modal de Éxito
    mostrarModalExito(`Bienvenido, ${user.displayName}`);

  } catch (error) {
    console.error("Error en Google Auth:", error);
    alert("Error al iniciar con Google: " + error.message);
  }
}

// --- REFERENCIAS AL DOM (HTML) ---
const loginBtn = document.getElementById("loginBtn");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");

// Botones de navegación (Vistas)
const goLinkAccount = document.getElementById("goLinkAccount");
const goBackToLogin = document.getElementById("goBackToLogin");
const loginView = document.getElementById("loginView");
const linkAccountView = document.getElementById("linkAccountView");
const registerView = document.getElementById("registerView"); // (Si aún existe en DOM oculto)

// Modal
const successModal = document.getElementById("successModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const successMessage = document.getElementById("successMessage");

// --- EVENT LISTENER: BOTÓN GOOGLE PERSONALIZADO ---
// Al hacer clic en TU botón de diseño neón, lanzamos el prompt de Google
googleLoginBtn.addEventListener("click", () => {
  google.accounts.id.prompt(); 
});

// --- EVENT LISTENER: LOGIN NORMAL (Usuario/Contraseña) ---
loginBtn.addEventListener("click", async () => {
  const email = loginUser.value; // Asumiendo que el usuario ingresa email
  const password = loginPass.value;

  if (!email || !password) {
    alert("Por favor ingresa usuario y contraseña.");
    return;
  }

  try {
    // Intentamos loguear con Email y Contraseña (Legacy)
    // Nota: Si tus usuarios no son emails, necesitarás lógica extra para convertir usuario a email
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    mostrarModalExito(`Bienvenido de nuevo, socio.`);
    
  } catch (error) {
    console.error("Error Login:", error);
    alert("Credenciales incorrectas o error de conexión.");
  }
});

// --- LOGICA DE NAVEGACIÓN (Ocultar/Mostrar Vistas) ---
// Ir a "Migrar Cuenta"
if(goLinkAccount) {
    goLinkAccount.addEventListener("click", () => {
      loginView.classList.add("hidden");
      linkAccountView.classList.remove("hidden");
    });
}

// Volver al Login
if(goBackToLogin) {
    goBackToLogin.addEventListener("click", () => {
      linkAccountView.classList.add("hidden");
      loginView.classList.remove("hidden");
    });
}

// --- FUNCIONES AUXILIARES ---

function mostrarModalExito(mensaje) {
  successMessage.textContent = mensaje;
  successModal.classList.add("show");
  
  // Ocultar login
  document.querySelector(".container").style.display = "none";
}

closeModalBtn.addEventListener("click", () => {
  successModal.classList.remove("show");
  // Aquí puedes redirigir a tu panel principal
  // window.location.href = "panel.html"; 
});

// Logout Global (para usar en consola o botones futuros)
window.logout = async function () {
  await signOut(auth);
  localStorage.clear();
  location.reload();
};
