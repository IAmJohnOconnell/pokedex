const form = document.querySelector('form');
let imageDisplay = document.querySelector('#imageDisplay');
let avatar = document.querySelector('#avatar');
let displayName = document.querySelector('#name');
let id = document.querySelector('#id');
let pokemonDescDisplay = document.querySelector('#pokemonDesc');
const resetBtn = document.querySelector('#resetBtn');

const populateCard = (pokemon, pokemonDesc) => {
	avatar.src = `${pokemon.sprites.other['dream_world']['front_default']}`;
	imageDisplay.src = `${pokemon.sprites.other['official-artwork']['front_default']}`;
	id.textContent = pokemon.id;
	let pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
	displayName.textContent = pokemonName;
	pokemonDescDisplay.textContent = pokemonDesc;
	resetBtn.classList.remove('hideResetBtn')
};

const searchPokemon = async () => {
	try {
		let searchInput = document.querySelector('#searchText').value.toLowerCase();
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${searchInput}`
		);
		const res2 = await axios.get(
			`https://pokeapi.co/api/v2/pokemon-species/${searchInput}`
		);
		let pokemon = res.data;
		let randNum = Math.floor(Math.random() * 10);
		let pokemonDesc = res2.data['flavor_text_entries'][randNum]['flavor_text'];
		document.querySelector('#searchText').value = '';
		populateCard(pokemon, pokemonDesc);
	} catch (e) {
		let errorStatus = e.response.status;
		if (errorStatus >= 400 || errorStatus < 500) {
			alert('Sorry we couldnt find the Pokemon you were looking for');
		}
	}
};

resetBtn.addEventListener('click', (e) => {
	alert('you clicked me')
})

form.addEventListener('submit', (e) => {
	e.preventDefault();
	searchPokemon();
});
