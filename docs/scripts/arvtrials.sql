/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : arvtrials

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 22/11/2020 18:22:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for drug
-- ----------------------------
DROP TABLE IF EXISTS `drug`;
CREATE TABLE `drug`  (
  `drugId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`drugId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of drug
-- ----------------------------
INSERT INTO `drug` VALUES ('123', '12324355343');
INSERT INTO `drug` VALUES ('QLĐB-747-19', 'Alpha - ARV');
INSERT INTO `drug` VALUES ('qwe', 'qqwerqw');
INSERT INTO `drug` VALUES ('VD-21302-14', 'Tarvicort-N');
INSERT INTO `drug` VALUES ('VD-22843-15', 'Carvelmed 12.5');
INSERT INTO `drug` VALUES ('VD-22844-15', 'Carvelmed 6.25');

SET FOREIGN_KEY_CHECKS = 1;
