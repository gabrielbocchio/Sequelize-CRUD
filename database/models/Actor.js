module.exports = function(sequelize, dataTypes){
    let alias = "Actor";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        }

    };
    let config = {
        tableName: "actors",
        timestamps: false
    }
    let Actor = sequelize.define(alias, cols, config);

    Actor.associate = function(models){
        // aca le explico que es una relacion de muchos a muchos
        Actor.belongsToMany(models.Pelicula, {
            as: "peliculas",
            //como es de mucho a mucho le paso la tabla intermedia y la segunda clave foranea
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        });
    }
    return Actor;
}