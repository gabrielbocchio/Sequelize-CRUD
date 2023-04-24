//esta en un index.js por eso no hay que aclarar cual archivo
let db = require("../database/models");

let peliculasController = {
    crear: function(req, res){
        //quiero q el usuario vea disponibles los generos q estan en la base de datos (Genero viene del alias)
        db.Genero.findAll()
        //y como es un pedido asincronico cuando termine y me de los generos, termino de operar en el then "cuando termine de buscar los generos"
        .then(function(generos){
            return res.render("creacionPeliculas", {generos:generos})
        })
    },
    guardado: function(req,res){
        db.Pelicula.create({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        });
        res.redirect("/peliculas")
    },
    listado: function(req,res){
        db.Pelicula.findAll()
            .then(function(peliculas){
              res.render("listadoPeliculas", {peliculas:peliculas})  
            })
    },
    detalle: function(req,res){ //a findbypk hay q darle que incluya las relaciones, para poder ver tambien el rating, actores, y data en detalle mismo
        db.Pelicula.findByPk(req.params.id, { //aca pongo los nombres que puse en las "relaciones!" en modelo, en associations
            include: [{association: "genero"}, {association: "actores"}]
        })
            .then(function(pelicula){
                res.render("detallePelicula", {pelicula:pelicula})
            })
    },
    editar: function(req,res){
        //x un lado tengo q pedir los datos de la pelicula que queremos editar pero x otro aldo tengo que pedir el genero,, o sea tengo 2 pedidos asincronicos,. entonces se resuelve asi:
        let pedidoPelicula = db.Pelicula.findByPk(req.params.id);
        //por eso aca no pongo un then, para acumular mis pedidos
        let pedidosGeneros = db.Genero.findAll();
        // aca se hace una promesa, quiero el then se ejecute cuando se terminen los dos pedidos asincronicos!!!
        Promise.all([pedidoPelicula, pedidosGeneros])
        .then(function([pelicula, generos]){
            res.render("editarPelicula", {pelicula:pelicula, generos:generos})
        })
    },
    actualizar: function(req,res){
        // igual a guardar solo que hay q poner el where!!!!!
        db.Pelicula.update({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        },{
            where:{
                id: req.params.id
            }
        }
        );
        res.redirect("/peliculas/" + req.params.id)
    },
    borrar: function(req,res){
        // para mejorar aca: si la pelicula tiene actuaciones, primero hay que borrar las actuaciones
        db.Pelicula.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect("/peliculas")
    }
}

module.exports = peliculasController