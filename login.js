    // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
    
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJL4cahnMBpAIKfZsBmlme6dwurkOVYq8",
    authDomain: "excentrique-clothing-store.firebaseapp.com",
    projectId: "excentrique-clothing-store",
    storageBucket: "excentrique-clothing-store.appspot.com",
    messagingSenderId: "733975013651",
    appId: "1:733975013651:web:ea5817ab9050bafd2652e6",
    measurementId: "G-2GV43RDLYB"
};
  
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


const showpwdbtn = document.getElementById('showpwdbtn');

showpwdbtn.addEventListener('click',()=>{
    const pwdele = document.getElementById('pwd');
    if (pwdele.type === 'password'){
        pwdele.type = 'text';
    } else{
        pwdele.type = 'password';
    }
})

async function SignInUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Get the signed-in user
        const user = userCredential.user;

        console.log('User signed in:', user.uid);
        
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error signing in: ', error.code, error.message);
        
        if (error.code === 'auth/invalid-credential') {
            alert("Incorrect Credentials. Please try again.");
        } else if (error.code === 'auth/user-not-found') {
            alert("No account found with this email. Please sign up.");
        } else {
            alert("An error occurred during sign-in. Please try again.");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("submit-btn").addEventListener("click", () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;
        SignInUser(email, password);
    });
});

const forgotPasswordBtn = document.getElementById("forgot-pwd");

forgotPasswordBtn.addEventListener("click", async () => {
  const email = document.getElementById('email').value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent! Please check your inbox."); // Or use a more user-friendly notification
  } catch (error) {
    console.error(error.code, error.message);
    alert("Error sending password reset email. Please try again later."); // Or use a more user-friendly message
  }
});