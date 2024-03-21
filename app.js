require('dotenv').config()
const http = require("http")
const home = require('./router/home/index.js')
const example = require('./router/example/index.js')
const student = require('./router/student/index.js')
const rich = require('./router/rich/index.js')
const message = require('./router/message/index.js')
const socket = require('./router/socket/index.js')
const port = "3000"
const server = http.createServer()
server.listen(port, function () {
    console.log(`已经连接${port}端口`)
})

server.on("request", function (req, res) {
    console.log(req.url)
    if (req.url.slice(0, 4) === '/api') {
        req.url.includes('/home') && home(req, res)
        req.url.includes('/example') && example(req, res)
        req.url.includes('/student') && student(req, res)
        req.url.includes('/rich') && rich(req, res)
        req.url.includes('/message') && message(req, res)
    }
})
socket(server)