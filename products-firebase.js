import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 
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
    // loginbtn.style.display = 'none';
}
else{
    window.location.href = 'index.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
    RetrieveData();
    addEventListenersToImages()
});

let images = [];
let currentIndex = 0;

//retrieve products from product collection function

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function RetrieveData(){
    const docRef = doc(db,"products",productId);
    const docSnap = await getDoc(docRef);
    const productData = docSnap.data();

    if(docSnap.exists()){
        document.getElementById('product-name-1').textContent = productData.name;
        document.getElementById('product-name-2').textContent = productData.name;
        document.getElementById('product-price').textContent = `Rs. ${productData.price}`;
        document.getElementById('category').textContent = productData.category;
        document.getElementById('desp-collapsible').textContent = productData.desp;
        
        images = productData.images;

        document.getElementById('product-image-1').src = productData.images[0];
        document.getElementById('product-image-2').src = productData.images[1];
        document.getElementById('product-image-3').src = productData.images[2];
        document.getElementById('product-image-4').src = productData.images[3];

        document.getElementById('product-image-1-full').src = productData.images[0];
        document.getElementById('product-image-2-full').src = productData.images[1];
        document.getElementById('product-image-3-full').src = productData.images[2];
        document.getElementById('product-image-4-full').src = productData.images[3];
    }
}


function openFullScreen(index) {
  if (index >= 0 && index < images.length) {
      currentIndex = index;
      const fullScreenOverlay = document.getElementById('fullScreenOverlay');
      const fullScreenImage = document.getElementById('fullScreenImage');
      fullScreenImage.src = images[currentIndex];
      fullScreenOverlay.classList.add('show');
  } else {
      console.error('Index out of bounds:', index);
  }
}

function closeFullScreen() {
  const fullScreenOverlay = document.getElementById('fullScreenOverlay');
  fullScreenOverlay.classList.remove('show');
}

function navigateFullScreen(direction) {
  event.stopPropagation();
  currentIndex = (currentIndex + direction + images.length) % images.length;
  const fullScreenImage = document.getElementById('fullScreenImage');
  fullScreenImage.src = images[currentIndex];
}

function addEventListenersToImages() {
    const thumbnailImages = document.querySelectorAll('.productImages');
    
    thumbnailImages.forEach((img, index) => {
        img.addEventListener('click', () => openFullScreen(index));
    });

    document.getElementById('fullScreenOverlay').addEventListener('click', closeFullScreen);
    
    document.getElementById('nextBtn').addEventListener('click', () => navigateFullScreen(1));
    document.getElementById('prevBtn').addEventListener('click', () => navigateFullScreen(-1));
}

document.getElementById('fullScreenOverlay').addEventListener('click', closeFullScreen);