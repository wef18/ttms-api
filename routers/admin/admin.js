/* 引入模块 */
const express = require('express');
const pool = require('../../pool');

const router = express.Router();

/* 管理员登录 */
router.post('/login',(req,res)=>{
  var name = req.body.name;
  var pwd = req.body.pwd;
  if(!name){
    res.send({code: 401,msg: 'name required'});
    //阻止后续执行
    return;
  }
  if(!pwd){
    res.send({code: 402,msg: 'pwd required'});
    return;
  }
  var sql = 'SELECT id FROM ttms_admin WHERE aname=? AND apwd=? LIMIT 1';
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      res.send({code: 200,msg: 'login suc'});
    }else{
      res.send({code: 301,msg: 'login err'});
    }
  })
})




/* 导出路由 */
module.exports = router;