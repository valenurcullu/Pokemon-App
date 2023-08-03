const axios = require ("axios");
//const Pokemon = require("../models/Pokemon");
const {Pokemon,Type} = require('../../db.js')


const apiData = async ()=>{
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=200");
    const results = apiUrl.data.results
    
    const pokemonInfo = []
    
    for(let i = 0 ; i < results.length ; i++){
      const pokes = await axios.get(results[i].url);
      const pokeInfo = pokes.data;
   
      pokemonInfo.push({
        id: pokeInfo.id,
        name: pokeInfo.name,
        types: pokeInfo.types.map((t) => t.type.name),
        image: pokeInfo.sprites.other['official-artwork'].front_default,
        attack: pokeInfo.stats[1].base_stat,
        weight: pokeInfo.weight,
        height: pokeInfo.height,
        speed:pokeInfo.stats[5].base_stat,
        defense:pokeInfo.stats[2].base_stat,
        life: pokeInfo.stats[0].base_stat,
      });
    }
    console.log(pokemonInfo)
    return pokemonInfo;
}


const dbInfo = async ()=>{
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through :{
                attributes:[],
            },
        }
    })
    
}


const infoComplete = async ()=>{
    const apiInfo = await apiData();
    const dbData = await dbInfo();
    const totalData = apiInfo.concat(dbData);
    
    return totalData
}



module.exports = {apiData,dbInfo,infoComplete};