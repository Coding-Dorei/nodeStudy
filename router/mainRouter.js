const express = require('express')
const router = express.Router()
const db = require('../model/db')
const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

router.get('/crawling',function(req,res){
    var url = req.query.url

    axios({url:url,method:"GET",responseType:"arraybuffer"}).then(function(html){
        const content = iconv.decode(html.data,"EUC-KR").toString()
         const $ = cheerio.load(content)

    })

    res.send({success:"success"})
})

router.get('/',function(req,res){
    res.render('index',{title:"EJS 메인 페이지"})//render로 views폴더안의 indes.ejs를 화면에 띄워주고 그 다음 인자로 데이터를 전송
})//ejs파일 안에서 <%= %>사이에 locals.'key'를 통해 접근 가능

router.get('/about',(req,res)=>{
    res.send('About Page')
})

router.get('/data/create',function(req,res){
    let user_id = parseInt(Math.random()*10000)
    db.users.create({user_id:user_id}).then(function(result){
        res.send({success:200})
    })
})

router.get('/data/read',function(req,res){
    db.users.findAll().then(function(result){
        res.send({success:200,data:result})
    })
})

router.post('/data/update',function(req,res){
    let target_id = req.body.target_id
    db.users.update({user_id:9999},{where:{user_id:target_id}}).then(function(result){
        res.send({success:200})
    })
})

router.post('/data/delete',function(req,res){
    let target_id = req.body.target_id
    db.users.destroy({where:{user_id:target_id}}).then(function(result){
        res.send({success:200})
    })
})

router.post('/',function(req,res){
    res.send("Post API")
    console.log(req.body)
})

router.post('/code/create',function(req,res){
    let code = req.body.code,
    author = req.body.author
    db.codes.create({code:code,author:author}).then(function(result){
        console.log(result)
    })
})

//EXPORT
module.exports = router