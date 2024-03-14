const mysql = require("mysql")
let { MONGO_URL, MYSQL_URL, MYSQL_PORT, _AUTHSOURCE, MYSQL_USER, MYSQL_PASS, LOCAL } = process.env;
console.log(MYSQL_URL, MYSQL_PORT, MYSQL_USER, MYSQL_PASS)
const connection = mysql.createConnection({
    host: MYSQL_URL,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: "common_node_student",
    insecureAuth: true
})
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
    const createTableSQL = `CREATE TABLE IF NOT EXISTS student (
        id INT PRIMARY KEY AUTO_INCREMENT,
        s_name VARCHAR(255) NOT NULL,
        s_english VARCHAR(255) NOT NULL,
        s_math VARCHAR(255) NOT NULL
      )`;
    connection.query(createTableSQL, (err, results) => {
        // connection.release();
        if (err) throw err;
        console.log('Table created successfully.');
    });
    // connection.end();
})

function sql_add(s_name, s_english, s_math, callback) {
    let userAddSql = "INSERT INTO student(s_name,s_english,s_math) VALUES(?,?,?)"
    let userAddSql_params = [s_name, s_english, s_math]
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
    let userDeleteSql = `DELETE FROM student WHERE id=${id}`
    connection.query(userDeleteSql, function (err, result) {
        callback && callback(result)
        console.log("删除", JSON.stringify(result))
    })
}
function sql_update(id, s_name, s_english, s_math, callback) {
    console.log(typeof s_name)
    let userChangeSql = `UPDATE student SET s_name="${s_name}",s_english=${s_english},s_math=${s_math} WHERE id=${id}`
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
    let userSearchSql = "SELECT * FROM student"
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