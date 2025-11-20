import { db, auth } from "./firebase.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ===== REGISTER USER =====
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Register berhasil: " + userCredential.user.email);
    registerForm.reset();
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// ===== LOGIN USER =====
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login berhasil: " + userCredential.user.email);
    loginForm.reset();
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// ===== TAMBAH DATA FIRESTORE =====
const dataForm = document.getElementById("dataForm");
dataForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = dataForm.name.value;
  const email = dataForm.email.value;

  try {
    const docRef = await addDoc(collection(db, "users"), { name, email });
    alert("Data berhasil ditambahkan: " + docRef.id);
    dataForm.reset();
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// ===== TAMPILKAN DATA FIRESTORE =====
async function fetchUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const list = document.getElementById("userList");
  list.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = `${doc.id} - ${doc.data().name} (${doc.data().email})`;
    list.appendChild(li);
  });
}

document.getElementById("refreshData").addEventListener("click", fetchUsers);
