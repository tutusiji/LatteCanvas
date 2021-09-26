
const db = require('./../db')

async function getInfo(ctx, next) {

    ctx.ok({
        code: 0,
        data: {
            name: '张三'
        },
        msg: "success"
    })
    next(()=>{
        db.insert('aaa','1111')
    })
}

module.exports = {
    getInfo
}