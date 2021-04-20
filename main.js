const gameEl = document.getElementById("game");
const pokemonImgEl = document.getElementById("pokemonImg");
const pokemonGuessEl = document.getElementById("guess");
const pointsEl = document.getElementById("points");

let points = 0;
let randomPokemon = 0;

let pokemonName = 'name';
let pokemonsInTheGenerations = {};

// finding out how many pokemons in the selected generation
function getNuberOfPokemons(gen) {
    fetch(`https://pokeapi.co/api/v2/${gen}`)
        .then(result => {
            return result.json();
        })
        .then(data => {
            return pokemonsInTheGenerations = data.pokemon_species;
        })
        .then(pokemonsInTheGenerations => {
            gameEl.classList.remove(`hidden`);
            getRandomPokemon();
        })
        .catch(error => {
            console.error(`There has been a problem with your fetch operation: ${error}`);
        });
}


// geting a random pokemon from the selected generation
function getRandomPokemon() {
    let pokemonNum = Math.floor(Math.random() * pokemonsInTheGenerations.length);
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonsInTheGenerations[pokemonNum].name}/`;
    fetch(url)
        .then(result => {
            return result.json();
        })
        .then(data => {
            pokemonImgEl.classList.add("gray");
            pokemonImgEl.src = `${data.sprites.front_default}`;
            console.log(data.name);
            return pokemonName = data.name;
        })
        .catch(error => {
            console.error(`There has been a problem with your fetch operation: ${error}`);
        })
}


// on submit
function handle(e) {
    if(e.keyCode === 13){
        e.preventDefault(); 

        guess = pokemonGuessEl.value;
        pokemonGuessEl.value = "";
        guess = guess.toLowerCase();

        if (guess === pokemonName) {
            pokemonImgEl.classList.remove("gray");

            points += 1;

            pointsEl.innerHTML = `Points: ${points}`;

            getRandomPokemon();
            pokemonGuessEl.value = "";
        } else {
            pokemonGuessEl.value = "";
        }

    }
}


// finding out the selected generation
function getGeneration() {
    document.getElementsByName("generation")
        .forEach(radio => {
            if (radio.checked) {
                getNuberOfPokemons(radio.value);
            }
        });
}
