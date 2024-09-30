import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore,collection,query , where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 
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

onAuthStateChanged(auth,(user)=>{

const signedinIcons = document.querySelectorAll('.signedin-icons');
const loginbtn = document.getElementById('loginbtn');

if (user) {
    signedinIcons.forEach(icon => icon.style.display = 'block');
    loginbtn.style.display = 'none';
}
else{
    signedinIcons.forEach(icon => icon.style.display = 'none');
    loginbtn.style.display = 'block';
  }
})

document.addEventListener('DOMContentLoaded', () => {
    ProductGeneration();
});

//retrieve products from product collection function

async function ProductGeneration(){
    const q = query(collection(db,'products'),where("category","==","oversized t-shirt"));

    const productTilesContainer = document.getElementById('product-tiles-container');

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc)=>{
    
        const productData = doc.data();
    
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
        <a href="product-page.html?id=products/${doc.id}"><img  class="product-img" src="${productData.images[0]}"></a>
        <h2>${productData.name}</h2>
        <p>Rs. ${productData.price}</p>
        <i class="fa-regular fa-heart"></i>
        `;

        productTilesContainer.appendChild(productCard);

    });
}
