import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc,getDocs,setDoc,Timestamp ,query,collection,orderBy} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 
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
  RenderCartItemsfromFirestore(user.uid);
    // loginbtn.style.display = 'none';
}
else{
  RenderCartItemsFromSessionStorage();
  }
});

async function RenderCartItemsfromFirestore(userId) {

  const userDocRef = doc(db, 'users', userId);
  
  const userDocSnapshot = await getDoc(userDocRef);

  let cartTotalMRP = 0;
  let cartDiscount = 0;
  let cartSubTotal = 0;

  // Check if the document exists
  if (userDocSnapshot.exists()) {

    const userData = userDocSnapshot.data();


    const q = query(collection(db, 'users', userId, 'cart'),orderBy('createdAt','desc'));

    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; 

    const querySnapshot = await getDocs(q);

    for (const docSnapshot of querySnapshot.docs) {
      const cartItemData = docSnapshot.data();

      const productId = cartItemData.productRef;


      const productRef = doc(db,productId);
      const productSnap = await getDoc(productRef);
      
      if (!productSnap.exists()) {
        console.error('Product does not exist for productRef:', productId);
        continue;  
      }

      const productData = productSnap.data();

      //calculate Total MRP
      if(cartItemData.quantity === 1){
        cartTotalMRP += productData.price;
      }else{
        cartTotalMRP += (productData.price * cartItemData.quantity);
      }

      const cartItem = document.createElement('div');
      cartItem.classList.add('item');

   
      cartItem.innerHTML = `
        <div class="row">
          <div class="text">
            <span class="info">
              <p id="gender">${userData.gender || "Men's"}</p>
              <p id="color">${productData.colors[0]}</p>
              <p id="name">${productData.name}</p>
              <p id="type">${productData.category}</p>
            </span>
            <p id="price" class="price">Rs. ${productData.price}</p>
            <div class="option-container">
              <label for="size">Size:</label>
              <select id="size">
                <option value="S" ${cartItemData.size === 'S' ? 'selected' : ''}>S</option>
                <option value="M" ${cartItemData.size === 'M' ? 'selected' : ''}>M</option>
                <option value="L" ${cartItemData.size === 'L' ? 'selected' : ''}>L</option>
                <option value="XL" ${cartItemData.size === 'XL' ? 'selected' : ''}>XL</option>
                <option value="XXL" ${cartItemData.size === 'XXL' ? 'selected' : ''}>XXL</option>
              </select>
              <label for="qty">Qty:</label>
              <select id="qty">
                <option value="1" ${cartItemData.quantity === 1 ? 'selected' : ''}>1</option>
                <option value="2" ${cartItemData.quantity === 2 ? 'selected' : ''}>2</option>
                <option value="3" ${cartItemData.quantity === 3 ? 'selected' : ''}>3</option>
                <option value="4" ${cartItemData.quantity === 4 ? 'selected' : ''}>4</option>
                <option value="5" ${cartItemData.quantity === 5 ? 'selected' : ''}>5</option>
                <option value="6" ${cartItemData.quantity === 6 ? 'selected' : ''}>6</option>
                <option value="7" ${cartItemData.quantity === 7 ? 'selected' : ''}>7</option>
                <option value="8" ${cartItemData.quantity === 8 ? 'selected' : ''}>8</option>
                <option value="9" ${cartItemData.quantity === 9 ? 'selected' : ''}>9</option>
                <option value="10" ${cartItemData.quantity === 10 ? 'selected' : ''}>10</option>
                </select>
            </div>
          </div>
          <img src="${productData.images[0]}">
        </div>
        <div class="btn-container">
          <div class="btn"><i class="fa fa-trash" aria-hidden="true"></i> Remove</div>
          <div class="btn"><i class="fa-regular fa-heart"></i>Move to Wishlist</div>
        </div>
      `;

      cartContainer.appendChild(cartItem);
    }

    cartDiscount = cartTotalMRP * 0.2;

    cartSubTotal = cartTotalMRP - cartDiscount;

    RenderCartSummary(cartTotalMRP,cartDiscount,cartSubTotal);

  } else {
    console.log('No such user document!');
  }
}

async function RenderCartSummary(cartTotalMRP,cartDiscount,cartSubTotal){
  const carttotal = document.getElementById('total-mrp');
  const cartdiscount = document.getElementById('discount');
  const cartsubtotal = document.getElementById('sub-total');
  const cartsubtotalfinal = document.getElementById('sub-total-final');

  carttotal.textContent = `Rs. ${cartTotalMRP}`;
  cartdiscount.textContent = `Rs. ${cartDiscount}`;
  cartsubtotal.textContent = `Rs. ${cartSubTotal}`;
  cartsubtotalfinal.textContent = `Rs. ${cartSubTotal}`;
}


async function RenderCartItemsFromSessionStorage() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  console.log(cart);
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = ''; // Clear any previous items

  let cartTotalMRP = 0;
  let cartDiscount = 0;
  let cartSubTotal = 0;

  if (cart.length === 0) {
      cartContainer.innerHTML = '<p>No items in cart.</p>';
  } else {
      for(const item of cart){
        const productId = item.productRef;


        const productRef = doc(db,productId);
        const productSnap = await getDoc(productRef);
        
        if (!productSnap.exists()) {
          console.error('Product does not exist for productRef:', productId);
        }
  
        const productData = productSnap.data();

        if(item.quantity === 1){
          cartTotalMRP += productData.price;
        }else{
          cartTotalMRP += (productData.price * item.quantity);
        }


        const cartItem = document.createElement('div');
        cartItem.classList.add('item');

        cartItem.innerHTML = `
        <div class="row">
          <div class="text">
            <span class="info">
              <p id="gender">Men's</p>
              <p id="color">${productData.colors[0]}</p>
              <p id="name">${productData.name}</p>
              <p id="type">${productData.category}</p>
            </span>
            <p id="price" class="price">Rs. ${productData.price}</p>
            <div class="option-container">
              <label for="size">Size:</label>
              <select id="size">
                <option value="S" ${item.size === 'S' ? 'selected' : ''}>S</option>
                <option value="M" ${item.size === 'M' ? 'selected' : ''}>M</option>
                <option value="L" ${item.size === 'L' ? 'selected' : ''}>L</option>
                <option value="XL" ${item.size === 'XL' ? 'selected' : ''}>XL</option>
                <option value="XXL" ${item.size === 'XXL' ? 'selected' : ''}>XXL</option>
              </select>
              <label for="qty">Qty:</label>
              <select id="qty">
                <option value="1" ${item.quantity === 1 ? 'selected' : ''}>1</option>
                <option value="2" ${item.quantity === 2 ? 'selected' : ''}>2</option>
                <option value="3" ${item.quantity === 3 ? 'selected' : ''}>3</option>
                <option value="4" ${item.quantity === 4 ? 'selected' : ''}>4</option>
                <option value="5" ${item.quantity === 5 ? 'selected' : ''}>5</option>
                <option value="6" ${item.quantity === 6 ? 'selected' : ''}>6</option>
                <option value="7" ${item.quantity === 7 ? 'selected' : ''}>7</option>
                <option value="8" ${item.quantity === 8 ? 'selected' : ''}>8</option>
                <option value="9" ${item.quantity === 9 ? 'selected' : ''}>9</option>
                <option value="10" ${item.quantity === 10 ? 'selected' : ''}>10</option>
                </select>
            </div>
          </div>
          <img src="${productData.images[0]}">
        </div>
        <div class="btn-container">
          <div class="btn"><i class="fa fa-trash" aria-hidden="true"></i> Remove</div>
          <div class="btn">Move to Wishlist</div>
        </div>
          `;

      cartContainer.appendChild(cartItem);
    };
  }

  cartDiscount = cartTotalMRP * 0.2;

  cartSubTotal = cartTotalMRP - cartDiscount;

  RenderCartSummary(cartTotalMRP,cartDiscount,cartSubTotal);

}



