
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const modalbtn = document.getElementById('modal-btn');
const body = document.querySelector('html');
// Now use the same toggle logic
modalbtn.addEventListener('click', function(event) {
    event.preventDefault();

    if (!modal.classList.contains('visible')) {
        modal.classList.add('visible');
        overlay.classList.add('visible');
        body.style.overflowY = 'hidden';
        
    } else {
        modal.classList.remove('visible');
        overlay.classList.remove('visible');
        body.style.overflowY = 'auto';
    }
});

overlay.addEventListener('click', function() {
    modal.classList.remove('visible');
    overlay.classList.remove('visible');
    body.style.overflowY = 'auto';
});
