import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
        
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
    // loginbtn.style.display = 'none';
}
else{
    window.location.href = 'index.html';
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