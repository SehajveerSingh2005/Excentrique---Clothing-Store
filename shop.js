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

function toggleFilter() {
    const filterContainer = document.getElementById('filter-container');
    const rightContainer = document.getElementById('right-container');
    const filterButton = document.getElementById('filter-button');
    
    filterContainer.classList.toggle('active');
    rightContainer.classList.toggle('shrink');
    filterButton.classList.toggle('click');
    
}

document.querySelectorAll('.product-card').forEach(card => {
    const video = card.querySelector('.rotate-video');

    card.addEventListener('mouseover', () => {
        video.currentTime = 0; // Rewind video to start
        video.play();
    });

    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Rewind video to start
    });

    video.addEventListener('ended', () => {
        video.currentTime = 0; // Rewind video to start
        video.pause();
    });
});

