-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: j10b107.p.ssafy.io    Database: test
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `attendance` int NOT NULL DEFAULT '0',
  `user_seq` bigint NOT NULL AUTO_INCREMENT,
  `video_view_time` datetime(6) NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `concern` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('USER','GUEST') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,1,'2024-04-01 05:17:07.526500','f','19990505','유튜브 채널 디스크립션 모아 놓은 문장','ssafy@naver.com','김싸피','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MTMzNTM1OTF9.b8UBPdzAFn85b_XW9wCgdYmqB0NI71r7d_8LEdiB2-GXWbMPrsa4_FWh6n98L1zhOO6mC-eQxbtIyYj7zvpM2B','USER'),(0,2,'2024-04-01 05:17:07.526500','f','19980505','영어 천재가 되고 싶다 오픽 최강 토스 고득점 토익','eunee@naver.com','칸초','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MTMzNTM1OTF9.b8UBPdzAFn85b_XW9wCgdYmqB0NI71r7d_8LEdiB2-GXWbMPrsa4_FWh6n98L1zhOO6mC-eQxbtIyYj7zvpM3B','USER'),(0,3,'2024-04-03 16:48:13.760259',NULL,NULL,'SPOTV�몴 �솴湲덈젅�떆�뵾, SPOTV �삤由ъ��꼸! �쐟 �끂�옒 �옄留� �젣�옉 �뒪���겕�옒�봽�듃 �븣�뙆怨좏뀒�� 源��꽦�쁽�쓽 �쑀�뒠釉뚯콈�꼸�엯�땲�떎 留롮씠�궗�옉�빐二쇱꽭�슂:D  �깮諛⑹넚 吏꾪뻾�떆媛� : �닔, 紐�, �넗, �씪 �삤�썑 7�떆  留ㅼ씪 �삤�쟾 11�떆30遺� , �삤�썑6�떆30遺� �뾽濡쒕뱶  臾몄쓽 : rlatjdgus228@nate.com �븞�뀞�븯�꽭�슂.  �옣瑜�, �떆�� �긽愿��뾾�씠 �끂�옒 媛��궗瑜� �삱由щ뒗 �썒�궎�엯�땲�떎.  理쒖떊怨� 蹂대떎�뒗 湲곗〈�뿉 �엳�뜕 怨� �쐞二쇰줈 �뾽濡쒕뱶�븯怨� �엳�뒿�땲�떎.  woongki123455@gmail.com  鍮꾩쫰�땲�뒪/愿묎퀬 臾몄쓽 : http://www.unearth.co.kr  �븯�굹 �몮 湲곕줉�븷 �삁�젙 Hello,  We are CROSS MUSIC that provides music recommendations and lyrics.  We don\'t accept upload requests via email.  ','zieunpk0924@gmail.com',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MTMzNzI0OTN9.Wg_WvvCWXB2eKjZz1Hnl4M5IEK2fl_LWAFahKE5HFSLz3a9X3uKM3qwdUoGbxpWW0i-zkik3pTW2umKU59KpVw','USER'),(0,4,'2024-04-04 07:56:02.586709','male','20160604','교육','mnil7991@gmail.com','가나다라',NULL,'USER'),(0,5,'2024-04-05 08:24:57.264848','female','20150302','교육','lxxyunn@jbnu.ac.kr','test',NULL,'USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-08 16:01:05
