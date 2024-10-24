    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
    import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
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

async function SignupUser(firstname,lastname,email,password){
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        const uid = user.uid;

        setDoc(doc(db,'users',uid),{
            firstname:firstname,
            lastname:lastname,
            email:email
        });

        //functions for signed in users here

        window.location.href = 'index.html';
        
    } catch(error){
        console.error('Error signing up: ', error.code, error.message);
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert('The email address is already in use.');
                break;
            case 'auth/invalid-email':
                alert('The email address is not valid.');
                break;
            case 'auth/operation-not-allowed':
                alert('Email/password accounts are not enabled.');
                break;
            case 'auth/weak-password':
                alert('The password is too weak.');
                break;
            default:
                alert(`Error: ${error.message}`);
        }
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById("submit-btn").addEventListener("click",()=>{
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;
        SignupUser(firstname,lastname,email,password);
    });
});