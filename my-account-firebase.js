import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc, deleteDoc, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
        
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
    const userid = user.uid;
    retrieveUserData(userid);
    RenderWishlistfromFirestore(userid);

    // loginbtn.style.display = 'none';
}
else{
    window.location.href = 'index.html';
    RenderWishlistFromSessionStorage();
  }
});

async function retrieveUserData(userId){
    const userRef = doc(db,'users',userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()){
        const userData = userSnap.data();

        document.getElementById('firstname').value = userData.firstname;
        document.getElementById('lastname').value = userData.lastname;
        document.getElementById('email').value = userData.email;
    }
}

async function retrieveOrdersData(userId){
    const q = query(collection(db,'orders'),where('userId','==',userId));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.exists()){
        const noOrdersContainer = document.getElementById('noOrders');
        noOrdersContainer.style.display = 'none';

        querySnapshot.forEach((doc)=>{
            const orderData = doc.data();

            const productDetails = Promise.all(
                orderData.products.map(productRef => getDoc(productRef))
            );

            productDetails.forEach(productSnap =>{
                const productData = productSnap.data();

                const orderContainer = document.createElement('div');
                orderContainer.classList.add('order-container');
    
                orderContainer.innerHTML =
                `img src="${productData.images[0]}">
                <div class="order-info">
                    <div class="name-price">
                        <h3>${productData.name}</h3>
                        <h3>${productData.price}</h3>
                    </div>
                    <p>${productData.category}</p>
                    <span>Size: L+</span>
                    <span class="status"><i class="fa-solid fa-truck-fast"></i>${doc.orderStatus}</span>
                </div>`
            });
        })
    }
}

function initializeWishlistEventHandlers(userId) {
    document.addEventListener('click', async (event) => {
        // Check if the clicked element is the wishlist icon
        if (event.target.matches('.wishlist-btn i.fa-heart')) {
            console.log("clicked");
            
            // Find the closest wishlist button container
            const wishlistBtn = event.target.closest('.wishlist-btn');
            
            if (wishlistBtn) {
                // Retrieve the wishlistId from the button's data attribute
                const wishlistId = wishlistBtn.getAttribute('data-wishlistId');
                
                if (wishlistId) {
                    try {
                        // Reference to the wishlist document in Firestore
                        const docRef = doc(db, 'users', userId, 'wishlist', wishlistId);
                        
                        // Delete the document from Firestore
                        await deleteDoc(docRef);
                        
                        // Remove the corresponding product card from the DOM
                        wishlistBtn.closest('.product-card').remove();
                        
                        console.log('Item removed from wishlist.');
                    } catch (error) {
                        console.error('Error removing item from wishlist:', error);
                    }
                } else {
                    console.error('Wishlist ID not found on the button.');
                }
            } else {
                console.error('Wishlist button not found.');
            }
        }
    });
}



async function RenderWishlistfromFirestore(userId) {
    // Get a reference to the user's document
    const userDocRef = doc(db, 'users', userId);
    
    // Get the user document
    const userDocSnapshot = await getDoc(userDocRef);
  
    // Check if the document exists
    if (userDocSnapshot.exists()) {
      // Get the user data
      const userData = userDocSnapshot.data();
  
      // Query the wishlist subcollection
      const q = query(collection(db, 'users', userId, 'wishlist'),orderBy('createdAt','desc'));
  
      const wishlistContainer = document.getElementById('wishlist-container');
      // wishlistContainer.innerHTML = '';  // Clear existing content
  
      const querySnapshot = await getDocs(q);
  
      for (const docSnapshot of querySnapshot.docs) {
        const wishlistItemData = docSnapshot.data();
  
        const productId = wishlistItemData.productRef;
  
        // Fetch the product data using the productRef
        const productRef = doc(db,productId);
        const productSnap = await getDoc(productRef);
        
        if (!productSnap.exists()) {
          console.error('Product does not exist for productRef:', productId);
          continue;  // Skip this item if the product does not exist
        }
  
        const productData = productSnap.data();
  
        const WishlistItem = document.createElement('div');
        WishlistItem.classList.add('product-card');
  
        // Populate the cart item with data from the cart subcollection and product data
        WishlistItem.innerHTML = `
            <a href="product-page.html">
                <img class="product-img" src="${productData.images[0]}" alt=${productData.name}>
            </a>
            <div class="product-details">
                <div class="product-info">
                    <h2 class="product-name">${productData.name}</h2>
                    <p class="product-price">Rs. ${productData.price}</p>
                </div>
                <div class="wishlist-btn" data-wishlistId="${docSnapshot.id}">
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
            <a href="#" class="addtocart-btn">Add to Cart</a>
        `;
  
        wishlistContainer.appendChild(WishlistItem);
        initializeWishlistEventHandlers(userId);
      }
    } else {
      console.log('No such user document!');
    }
  }
  
  
  // async function RenderWishlistFromSessionStorage() {
  //   const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  //   console.log(cart);
  //   const cartContainer = document.getElementById('cart-container');
  //   cartContainer.innerHTML = ''; // Clear any previous items
  
  //   if (cart.length === 0) {
  //       cartContainer.innerHTML = '<p>No items in cart.</p>';
  //   } else {
  //       for(const item of cart){
  //         const productId = item.productRef;
  
  //         // Fetch the product data using the productRef
  //         const productRef = doc(db,productId);
  //         const productSnap = await getDoc(productRef);
          
  //         if (!productSnap.exists()) {
  //           console.error('Product does not exist for productRef:', productId);
  //             // Skip this item if the product does not exist
  //         }
    
  //         const productData = productSnap.data();
  
  
  //           const cartItem = document.createElement('div');
  //           cartItem.classList.add('item');
  
  //           cartItem.innerHTML = `
  //                   <div class="row">
  //           <div class="text">
  //             <span class="info">
  //               <p id="gender">Men's</p>
  //               <p id="color">${productData.colors[0]}</p>
  //               <p id="name">${productData.name}</p>
  //               <p id="type">${productData.category}</p>
  //             </span>
  //             <p id="price" class="price">Rs. ${productData.price}</p>
  //             <div class="option-container">
  //               <label for="size">Size:</label>
  //               <select id="size">
  //                 <option value="S" ${item.size === 'S' ? 'selected' : ''}>S</option>
  //                 <option value="M" ${item.size === 'M' ? 'selected' : ''}>M</option>
  //                 <option value="L" ${item.size === 'L' ? 'selected' : ''}>L</option>
  //                 <option value="XL" ${item.size === 'XL' ? 'selected' : ''}>XL</option>
  //                 <option value="XXL" ${item.size === 'XXL' ? 'selected' : ''}>XXL</option>
  //               </select>
  //               <label for="qty">Qty:</label>
  //               <select id="qty">
  //                 <option value="1" ${item.quantity === 1 ? 'selected' : ''}>1</option>
  //                 <option value="2" ${item.quantity === 2 ? 'selected' : ''}>2</option>
  //                 <option value="3" ${item.quantity === 3 ? 'selected' : ''}>3</option>
  //                 <option value="4" ${item.quantity === 4 ? 'selected' : ''}>4</option>
  //                 <option value="5" ${item.quantity === 5 ? 'selected' : ''}>5</option>
  //                 <option value="6" ${item.quantity === 6 ? 'selected' : ''}>6</option>
  //                 <option value="7" ${item.quantity === 7 ? 'selected' : ''}>7</option>
  //                 <option value="8" ${item.quantity === 8 ? 'selected' : ''}>8</option>
  //                 <option value="9" ${item.quantity === 9 ? 'selected' : ''}>9</option>
  //                 <option value="10" ${item.quantity === 10 ? 'selected' : ''}>10</option>
  //                 </select>
  //             </div>
  //           </div>
  //           <img src="${productData.images[0]}">
  //         </div>
  //         <div class="btn-container">
  //           <div class="btn"><i class="fa fa-trash" aria-hidden="true"></i> Remove</div>
  //           <div class="btn">Move to Wishlist</div>
  //         </div>
  //           `;
  
  //           cartContainer.appendChild(cartItem);
  //       };
  //   }
  // }

const signOutUser = () => {
    auth.signOut().then(() => {
        // Sign-out successful.
        console.log('User signed out successfully');
        // You can redirect the user to another page or perform any other actions after sign-out
    }).catch((error) => {
        // An error happened.
        console.error('Sign-out error:', error);
    });
};

const logoutBtn = document.getElementById("logoutbtn");

logoutBtn.addEventListener( 'click', signOutUser, false ) ;