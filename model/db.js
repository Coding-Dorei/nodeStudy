var db = {}

const MongoClient = require('mongodb').MongoClient

db.connectDB = function(){
    var databaseURL = 'mongodb://localhost:27017/local'

    MongoClient.connect(databaseURL,function(err,DB){
        db.database = DB
    })
    console.log('database connected')
}

module.exports = db