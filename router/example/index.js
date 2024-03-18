const fs = require("fs")

let example = (req, res) => {
    console.log('example', req.url)
    fs.readFile(__dirname + '/example', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.writeHead(200, {
                "Content-Type": "text/html",
            })
            console.log("a", data.toString())
            res.write(JSON.stringify(data))
            res.end()
        }
    })
}
module.exports = example