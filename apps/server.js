const Koa = require("koa")
const respond = require('koa-respond')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const routers = require('./routers')

const app = new Koa()

app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            // if (ctx.url === '/test') {
            //     return '*'; // 允许来自所有域名请求
            // }
            return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);

// app.use(cors())

app.use(bodyParser())
app.use(respond())
app.use(routers.routes())

module.exports = app