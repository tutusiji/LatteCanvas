
async function getInfo(ctx, next) {
    ctx.ok({
        code: 0,
        data: {
            name: '张三'
        },
        message: "success"
    })
    next()
}

module.exports = {
    getInfo
}