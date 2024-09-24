
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

window.addEventListener('scroll', function() {
    var container = document.querySelector('.container');
    var logo = document.querySelector('.logo-text');
    var navbar2 = document.querySelector('.navbar2');
    var line = document.querySelector('.line');
    var search = document.querySelector('.search a');
    const icons = document.querySelectorAll('.signedin-icons i');
    if (window.scrollY > 50) {
  
        container.classList.add('opaque');
        logo.classList.add('opaque');
        navbar2.classList.add('opaque');
        line.classList.add('opaque');
        search.classList.add('opaque');
        icons.forEach(icon => icon.classList.add('opaque'));
  
    } else {
  
        container.classList.remove('opaque');
        logo.classList.remove('opaque');
        navbar2.classList.remove('opaque');
        line.classList.remove('opaque');
        search.classList.remove('opaque');
        icons.forEach(icon => icon.classList.remove('opaque'));
  
    }
  });