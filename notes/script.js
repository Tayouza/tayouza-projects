
$('#btn-add').click(() => {
    addAnotacao();
});


function addAnotacao() {
    const date = new Date(),
        hh = date.getHours(),
        mm = date.getMinutes();
    $('.text')
    let anot = '<div class="anotacao"><div><div class="date">' + hh + ':' + mm + '</div><div class="text" contenteditable="true" placeholder="Nova anotação..."></div></div><button class="btn-delete"></button></div>';
    $('#container-anotacoes').append(anot);
    addBtnDelete();
}

addAnotacao();

function addBtnDelete() {
    let btnDelete = $('.btn-delete');
    btnDelete.click(function () {
        $(this)[0].parentElement.style.display = 'none'
    })
}