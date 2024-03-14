const http = require("http")
const example = require('./example/index.js')
const student = require('./student/index.js')
const sse = require('./sse/index.js')
const port = "3000"
const server = http.createServer()
server.listen(port, function () {
    console.log(`已经连接${port}端口`)
})

server.on("request", function (req, res) {
    example(req, res)
    student(req, res)
    sse(req, res)
})