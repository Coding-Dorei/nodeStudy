const express = require('express')
const helmet = require('helmet')
const app = express()
const ejs = require('ejs')
const db = require('./model/db')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')

const mainRouter = require('./router/mainRouter')
const codeRouter = require('./router/CodeCRUD')

app.set('view engine', 'ejs')//render로 불러올 파일의 확장자는 ejs
app.set('views','./views')//view engine이 가져올 resource?들이 위치한 경로
app.use('/public',express.static(__dirname+'/public'))//public폴더를 url을 통해 접근할 수 있게 해줌

app.use(helmet())//보안

app.use(express.json())//body를 사용할 수 있게 해줌
app.use(express.urlencoded())

app.use(cookieParser())
app.use(expressSession({
    secret:'2868',
    resave:true,
    saveUninitialized:true
}))

app.use('/', mainRouter)

app.use('/',codeRouter)

let ip = '59.6.104.50'

app.listen(3000,ip, function(){
    let ts = Date.now();
    let date_ob = new Date(ts);
    console.log(date_ob)
    db.mongoose.connect('mongodb://localhost:27017/CodeArchive')
    console.log("Server is running on 3000")
})