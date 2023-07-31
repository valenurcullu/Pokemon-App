const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require('./Pokemones.js')
const typesRouter = require ('./Types.js')

const router = Router();

router.use('/pokemon',pokemonRouter)

router.use('/types',typesRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
