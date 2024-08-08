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

document.addEventListener('DOMContentLoaded', function() {
    const detailsbutton = document.getElementById('details-button');
    const detailscollapsible = document.getElementById('details-collapsible');
    const despbutton = document.getElementById('desp-button');
    const despcollapsible = document.getElementById('desp-collapsible');
    detailsbutton.classList.add('expanded');
    detailscollapsible.classList.add('expanded');

    detailsbutton.addEventListener('click', function() {
        detailscollapsible.classList.toggle('expanded');
        detailsbutton.classList.toggle('expanded');
    });

    despbutton.addEventListener('click', function() {
        despcollapsible.classList.toggle('expanded');
        despbutton.classList.toggle('expanded');
    });
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}


const images = [
  '/t-shirts/Classic Tee/1.png',
  '/t-shirts/Classic Tee/2.png',
  '/t-shirts/Classic Tee/3.png',
  '/t-shirts/Classic Tee/4.png'
];

let currentIndex = 0;

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

document.getElementById('fullScreenOverlay').addEventListener('click', closeFullScreen);