var main = document.querySelectorAll('.main .center')[0];
var banner = document.querySelectorAll('.splide__list')[0];
var card = document.querySelectorAll('.main .card-container')[0];
var random = getRandomArbitrary(0, 20);
const KEY = '2cfbefd76d70ed566490402c97c245ee';

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

loadCards('movie');

window.onload = placeBanner();

function placeBanner() {
    let timeToBanner = setTimeout(function () {
        var splide = new Splide('.splide', {
            type: 'fade',
            perPage: 1,
            autoplay: true,
        })

        splide.mount();
    }, 2000)
}

document.getElementById('tvShows').addEventListener('click', function (e) {
    e.preventDefault();
    banner.innerHTML = '';
    card.innerHTML = '';
    loadCards('tv');
    placeBanner();
});

document.getElementById('movies').addEventListener('click', function (e) {
    e.preventDefault();
    banner.innerHTML = '';
    card.innerHTML = '';
    loadCards('movie');
    placeBanner();
});


async function loadCards(type) {
    var typeList = type;
    fetch('https://api.themoviedb.org/3/' + typeList + '/popular?api_key=' + KEY + '&language=pt-BR')
        .then(response => response.json())
        .then(data => {
            let item = data.results;

            for (i in item) {
                if (i < 3) {
                    title = typeList == 'movie' ? item[i].title : item[i].name;
                    banner.innerHTML += `
                <li class="splide__slide">
                    <img class="banner-principal" id="${item[i].id}"  title="${title}" src="https://image.tmdb.org/t/p/original${item[i].backdrop_path}")">
                    <p>${title}</p>
                </li>
                `
                }
            }

            for (i in item) {
                if (i > 2) {
                    title = typeList == 'movie' ? item[i].title : item[i].name;
                    card.innerHTML += `
                <div class="card-movie" id="${item[i].id}" title="${title}"><img src="https://image.tmdb.org/t/p/w500` + item[i].poster_path + `"><p>${title}</p></div>
            `
                }
            }

            let cardsList = $('.card-movie');


            cardsList.click(function () {
                let i = this;
                let splitCode = this.outerHTML.split('<div class="card-movie" id="');
                splitCode = splitCode[1].split('"');
                const query = 'https://api.themoviedb.org/3/' + typeList + '/' + splitCode[0] + '?api_key=' + KEY + '&language=pt-BR';
                (async function infoMovies() {
                    fetch(query)
                        .then(response => response.json())
                        .then(data => {
                            let { overview, poster_path: poster, title, name } = data;
                            let titleMovie = typeList == 'movie' ? title : name;
                            openDescricao(overview, poster, titleMovie);
                        })
                })();
            })

        });
}


const openDescricao = (overview, poster, titleMovie) => {
    overview = overview != "" ? overview : 'Descrição não encontrada'
    $('.bg').fadeIn();
    $('.bg').css('display', 'grid');
    $('.bg')[0].innerHTML =
        `<div class="descricao-movie">
        <h2>${titleMovie}</h2>
        <div class="desc-container">
            <div class="img-desc">
                <img src="https://image.tmdb.org/t/p/w500` + poster + `" title="">
                
            </div>
            <div class="desc-title">
                <p>${overview}</p>
            <div>
        </div>    
    </div>`;

    //fechar descrição
    $('body').click(function () {
        $('.bg').fadeOut();
    })

    $('.descricao-movie').click(function (e) {
        e.stopPropagation();
    })
}

let filtro = document.getElementById('busca');
filtro.onkeyup = function () {
    let nomeFiltro = filtro.value.toLowerCase();
    let cards = document.querySelectorAll('.card-movie');
    for (let i = 0; i < cards.length; i++) {
        let conteudoCelula = cards[i].title;
        let corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
        cards[i].style.display = corresponde ? '' : 'none';
    }
};

if (window.innerWidth < 700) {
    $('#lupa').click(function () {
        if ($('#busca').css('width') != '150px') {
            $('#busca').animate({
                'width': '150px',
                'right': '25px'
            }, 500).css('border', '1px solid #777');
            $('#busca').css('display', 'block');
        } else {
            $('#busca').animate({
                'width': '0px',
                'right': '25px'
            }).css('border', '0');
            setTimeout(function () {
                $('#busca').css('display', 'none');
            }, 500)
        }
    });
}