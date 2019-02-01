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
  sql = 'SELECT * FROM ttms_settings LIMIT 1';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result[0])
  })
})


/**
 * 修改全局设置信息
 * PUT /admin/settings
 */
router.put('/',(req,res)=>{
  var data = req.body;
  var sql = 'UPDATE ttms_settings SET ?';
  pool.query(sql,data,(err,result)=>{
    if(err) throw err;
    res.send({code: 200,msg: 'settings updated succ'})
  })
})



/* 导出路由 */
module.exports = router;