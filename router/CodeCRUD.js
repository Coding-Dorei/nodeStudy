const express = require('express')
const router = express.Router()
const db = require('../model/db')
const crypto = require('crypto')

router.get('/main/code/create',function(req,res){
    
})

router.post('/main/code/create',function(req,res){

})

router.get('/main/code/read',function(req,res){
    let title = req.query.title
    var codes = db.db.collection('codes')

    codes.find({title:title}).toArray(function(err,docs){
        if(docs.length > 0){
            res.render('main',{code:docs[0].code})
        }else{
            res.send(`Can't find ${title}`)
        }
    })
})

module.exports = router