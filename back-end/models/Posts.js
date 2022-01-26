//Nesse arquivo nós estamos configurando o schema do banco de dados a partir do sequelize
//Com ele, podemos criar uma tabela que contém as colunas "title", "postText" e "username" de maneira mais prática
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade"
        })
    }
    return Posts
}