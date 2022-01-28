const express = require('express')
const router = express.Router()
const db = require('../model/db')
const crypto = require('crypto')

router.get('/',function(req,res){
    if(req.session.user){
        res.redirect('/main')
    }else{
        res.render('index',{title:"CodeArchive"})//render로 views폴더안의 indes.ejs를 화면에 띄워주고 그 다음 인자로 데이터를 전송
    }
})//ejs파일 안에서 <%= %>사이에 locals.'key'를 통해 접근 가능

router.get('/user/register',function(req,res){
    res.render('register')
})

router.post('/user/register',function(req,res){
    let id = req.body.id,
    pw = crypto.createHash('md5').update(req.body.pw).digest('hex'),
    name = req.body.name
    db.UserModel.find({id:id},function(err,docs){
        if(docs.length == 0){
            //db.UserModel.create()
            var user = new db.UserModel()
            user.id = id
            user.pw = pw
            user.name = name
            user.save()
            res.redirect('/')
        }else{
            res.send("id already exists")
        }
    })
})

router.post('/user/login',function(req,res){
    let id = req.body.id,
    pw = crypto.createHash('md5').update(req.body.pw).digest('hex')
    db.UserModel.find({id:id},(err,docs)=>{
        if(docs[0].pw == pw){
            req.session.user = {
                id:docs[0].id,
                name:docs[0].name
            }
            res.redirect('/')
        }else{
            res.redirect('/user/login')
        }
    })
})

router.get('/main',function(req,res){
    if(req.session.user){
        res.render('main',{code:'검색한 코드가 여기에 나타납니다', title:""})
    }else{
        res.redirect('/')
    }
})

//EXPORT
module.exports = router