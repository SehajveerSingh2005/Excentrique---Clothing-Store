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
    const despcollapsible = document.getElementById('description-collapsible');
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
