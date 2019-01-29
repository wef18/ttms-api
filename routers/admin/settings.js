/**
 * 全局设置相关路由
 */
const express = require('express');
const pool = require('../../pool');
const router = express.Router();
/**
 * 获取全局设置信息
 * GET admin/settings
 */
router.get('/',(req,res)=>{
  sql = 'SELECT * FROM ttms_settings';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})


/**
 * 修改全局设置信息
 * PUT /admin/settings
 */
router.put('/',(req,res)=>{
  var data = req.body;
  var sql = 'UPDATE ttms_settings SET ? WHERE sid=?';
  pool.query(sql,[data,data.sid],(err,result)=>{
    if(err) throw err;
    if(result.changedRows > 0){
      //实际更新了一行
      res.send({code: 200,msg: 'settings updated succ'})
    }else if(result.affectedRows == 0){
      res.send({code: 400,msg: 'settings not exists'})
    }else if(result.affectedRows ==1 && result.changedRows == 0){
      //影响到1行，但修改了0行--新值与旧值完全一样
      res.send({code: 401,msg: '0 settings modified,no modification'})
    }
  })
})



/* 导出路由 */
module.exports = router;