const express = require('express')
const router = express.Router()
const db = require('../model/db')
const crypto = require('crypto')

router.post('/code/create',function(req,res){
    let code = req.body.code,
    author = req.body.author,
    title = req.body.title,
    week = req.body.week,
    author_id = req.body.author_id,
    lecture = req.body.lecture,
    info = req.body.info
    
    var codes = db.db.collection('codes')
    
    codes.find({author:author,title:title}).toArray(function(err,docs){
        if(docs.length == 0){
            codes.insertOne({
                code:code,//코드의 내용
                author:author,
                title:title,
                week:week,//몇 주차시 실습문제인지
                author_id:author_id,
                lecture:lecture,//강의명
                info:info
            })
            res.send("Upload Success")
        }else{
            res.send("Upload Failed")
        }
    })

})

router.get('/code/read',function(req,res){
    let title = req.query.title
    var codes = db.db.collection('codes')

    codes.find({title:title}).toArray(function(err,docs){
        if(docs.length > 0){
            res.render('codeRead',{title:title,code:docs[0].code})
        }else{
            res.send(`Can't find ${title}`)
        }
    })
})

router.post('/code/update',function(req,res){

})

router.get('/code/delete',function(req,res){

})

module.exports = router