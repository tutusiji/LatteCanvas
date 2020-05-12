const Router = require('koa-router')
const matters = require('../controllers/matters.js')

const routers = new Router()

routers.get('/:date', matters.getAllMatters)

module.exports = routers.routes()