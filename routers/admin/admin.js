/* 引入模块 */
/**
 * 管理员相关路由
 */
const express = require('express');
const pool = require('../../pool');
const router = express.Router();

/**管理员登录 
 * API: GET /admin/login/:aname/:apwd
 * 请求数据：{aname: 'xxx',apwd: 'xxx'}
 * 返回数据：{code: 200,msg:'login succ'}
 *          {code: 400,msg:'aname or apwd err'}
 */
router.get('/login/:aname/:apwd',(req,res)=>{
  var aname = req.params.aname;
  var apwd = req.params.apwd;
  if(!aname){
    res.send({code: 401,msg: 'name required'});
    //阻止后续执行
    return;
  }
  if(!apwd){
    res.send({code: 402,msg: 'pwd required'});
    return;
  }
  var sql = 'SELECT aid FROM ttms_admin WHERE aname=? AND apwd=PASSWORD(?) LIMIT 1';
  pool.query(sql,[aname,apwd],(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      res.send({code: 200,msg: 'login succ'});
    }else{
      res.send({code: 400,msg: 'aname or apwd err'});
    }
  })
})


/**根据管理员名和密码修改管理员密码
 * API: PATCH /admin   //修改部分数据用PATCH
 * 请求数据：{aname: 'xxx',oldPwd: 'xxx',newPwd:'xxx'}
 * 返回数据：{code: 200,msg:'modified succ'}
 *          {code: 400,msg:'aname or apwd err'}
 *          {code: 401,msg:'apwd not modified'}
 */
router.patch('/',(req,res)=>{
  var data = req.body;
  console.log(data)
  var sql = 'SELECT aid FROM ttms_admin WHERE aname=? AND apwd=PASSWORD(?) LIMIT 1';
  pool.query(sql,[data.aname,data.oldPwd],(err,result)=>{
    if(err) throw err;
    if(result.length == 0){
      res.send({code: 400,msg:'password err'});
      return;
    }
    //如果查询到了用户，再修改其密码
    var sql = 'UPDATE ttms_admin SET apwd=PASSWORD(?) WHERE aname=?';
    pool.query(sql,[data.newPwd,data.aname],(err,result)=>{
      if(err) throw err;
      if(result.changedRows > 0){//密码修改成功
        res.send({code: 200,msg:'modified succ'})
      }else{//新旧密码一样，未做修改
        res.send({code: 401,msg:'apwd not modified'})
      }
    })
  })
})




/* 导出路由 */
module.exports = router;