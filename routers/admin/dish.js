/* 引入模块 */
/**
 * 菜品相关路由
 */
const express = require('express');
const pool = require('../../pool');
const router = express.Router();

/**
 * API: GET /admin/dish
 * 获取所有的菜品(按类别进行分类)
 * 返回数据：
 * [
 *  {cid: 1, cname: '新品', dishList: [{.....},{.....},{.....}]}
 * ]
 */
router.get('/',(req,res)=>{
  //查询所有的菜品类别
  var sql = 'SELECT cid,cname FROM ttms_category';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    var categoryList = result;
    var count = 0;
    for(var c of categoryList){
      //循环查询每个类别下游哪些菜品
      var sql1 = 'SELECT * FROM ttms_dish WHERE categoryId=?';
      pool.query(sql1,c.cid,(err,result)=>{
        if(err) throw err;
        c.dishList = result;
        count ++; 
        if(count == categoryList.length){
          res.send(categoryList)
        }
      })   
    }
    
  })
})


/* 导出路由 */
module.exports = router;