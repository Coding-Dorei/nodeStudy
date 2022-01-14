const mysql2 = require('mysql2')

var Sequelize = require('sequelize')

var sequelize

sequelize = new Sequelize("class101","root","Sjce20011607!",{
    host:"localhost",
    port:3306,
    dialect:'mysql',
    timezone:"+09:00",
    define: {
        charset:'utf8',
        callate:'utf8_general_ci',
        timestamps:true,
        freezeTableName:true
    }
})
//(데이터베이스 이름, 계정이름, 비밀번호)

var db = {}//export할 객체
db.users = sequelize.import(__dirname + '/users.js')

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db