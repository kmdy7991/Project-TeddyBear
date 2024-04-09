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
-- Table structure for table `daily_word`
--

DROP TABLE IF EXISTS `daily_word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_word` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `eng` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `part` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `word_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82981 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_word`
--

LOCK TABLES `daily_word` WRITE;
/*!40000 ALTER TABLE `daily_word` DISABLE KEYS */;
INSERT INTO `daily_word` VALUES (82921,'grass','1. 잔디','명사','A1',4501),(82922,'guess','1. 추측하다\n2. 추측','명사/동사','A1',4537),(82923,'train','1. 기차\n2. 훈련시키다','명사/동사','A1',7979),(82924,'a.m.','1. 오전','부사','A1',1957),(82925,'pop','1. 팝\n2. 펑 하고 터지다','명사/동사','A1',6315),(82926,'suggestion','1. 제안','명사','A1',7616),(82927,'real','1. 실제의\n2. 실제로','부사/형용사','A1',6637),(82928,'letter','1. 편지','명사','A1',5261),(82929,'action','1. 행동','명사','A1',2016),(82930,'medicine','1. 의학/약','명사','A1',5475),(82931,'awful','1. 끔찍한','형용사','A2',2381),(82932,'brave','1. 용감한','형용사','A2',2597),(82933,'reach','1. 도달하다\n2. 도달','명사/동사','A2',6629),(82934,'quiz','1. 퀴즈','명사','A2',6572),(82935,'daily','1. 매일\n2. 매일의','부사/형용사','A2',3323),(82936,'golden','1. 황금의','형용사','A2',4450),(82937,'mushroom','1. 버섯','명사','A2',5676),(82938,'adult','1. 성인\n2. 성인의','명사/형용사','A2',2056),(82939,'apartment','1. 아파트','명사','A2',2230),(82940,'cost','1. 비용이 들다\n2. 비용','명사/동사','A2',3198),(82941,'supposedly','1. 추정상','부사','B1',7660),(82942,'extinction','1. 멸종','명사','B1',4026),(82943,'enthusiast','1. 열광자','명사','B1',3874),(82944,'stretch','1. 늘리다','동사','B1',7551),(82945,'backache','1. 요통','명사','B1',2389),(82946,'sponsor','1. 후원자\n2. 후원하다','명사/동사','B1',7433),(82947,'discount','1. 할인','명사','B1',3562),(82948,'latecomer','1. 늦게 온 사람','명사','B1',5193),(82949,'waterfall','1. 폭포','명사','B1',8386),(82950,'measure','1. 측정\n2. 측정하다','명사/동사','B1',5465),(82951,'rebellious','1. 반항적인','형용사','B2',6650),(82952,'starve','1. 굶주리다','동사','B2',7474),(82953,'articulate','1. 또렷이 말하다\n2. 분명히 말하는','동사/형용사','B2',1127),(82954,'nonprofessional','1. 비전문가의','형용사','B2',5797),(82955,'shield','1. 방패','명사','B2',7152),(82956,'naval','1. 해군의','형용사','B2',5717),(82957,'kangaroo','1. 캥거루','명사','B2',5124),(82958,'astonishment','1. 놀라움','명사','B2',2326),(82959,'sliver','1. 조각','명사','B2',7281),(82960,'unsatisfactory','1. 불만족스러운','형용사','B2',8205),(82961,'instinctive','1. 본능적인','형용사','C1',353),(82962,'wrench','1. 비틀다','동사','C1',725),(82963,'unmanageable','1. 다루기 힘든','형용사','C1',128),(82964,'disdain','1. 경멸','명사','C1',147),(82965,'circulation','1. 순환','명사','C1',832),(82966,'jurisdiction','1. 관할 구역/사법권','명사','C1',18),(82967,'ceaselessly','1. 끊임없이','부사','C1',313),(82968,'tactful','1. 재치 있는/센스 있는','형용사','C1',93),(82969,'cynicism','1. 냉소주의','명사','C1',705),(82970,'debut','1. 데뷔하다\n2. 데뷔','명사/동사','C1',916),(82971,'hitherto','1. 지금까지','부사','C2',1407),(82972,'hindsight','1. 뒤늦은 깨달음','명사','C2',1191),(82973,'banish','1. 추방하다','동사','C2',1772),(82974,'brevity','1. 간결함','명사','C2',1300),(82975,'prissy','1. 까다로운','형용사','C2',1441),(82976,'rhetorically','1. 수사적으로','부사','C2',1649),(82977,'anticlimactically','1. 반전 없이','부사','C2',1101),(82978,'pedestal','1. 받침대','명사','C2',1515),(82979,'fluctuation','1. 변동','명사','C2',1318),(82980,'neophyte','1. 초보자','명사','C2',1822);
/*!40000 ALTER TABLE `daily_word` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-08 16:01:06
