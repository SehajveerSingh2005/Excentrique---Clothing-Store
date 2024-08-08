const hamburger = document.getElementById('hamburger');
const closeMenu = document.getElementById('close-menu');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
    navLinks.classList.add('active');
    overlay.classList.add ('overlay-active');
    hamburger.style.display = 'none';
    closeMenu.classList.add('close-menu-active');
});

closeMenu.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('overlay-active');
    hamburger.style.display = 'block';
    closeMenu.classList.remove('close-menu-active');
});

overlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('overlay-active');
    hamburger.style.display = 'block';
    closeMenu.classList.remove('close-menu-active');
});

function showpwd(){
    const pwdele = document.getElementById('pwd');
    if (pwdele.type === 'password'){
        pwdele.type = 'text';
    } else{
        pwdele.type = 'password';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Show profile div by default
    showDiv('profile');
});

function showDiv(divId) {
    const profileDiv = document.getElementById('profile');
    const ordersDiv = document.getElementById('orders');
    const wishlistDiv = document.getElementById('wishlist');

    // Hide all divs
    profileDiv.style.display = 'none';
    ordersDiv.style.display = 'none';
    wishlistDiv.style.display = 'none';

    // Show the selected div
    document.getElementById(divId).style.display = 'flex';

    // Remove 'active' class from all nav buttons
    document.querySelectorAll('.nav-btns').forEach(function(btn) {
        btn.classList.remove('active');
    });

    // Add 'active' class to the clicked nav button
    document.getElementById(divId + 'btn').classList.add('active');
}
