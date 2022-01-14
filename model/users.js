module.exports = function(sequelize, DataTypes){
    return sequelize.define('users',{
        user_id: {
            type:DataTypes.STRING(250)
        }
    })
}