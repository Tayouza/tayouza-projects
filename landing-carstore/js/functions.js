$(function () {
    let currentValue = 0; //futuro valor retornado após o click
    let isDrag = false; //gerencia se o click está ou não ativo
    let precoMaximo = 70000;
    let precoAtual = 0;

    $('.indicador-barra').mousedown(function () {
        isDrag = true;
    });

    $(document).mouseup(function () {
        isDrag = false;
    })

    $('.barra-preco').mousemove(function (e) {
        if (isDrag) {
            disableTextSelection();
            let elBase = $(this); // elemento base para o caculo
            let mouseX = e.pageX /* pageX é uma função do jQ que retorna a posição do mouse no documento*/ - elBase.offset().left; // define o quão a direita estáo elemento

            // 2 IF's para não permitir ultrapassar os limites da barra
            if (mouseX < 0) {
                mouseX = 0;
            }
            if (mouseX > elBase.width()) {
                mouseX = elBase.width();
            }


            //altera a posição da barra e indicador no css
            currentValue = (mouseX / elBase.width() * 100);
            $('.barra-preco-preencher').css('width', currentValue + '%');
            $('.indicador-barra').css('left', 'calc(' + currentValue + '% - 14px');


            // define o valor para se adequar oa preço maximo que a barra pode atingir
            precoAtual = (currentValue / 100) * precoMaximo;

            let precoFormat = formatValue(precoAtual);
            // insere o valor no html
            $('.preco-pesquisa').html('R$' + precoFormat);

        }
    });



    // desabilita a seleção de text no navegador
    function disableTextSelection() {
        $('body').css('-moz-user-select', 'none');
        $('body').css('-webkit-user-select', 'none');
        $('body').css('-ms-user-select', 'none');
        $('body').css('user-select', 'none');
    }


    // formata o valor de 999999 para o formato brasileiro 99.999,99 de finindo o valor maximo e minimo de casas após a vírgula
    function formatValue(value) {
        return value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }


    let maxIndex = Math.ceil($('.img-pacote').length / 3) - 1;
    let curIndex = 0;

    initSlider();
    navigateSlide();
    clickSlider();
    slideContato();


    function initSlider() {
        let amount = $('.img-pacote').length * 33.33;
        let elementScroll = $('.galeria-pacote');
        let elementSingle = $('.img-pacote');
        elementScroll.css('width', amount + '%');
        elementSingle.css('width', 33.3 * (100 / amount) + '%');
    }

    function navigateSlide() {
        $('.seta-direita').click(function () {
            if (curIndex < maxIndex) {
                curIndex++;
                let elOff = $('.img-pacote').eq(curIndex * 3).offset().left - $('.galeria-pacote').offset().left;
                $('.nav-galeria').animate({
                    'scrollLeft': elOff + 'px'
                }, 1000);
                console.log(curIndex, elOff);
            } else {
                console.log('chegamos no final');
            }
        })

        $('.seta-esquerda').click(function () {
            if (curIndex > 0) {
                curIndex--;
                let elOff = $('.img-pacote').eq(curIndex * 3).offset().left - $('.galeria-pacote').offset().left;
                $('.nav-galeria').animate({
                    'scrollLeft': elOff + 'px'
                }, 1000);
                console.log(curIndex, elOff);
            } else {
                console.log('chegamos no inicio');
            }
        })
    }

    function clickSlider() {
        $('.img-pacote').click(function () {
            $('.img-pacote').css('background-color', 'transparent');
            $(this).css('background-color', '#ccc');
            let img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image', img);
        });

        $('.img-pacote').eq(0).click()

    }


    function slideContato() {
        $('[href="#contato"').click(function () {
            $('html, body').animate({
                'scrollTop': $('#contato').offset().top
            }, 1000)

            return false;
        })
    }

    /* menu mobile */
    $('.mobile').click(function () {
        $(this).find('ul').slideToggle();
    })



    /* Navegação depoimentos */

    let amountDepo = $('.metade2-pacote p').length;
    let currentIndex = 0;
    iniciarDepo();
    navDepo();

    function iniciarDepo() {
        $('.metade2-pacote p').hide();
        $('.metade2-pacote p').eq(0).show();
    }

    function navDepo() {
        $('[prev]').click(function () {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = amountDepo - 1;
            }
            $('.metade2-pacote p').hide();
            $('.metade2-pacote p').eq(currentIndex).show();
            console.log(currentIndex);
        });

        $('[next]').click(function () {
            currentIndex++;
            if (currentIndex >= amountDepo) {
                currentIndex = 0;
            }
            $('.metade2-pacote p').hide();
            $('.metade2-pacote p').eq(currentIndex).show();
            console.log(currentIndex);
        });
    }

});