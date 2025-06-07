const fs = require("fs")

let example = (req, res) => {
    console.log('example', req.url)
    fs.readFile(__dirname + '/example/query', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.writeHead(200, {
                "Content-Type": "text/html",
            })
            console.log("a", result.toString())
            res.write(JSON.stringify({ result, code: 200 }))
            res.end()
        }
    })
}
module.exports = example