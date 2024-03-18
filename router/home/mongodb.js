let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;
let { MONGO_URL, _AUTHSOURCE, _USER, _PASS, LOCAL } = process.env;
let config = { useNewUrlParser: true, useUnifiedTopology: true };
if (!LOCAL) {
    config.authSource = _AUTHSOURCE; // 权限认证（添加这个属性！！！！！）
    config.user = _USER;
    config.pass = _PASS;
}
let db = mongoose.createConnection(MONGO_URL, config);
//规定数据库中集合的字段和类型
let UserSchema = new Schema(
    {
        name: { type: String },
        label: { type: String },
        type: { type: String },
        image: { type: String },
        link: { type: String }, // user admin
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);
const UserModel = db.model("User", UserSchema);

const sql_add = (params) => UserModel.create(params)
const sql_delete = ({ id, name }) => UserModel.findByIdAndDelete(id, { name });
const sql_update = ({ id, ...update }) => UserModel.findByIdAndUpdate(id, update);
const sql_query_total = (query) => UserModel.countDocuments(query);
const sql_query = ({ query, sorter, current, pageSize }) => UserModel.find(query)
    .sort(sorter)
    .skip((current - 1) * pageSize)
    .limit(pageSize);
module.exports = { sql_add, sql_delete, sql_update, sql_query_total, sql_query };
