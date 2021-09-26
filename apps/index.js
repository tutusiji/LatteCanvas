
const path = require("path")
const chalk = require('chalk')
const argv = require('yargs').argv
const env =  argv.env || 'dev'
const server = require("./server.js")
const db = require('./db.js')

if (["dev", "stg", "prd", "prd"].includes(env)) {
    require("dotenv").config({ path: path.join(__dirname, `${env}.env`)})
} else {
    console.error(chalk.red("\n --env参数配置错误，env仅支持dev,stg,pre,prd四个值 \n"))
    return
}

db.insert();

server.listen(process.env.PORT, () => {
    console.log(chalk.green(`server started, port:${process.env.PORT}`))
})
// console.log(process.env)