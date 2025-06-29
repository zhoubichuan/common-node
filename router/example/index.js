const fs = require("fs")
const { exec } = require('child_process');
const nodeUrl = require('url')
const { getJson } = require('./csvtojson')
let example = (req, res) => {
    const key = req.url.split('?').shift().replace('/api/example/', '')
    const router = {
        query(req, res) {
            console.log('example', req.url)
            fs.readFile(__dirname + '/example', (err, result) => {
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
        },
        async transform(req, res) {
            let data = ""
            req.on("data", (chunk) => {
                data += chunk
            })
            const task = decodeURIComponent(req.url.split('=').pop())
            res.writeHead(200, {
                "Content-Type": "text/html",
            })
            const { code } = await getJson(task, task.split('.')[0] + ".json")
            res.write(JSON.stringify({ result: task.split('.')[0] + ".json", code }))
            res.end()
        },
        lxquery(req, res) {
            let data = ""
            req.on("data", (chunk) => {
                data += chunk
            })
            const task = req.url.split('=').pop()
            exec(task, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                res.writeHead(200, {
                    "Content-Type": "text/html",
                })
                res.write(JSON.stringify({ result: stdout, code: 200 }))
                res.end()
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }
            });
        }
    }
    router[key](req, res)
}
module.exports = example