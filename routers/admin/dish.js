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
    for(let c of categoryList){
      //循环查询每个类别下游哪些菜品
      var sql1 = 'SELECT * FROM ttms_dish WHERE categoryId=? ORDER BY did DESC';
      pool.query(sql1,c.cid,(err,result)=>{
        if(err) throw err;
        c.dishList = result;
        //必须保证所有的类别下的菜品都查询完成才能发送响应消息——这些查询都是异步执行的
        count ++; 
        if(count == categoryList.length){
          res.send(categoryList)
        }
      })   
    } 
  })
})

/**
 * POST /admin/dish/image
 * 请求参数：
 * 接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
 */
const multer = require('multer');
const fs = require('fs');
var upload = multer({
  dest: 'tmp/'   //指定客户端上传的文件临时存储路径
});
//定义路由，使用文件上传中间件
router.post('/image',upload.single('dishImg'),(req,res)=>{
  //console.log(req.file);//客户端上传的文件
  //console.log(req.body);//客户端随同图片提交时的说明
  //把客户端上传的文件从临时目录下转移到永久的图片路径下
  var tmpFile = req.file.path;//临时文件名
  var suffix = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));//原始文件名中的后缀部分
  var newFile = randFileName(suffix);//目标文件名
  fs.rename(tmpFile, 'img/dish/' + newFile, ()=>{
    res.send({code: 200, msg: 'upload succ', fileName: newFile});
  })
})

//生成一个随机文件名
//参数：suffix表示要生成的文件名中的后缀
function randFileName (suffix){
  var time = new Date().getTime();//当前系统时间戳
  var num = Math.floor(Math.random() * (10000-1000) + 100);//4位随机数字
  return time + '_' + num + suffix;
}


 /**
 * POST /admin/dish
 * 请求参数：{title: 'xx', imgUrl: '....jpg', price: xx, derail: 'xxx', category: x}
 * 添加一个新的菜品
 * 返回数据： 
 *        {code: 200, msg: 'dish addend succ', dishId: xx}
 */
router.post('/',(req,res)=>{
  var data = req.body;
  var sql = 'INSERT INTO ttms_dish SET ?';
  pool.query(sql,data,(err,result)=>{
    if(err) throw err;
    res.send({code: 200, msg: 'dish addend succ', dishId: result.insertId})
  })
})




 /**
  * DELETE /admin/dish/:did
  * 根据指定的菜品编号删除该菜品
  * 返回数据：
  *     {code：200, msg: 'dish deleted succ'}
  *     {code：400, msg: 'dish not exists'}
  */
router.delete('/:did',(req,res)=>{
  var did = req.params.did;
  var sql = 'DELETE FROM ttms_dish WHERE did=?';
  pool.query(sql,did,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows > 0){
      res.send({code: 200,msg: 'dish deleted succ'})
    }else{
      res.send({code: 400,msg: 'dish not exists'})
    }
  })
})


   /**
  * PUT /admin/dish
  * 请求参数：{did: x, title: 'xx', imgUrl: '..jpg', price: xx, detail: 'xx', categoryId: x}
  * 根据指定的菜品编号修改该菜品
  * 返回数据：
  *     {code：200, msg: 'dish updated succ'}
  *     {code：400, msg: 'dish not exists'}
  */
router.put('/',(req,res)=>{
  var data = req.body;
  var sql = 'UPDATE ttms_dish SET ? WHERE did=?';
  pool.query(sql,[data,data.did],(err,result)=>{
    if(err) throw err;
    if(result.changedRows > 0){
      //实际更新了一行
      res.send({code: 200,msg: 'dish updated succ'})
    }else if(result.affectedRows == 0){
      res.send({code: 400,msg: 'dish not exists'})
    }else if(result.affectedRows ==1 && result.changedRows == 0){
      //影响到1行，但修改了0行--新值与旧值完全一样
      res.send({code: 401,msg: '0 dish modified,no modification'})
    }
  })
})


/* 导出路由 */
module.exports = router;