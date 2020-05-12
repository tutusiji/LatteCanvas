const Koa = require("koa")
const respond = require('koa-respond')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const routers = require('./routers')

const app = new Koa()
app.use(cors())
app.use(bodyParser())
app.use(respond())
app.use(routers.routes())

module.exports = app