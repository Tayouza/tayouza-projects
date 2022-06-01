menuMobile();
scrollSuave();
iniciarSlide();
trocaSlide();

var tamanhoCarrossel;

function menuMobile() {
    $(document).ready(function () {
        $('#menu-hamburguer').click(function () {
            $(this).toggleClass('openBurguer');
        }).click(function () {
            $('#menu').toggleClass('openMenu');
        });
    });
}

function scrollSuave() {
    $('nav a').click(function (e) {
        e.preventDefault();
        let id = $(this).attr('href'),
            targetOffSet = $(id).offset().top;
        $('html, body').animate({
            scrollTop: targetOffSet
        }, 500);
    });
}

function iniciarSlide() {
    tamanhoCarrossel = $('.carrossel-autor').length;

    let tamanhoContainer = 100 * tamanhoCarrossel,
        tamanhoCaixaSimples = 100 / tamanhoCarrossel;

    $('.carrossel-autor').css('width', tamanhoCaixaSimples + '%');
    $('.scroll-pacote').css('width', tamanhoContainer + '%');

    for (let i = 0; i < tamanhoCarrossel; i++) {
        if (i == 0) {
            $('.bolinhas').append('<span style="background-color: #999"></span>');
        } else {
            $('.bolinhas').append('<span></span>');

        }
    }
}

function trocaSlide() {
    let curIndex = 0;

    var loopSlide = setInterval(() => {
        curIndex++;
        if (curIndex == tamanhoCarrossel)
            curIndex = 0;
        goToSlider(curIndex);
    }, 4000);



    $('.bolinhas span').click(function (e) {
        e.preventDefault();
        clearInterval(loopSlide);
        goToSlider($(this).index());
    });
}

function goToSlider(curIndex) {
    let offSetX = $('.carrossel-autor').eq(curIndex).offset().left - $('.scroll-pacote').offset().left;


    $('.bolinhas span').css('background-color', '#ccc');
    $('.bolinhas span').eq(curIndex).css('background-color', '#999');
    $('.scroll-equipe').stop().animate({ 'scrollLeft': offSetX + 'px' }, 1000);
}

$(window).resize(function () {
    curIndex = 0;
    $('.scroll-equipe').stop().animate({ 'scrollLeft': 0 });
    $('.bolinhas span').css('background-color', '#ccc');
    $('.bolinhas span').eq(curIndex).css('background-color', '#999');
})