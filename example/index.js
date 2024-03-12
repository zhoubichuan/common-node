const fs = require("fs")

let example = (req, res) => {
    if (req.url.includes('example')) {
        fs.readFile(__dirname + req.url, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html",
                })
                console.log("a", data.toString())
                res.write(data.toString())
            }
        })
    }
}
module.exports = example