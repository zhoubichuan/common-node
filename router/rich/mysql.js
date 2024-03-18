const mysql = require("mysql")
let { MONGO_URL, MYSQL_URL, MYSQL_PORT, _AUTHSOURCE, MYSQL_USER, MYSQL_PASS, LOCAL } = process.env;
console.log(MYSQL_URL, MYSQL_PORT, MYSQL_USER, MYSQL_PASS)
const connection = mysql.createConnection({
    host: MYSQL_URL,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    insecureAuth: true
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    // 创建数据库
    connection.query('CREATE DATABASE IF NOT EXISTS common_node_rich', (error, results, fields) => {
        if (error) throw error;
        console.log('数据库已创建！');
    });
    // 选择数据库
    connection.query('USE common_node_rich', (error, results, fields) => {
        if (error) throw error;
        // 成功选择数据库后的操作
        console.log('数据库已使用！');
    });
    // 创建表
    const createTableSQL = `CREATE TABLE IF NOT EXISTS rich (
        id INT PRIMARY KEY AUTO_INCREMENT,
        data VARCHAR(255) NOT NULL
      )`;
    connection.query(createTableSQL, (err, results) => {
        // connection.release();
        if (err) throw err;
        console.log('Table created successfully.');
    });
    // connection.end();
})

function sql_add(data, callback) {
    console.log('rich',data)
    let userAddSql = "INSERT INTO rich(data) VALUES(?)"
    let userAddSql_params = [data]
    connection.query(userAddSql, userAddSql_params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            callback && callback(result)
            console.log("增加", JSON.stringify(result))
        }
    })
}
function sql_delete(id, callback) {
    let userDeleteSql = `DELETE FROM rich WHERE id=${id}`
    connection.query(userDeleteSql, function (err, result) {
        callback && callback(result)
        console.log("删除", JSON.stringify(result))
    })
}
function sql_update(id, data, callback) {
    console.log(typeof data)
    let userChangeSql = `UPDATE rich SET data="${data}" WHERE id=${id}`
    connection.query(userChangeSql, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            callback && callback(result)
            console.log("修改", JSON.stringify(result))
        }
    })
}
function sql_query(callback) {
    let userSearchSql = "SELECT * FROM rich"
    connection.query(userSearchSql, function (err, result) {
        if (err) {
            console.log("查找失败", err)
        } else {
            console.log("查找", JSON.stringify(result))
            callback && callback(result)
        }
    })
}
module.exports = {
    sql_add,
    sql_delete,
    sql_update,
    sql_query,
}