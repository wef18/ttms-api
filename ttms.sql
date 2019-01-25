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
  aname      VARCHAR(32) UNIQUE COMMENT "管理员用户名", #唯一
  apwd       VARCHAR(64) COMMENT "管理员密码" #加密存储
  /*role       TINYINT COMMENT "管理员权限"*/
);
INSERT INTO ttms_admin VALUES
(NULL,"admin",PASSWORD("123456")),
(NULL,"boss",PASSWORD("999999"));
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
INSERT INTO ttms_settings VALUES
(NULL,"天天美食","http://127.0.0.1:8080","http://127.0.0.1:8081","http://127.0.0.1:8082","京ICP备12003709号-3","Copyright © 北京达内金桥科技有限公司版权所有");
/*** 桌台信息表 ***/
CREATE TABLE ttms_table(
  tid        INT PRIMARY KEY AUTO_INCREMENT,
  tname      VARCHAR(64) COMMENT "桌台昵称", #可以为空
  type       VARCHAR(16) COMMENT "桌台类型", #如3-4人
  status     INT COMMENT "当前状态"      #1空闲 2预订 3占用 0其他
);
INSERT INTO ttms_table VALUES
(NULL,"满堂彩","6-8人桌",1),
(NULL,"金镶玉","4人桌",2),
(NULL,"寿启天","10人桌",3),
(NULL,"福满堂","4-6人桌",3),
(NULL,"全家福","10-15人桌",0);
/*** 桌台预定表 ***/
CREATE TABLE ttms_reservation(
  rid        INT PRIMARY KEY AUTO_INCREMENT,
  contactName VARCHAR(64) COMMENT "联系人姓名",
  phone      VARCHAR(16) COMMENT "联系电话",
  contactTime BIGINT COMMENT "联系时间",
  dinnerTime  BIGINT COMMENT "用餐时间",
  tableId     INT COMMENT "预订的桌台编号",
  FOREIGN KEY(tableId) REFERENCES ttms_table(tid)
);
INSERT INTO ttms_reservation VALUES
(NULL,"张三丰","13593621245",1548404918867,1548404961820,2),
(NULL,"当当","15512346598",1548404918967,1548404991820,3),
(NULL,"丁丁","13678942589",1548404918767,1548404981820,1);
/*** 菜品分类表 ***/
CREATE TABLE ttms_category(
  cid        INT PRIMARY KEY AUTO_INCREMENT,
  cname      VARCHAR(32) COMMENT "类别名称"
);
INSERT INTO ttms_category VALUES
(NULL,"新品"),
(NULL,"肉类"),
(NULL,"菌菇类"),
(NULL,"海鲜"),
(NULL,"蔬菜豆制类"),
(NULL,"丸滑类");
/*** 菜品表 ***/
CREATE TABLE ttms_dish(
  did        INT PRIMARY KEY AUTO_INCREMENT, #起始id10000起
  title      VARCHAR(32) COMMENT "菜品的名称",
  imgUrl     VARCHAR(128) COMMENT "图片的地址",
  price      DECIMAL(7,2) COMMENT "菜品的价格",
  detail     VARCHAR(128) COMMENT "详细描述信息",
  categoryId INT COMMENT "所属类别的编号",
  FOREIGN KEY(categoryId) REFERENCES ttms_category(cid)
);
INSERT INTO ttms_dish VALUES
(10000,"草鱼片","CE7I9470.jpg",36,"选鲜活草鱼，切出鱼片冷鲜保存。锅开后再煮1分钟左右即可食用。",2),
(NULL,"脆皮肠","CE7I9017.jpg",26,"锅开后再煮3分钟左右即可食用。",2),
(NULL,"酥肉","HGS_4760.jpg",38,"选用冷鲜五花肉，加上鸡蛋，淀粉等原料炸制，色泽黄亮，酥软醇香，肥而不腻。锅开后再煮3分钟左右即可食用。",2),
(NULL,"现炸酥肉(非清真)","HGS_47601.jpg",58,"选用冷鲜五花肉，加上鸡蛋，淀粉等原料炸制，色泽黄亮，酥软醇香，肥而不腻。锅开后再煮1分钟左右即可食用，也可直接食用",2),
(NULL,"牛百叶","CE7I9302.jpg",28,"毛肚切丝后，配以调味料腌制而成。锅开后再煮2分钟左右即可食用。",2),
(NULL,"腰花","CE7I9287.jpg",36,"选用大型厂家冷鲜腰花，经过解冻、清洗、切片而成。锅开后涮30秒左右即可食用。",2),
(NULL,"猪脑花","zhunao.jpg",26,"选用大型厂家冷鲜猪脑经过清洗，过水、撕膜而成。肉质细腻，锅开后再煮8分钟左右即可食用。",2),
(NULL,"午餐肉","wucanrou.jpg",25,"锅开后再煮2分钟左右即可食用。",2),
(NULL,"牛仔骨","1-CE7I5290.jpg",34,"牛仔骨又称牛小排，选自资质合格的厂家生产配送。锅开后再煮5分钟左右即可食用。",2),
(NULL,"新西兰羊肉卷","CE7I8804.jpg",39,"选用新西兰羔羊肉的前胸和肩胛为原料，在国内经过分割、压制成型，肥瘦均匀。锅开后涮30秒左右即可食用。",2),
(NULL,"捞派黄喉","EU0A0112.jpg",19,"黄喉主要是猪和牛的大血管，以脆爽见长，是四川火锅中的经典菜式。捞派黄喉选用猪黄喉，相比牛黄喉，猪黄喉只有30cm可用，肉质比牛黄喉薄，口感更脆。 捞派黄喉，通过去筋膜、清水浸泡15小时以上，自然去除黄喉的血水和腥味。口感脆嫩弹牙，是川味火锅的经典菜式。",2),
(NULL,"千层毛肚","CE7I8900.jpg",29,"选自牛的草肚，加入葱、姜、五香料一起煮熟后切片而成。五香味浓、耙软化渣。锅开后再煮3分钟左右即可食用。",2),
(NULL,"捞派脆脆毛肚","cuicuimaodu.jpg",35,"选自牛的草肚，采用流水清洗、撕片等工艺，加入各种调味料腌制而成。口感脆嫩，锅开后再采用“七上八下”的方法涮15秒即可食用。",2),
(NULL,"捞派嫩羊肉","nenyangrou.jpg",38,"羊后腿肉肉质紧实，肥肉少，以瘦肉为主；肉中夹筋，筋肉相连。肉质相比前腿肉更为细嫩，用途广，一般用于烧烤、酱制等用途。海底捞只选用生长周期达到6—8个月的草原羔羊，肉嫩筋少而膻味少。精选羔羊后腿肉，肉质紧实，瘦而不柴，再用红油腌制入味，肉香与油香充分融合，一口咬下去鲜嫩多汁、肉味十足。",2),
(NULL,"草原羔羊肉","CE7I6859.jpg",36,"选自内蒙锡林郭勒大草原10月龄以下羔羊，经过排酸、切割、冷冻而成。锅开后涮30秒左右即可食用。",2);
/*** 订单表 ***/
CREATE TABLE ttms_order(
  oid        INT PRIMARY KEY AUTO_INCREMENT,
  startTime  BIGINT COMMENT "开始用餐时间",
  endTime    BIGINT COMMENT "用餐结束时间",
  customerCount INT COMMENT "用餐人数",
  tableId    INT COMMENT "桌台编号",
  FOREIGN KEY(tableId) REFERENCES ttms_table(tid)
);
INSERT INTO ttms_order VALUES
(NULL,1548404918867,1548404961820,4,1);
/*** 订单详情表 ***/
CREATE TABLE ttms_order_detail(
  did        INT PRIMARY KEY AUTO_INCREMENT,
  dishId     INT COMMENT "菜品编号",
  dishCount  INT COMMENT "菜品数量",
  customerName  VARCHAR(64) COMMENT "点餐用户的称呼",
  orderId    INT COMMENT "订单编号",
  FOREIGN KEY(dishId) REFERENCES ttms_dish(did),
  FOREIGN KEY(orderId) REFERENCES ttms_order(oid)
);
INSERT INTO ttms_order_detail VALUES
(NULL,10001,1,"当当",1);