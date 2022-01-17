const MongoClient = require('mongodb').MongoClient

var database = {}

database.connectDB = ()=>{
    var url = 'mongodb://localhost:27017/CodeArchive'

    MongoClient.connect(url,function(err,db){
        database.db = db.db('CodeArchive')
    })
}

module.exports = database