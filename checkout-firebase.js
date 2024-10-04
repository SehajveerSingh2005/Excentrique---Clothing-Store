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
  
      const cartContainer = document.getElementById('items-container');
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
                <a href="product-page.html?id=${cartItemData.productRef}"><img src="${productData.images[0]}"></a>
                <div class="info">
                    <div>
                        <h3 class="item-name" id="item-name">${productData.name}</h3>
                        <span>
                            <p class="item-size">Size: ${cartItemData.size}</p>
                            <p class="item-qty">Qty: ${cartItemData.quantity}</p>
                        </span>
                    </div>
                    <p class="item-price" id="item-price">Rs. ${productData.price}</p>
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

  document.getElementById("checkout-btn").addEventListener("click", function() {
    if (validateForm()) {
        // If the form is valid, save the order details in Firestore
        placeOrder();
    } else {
        alert("Please fill in all required fields correctly.");
    }
});

// Function to validate the shipping and payment forms
function validateForm() {
    // Get all the form fields
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const streetAddress1 = document.getElementById('street-address-1').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    const paymentMethods = document.getElementsByName('radio');

    // Validate required fields
    if (!firstName || !lastName || !streetAddress1 || !city || !state || !pincode) {
        return false;
    }

    // Validate pincode
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(pincode)) {
        return false;
    }

    // Check if a payment method is selected
    let paymentSelected = false;
    for (let i = 0; i < paymentMethods.length; i++) {
        if (paymentMethods[i].checked) {
            paymentSelected = true;
            break;
        }
    }

    if (!paymentSelected) {
        return false; // No payment method selected
    }

    // If all validations pass
    return true;
}

// Example function to place the order (you can modify it to save details in Firestore)
function placeOrder() {
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const address1 = document.getElementById('street-address-1').value.trim();
    const address2 = document.getElementById('street-address-2').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    
    const paymentMethods = document.getElementsByName('radio');
    let paymentMethod;
    for (let i = 0; i < paymentMethods.length; i++) {
        if (paymentMethods[i].checked) {
            paymentMethod = paymentMethods[i].parentNode.innerText.trim();
            break;
        }
    }

    const orderDetails = {
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        pincode,
        paymentMethod
        // Add other details like cart items, etc.
    };

    // Now save orderDetails to Firestore or your database.
    console.log("Order placed:", orderDetails);
    alert("Order placed successfully!");
}
