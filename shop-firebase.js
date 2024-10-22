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
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth,(user)=>{

    const profilebtn = document.getElementById('profile-btn')
    const loginbtn = document.getElementById('loginbtn');
    
    if (user) {
        profilebtn.style.display = 'block';
        loginbtn.style.display = 'none';
    }
    else{
        profilebtn.style.display = 'none'
        loginbtn.style.display = 'block';
      }
    })

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

document.addEventListener('DOMContentLoaded', () => {
    const filtersFromURL = getFiltersFromURL();
    selectedFilters = filtersFromURL || { category: [], color: [], size: [] };
    applyFiltersOnPageLoad(selectedFilters);
});

// Structure for multiple filters
let selectedFilters = {
    category: [],
    color: [],
    size: []
};

// Add filters to the URL
function updateURLWithFilters() {
    const url = new URL(window.location);

    if (selectedFilters.category.length > 0) {
        url.searchParams.set('category', selectedFilters.category.join(','));
    } else {
        url.searchParams.delete('category');
    }

    if (selectedFilters.color.length > 0) {
        url.searchParams.set('color', selectedFilters.color.join(','));
    } else {
        url.searchParams.delete('color');
    }

    if (selectedFilters.size.length > 0) {
        url.searchParams.set('size', selectedFilters.size.join(','));
    } else {
        url.searchParams.delete('size');
    }

    window.history.pushState({}, '', url);
}

// Get filters from the URL
function getFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const categoryFilters = urlParams.get('category') ? urlParams.get('category').split(',') : [];
    const colorFilters = urlParams.get('color') ? urlParams.get('color').split(',') : [];
    const sizeFilters = urlParams.get('size') ? urlParams.get('size').split(',') : [];

    return {
        category: categoryFilters,
        color: colorFilters,
        size: sizeFilters
    };
}

// Apply filters on page load
function applyFiltersOnPageLoad(filters) {
    const categoryFilters = document.querySelectorAll('.product-filter');
    const colorFilters = document.querySelectorAll('.color-filter');
    const sizeFilters = document.querySelectorAll('.size-filter');

    categoryFilters.forEach((filter) => {
        if (filters.category.includes(filter.value)) {
            filter.checked = true;
        }
    });

    colorFilters.forEach((filter) => {
        if (filters.color.includes(filter.value)) {
            filter.checked = true;
        }
    });

    sizeFilters.forEach((filter) => {
        if (filters.size.includes(filter.value)) {
            filter.checked = true;
        }
    });

    // Call FilterProducts with the filters
    FilterProducts(filters);
}

// Event listener for category filters
const categoryFilters = document.querySelectorAll('.product-filter');

categoryFilters.forEach((filter) => {
    filter.addEventListener('change', () => {
        selectedFilters.category = []; // Reset category filters

        categoryFilters.forEach((filter) => {
            if (filter.checked) {
                selectedFilters.category.push(filter.value);
            }
        });

        // Update URL and apply filters
        updateURLWithFilters();
        FilterProducts(selectedFilters);
    });
});

// Event listener for color filters
const colorFilters = document.querySelectorAll('.color-filter');

colorFilters.forEach((filter) => {
    filter.addEventListener('change', () => {
        selectedFilters.color = []; // Reset color filters

        colorFilters.forEach((filter) => {
            if (filter.checked) {
                selectedFilters.color.push(filter.value);
            }
        });

        // Update URL and apply filters
        updateURLWithFilters();
        FilterProducts(selectedFilters);
    });
});

// Event listener for size filters
const sizeFilters = document.querySelectorAll('.size-filter');

sizeFilters.forEach((filter) => {
    filter.addEventListener('change', () => {
        selectedFilters.size = []; // Reset size filters

        sizeFilters.forEach((filter) => {
            if (filter.checked) {
                selectedFilters.size.push(filter.value);
            }
        });

        // Update URL and apply filters
        updateURLWithFilters();
        FilterProducts(selectedFilters);
    });
});

//function to filter products and call ProductGeneration function
async function FilterProducts(filters) {
    let productQuery = query(collection(db, 'products'));

    // Apply category filter
    if (filters.category.length > 0) {
        console.log(filters.category)
        productQuery = query(productQuery, where('category', 'in', filters.category));
    }

    // Apply color filter using array-contains
    if (filters.color.length > 0) {
        const colorQueries = filters.color.map(color =>where('colors', 'array-contains', color));
        console.log(colorQueries)
        productQuery = query(productQuery, ...colorQueries);
    }

    // Apply size filter using array-contains
    if (filters.size.length > 0) {
        const sizeQueries = filters.size.map(size => where('sizes', 'array-contains', size));
        productQuery = query(productQuery, ...sizeQueries);
    }

    const querySnapshot = await getDocs(productQuery);
    ProductGeneration(querySnapshot);
}

// function to render products on the page
function ProductGeneration(querySnapshot) {
    const productTilesContainer = document.getElementById('product-tiles-container');
    productTilesContainer.innerHTML = ''; // Clear existing products

    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Create the heart icon
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-regular', 'fa-heart');

        // Check if the product is already in the wishlist
        checkWishlistStatus(doc.id, heartIcon); 

        heartIcon.addEventListener('click', async () => {
            await addToWishlist(`products/${doc.id}`, doc.id);
            heartIcon.classList.toggle('fa-solid');
            heartIcon.classList.toggle('red');
        });

        productCard.innerHTML = `
            <a href="product-page.html?id=products/${doc.id}">
                <img class="product-img" src="${productData.images[0]}" />
            </a>
            <h2>${productData.name}</h2>
            <p>Rs. ${productData.price}</p>
        `;

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

