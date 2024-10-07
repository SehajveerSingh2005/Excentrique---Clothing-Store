const modal = document.getElementById('modal');
const modalbtn = document.getElementById('modal-btn');
const overlay = document.getElementById('overlay');
modalbtn.addEventListener('click',function(){
    if(modal.style.display == 'none'){
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }
    else{
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
})

overlay.addEventListener("click",function(){
    modal.style.display = 'none';
    overlay.style.display = 'none';
})