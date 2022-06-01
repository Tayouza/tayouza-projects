const initURL = 'https://pokeapi.co/api/v2/';

function getGenerations() {
    return fetch(initURL + 'generation')
};

function getPokes(i) {
    return fetch(i.url);
}

async function getDataPokes() {
    const getResponse = await getGenerations();
    const geracoes = await getResponse.json();
    let pokeList = [];
    for (i of geracoes.results) {
        let getList = await getPokes(i);
        let addList = await getList.json();
        pokeList.push(addList);
    }
    for (index in pokeList) {
        document.querySelector('.pokelist aside').innerHTML +=
            `
            <details>
                <summary>${pokeList[index].main_region.name}</summary>
                <ul id="${pokeList[index].main_region.name}">
                    `
        for (i of pokeList[index].pokemon_species) {
            document.querySelector("#" + pokeList[index].main_region.name).innerHTML += `
                        <input type="button" class="pokemons" value="${i.name}">
                        `
        }
        `
                </ul>
            </details>
            `
    }
    let pokemons = document.querySelectorAll('.pokemons');

    for (item of pokemons) {
        item.onclick = function () {
            let selected = this.value;
            fetch(initURL + 'pokemon/' + selected)
                .then(response => response.json())
                .then(pokemon => {
                    document.querySelector('#nome').innerText = pokemon.name;
                    document.querySelector('#pic').outerHTML = `<img src="${pokemon.sprites['front_default']}" alt="" id="pic">`;
                    document.querySelector('#position').innerText = pokemon.id;


                })
                .catch(error => {
                    console.log('Erro: ' + error);
                });
        }
    }
    /*
    $('.pokemons').click(function () {
        const selected = $(this).val();
        fetch(initURL + 'pokemon/' + selected)
            .then(response => response.json())
            .then(pokemon => {
                $('#nome').text(pokemon.name);
                $('#pic').attr('src', pokemon.sprites['front_default']);
                $('#position').html(pokemon.id);


            })
            .catch(error => {
                console.log('Erro: ' + error);
            });

    });*/
}

getDataPokes();
