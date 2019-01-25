/*** 设置客户端连接使用的编码 ***/
SET NAMES UTF8;
/*** 丢弃数据库ly，如果存在 ***/
DROP DATABASE IF EXISTS ttms;
/*** 创建数据库，存储的编码 ***/
CREATE DATABASE ttms CHARSET=UTF8;
/*** 进入该数据库 ***/
USE ttms;
/*** 创建管理员表 ***/
CREATE TABLE ttms_admin(
  aid        INT PRIMARY KEY AUTO_INCREMENT,
  aname      VARCHAR(32) COMMENT "管理员用户名", #唯一
  apwd       VARCHAR(64) COMMENT "管理员密码" #加密存储
  /*role       TINYINT COMMENT "管理员权限"*/
);
/*** 全局设置 ***/
CREATE TABLE ttms_settings(
  sid        INT PRIMARY KEY AUTO_INCREMENT,
  appName    VARCHAR(32) COMMENT "应用/店家名称",
  apiUrl     VARCHAR(64) COMMENT "数据API子系统地址",
  adminUrl   VARCHAR(64) COMMENT "管理后台子系统地址",
  appUrl     VARCHAR(64) COMMENT "顾客App子系统地址",
  icp        VARCHAR(64) COMMENT "系统备案号",
  copyright  VARCHAR(128) COMMENT "系统版权声明"
);
/*** 桌台信息表 ***/
CREATE TABLE ttms_table(
  tid        INT PRIMARY KEY AUTO_INCREMENT,
  tname      VARCHAR(64) COMMENT "桌台昵称", #可以为空
  type       VARCHAR(16) COMMENT "桌台类型", #如3-4人
  status     TINYINT COMMENT "当前状态"      #1空闲 2预订 3占用 0其他
);
/*** 桌台预定表 ***/
CREATE TABLE ttms_reservation(
  rid        INT PRIMARY KEY AUTO_INCREMENT,
  contactName VARCHAR(64) COMMENT "联系人姓名",
  phone      VARCHAR(16) COMMENT "联系电话",
  contactTime BIGINT COMMENT "联系时间",
  dinnerTime  BIGINT COMMENT "用餐时间"
);
/*** 菜品分类表 ***/
CREATE TABLE ttms_category(
  cid        INT PRIMARY KEY AUTO_INCREMENT,
  cname      VARCHAR(32) COMMENT "类别名称"
);
/*** 菜品表 ***/
CREATE TABLE ttms_dish(
  did        INT PRIMARY KEY AUTO_INCREMENT, #起始id10000起
  title      VARCHAR(32) COMMENT "菜品的名称",
  imgUrl     VARCHAR(128) COMMENT "图片的地址",
  price      DECIMAL(7,2) COMMENT "菜品的价格",
  detail     VARCHAR(128) COMMENT "详细描述信息",
  categoryId INT COMMENT "所属类别的编号"
);
/*** 订单表 ***/
CREATE TABLE ttms_order(
  oid        INT PRIMARY KEY AUTO_INCREMENT,
  startTime  BIGINT COMMENT "开始用餐时间",
  endTime    BIGINT COMMENT "用餐结束时间",
  customerCount INT COMMENT "用餐人数",
  tableld    INT COMMENT "桌台编号"
);
/*** 订单详情表 ***/
CREATE TABLE ttms_order_detail(
  did        INT PRIMARY KEY AUTO_INCREMENT,
  dishId     INT COMMENT "菜品编号",
  dishCount  INT COMMENT "菜品数量",
  customerName  VARCHAR(64) COMMENT "点餐用户的称呼",
  orderId    INT COMMENT "订单编号"
);