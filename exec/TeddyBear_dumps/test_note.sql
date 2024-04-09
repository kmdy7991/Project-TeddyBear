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
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `note_date` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  `video` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfg3j4yalrdb27ua16tov9ypfh` (`video`),
  CONSTRAINT `FKfg3j4yalrdb27ua16tov9ypfh` FOREIGN KEY (`video`) REFERENCES `video` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (1,'<p>Procrastination is when we avoid a task we said we would do, for no good reason,</p><p><br></p>','2024-04-03 13:44:20.241307',0,1),(2,'<p>Procrastination is when we avoid a task we said we would do, for no good reason,</p><p><br></p>','2024-04-03 13:44:20.567898',0,1),(3,'<p>ㅋ</p>','2024-04-03 20:35:59.773854',0,1),(4,'<ul><li><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</li><li><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</li><li><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</li></ul><p><br></p>','2024-04-03 23:40:59.931430',0,1),(5,'<ul><li><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</li><li><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</li><li><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</li></ul><p><br></p>','2024-04-03 23:41:00.487153',0,1),(6,'<ul><li><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</li><li><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</li><li><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</li></ul><p><br></p>','2024-04-03 23:41:00.680350',0,1),(7,'<ul><li><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</li><li><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</li><li><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</li></ul><p><br></p>','2024-04-03 23:41:00.831583',0,1),(8,'<ul><li><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</li><li><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</li><li><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</li></ul><p><br></p>','2024-04-03 23:41:00.989698',0,1),(9,'<ul><li><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</li><li><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</li><li><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</li></ul><p><br></p>','2024-04-03 23:41:01.134748',0,1),(10,'<p><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</p><p><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</p><p><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</p><p><br></p>','2024-04-03 23:41:23.334878',0,1),(11,'<p><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</p><p><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</p><p><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</p><p><br></p>','2024-04-03 23:41:23.673051',0,1),(12,'<p><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</p><p><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</p><p><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</p><p><br></p>','2024-04-03 23:41:23.827339',0,1),(13,'<p><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</p><p><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</p><p><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</p><p><br></p>','2024-04-03 23:41:23.999761',0,1),(14,'<p><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</p><p><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</p><p><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</p><p><br></p>','2024-04-03 23:41:29.635368',0,1),(15,'<p><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</p><p><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</p><p><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</p><p><br></p>','2024-04-03 23:41:29.925712',0,1),(16,'<p><span style=\"color: var(--tw-prose-bold);\">Procrastination</span>: 인간이 어떻게 자신이 해야 할 일을 미루게 되는지에 대한 현상.</p><p><span style=\"color: var(--tw-prose-bold);\">Brain Mechanism</span>: 뇌에서의 미루는 심리적, 생리적인 반응이다. 뇌에서의 보상 시스템과 감정 중심이 미루는 행동을 유발한다.</p><p><span style=\"color: var(--tw-prose-bold);\">Procrastination Triggers</span>: 미루는 주요 트리거 중 하나로는 우리의 본능적인 욕구와 우리를 즐겁게 하는 것들이 있다. 또한, 과제의 복잡성, 불확실성, 부족한 자기 효능감 등도 미루는 요인이다.</p><p><br></p>','2024-04-03 23:41:30.120078',0,1),(17,'<p>test</p>','2024-04-04 00:21:58.998964',12,1369),(18,'<p>test</p>','2024-04-04 00:22:11.546667',12,1369),(19,'<p>ㅇㅇㅇㅇㅇ</p>','2024-04-04 00:25:44.680469',12,7777),(20,'<p>필기노트 입니다. </p>','2024-04-04 00:34:40.063291',0,1),(21,'<p>필기노트 입니다.</p>','2024-04-04 00:56:20.392945',0,1),(22,'<p>필기노트 입니다!</p>','2024-04-04 06:41:02.650305',0,4),(23,'<p>안녕하세요</p>','2024-04-06 15:20:23.442289',4,5);
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
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
