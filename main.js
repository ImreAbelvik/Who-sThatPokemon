const gameEl = document.getElementById("game");
const pokemonImgEl = document.getElementById("pokemonImg");
const pokemonGuessEl = document.getElementById("guess");
const pointsEl = document.getElementById("points");

let points = 0;

const randomPokemon = Math.floor(Math.random() * 898) + 1;
console.log(randomPokemon);

let pokemonName = 'name';


// geting data form the poke api
fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
    .then(result => {
        return result.json();
    })
    .then(data =>{
        console.log(data);
        gameEl.classList.remove("hidden");
        pokemonImgEl.src = `${data.sprites.front_shiny}`;
        return pokemonName = data.name;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function handle(e){
    if(e.keyCode === 13){
        e.preventDefault(); 

        console.log(pokemonGuessEl.value);
        guess = pokemonGuessEl.value;

        guess = guess.toLowerCase();

        if (guess === pokemonName) {
            alert("korekt");
            points += 1;

            pointsEl.innerHTML = `Points: ${points}`;
        }

    }
}
