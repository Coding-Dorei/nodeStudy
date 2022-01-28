const express = require('express')
const router = express.Router()
const db = require('../model/db')
const crypto = require('crypto')
const mongoose = require('mongoose')

router.get('/code/read',function(req,res){
    db.CodeModel.find({title:req.query.title},function(err,docs){
        res.render('main',{code:docs[0].code})
    })
})

router.get('/code/create',function(req,res){
    res.render('create',{author:req.session.user.id})
})

router.post('/code/create',function(req,res){
    let code = req.body.code,
    title = req.body.title,
    author = req.body.author
    var newCode = new db.CodeModel()
    newCode.title = title
    newCode.author = author
    newCode.code = code
    newCode.save()
    res.send(newCode)
})

router.post('/code/update',function(req,res){
    let filter = {title:req.body.title},
    update = {code:req.body.code}
    db.CodeModel.findOneAndUpdate(filter,update,function(err,docs){})
    res.end()
})

router.get('/code/delete',function(req,res){
    res.render('delete')
})

router.post('/code/delete',function(req,res){
    let filter = {title:req.body.title},
    pw = crypto.createHash('md5').update(req.body.pw).digest('hex')
    db.UserModel.find({id:req.session.user.id},function(err,docs){
        if(docs.length > 0 && pw == docs[0].pw){
            db.CodeModel.find(filter,function(err,docs){
                if(docs.length > 0 && req.session.user.id == docs[0].author){
                    db.CodeModel.deleteOne(filter, function(err,docs){
                        
                    })
                }else{
                    console.log({err:['wrong title','no permission']})
                }
                res.send({success:'Delete Complete'})
            })
        }else{
            res.send({err:'Password is wrong'})
        }
    })
})

module.exports = router