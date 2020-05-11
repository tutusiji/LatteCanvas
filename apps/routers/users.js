const Router = require('koa-router')
const users = require('../controllers/users.js')

const routers = new Router()

routers.get('/:id', users.getInfo)

module.exports = routers.routes()