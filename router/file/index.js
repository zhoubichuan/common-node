const fs = require("fs")
const fs = require('fs').promises;
const path = require('path');

async function readFilesInDirectory(directoryPath) {
    const files = await fs.readdir(directoryPath);
    const allPath = []
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = await fs.stat(filePath);

        if (stats.isFile()) {
            console.log(filePath);
            allPath.push(filePath)
        } else if (stats.isDirectory()) {
            await readFilesInDirectory(filePath);
        }
    }
    return allPath
}

let file = (req, res) => {
    const key = req.url.split('?').shift().replace('/api/file/', '')
    const router = {
        folder(req, res) {
            let data = ""
            req.on("data", (chunk) => {
                data += chunk
            })
            req.on("end", async () => {
                data = querystring.parse(data.toString())
                console.log("请求数据：", data)
                const { type, url } = data
                if (type === 1) {
                    res.writeHead(200, {
                        "Content-Type": "text/html",
                    })
                    result = await readFilesInDirectory(url).toString()
                    res.write(JSON.stringify({ result, code: 200 }))
                    res.end()
                } else if (type === 2) {

                }
            })
        },
        file(req, res) {
            let data = ""
            req.on("data", (chunk) => {
                data += chunk
            })
            req.on("end", () => {
                data = querystring.parse(data.toString())
                console.log("请求数据：", data)
                fs.readFile(__dirname + data.url, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.writeHead(200, {
                            "Content-Type": "text/html",
                        })
                        result = result.toString()
                        res.write(JSON.stringify({ result, code: 200 }))
                        res.end()
                    }
                })
            })
        },
        zip(req, res) {
            console.log('file', req.url)
            let data = ""
            req.on("data", (chunk) => {
                data += chunk
            })
            req.on("end", () => {
                data = querystring.parse(data.toString())
                console.log("请求数据：", data)

            })
        },
    }
    router[key](req, res)
}
module.exports = file