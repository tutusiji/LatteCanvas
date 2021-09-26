const Router = require('koa-router')
const users = require('./users')
const matters = require('./matters')




const routers = new Router()

routers.use('/user', users)
routers.use('/matters', matters)

module.exports = routers