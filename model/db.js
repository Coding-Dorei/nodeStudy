const mongoose = require('mongoose')

var database = {}

database.CodeSchema = new mongoose.Schema({
    title:String,
    author:String,
    hidden:{type:Boolean, default:false},
    code:String,
    createAt:{type : Date, default:new Date(Date.now())}
})

database.CodeModel = new mongoose.model('Code',database.CodeSchema)

database.CodeSchema.methods.showAll = function(callback){
    return mongoose.model('Code').find({},callback)
}

database.CodeSchema.statics.findByTitle = function(title){
    return this.find({title:title})
}

database.UserSchema = new mongoose.Schema({
    id:String,
    pw:String,
    name:String
})

database.UserModel = new mongoose.model('User',database.UserSchema)

database.UserSchema.static('findByID',function(id){
    return this.findOne({id:id})
})

database.mongoose = mongoose

module.exports = database