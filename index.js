/**
 * 天天美食扫码点餐项目API子系统
 */
/** 端口号 **/
console.log('准备启动API服务器')
console.log(new Date().toLocaleString())
const PORT = 8080;
/** 引入第三方模块 **/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
/** 引入路由模块 **/
const adminRouter = require('./routers/admin/admin');
const categoryRouter = require('./routers/admin/category');
const dishRouter = require('./routers/admin/dish');
// const settings = require('./routers/admin/settings');
// const table = require('./routers/admin/table');

//启动主服务器
var app = express();
app.listen(PORT,()=>{
  console.log(' Server Listening ' + PORT + ' ... ');
  console.log(new Date().toLocaleString())
});
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(bodyParser.json());//把JSON格式的请求主体数据解析出来放到req.body中
app.use(cors({
  origin:"http://127.0.0.1:5500"
}))



/** 挂载路由器**/
app.use('/admin',adminRouter);
app.use('/admin/category',categoryRouter);
app.use('/admin/dish',dishRouter);
// app.use(settings);
// app.use(table);