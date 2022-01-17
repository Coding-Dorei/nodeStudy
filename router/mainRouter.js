const express = require('express')
const router = express.Router()
const db = require('../model/db').database

router.get('/',function(req,res){
    res.render('index',{title:"EJS 메인 페이지"})//render로 views폴더안의 indes.ejs를 화면에 띄워주고 그 다음 인자로 데이터를 전송
})//ejs파일 안에서 <%= %>사이에 locals.'key'를 통해 접근 가능

router.get('/about',(req,res)=>{
    res.send('About Page')
})

router.post('/',function(req,res){
    res.send("Post API")
    console.log(req.body)
})

router.post('/user/createAccount',function(req,res){
    let user_id = req.body.id,
    user_pw = req.body.pw,
    user_name = req.body.name
    account = {
        id:user_id,
        pw:user_pw,
        name:user_name
    }
    db.collection('users')
})

//EXPORT
module.exports = router