
const hamburger = document.getElementById('hamburger');
const closeMenu = document.getElementById('close-menu');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

window.addEventListener('scroll', function() {
  var container = document.querySelector('.container');
  var logo = document.querySelector('.logo-text');
  var navbar2 = document.querySelector('.navbar2');
  var line = document.querySelector('.line');
  var search = document.querySelector('.search a');
  const icons = document.querySelectorAll('.signedin-icons i');
  if (window.scrollY > 100) {

      container.classList.add('opaque');
      logo.classList.add('opaque');
      navbar2.classList.add('opaque');
      line.classList.add('opaque');
      search.classList.add('opaque');
      icons.forEach(icon => icon.classList.add('light-icons'));
  } else {

      container.classList.remove('opaque');
      logo.classList.remove('opaque');
      navbar2.classList.remove('opaque');
      line.classList.remove('opaque');
      search.classList.remove('opaque');
      icons.forEach(icon => icon.classList.remove('light-icons'));
  }
});

// hamburger.addEventListener('click', () => {
//     navLinks.classList.add('active');
//     overlay.classList.add ('overlay-active');
//     hamburger.style.display = 'none';
//     closeMenu.classList.add('close-menu-active');
// });

// closeMenu.addEventListener('click', () => {
//     navLinks.classList.remove('active');
//     overlay.classList.remove('overlay-active');
//     hamburger.style.display = 'block';
//     closeMenu.classList.remove('close-menu-active');
// });

// overlay.addEventListener('click', () => {
//     navLinks.classList.remove('active');
//     overlay.classList.remove('overlay-active');
//     hamburger.style.display = 'block';
//     closeMenu.classList.remove('close-menu-active');
// });


let slideIndexDesktop = 0;
let slideIndexMobile = 0;

function clickdots(n){
  clearInterval(slideinterval);
  showSlidesDesktop(slideIndexDesktop = n);
}


const dots = document.querySelectorAll('.dot');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => clickdots(index));
});



function showSlidesDesktop() {
  let i;
  let slides = document.querySelectorAll(".slideshow-container .mySlides");
  let dots = document.querySelectorAll(".slideshow-container .dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndexDesktop++;
  if (slideIndexDesktop > slides.length) {slideIndexDesktop = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeslide", "");
  }
  slides[slideIndexDesktop-1].style.display = "block";  
  dots[slideIndexDesktop-1].className += " activeslide";
  slideinterval = setTimeout(showSlidesDesktop, 5000);
}

function showSlidesMobile() {
  let i;
  let slides = document.querySelectorAll(".slideshow-container-mobile .mySlides");
  let dots = document.querySelectorAll(".slideshow-container-mobile .dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndexMobile++;
  if (slideIndexMobile > slides.length) {slideIndexMobile = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeslide", "");
  }
  slides[slideIndexMobile-1].style.display = "block";  
  dots[slideIndexMobile-1].className += " activeslide";
  setTimeout(showSlidesMobile, 5000);
}

showSlidesDesktop();
showSlidesMobile();

