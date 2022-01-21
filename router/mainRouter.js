const express = require('express')
const router = express.Router()
const db = require('../model/db')
const crypto = require('crypto')

router.get('/',function(req,res){
    res.render('index',{title:"CodeArchive"})//render로 views폴더안의 indes.ejs를 화면에 띄워주고 그 다음 인자로 데이터를 전송
})//ejs파일 안에서 <%= %>사이에 locals.'key'를 통해 접근 가능

router.get('/about',(req,res)=>{
    res.send('About Page')
})

router.get('/user/register',function(req,res){
    res.render('register')
})

router.post('/user/register',function(req,res){
    let id = req.body.id,
    pw = crypto.createHash('md5').update(req.body.pw).digest('hex'),
    name = req.body.name
    console.log(id,pw)
    var users = db.db.collection('users')
    users.find({id:id}).toArray(function(err,docs){
        if(docs.length == 0){
            users.insertOne({id:id,pw:pw,name:name})
            res.redirect('/')
        }else{
            res.send("<script>alert('이미 존재하는 아이디입니다')</script>")
        }
    })
})

router.post('/user/login',function(req,res){
    let id = req.body.id,
    pw = crypto.createHash('md5').update(req.body.pw).digest('hex')

    var users = db.db.collection('users')

    users.find({id:id}).toArray(function(err,docs){
        if(docs.length > 0){
            if(docs[0].pw == pw){
                req.session.user = {
                    id:docs[0].id,
                    name:docs[0].name
                }
                res.redirect('/main')
            }else{
                res.send("Login Failed")
            }
        }else{
            res.send("Login Failed")
        }
    })
})

router.get('/main',function(req,res){
    if(req.session.user){
        res.render('main',{name:req.session.user.name, code:'검색한 코드가 여기에 나타납니다'})
    }else{
        res.redirect('/')
    }
})

//EXPORT
module.exports = router