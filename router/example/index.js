const fs = require("fs")

let example = (req, res) => {
    const key = req.url.split('/').pop()
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
        }
    }
    router[key](req, res)
}
module.exports = example