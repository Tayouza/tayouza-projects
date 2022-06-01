ModalContato();


function ModalContato(){
    
    // Fecha a janela modal
    $('body, #btnFechar').click(function (e) {
        $('.bg').fadeOut();
        $('#janelaContato').css('display', 'none');
        $('#menuLateral').css('position', 'fixed');
    });

    // Abre a janela modal
    $('.contato').click(function (e) {
        e.stopPropagation();
        let height = $(document).height();
        $('.bg').css('height', height);
        $('.bg').fadeIn();
        $('#janelaContato').css('display', 'flex');
        $('#menuLateral').css('position', 'absolute');
    });


    // Impede de quando clicar na janela modal ela feche
    $('#janelaContato').click(function (e) {
        e.stopPropagation();
    })

}

//mascara de input telefone
$(document).ready(function () {    
    $('#telefone').mask('(99)99999-9999');
})