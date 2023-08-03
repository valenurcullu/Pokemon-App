const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonesRoute = require("./pokemones.js")
const typesRoute = require("./types.js")

const router = Router();

// router.use('/pokemon',pokemonRouter)

// router.use('/types',typesRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemones",pokemonesRoute)
router.use("/types",typesRoute)


module.exports = router;
