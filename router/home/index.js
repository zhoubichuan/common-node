const { sql_add, sql_delete, sql_update, sql_query_total, sql_query } = require("./mongodb")
const querystring = require("querystring")

let query = (res, req, url, result) => {
    if (req.url.includes("favicon.ico")) {
        return false
    }
    console.log("请求路径" + req.url)
    console.log("请求的方式：" + req.method)
    console.log("请求的路径：" + url)
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8",
    })
    console.log(result)
    res.write(JSON.stringify(result))
    res.end()
}

let common = {
    //查询全部
    queryAll: (res, req, url) => {
        sql_query((r) => {
            let result = { code: 200 }
            result.data = r
            query(res, req, url, result)
        })
    },
    //查询单个
    querySingle: (res, req, url) => {
        let data = ""
        req.on("data", (chunk) => {
            data += chunk
        })
        req.on("end", async () => {
            console.log("请求数据：", data)
            let total = await sql_query_total(data)
            let r = await sql_query(data)
            let result = { code: 200 }
            r.total = total
            result.data = r
            query(res, req, url, result)
        })
    },
    //添加单个
    addSingle: (res, req, url) => {
        let data = ""
        req.on("data", (chunk) => {
            data += chunk
        })
        // data = querystring.parse(result.data.toString());
        req.on("end", async () => {
            data = querystring.parse(data.toString())
            console.log("请求数据：", data)
            let r = await sql_add(data)
            let result = { code: 200 }
            result.data = r
            query(res, req, url, result)
        })
    },
    //删除单个
    deleteSingle: (res, req, url) => {
        let data = ""
        req.on("data", (chunk) => {
            data += chunk
        })
        req.on("end", async () => {
            data = querystring.parse(data.toString())
            console.log("请求数据：", data)
            let r = await sql_delete(data)
            let result = { code: 200 }
            result.data = r
            query(res, req, url, result)
        })
    },
    //更新
    update: (res, req, url) => {
        let data = ""
        req.on("data", (chunk) => {
            data += chunk
        })
        req.on("end", async () => {
            data = querystring.parse(data.toString())
            console.log("请求数据：", data)
            let r = await sql_update(data)
            let result = { code: 200 }
            result.data = r
            query(res, req, url, result)
        })
    },
}
let student = (req, res) => {
    let arr = ["queryAll", "querySingle", "addSingle", "deleteSingle", "update"]
    for (let i = 0;i < arr.length;i++) {
        if (req.url.includes(arr[i])) {
            common[arr[i]](res, req, req.url)
        }
    }
}
module.exports = student