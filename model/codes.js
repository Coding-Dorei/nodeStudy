module.exports = function(sequelize,DataTypes){
    return sequelize.define('codes',{
        code:{
            type:DataTypes.TEXT
        },
        author:{
            type:DataTypes.STRING
        },
        createdAt:{
            type:DataTypes.DATE
        }
    })
}