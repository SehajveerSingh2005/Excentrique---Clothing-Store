window.addEventListener('load', function() {
    var delay = 500; 

    setTimeout(function() {
        var main = document.querySelector('.logo-main');
        var logos = document.querySelectorAll('.logo-fade');

        main.style.lineHeight = '80px';
        logos.forEach(function(logo) {
            logo.style.lineHeight = '80px';
        });
    }, delay);
});


window.addEventListener('scroll', function() {
    var main = document.querySelector('.logo-main');
    var logos = document.querySelectorAll('.logo-fade');
    

    var scrollValue = Math.max(0, 80 - window.scrollY * 0.25);  
    scrollValue = Math.max(scrollValue, 0);  


    main.style.lineHeight = scrollValue + 'px';
    logos.forEach(function(logo) {
        logo.style.lineHeight = scrollValue + 'px';
    });
});