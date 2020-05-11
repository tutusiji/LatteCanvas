const Koa = require("koa")
const routers = require('./routers')

const app = new Koa()
app.use(routers.routes())

module.exports = app