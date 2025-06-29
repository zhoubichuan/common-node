module.exports = {
    getJson: (path1, path2) => {
        let fs = require("fs")
        const csv = require('csvtojson');
        return new Promise((resolve, reject) => {
            csv()
                .fromFile(path1)
                .then((jsonObj) => {
                    fs.writeFile(path2, JSON.stringify(jsonObj, null, 2) + "\n", { flag: "a" }, function () {
                        resolve({ code: 200, msg: "ok" })
                    })
                }).catch((err) => {
                    reject({ code: 500, msg: err })
                });
        })
    }
}

// getJson('/Users/zhoubichuan/common-node/router/example/aaa.csv', '/Users/zhoubichuan/common-node/router/example/aaa.json')