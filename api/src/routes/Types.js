const {Router} = require("express");
const axios = require ("axios");
const router = Router();
const {Pokemon,Type} = require('../db')

router.get('/', async (req,res)=>{
    try {
        const tipos = await axios.get("https://pokeapi.co/api/v2/type") 
    const tipes = tipos.data.results
    const types = tipes.map(el=> el.name)
    
    types.forEach(el => {
        Type.findOrCreate({
            where : {name:el}
        })
    });
    const allTypes = await Type.findAll()
    res.status(200).send(allTypes)
    } catch (error) {
        res.status(400).send('hubo un problema')
    }
})

module.exports = router;