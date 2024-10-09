
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const modalbtn = document.getElementById('modal-btn');

// Now use the same toggle logic
modalbtn.addEventListener('click', function(event) {
    event.preventDefault();

    if (!modal.classList.contains('visible')) {
        modal.classList.add('visible');
        overlay.classList.add('visible');
    } else {
        modal.classList.remove('visible');
        overlay.classList.remove('visible');
    }
});

overlay.addEventListener('click', function() {
    modal.classList.remove('visible');
    overlay.classList.remove('visible');
});
