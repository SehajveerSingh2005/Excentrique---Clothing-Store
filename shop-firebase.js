import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore,doc,setDoc,deleteDoc,collection,query , where,getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 
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

// Add to wishlist function
async function addToWishlist(productRef, productId) {
    const user = auth.currentUser;

        if (user) {
            // User is signed in, save to Firestore
            const wishlistRef = doc(db, "users", user.uid, "wishlist", `${productId}`);
            const docSnap = await getDoc(wishlistRef);

            if (docSnap.exists()) {
                //remove from wishlist
                await deleteDoc(wishlistRef);
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

}


//retrieve products from product collection function

async function ProductGeneration() {
    const q = query(collection(db, 'products'), where("category", "==", "oversized t-shirt"));
    const productTilesContainer = document.getElementById('product-tiles-container');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Create the heart icon
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-regular', 'fa-heart');
        
        // Check if the product is already in the wishlist
        checkWishlistStatus(doc.id, heartIcon); // Function to check wishlist status

        heartIcon.addEventListener('click', async () => {
            await addToWishlist(`products/${doc.id}`, doc.id);  // Use your wishlist function
            heartIcon.classList.toggle('fa-solid');
            heartIcon.classList.toggle('red'); // Toggle between regular and solid heart icon
        });

        productCard.innerHTML = `
            <a href="product-page.html?id=products/${doc.id}">
                <img class="product-img" src="${productData.images[0]}" />
            </a>
            <h2>${productData.name}</h2>
            <p>Rs. ${productData.price}</p>
        `;

        // Append the heart icon to the product card
        productCard.appendChild(heartIcon);
        productTilesContainer.appendChild(productCard);
    });
}

// Function to check if the product is in the wishlist
async function checkWishlistStatus(productId, heartIcon) {
    const user = auth.currentUser;

    if (user) {
        const wishlistRef = doc(db, "users", user.uid, "wishlist", productId);
        const docSnap = await getDoc(wishlistRef);

        if (docSnap.exists()) {
            heartIcon.classList.add('fa-solid');
            heartIcon.classList.add('red'); // Mark as in wishlist if exists
        }
    } else {
        const wishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
        if (wishlist.find(item => item.productRef === productId)) {
            heartIcon.classList.add('fa-solid');
            heartIcon.classList.add('red'); // Mark as in wishlist in session storage
        }
    }
}
