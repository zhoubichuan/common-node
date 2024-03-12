let http = require("http");
let news = (req, res) => {
    http.get({ host: "news.baidu.com" }, (result) => {
        let arr = [];
        result.on("data", function (data) {
            arr.push(data);
        });
        result.on("end", function () {
            let r = Buffer.concat(arr).toString();
            let arrs = r.match(/<li>(?:[\s\S]*?)<\/li>/gim);
            res.setHeader("Content-Type", "text/html;charset=utf8");
            res.end(arrs.join(""));
        });
    }
    );
}
module.exports = news