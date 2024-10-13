import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc,getDocs,setDoc,addDoc,Timestamp ,query,collection,orderBy} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 
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
// const auth = getAuth(app);
const db = getFirestore(app);

window.onload = ListGeneration;

// onAuthStateChanged(auth,(user)=>{
    
//     if (user) {
        
//       }
//       else{
        
//         }
//       });

async function ListGeneration(){
    const q = query(collection(db, 'products'));
    const productlist = document.getElementById('table-body');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.classList.add('productname-td');
        const productimg = document.createElement('img');
        productimg.classList.add('product-img');
        productimg.src = productData.images[0];
        const productname = document.createElement('span');
        productname.classList.add('productname');
        productname.innerHTML = `<a href="/product-page.html?id=products/${doc.id}">${productData.name}</a>`;

        nameCell.appendChild(productimg);
        nameCell.appendChild(productname);
        row.append(nameCell);

        const catergoryCell = document.createElement("td");
        catergoryCell.textContent = productData.category;
        row.append(catergoryCell);

        const stockCell = document.createElement("td");
        stockCell.textContent = productData.stock;
        row.append(stockCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = productData.price;
        row.append(priceCell);

        productlist.appendChild(row);
    })
};

const submitbtn = document.getElementById('submit-btn');

submitbtn.addEventListener("click", async function(event) {
    event.preventDefault();

    const productName = document.getElementById('pname').value;
    const productColor = document.getElementById('pcolor').value;
    const productGender = document.getElementById('pgender').value;
    const productCategory = document.getElementById('pcat').value;
    const productDescription = document.getElementById('pdesc').value;
    const productPrice = document.getElementById('pprice').value;
    const productStock = document.getElementById('pstock').value;
    const productURL = document.getElementById('pUrl').value;
    const productNumImages = document.getElementById('pnumimages').value; // input is a string of image URLs

    // Basic validation (ensure all required fields are filled)
    if (!productName || !productColor || !productGender || !productCategory || !productDescription || !productPrice || !productStock || !productNumImages) {
        alert('Please fill in all fields');
        return;
    }

    // Automatically generate image URLs
    const baseUrl = `/${productURL}/`;
    const imageUrlsArray = [];
    
    for (let i = 1; i <= productNumImages; i++) {
        imageUrlsArray.push(`${baseUrl}${i}.jpg`);
    }

    try {
        // Add the product data along with the array of image URLs to Firestore
        await addDoc(collection(db, 'products'), {
            name: productName,
            colors: [productColor],
            gender: productGender,
            category: productCategory,
            desp: productDescription,
            price: productPrice,
            stock: productStock,
            images: imageUrlsArray, // Store the array of image URLs
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        });

        alert('Product added successfully!');
        location.reload();
    } catch (error) {
        console.error('Error adding product: ', error);
        alert('Failed to add product. Please try again.');
        location.reload();
    }
});
