const {Router} = require("express");
const {Pokemon,Type} = require('../db.js')
const {infoComplete} = require('./controllers/pokeController.js')

const router = Router();

router.get('/', async (req,res)=>{
    const {name} = req.query
    const allPoke = await infoComplete()
    console.log(name)
    try {
        if(name){
            const pokeName = allPoke.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            pokeName? 
            res.status(200).send(pokeName) :
            res.status(400).send('no se encontro el personaje')
        }else{res.status(200).send(allPoke)}
       
    } catch (error) {
        res.status(400).send('hubo un error en el proceso')
    }
})

router.post("/",async (req,res)=>{
    const {name,types,image,attack,weight,height,speed,defense,life,createdInDb} = req.body
try {
    let pokeCreated = await Pokemon.create({
        name,
        image,
        attack,
        weight,
        height,
        speed,
        defense,
        life,
        createdInDb,
    })

    const typeCreated = await Type.findAll({
        where:{name: types}
    })

    const pokeComplete = pokeCreated.addType(typeCreated)
    res.status(200).send('Pokemon created succesfully')
} catch (error) {
    res.status(405).send('Pokemon failure')
}
})

//falta crear la ruta por id y listooo


module.exports = router;