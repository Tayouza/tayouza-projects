let bg = $('.bg'), //fundo escuro
img = $('img'), //img a ser exibida
botoes = $('.botoes'),
setaDireita = $('.setaDireita'),
setaEsquerda = $('.setaEsquerda');

function galeria() {
    let i = 0;

    // Abre a imagem, define a ltura do fundo e adiciona o fundo escuro translucido junto com os botoes
    img.click(function (e) {
        e.stopPropagation();
        let height = $(document).height();
        bg.css('height', height);
        bg.fadeIn();
        botoes.fadeIn();
        $(this).addClass('imgFull');
        i = img.index(this);
        console.log(this);
    });


    //fecha a foto e oculta o resta
    $('body').click(function () {
        bg.fadeOut();
        botoes.fadeOut();
        img.removeClass('imgFull');
        i = 0;
    });


    //troca a foto para a direita
    setaDireita.click(function (e) {
        e.stopPropagation();
        if (i < (img.length - 1)) {
            $(img[i]).removeClass('imgFull');
            i += 1;
            $(img[i]).addClass('imgFull');
        } else {
            img.removeClass('imgFull');
            bg.fadeOut();
            botoes.fadeOut();
            i = 0;
        }
    });

    //troca a foto para a esquerda
    setaEsquerda.click(function (e) {
        e.stopPropagation();
        if (i > 0) {
            $(img[i]).removeClass('imgFull');
            i -= 1;
            $(img[i]).addClass('imgFull');
        } else {
            img.removeClass('imgFull');
            bg.fadeOut();
            botoes.fadeOut();
            i = 0;
        }
    });
}

galeria();


