const initUrlIBGE = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes/';
let namePerson, secondName;
let viewChartName, viewChartSecondName;

const requireName = async (name) => fetch(initUrlIBGE + name)
    .then(response => response.json())
    .then(data => {
        $('#modal').fadeOut();
        return data;
    })
    .catch(error => {
        $('#modal').fadeOut();
        console.log(error);
        swal({
            title: 'Deu erro aqui no servidor, tenta de novo aí 🤦'
        });
    })

$('#descobrir').click((e) => {
    e.preventDefault();
    $('#modal').fadeIn();


    //reseta as divs onde será prenchido com os dados relativos ao nome
    $('#displayName')[0].innerHTML = '';
    $('#displaySecondName')[0].innerHTML = '';
    $('#chartsName')[0].innerHTML = '';
    
    $('#chartsName')[0].innerHTML = `        
        <h2 id="displayName" class="displayChart"></h2>
        <canvas id="chartName" class="classCharts"></canvas>
        <h2 id="displaySecondName" class="displayChart"></h2>
        <canvas id="chartSecondName" class="classCharts"></canvas>
    `;
    

    namePerson = $('#name')[0].value; //busca o nome digitado no inputText

    namePerson = namePerson.split(' ');
    secondName = namePerson[1];
    namePerson = namePerson[0];


    requestData(namePerson, '#displayName', 'chartName', viewChartName);
    requestData(secondName, '#displaySecondName', 'chartSecondName', viewChartSecondName);
    //console.log($.isNumeric(namePerson));
    //console.log(isName(namePerson));

});

function requestData(name, display, placeChart, viewChart) {

    if (checkName(name)) {


        (async () => {
            const dataName = await requireName(name);
            let displayName;
            let periodos;

            if (dataName[0] == undefined) {
                swal({
                    title: 'Nome não encontrado 😢',
                    icon: 'error'
                });
            } else {
                displayName = dataName[0].nome;
                periodos = dataName[0].res;
            }

            //console.log(dataName[0]);

            $(display).html(displayName)

            let arrPeriodo = [], arrFrequencia = [];

            for (i in periodos) {
                arrPeriodo.push(periodos[i].periodo);
                arrFrequencia.push(periodos[i].frequencia);
                //console.log(periodos[i].frequencia);
                //console.log(arrPeriodo[0]);
            }

            arrPeriodo = factorArray(arrPeriodo);

            let myChart = configChart(arrPeriodo, arrFrequencia);

            let canvaChartName = document.getElementById(placeChart).getContext('2d');   

            viewChart =  new Chart(canvaChartName, myChart);

            console.log(viewChart);
        })(); //chamando a funcão de forma imediata

    } else if (name.length == 1) {
        $('#modal').fadeOut();
        swal({
            title: 'Seu nome não tem só uma letra né 😒',
            icon: 'error'
        });

    } else if (!(isName(name)) && name != '') {
        $('#modal').fadeOut();
        swal({
            title: `Você é filho(a) do Elon Musk por acaso? 🤥`,
            icon: 'warning'
        });

    } else {
        $('#modal').fadeOut();
        swal({
            title: 'Vai colocar algo pra testar? 🤔',
            icon: 'warning'
        });
    }
}

//Quando clicado no loading á um aviso e a fecha

$('#modal').click(() => {
    $('#modal').fadeOut();
    swal({
        title: 'Tá com pressa? 🤔',
        icon: 'warning'
    });
});


//Verifica se o nome digitado contém numeros
function isName(e) {
    let a = e.split('');
    //console.log(a);

    for (i of a) {
        //console.log(i);
        if (!isNaN(i)) {
            //console.log(i);
            return false;
        }
    };
    return true;
}


//impede de o usuário colocar caracteres especiais
$('#name')[0].addEventListener('keypress', function notCharEsp(e) {

    if (!checkCharEsp(e)) {
        e.preventDefault();
        swal({
            title: "Já começou errado!",
            text: `Vamos fazer direito né, você colocou " ${String.fromCharCode(e.keyCode)} ", ninguém no Brasil tem o nome com " ${String.fromCharCode(e.keyCode)} "`,
            icon: 'error'
        })
    }


});

function checkCharEsp(e) {
    let char = String.fromCharCode(e.keyCode);
    let pattern = "[áéíóúÁÉÍÓÚâêîôûÂÊîÔûçÇa-zA-Z0-9]";

    return char.match(pattern) || e.keyCode == 13 || e.keyCode == 32;
}

//Verifica se o nome tem mais que 1 caracter/letra se é apenas numeros ou se tem algum numero junto com as letras
function checkName(name) {
    return name.length >= 2 && !($.isNumeric(name)) && isName(name);
}


function factorArray(arr) {
    let array1 = [];
    let array2 = [];
    let array3 = [];

    for (i of arr) {
        array1.push(i.split("["));
    }



    for (i of array1) {
        array2.push(i[1]);
    }


    for (i of array2) {
        array3.push(i.split(","));
    }

    if (array3[0][0] == '') {
        array3[0][0] = array1[0][0];
    }

    return array3;

}