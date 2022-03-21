const fetchPokemon = (pokemon="pikachu") => {
    pokemon = (pokemon.trim() == ""? "pikachu" : pokemon);
    console.log(`fetchPokemon '${pokemon}'`);

    const url= `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url).then((res) => {
        if (res.status != "200"){
            return JSON.parse('{"error":"No encontrado"}');
        }else{
            return res.json();
        }
    }).then((data => {
        console.log(data);
        if (data.error){
            despliegaNoEncontrado(data);
        }else{
            despliegaResultado(data);
        }
    }))

};
const despliegaNoEncontrado = (data) =>{
    pokeImage('https://tse3.mm.bing.net/th/id/OIP.FiHLQkWlnBh-_C9I7Rba5gHaEK?w=309&h=180&c=7&r=0&o=5&dpr=2&pid=1.7');
    pokeNombre("No encontrado");
    pokeTipo("");
    pokeStats(new Array());
    pokeMoves(new Array());
}
const despliegaResultado = (data) => {
    let pokeImg_src = data.sprites.front_default;
    console.log(pokeImg_src);
    pokeImage(pokeImg_src);
    pokeNombre(data.name);
    pokeTipo(data.types[0].type.name);
    pokeStats(data.stats);
    pokeMoves(data.moves);

}
const pokeImage = (url) =>{
    const pokeImg = document.getElementById('poke-img');
    pokeImg.src = url;

}
const pokeNombre = (nombre) =>{
    const pokeNombre = document.getElementById('poke-nombre')
    pokeNombre.innerHTML = nombre;
}

const pokeTipo = (tipo) =>{
    const pokeTipo = document.getElementById('poke-tipo')
    pokeTipo.innerHTML = tipo;
}
const pokeStats = (stats_list) =>{
    const pokeStatsList = document.getElementById('poke-stats-list');
    let list = stats_list.length >0? new Array("<dt>Stats</dt>") : new Array();
    for (let s in stats_list) {
        let stat = stats_list[s];
        console.log(stat);
        let item = `<dd>${stat.stat.name}</dd>`;
        list.push(item);
    }
    pokeStatsList.innerHTML=list.join("");
}
const pokeMoves = (move_list) => {
    const pokeMoveList = document.getElementById('poke-moves-list');
    let list = move_list.length >0? new Array("<dt>Movimientos</dt>") : new Array();
    for (let m in move_list){
        let move = move_list[m];
        let item = `<dd>${move.move.name}</dd>`;
        list.push(item);
    }
    pokeMoveList.innerHTML = list.join("");

}
const consultaPokedex = () => {
    var pokemon=document.getElementById('pokeName').value;
    fetchPokemon(pokemon);
}

