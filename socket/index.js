var http = require('http')

let wsServer = (app) => {
    var server = http.createServer(app)
    let WebSocketServer = require("ws").Server
    let wsServer = new WebSocketServer({ port: 3001 })
    wsServer.on("connection", (socket) => {
        console.log("客户端连接成功")
        socket.on("message", (message) => {
            console.log("接受客户端的消息", message)
            setInterval(function () {
                socket.send("服务器已收到:" + new Date().toLocaleString())
            }, 1000)
            socket.send("服务器回应" + message)
        })
    })
}

module.exports = wsServer