let posicao = 0;
let menuMobile = $('#menu-mobile');

abrirMenu();
fecharMenu();
scrollSuave();

function scrollSuave() {
    $('[href="#sobre"], [href="#topo"] ').click(function (e) {
        e.preventDefault();
        let id = $(this).attr('href'),
            targetOffSet = $(id).offset().top;
        $('html, body').animate({
            scrollTop: targetOffSet
        }, 500);
    });
}

function abrirMenu() {

    $('.menu-hamburguer').click(function (e) {
        e.stopPropagation();

        if (posicao == 0) {
            menuMobile.animate({
                'right': posicao
            }, 400);
            posicao = -200;
            menuMobile.css('display', 'block');
        } else {
            menuMobile.animate({
                'right': posicao + 'px'
            }, 400);
            setTimeout(() => {
                menuMobile.css('display', 'none');
            }, 400);
            posicao = 0;
        }


    });

}

function fecharMenu() {

    $('body, .contato').click(function () {
        if (menuMobile.css('right') == '0px') {
            menuMobile.animate({
                'right': posicao + 'px'
            }, 400);
            setTimeout(() => {
                menuMobile.css('display', 'none');
            }, 400);
            posicao = 0;
        }
    });

    menuMobile.click(function (e) {
        e.stopPropagation();
    })

    //quando o tamanho da janela é  alterado fecha o menu lateral
    $(window).resize(function () {
        if (menuMobile.css('right') == '0px') {
            menuMobile.animate({
                'right': posicao + 'px'
            }, 400);
            setTimeout(() => {
                menuMobile.css('display', 'none');
            }, 400);
            posicao = 0;
        }
    })

}
