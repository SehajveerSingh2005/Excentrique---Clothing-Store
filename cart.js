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

