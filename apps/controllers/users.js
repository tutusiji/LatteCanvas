
async function getInfo(ctx, next) {
    console.log('get info')
    ctx.status = 200
    ctx.message = "success"
    ctx.body = {
        code: 0,
        data: {
            name: "张三"
        }
    }
    next()
}

module.exports = {
    getInfo
}