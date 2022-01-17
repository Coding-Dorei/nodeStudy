const express = require('express')
const helmet = require('helmet')
const app = express()
const ejs = require('ejs')
const db = require('./model/db')

const mainRouter = require('./router/mainRouter')
const codeRouter = require('./router/CodeCRUD')

app.set('view engine', 'ejs')//render로 불러올 파일의 확장자는 ejs
app.set('views','./views')//view engine이 가져올 resource?들이 위치한 경로
app.use('/public',express.static(__dirname+'/public'))//public폴더를 url을 통해 접근할 수 있게 해줌

app.use(helmet())//보안

app.use(express.json())//body를 사용할 수 있게 해줌
app.use(express.urlencoded())

app.use('/', mainRouter)

app.use('/',codeRouter)

app.listen(3000, function(){
    db.connectDB()
    console.log("Server is running on 3000")
})