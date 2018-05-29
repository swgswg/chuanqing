/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50718
Source Host           : rm-2zeq9d80a9w2bs3byco.mysql.rds.aliyuncs.com:3306
Source Database       : redwine

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-05-29 09:14:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `term` int(10) DEFAULT NULL,
  `money` double(10,2) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `endTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_use` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `activityImg` varchar(50) DEFAULT NULL,
  `type` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('1', null, '活动', '100', '20.00', '2018-05-17 17:16:08', '2018-05-23 17:16:12', '1', '2018-05-17 17:16:19', '1.jpg', null);
INSERT INTO `activity` VALUES ('2', null, '满200减20', '200', '20.00', '2018-05-28 14:23:52', '2018-05-28 14:23:52', '1', '2018-05-28 14:23:52', '2.JPG', '1');
INSERT INTO `activity` VALUES ('3', null, '满100减50', '100', '50.00', '2018-05-28 00:00:00', '2018-10-01 00:00:00', '1', '2018-05-28 14:17:38', '1.JPG', '1');

-- ----------------------------
-- Table structure for activitygoods
-- ----------------------------
DROP TABLE IF EXISTS `activitygoods`;
CREATE TABLE `activitygoods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `activityId` int(20) DEFAULT NULL,
  `goodsId` int(10) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  `salePrice` double(10,2) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activitygoods
-- ----------------------------
INSERT INTO `activitygoods` VALUES ('1', '1', '1', '1', '1.00', '1');
INSERT INTO `activitygoods` VALUES ('2', '1', '3', '1', '1000.00', '20');
INSERT INTO `activitygoods` VALUES ('3', '1', '1', '1', '1.00', '1');

-- ----------------------------
-- Table structure for ad
-- ----------------------------
DROP TABLE IF EXISTS `ad`;
CREATE TABLE `ad` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `pager` int(10) DEFAULT NULL,
  `type` int(1) DEFAULT NULL,
  `attribute` varchar(255) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `ad_desc` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ad
-- ----------------------------
INSERT INTO `ad` VALUES ('1', '1', '1', '1', '1', '1', '1', '2018-05-25 17:28:41', null);

-- ----------------------------
-- Table structure for addr
-- ----------------------------
DROP TABLE IF EXISTS `addr`;
CREATE TABLE `addr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `receiveName` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `addrCity` varchar(255) DEFAULT NULL,
  `addrDetail` varchar(255) DEFAULT NULL,
  `is_default` int(1) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of addr
-- ----------------------------
INSERT INTO `addr` VALUES ('1', '1', '张三', '183665923649', 'China', '滨海新区', '1', '1', '2018-05-22 10:54:20');
INSERT INTO `addr` VALUES ('2', '1', 'Anny', '18365932649', 'China', 'binhai', '1', '1', '2018-05-23 15:46:49');
INSERT INTO `addr` VALUES ('3', '1', '王五', '19266262', '天津市', '塘沽区', '0', '1', '2018-05-23 09:37:40');
INSERT INTO `addr` VALUES ('4', '1', '刘洋', '13656236598', '天津', '塘沽', '1', '1', '2018-05-23 16:03:26');

-- ----------------------------
-- Table structure for buyback
-- ----------------------------
DROP TABLE IF EXISTS `buyback`;
CREATE TABLE `buyback` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `goodsId` int(10) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  `userId` int(10) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `dealerCode` varchar(50) DEFAULT NULL,
  `backPrice` double(10,2) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `refuseReason` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of buyback
-- ----------------------------
INSERT INTO `buyback` VALUES ('1', '3', '50', '3', '111', 'vip1', '15.00', '2018-05-28 11:22:13', null, '不好卖', '1', '1');
INSERT INTO `buyback` VALUES ('2', '3', '100', '2', '222', 'vip2', '15.00', '2018-05-28 11:23:09', null, '不好卖', '0', '1');

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `goodsId` int(10) DEFAULT NULL,
  `userId` int(10) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  `cartsPrice` double(10,2) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carts
-- ----------------------------
INSERT INTO `carts` VALUES ('1', '1', '2', '13', '13.00', '1', '1');
INSERT INTO `carts` VALUES ('2', '3', '1', '1', '1.00', '1', '1');
INSERT INTO `carts` VALUES ('3', '1', '2', '1', '1.00', '1', '1');
INSERT INTO `carts` VALUES ('4', '1', '1', '11', '11.00', '1', '1');

-- ----------------------------
-- Table structure for classrelation
-- ----------------------------
DROP TABLE IF EXISTS `classrelation`;
CREATE TABLE `classrelation` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `classId` int(10) DEFAULT NULL,
  `goodsId` int(10) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classrelation
-- ----------------------------
INSERT INTO `classrelation` VALUES ('1', '1', '1', '1');
INSERT INTO `classrelation` VALUES ('2', '1', '2', '1');

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) DEFAULT NULL,
  `identify` varchar(255) DEFAULT NULL,
  `type` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_use` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES ('1', '1', '1', '1', '2018-05-25 15:53:00', '1');
INSERT INTO `collection` VALUES ('2', '1', '2', '1', '2018-05-25 15:54:50', '1');
INSERT INTO `collection` VALUES ('3', null, null, null, null, null);
INSERT INTO `collection` VALUES ('4', '1', '1', '1', '2018-05-25 16:56:34', '0');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsId` int(11) NOT NULL,
  `detail` longtext,
  `describe` int(11) DEFAULT NULL,
  `logistics` int(11) DEFAULT NULL,
  `QoS` int(11) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `is_use` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for comment_reply
-- ----------------------------
DROP TABLE IF EXISTS `comment_reply`;
CREATE TABLE `comment_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentId` int(11) NOT NULL,
  `detail` longtext,
  `is_use` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_reply
-- ----------------------------

-- ----------------------------
-- Table structure for dealer
-- ----------------------------
DROP TABLE IF EXISTS `dealer`;
CREATE TABLE `dealer` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) DEFAULT NULL,
  `goodsId` int(10) DEFAULT NULL,
  `dealerCode` varchar(50) DEFAULT NULL,
  `possession` int(10) DEFAULT NULL COMMENT '初始商家数量',
  `remark` varchar(255) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dealer
-- ----------------------------
INSERT INTO `dealer` VALUES ('1', '2', '3', 'vip1', '100', null, '1');
INSERT INTO `dealer` VALUES ('2', '3', '3', 'vip2', '100', null, '1');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `specification` varchar(50) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `dealerPrice` double(10,2) DEFAULT NULL,
  `shopCode` varchar(50) DEFAULT NULL,
  `goodsDetail` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `saleCount` int(10) DEFAULT '0',
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `isSale` int(1) DEFAULT NULL,
  `modifiTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `type` int(1) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  `dealerTerm` int(10) DEFAULT NULL,
  `point` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '红酒1', '无', '3.00', '1.00', '1', '1', '1', '1', '2018-05-25 09:33:30', '1', '2018-05-25 09:33:30', '1', '1', '1', '0');
INSERT INTO `goods` VALUES ('2', '张裕干红', '750ml*6', '4999.00', '1999.00', null, '好喝的红酒', '百年张裕', '0', '2018-05-28 14:41:13', '1', '2018-05-28 14:41:13', '2', '1', '100', '0');
INSERT INTO `goods` VALUES ('3', '王朝干红', '750ml', '99.00', '38.00', null, '2010年大酒庄制造', '新品上市', '50', '2018-05-24 09:59:18', '1', '2018-05-24 09:59:18', '2', '1', '100', '0');

-- ----------------------------
-- Table structure for goodsclass
-- ----------------------------
DROP TABLE IF EXISTS `goodsclass`;
CREATE TABLE `goodsclass` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `groupId` int(10) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `classImg` varchar(50) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodsclass
-- ----------------------------
INSERT INTO `goodsclass` VALUES ('1', '1', '法国', '1.jpg', '1', '2018-05-23 13:27:05');
INSERT INTO `goodsclass` VALUES ('2', '3', '红酒2', '2.jpg', '1', '2018-05-23 11:49:17');
INSERT INTO `goodsclass` VALUES ('3', '3', '红酒3', '3.jpg', '1', '2018-05-23 13:27:07');
INSERT INTO `goodsclass` VALUES ('4', '4', '桃红葡萄酒', null, '1', '2018-05-23 12:04:16');
INSERT INTO `goodsclass` VALUES ('5', '4', '红葡萄酒', null, '1', '2018-05-23 12:04:20');
INSERT INTO `goodsclass` VALUES ('6', '4', '白葡萄酒', null, '1', '2018-05-23 12:04:25');

-- ----------------------------
-- Table structure for goodsgroup
-- ----------------------------
DROP TABLE IF EXISTS `goodsgroup`;
CREATE TABLE `goodsgroup` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodsgroup
-- ----------------------------
INSERT INTO `goodsgroup` VALUES ('1', '国家', '1', '2018-05-23 13:27:00');
INSERT INTO `goodsgroup` VALUES ('3', 'abroad', '1', '2018-05-23 11:48:24');
INSERT INTO `goodsgroup` VALUES ('4', '颜色', '1', '2018-05-23 11:48:03');
INSERT INTO `goodsgroup` VALUES ('5', '糖分', '1', '2018-05-23 11:49:34');
INSERT INTO `goodsgroup` VALUES ('6', '二氧化碳', '1', '2018-05-23 11:50:09');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `labal` varchar(255) DEFAULT NULL,
  `img` varchar(50) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '新闻', '新闻', '新闻', null, '2018-05-22 14:32:55');
INSERT INTO `news` VALUES ('2', '娱乐', '娱乐', '娱乐', null, '2018-05-22 14:33:59');
INSERT INTO `news` VALUES ('3', '军事', '军事', '军事', '2.jpg', '2018-05-22 14:54:00');
INSERT INTO `news` VALUES ('4', 'aa', 'aa', 'aa', '1.jpg', '2018-05-22 15:52:29');
INSERT INTO `news` VALUES ('5', 'xx', 'xx', 'xx', null, '2018-05-22 15:55:15');
INSERT INTO `news` VALUES ('6', 'aa', 'aa', 'aa', '1.jpg', '2018-05-22 15:56:28');
INSERT INTO `news` VALUES ('7', 'dd', 'dd', 'dd', '4.jpg', '2018-05-22 15:57:32');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) DEFAULT NULL,
  `userId` int(10) DEFAULT NULL,
  `goodsId` int(10) DEFAULT NULL,
  `goodsName` varchar(50) DEFAULT NULL,
  `goodsImg` varchar(50) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  `soldPrice` double(10,2) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `modifyTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `specification` varchar(50) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `addrId` int(10) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('4', '1231231241231213', '2', '1', '红酒1', '1.jpg', '2', '5104.00', '1', '1', '2018-05-25 13:04:20', '2018-05-28 17:23:06', '无', '3.00', '1', null);
INSERT INTO `orders` VALUES ('5', '1231231241231213', '2', '2', '张裕干红', null, '1', '5104.00', '4', '1', '2018-05-25 13:04:20', '2018-05-28 18:04:11', '750ml*6', '4999.00', '2', null);
INSERT INTO `orders` VALUES ('6', '111', '2', '3', '王朝干红', null, '1', '5104.00', '2', '1', '2018-05-25 13:04:20', '2018-05-28 17:01:26', '750ml', '99.00', '3', '碎了');

-- ----------------------------
-- Table structure for picture
-- ----------------------------
DROP TABLE IF EXISTS `picture`;
CREATE TABLE `picture` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `relation` int(1) DEFAULT NULL,
  `relationId` varchar(50) DEFAULT NULL,
  `is_use` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of picture
-- ----------------------------
INSERT INTO `picture` VALUES ('1', '红酒', '1.jpg', '1', '1', '1', '2018-05-23 16:10:13');
INSERT INTO `picture` VALUES ('3', '红酒', '3.jpg', '1', '3', '1', '2018-05-23 16:10:13');

-- ----------------------------
-- Table structure for saletrack
-- ----------------------------
DROP TABLE IF EXISTS `saletrack`;
CREATE TABLE `saletrack` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `dealerCode` varchar(50) DEFAULT NULL,
  `goodsId` int(10) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of saletrack
-- ----------------------------
INSERT INTO `saletrack` VALUES ('1', 'vip1', '3', '11', '2018-05-28 12:07:23');

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `goodsId` int(10) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  `dealerCode` varchar(50) DEFAULT NULL,
  `is_use` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES ('1', '1', '1000', 'pingtai', '1', '2018-05-14 14:33:12');
INSERT INTO `stock` VALUES ('2', '1', '100', 'vip1', '1', '2018-05-15 14:34:11');
INSERT INTO `stock` VALUES ('3', '1', '200', 'vip2', '1', '2018-05-17 14:34:44');
INSERT INTO `stock` VALUES ('4', '1', '100', 'vip3', '1', '2018-05-21 14:35:02');
INSERT INTO `stock` VALUES ('5', '3', '1000', '88888888', '1', '2018-05-23 15:11:51');
INSERT INTO `stock` VALUES ('6', '3', '1000', 'vip1', '1', '2018-05-28 11:28:57');
INSERT INTO `stock` VALUES ('7', '3', '1000', 'vip2', '1', '2018-05-28 11:29:06');

-- ----------------------------
-- Table structure for track
-- ----------------------------
DROP TABLE IF EXISTS `track`;
CREATE TABLE `track` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) DEFAULT NULL,
  `goodsId` int(10) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of track
-- ----------------------------

-- ----------------------------
-- Table structure for transcompany
-- ----------------------------
DROP TABLE IF EXISTS `transcompany`;
CREATE TABLE `transcompany` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `is_use` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transcompany
-- ----------------------------

-- ----------------------------
-- Table structure for transinfo
-- ----------------------------
DROP TABLE IF EXISTS `transinfo`;
CREATE TABLE `transinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderUUID` varchar(50) DEFAULT NULL,
  `transNO` varchar(10) DEFAULT NULL,
  `shortName` varchar(50) DEFAULT NULL,
  `transTrack` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transinfo
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weChat` varchar(255) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `vipLevel` int(1) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `nickName` varchar(50) DEFAULT NULL,
  `dealerCode` varchar(50) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `birth` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_use` int(1) DEFAULT NULL,
  `is_receive` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', '123456789', '13665896325', '123', '1', '张三', '夜行', '1', '1', '\"\"', '5.jpg', '2018-05-25 13:56:57', '1', '1');
INSERT INTO `user` VALUES ('3', '1111111', '13323232355', '1', '2', null, null, null, null, null, null, '2018-05-24 16:05:48', '1', '1');
INSERT INTO `user` VALUES ('4', '222222', null, null, '1', null, null, null, null, null, null, '2018-05-28 15:07:36', '1', '1');
