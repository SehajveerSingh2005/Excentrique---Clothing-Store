import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc,setDoc,Timestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 
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
  }
});

document.addEventListener('DOMContentLoaded', () => {
    RetrieveData();
    addEventListenersToImages();
    setupSlideshow();
});

let images = [];
let currentIndex = 0;

//retrieve products from product collection function

const urlParams = new URLSearchParams(window.location.search);
const productRef = urlParams.get('id');
const productid = productRef.split('products/')[1];

async function RetrieveData(){
    const docRef = doc(db,productRef);
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
        document.getElementById('product-image-5').src = productData.images[4];
        document.getElementById('product-image-6').src = productData.images[5];

        document.getElementById('product-image-1-full').src = productData.images[0];
        document.getElementById('product-image-2-full').src = productData.images[1];
        document.getElementById('product-image-3-full').src = productData.images[2];
        document.getElementById('product-image-4-full').src = productData.images[3];

        const sizelist = productData.sizes;
        const sizecontainer = document.getElementById('size-list');
        sizelist.forEach((size)=>{
            const sizeElement = document.createElement('div');
            sizeElement.textContent = size;
            sizeElement.classList.add('size-list-btn');

            sizecontainer.appendChild(sizeElement);
        });
    }
}

//fullscreen image view functions

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

//functions for mobile slideshow

function setupSlideshow() {
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        const slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }

    document.getElementById('prev-mob').addEventListener('click', () => plusSlides(-1));
    document.getElementById('next-mob').addEventListener('click', () => plusSlides(1));

    let touchStartX = 0;
    let touchEndX = 0;

    function handleGesture() {
        if (touchEndX < touchStartX) plusSlides(-1);
        if (touchEndX > touchStartX) plusSlides(1);
    }

    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('touchstart', function (event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    slideshowContainer.addEventListener('touchend', function (event) {
        touchEndX = event.changedTouches[0].screenX;
        handleGesture();
    });
}



//add to cart and wishlist functions

let selectedSize = '';

document.getElementById('size-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('size-list-btn')) {
        selectedSize = event.target.textContent;

        document.querySelectorAll('.size-list-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        event.target.classList.add('selected');
    }
});


// Event listeners for add to cart and wishlist buttons
document.getElementById('addtocart').addEventListener('click', () => addToCart(productRef, productid, selectedSize));
document.getElementById('addtowishlist').addEventListener('click', () => addToWishlist(productRef,productid));

// Add to cart function
async function addToCart(productRef, productId, selectedSize) {
    const user = auth.currentUser;
    const quantity = parseInt(document.getElementById('quantity-dropdown').value, 10);

    if (selectedSize) {
        if (user) {
            // User is signed in, save to Firestore
            const cartRef = doc(db, "users", user.uid, "cart", `${productId}_${selectedSize}`);
            const docSnap = await getDoc(cartRef);

            if (docSnap.exists()) {
                // Item with this size already exists, update quantity
                const existingData = docSnap.data();
                const existingQuantity = existingData.quantity || 0;
                await setDoc(cartRef, {
                    productRef: productRef,
                    size: selectedSize,
                    quantity: existingQuantity + quantity,
                    createdAt: new Date().toISOString(),
                }, { merge: true });
            } else {
                // New item, add to Firestore
                await setDoc(cartRef, {
                    productRef: productRef,
                    size: selectedSize,
                    quantity: quantity,
                    createdAt: new Date().toISOString(),
                });
            }
        } else {
            // User is not signed in, save to local storage
            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            const existingItemIndex = cart.findIndex(item => item.productRef === productRef && item.size === selectedSize);

            if (existingItemIndex > -1) {
                // Item with this size already exists, update quantity
                cart[existingItemIndex].quantity += quantity;
            } else {
                // New item, add to session storage
                cart.push({
                    productRef: productRef,
                    size: selectedSize,
                    quantity: quantity,
                    createdAt: new Date().toISOString(),
                });
            }
            sessionStorage.setItem("cart", JSON.stringify(cart));
        }

        // Update button text to "Go to Cart"
        const addToCartButton = document.getElementById('addtocart');
        addToCartButton.innerHTML = '<i class="fa-solid fa-cart-arrow-down"></i>Go to Cart';
                
        // Update button to navigate to cart page
        addToCartButton.onclick = function() {
            window.location.href = 'cart.html';
        };
        alert('Added to Cart!');
    } else {
        alert('Please select a size');
    }
}


// Add to wishlist function
async function addToWishlist(productRef, productId) {
    const user = auth.currentUser;

        if (user) {
            // User is signed in, save to Firestore
            const wishlistRef = doc(db, "users", user.uid, "wishlist", `${productId}`);
            const docSnap = await getDoc(wishlistRef);

            if (docSnap.exists()) {
                alert("Item already in wishlist!");
                //remove from wishlist
            } else {
                // New item, add to Firestore
                await setDoc(wishlistRef, {
                    productRef: productRef,
                    createdAt: new Date().toISOString(),
                });
            }
        } else {
            // User is not signed in, save to local storage
            let wishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
            const existingItemIndex = wishlist.findIndex(item => item.productRef === productRef && item.size === selectedSize);

            if (existingItemIndex > -1) {
                //remove from wishlist
            } else {
                // New item, add to session storage
                wishlist.push({
                    productRef: productRef,
                    createdAt: new Date().toISOString(),
                });
            }
            sessionStorage.setItem("cart", JSON.stringify(cart));
        }
        alert('Added to Wishlist!');
}
