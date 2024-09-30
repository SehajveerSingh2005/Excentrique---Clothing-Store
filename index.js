
let slideIndexDesktop = 0;
let slideIndexMobile = 0;

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
  if (window.scrollY > 100) {

      container.classList.add('opaque');
      logo.classList.add('opaque');
      navbar2.classList.add('opaque');
      line.classList.add('opaque');
      search.classList.add('opaque');
      loginbtn.classList.add('opaque');
      icons.forEach(icon => icon.classList.add('opaque'));
      
      menutext.forEach(text => text.classList.remove('light'));
      content.forEach(x => x.classList.remove('light'));

  } else {

      container.classList.remove('opaque');
      logo.classList.remove('opaque');
      navbar2.classList.remove('opaque');
      line.classList.remove('opaque');
      search.classList.remove('opaque');
      loginbtn.classList.remove('opaque');
      icons.forEach(icon => icon.classList.remove('opaque'));

      const slides = document.querySelectorAll(".slideshow-container .mySlides");
      const currentSlideColor = slides[slideIndexDesktop - 1].getAttribute('data-color');
      
      if (currentSlideColor === "dark") {
        menutext.forEach(text => text.classList.add('light'));
        content.forEach(x => x.classList.add('light'));
      }
  }
});

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
  let logo = document.querySelector('.logo-text');
  var navbar2 = document.querySelector('.navbar2');
  var content = document.querySelectorAll('.navbar2 .content');
  var menutext = document.querySelectorAll('.row .menu-links li a');
  var search = document.querySelector('.search a');
  var loginbtn = document.querySelector('.loginbtn a');
  var shopbtn = document.querySelector('.shop-btn');
  const icons = document.querySelectorAll('.signedin-icons i');
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

  const currentSlideColor = slides[slideIndexDesktop - 1].getAttribute('data-color');
  
  logo.classList.remove('light');
  navbar2.classList.remove('light');
  search.classList.remove('light');
  loginbtn.classList.remove('light');
  shopbtn.classList.remove('light');
  icons.forEach(icon => icon.classList.remove('light'));
  menutext.forEach(text => text.classList.remove('light'));
  content.forEach(x => x.classList.remove('light'));
  dots.forEach(dot => dot.classList.remove('light'));
  // Change logo color based on the data-color attribute
  if (currentSlideColor === "dark") {
    logo.classList.add('light');
    navbar2.classList.add('light');
    search.classList.add('light');
    loginbtn.classList.add('light');
    shopbtn.classList.add('light');
    content.forEach(x => x.classList.add('light'));
    icons.forEach(icon => icon.classList.add('light'));
    menutext.forEach(text => text.classList.add('light'));
    dots.forEach(dot => dot.classList.add('light'));
  }

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

