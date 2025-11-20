import { auth, db } from "./firebase.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    setDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- REGISTER ---
const registerForm = document.querySelector("#login-section form:nth-of-type(2)");

registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = registerForm[0].value;
    const email = registerForm[1].value;
    const job = registerForm[2].value;
    const pass = registerForm[3].value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);

        await setDoc(doc(db, "users", userCredential.user.uid), {
            name,
            email,
            job,
            createdAt: new Date(),
        });

        alert("Registrasi berhasil!");
        registerForm.reset();

    } catch (err) {
        alert("Error: " + err.message);
    }
});

// --- LOGIN ---
const loginForm = document.querySelector("#login-section form:nth-of-type(1)");

loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm[0].value;
    const pass = loginForm[1].value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Login berhasil!");
    } catch (err) {
        alert("Login gagal: " + err.message);
    }
});
