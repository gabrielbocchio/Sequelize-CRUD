var express = require('express');
var router = express.Router();
var peliculasController= require("../controllers/peliculasController")

// create
router.get("/crear", peliculasController.crear);
router.post("/crear", peliculasController.guardado);

// lectura
router.get("/", peliculasController.listado);

//actualizacion
router.get("/editar/:id", peliculasController.editar)
router.post("/editar/:id", peliculasController.actualizar)

//borrado
router.post("/borrar/:id", peliculasController.borrar)

// detalle
router.get("/:id", peliculasController.detalle)



module.exports = router;
