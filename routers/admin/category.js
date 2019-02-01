/**
 * 菜品类别相关的路由
 */
//创建路由器
const express = require('express');
const pool = require('../../pool');
const router = express.Router();

/**
 * API: GET /admin/category
 * 含义：客户端获取所有的菜品类别，按编号升序排列
 * 返回值形如：[{cid: 1,cname: "..."},{.....}]
 */
router.get('/',(req,res)=>{
  var sql = 'SELECT * FROM ttms_category ORDER BY cid';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

 /**
 * API: DELETE /admin/category/:cid
 * 含义：根据表示菜品编号的路由参数，删除该菜品
 * 返回值形如：{code: 200,msg: '1 category deleted'}
 * 返回值形如：{code: 400,msg: '0 category deleted'}
 */
router.delete('/:cid',(req,res)=>{
  var cid = req.params.cid;
  //注意删除菜品类别前必须先把属于该类别的菜品的类别编号设置为NULL
  pool.query('UPDATE ttms_dish SET categoryId=NULL WHERE categoryId=?',cid,(err,result)=>{
    if(err) throw err;
    //至此指定类别的菜品已经修改完毕
    var sql = 'DELETE FROM ttms_category WHERE cid=?';
    pool.query(sql,cid,(err,result)=>{
      if(err) throw err;
      if(result.affectedRows > 0){
        res.send({code: 200,msg: '1 category deleted'})
      }else{
        res.send({code: 400,msg: '0 category deleted'})
      }
    })
  }) 
})

/**
 * API: POST /admin/category   
 * 请求参数在请求主体：{cname: 'xx'}
 * 含义：添加新的菜品类别
 * 返回值形如：{code: 200,msg: '1 category added',cid: X}
 */
router.post('/',(req,res)=>{
  var data = req.body;
  var sql = 'INSERT INTO ttms_category SET ?';
  pool.query(sql,data,(err,result)=>{
    if(err) throw err;
    res.send({code: 200,msg: '1 category added', cid: result.insertId});
  })
})

 /**
 * API: PUT /admin/category
 * 请求参数在请求主体：{cid: xx,cname: 'xx'}
 * 含义：根据菜品类别编号修改该类别
 * 返回值形如：{code: 200,msg: '1 category modified'}
 * 返回值形如：{code: 400,msg: '0 category modified,not exists'}
 * 返回值形如：{code: 401,msg: '0 category modified,no modification'}
 */
router.put('/',(req,res)=>{
  var data = req.body;
  //此处可以对数据进行验证
  var sql = 'UPDATE ttms_category SET ? WHERE cid=?';
  pool.query(sql,[data,data.cid],(err,result)=>{
    console.log(result);
    if(err) throw err;
    if(result.changedRows > 0){
      //实际更新了一行
      res.send({code: 200,msg: '1 category modified'})
    }else if(result.affectedRows == 0){
      res.send({code: 400,msg: '0 category modified,not exists'})
    }else if(result.affectedRows ==1 && result.changedRows == 0){
      //影响到1行，但修改了0行--新值与旧值完全一样
      res.send({code: 401,msg: '0 category modified,no modification'})
    }
  })
})


module.exports = router;