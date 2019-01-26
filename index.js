/**
 * 天天美食扫码点餐项目API子系统
 */
/** 端口号 **/
const PORT = 8080;
/** 引入第三方模块 **/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
/** 引入路由模块 **/
const admin = require('./routers/admin/admin');
const category = require('./routers/admin/category');
const dish = require('./routers/admin/dish');
const settings = require('./routers/admin/settings');
const table = require('./routers/admin/table');

//启动主服务器
var app = express();
app.listen(PORT,()=>{
  console.log(' Server Listening ' + PORT + ' ... ');
});
app.use(bodyParser.urlencoded({
  extended: false
}));




/** 使用路由器来管理路由 **/
app.use(admin);
app.use(category);
app.use(dish);
app.use(settings);
app.use(table);