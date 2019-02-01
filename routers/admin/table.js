/**
 * 桌台的相关路由
 */
const express = require('express');
const pool = require('../../pool');
const router = express.Router();
/**
 * 获取所有桌台的信息
 * GET /admin/table
 */
router.get('/',(req,res)=>{
  var sql = 'SELECT * FROM ttms_table ORDER BY tid';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

/**
 * 获取预约状态桌台的详情
 * GET  /admin/table/reservation/:tid
 * 1空闲 2预订 3占用 0其他
 */
router.get('/reservation/:tid',(req,res)=>{
  var tid = req.params.tid;
  var sql = 'SELECT tid FROM ttms_table WHERE tid=? AND status=2';
  pool.query(sql,tid,(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      pool.query('SELECT * FROM ttms_reservation WHERE tableId=?',result[0].tid,(err,result)=>{
        if(err) throw err;
        res.send(result)
      })
    }else{
      res.send({code: 400, msg: 'not seek out'})
    }
  })
})

/**
 * 获取占用状态桌台的详情
 * GET  /admin/table/inuse/:tid
 */
router.get('/inuse/:tid',(req,res)=>{
  
})

/**
 * 修改桌台的状态
 * PATCH  /admin/table
 */



 /**
  * 添加桌台
  * POST  /admin/table
  */


  /**
   * 删除桌台
   * DELETE  /admin/table/:tid
   */





/* 导出路由 */
module.exports = router;