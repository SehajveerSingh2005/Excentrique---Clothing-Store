window.addEventListener('scroll', function() {
    var container = document.querySelector('.container');
    var logo = document.querySelector('.logo-text');
    var navbar2 = document.querySelector('.navbar2');
    var content = document.querySelectorAll('.navbar2 .content');
    var menutext = document.querySelectorAll('.row .menu-links li a');
    var line = document.querySelector('.line');
    var search = document.querySelector('.search a');
    var loginbtn = document.querySelector('.loginbtn a');
    const icons = document.querySelectorAll('.signedin-icons i');
    if (window.scrollY > 50) {
  
        container.classList.add('opaque');
        logo.classList.add('opaque');
        navbar2.classList.add('opaque');
        line.classList.add('opaque');
        search.classList.add('opaque');
        loginbtn.classList.add('opaque');
        icons.forEach(icon => icon.classList.add('opaque'));
  
    } else {
  
        container.classList.remove('opaque');
        logo.classList.remove('opaque');
        navbar2.classList.remove('opaque');
        line.classList.remove('opaque');
        search.classList.remove('opaque');
        loginbtn.classList.remove('opaque');
        icons.forEach(icon => icon.classList.remove('opaque'));
    }
  });

// function showpwd(){
//     const pwdele = document.getElementById('pwd');
//     if (pwdele.type === 'password'){
//         pwdele.type = 'text';
//     } else{
//         pwdele.type = 'password';
//     }
// }

document.addEventListener("DOMContentLoaded", function() {
    // Show profile div by default
    showDiv('profile');
});

function showDiv(divId) {
    const profileDiv = document.getElementById('profile');
    const ordersDiv = document.getElementById('orders');
    const wishlistDiv = document.getElementById('wishlist');


    profileDiv.style.display = 'none';
    ordersDiv.style.display = 'none';
    wishlistDiv.style.display = 'none';

    document.getElementById(divId).style.display = 'flex';


    document.querySelectorAll('.nav-btns').forEach(function(btn) {
        btn.classList.remove('active');
    });

    document.getElementById(divId + 'btn').classList.add('active');
}
