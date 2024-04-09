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
-- Table structure for table `watch_video`
--

DROP TABLE IF EXISTS `watch_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watch_video` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `video_watched` bit(1) NOT NULL,
  `video` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg3wsnoyj63yukjusduo5twgtc` (`video`),
  CONSTRAINT `FKg3wsnoyj63yukjusduo5twgtc` FOREIGN KEY (`video`) REFERENCES `video` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watch_video`
--

LOCK TABLES `watch_video` WRITE;
/*!40000 ALTER TABLE `watch_video` DISABLE KEYS */;
INSERT INTO `watch_video` VALUES (48,1,_binary '',4),(49,1,_binary '',5),(50,1,_binary '',1107),(51,1,_binary '',1107),(52,1,_binary '\0',6),(53,12,_binary '\0',1369),(54,12,_binary '\0',4),(55,12,_binary '\0',8726),(56,0,_binary '\0',1),(57,0,_binary '\0',2),(58,0,_binary '\0',3),(59,0,_binary '\0',4),(60,0,_binary '\0',9),(61,0,_binary '\0',14),(62,0,_binary '\0',11),(63,0,_binary '\0',5),(64,12,_binary '\0',7777),(65,0,_binary '\0',8240),(66,4,_binary '\0',1),(67,4,_binary '\0',2),(68,4,_binary '\0',5),(69,4,_binary '\0',3),(70,5,_binary '\0',6082),(71,5,_binary '\0',6081),(72,5,_binary '\0',7896),(73,5,_binary '\0',6231),(74,5,_binary '\0',7470);
/*!40000 ALTER TABLE `watch_video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-08 16:01:08
