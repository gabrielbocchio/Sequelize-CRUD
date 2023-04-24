module.exports = function(sequelize, dataTypes){
    let alias = "Pelicula";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        awards: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }

    };
    let config = {
        tableName: "movies",
        timestamps: false
    }
    let Pelicula = sequelize.define(alias, cols, config);

    Pelicula.associate = function(models){
        // una peli tiene un genero, es una version uno a muchos pero vista desde el otro lado x eso se pone uno: se lee: "una peli tiene un genero"
        Pelicula.belongsTo(models.Genero, {
            as: "genero",
            foreignKey: "genre_id"
        });
        Pelicula.belongsToMany(models.Actor, {
            as: "actores",
            //como es de mucho a mucho le paso la tabla intermedia y la segunda clave foranea
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        });
    }

    return Pelicula;
}