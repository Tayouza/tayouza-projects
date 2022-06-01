
$('#openMenu').click(() => {
    let menu = $('nav'), position = 0, label = $('#openMenu p');

    if (menu.css('left') == '-200px') {
        menu.css('left', position);
    } else {
        menu.css('left', '-200px')
    }

    position = 0;

    label.fadeOut();

    let trocarLabel = setTimeout(() => {
        if (label[0].textContent == 'open') {
            label.fadeIn();
            label[0].textContent = 'close'
        } else {
            label.fadeIn();
            label[0].textContent = 'open'
        }
        label = 'open';
    }, 600)
})

if (window.innerWidth < 520) {
    $('.contato').css('display', 'none')
} else {
    $('.contato').css('display', 'block')
}

$(window).resize(() => {
    if (window.innerWidth < 520) {
        $('.contato').css('display', 'none')
    } else {
        $('.contato').css('display', 'block')
    }
})

let span = document.querySelectorAll('.notificacao span');
let count = 1;

$('.notificacao').click(() => {
    count = 0;
    span[0].textContent = count;
    colorirNotificacao();
});

function colorirNotificacao() {
    if (span[0].textContent > 0) {
        $('.notificacao i').css('color', '#9608ce');
    } else {
        $('.notificacao i').css('color', '#6e6e6e');
    }
}


let notification = setInterval(() => {

    span[0].textContent = count;
    count += 1
    colorirNotificacao();
}, 2000);
/*
const btns = document.querySelectorAll('.btn-simple');

for (item of btns) {
    item.onclick = function () {
        
        this.innerHTML = 'deu'

    }
}

*/
