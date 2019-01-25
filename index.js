/**
 * 天天美食扫码点餐项目API子系统
 */
const PORT = 8080;
const express = require('express');


//启动主服务器
var app = express();
app.listen(PORT,()=>{
  console.log(' Server Listening ' + PORT + ' ... ');
})