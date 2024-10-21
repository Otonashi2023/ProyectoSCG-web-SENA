-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: scg_db
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aprendiz`
--

DROP TABLE IF EXISTS `aprendiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendiz` (
  `id_aprend` bigint NOT NULL AUTO_INCREMENT,
  `restric_medicas` varchar(255) NOT NULL,
  `persona` bigint NOT NULL,
  `ficha` int DEFAULT NULL,
  PRIMARY KEY (`id_aprend`),
  UNIQUE KEY `persona` (`persona`),
  KEY `fk_aprendiz_ficha` (`ficha`),
  CONSTRAINT `fk_aprendiz_ficha` FOREIGN KEY (`ficha`) REFERENCES `ficha` (`id_ficha`),
  CONSTRAINT `fk_aprendiz_persona` FOREIGN KEY (`persona`) REFERENCES `persona` (`id_person`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendiz`
--

LOCK TABLES `aprendiz` WRITE;
/*!40000 ALTER TABLE `aprendiz` DISABLE KEYS */;
INSERT INTO `aprendiz` VALUES (1,'Ninguna',2,6),(2,'Problemas de la rodilla izquierda',4,3),(3,'Ninguna',5,4),(4,'Ninguna',6,2),(5,'Ninguna',7,1),(6,'Asma',8,4),(7,'Ninguna',9,1),(8,'Ninguna',10,6),(9,'Ninguna',11,7),(10,'Ninguna',12,1),(11,'Ninguna',13,2),(12,'Diabetes',14,7),(13,'Alergia',15,1),(14,'Ninguna',16,4),(15,'Ninguna',17,6),(16,'Ninguna',18,1),(17,'Ninguna',19,4),(18,'Ninguna',20,2),(19,'Ninguna',21,6),(20,'Ninguna',22,1),(21,'Ninguna',23,7),(35,'Ninguna',70,3),(36,'Ninguna',71,3),(37,'Ninguna',72,10),(38,'Ninguna',73,10),(44,'Ninguna',79,8),(45,'NA',80,8),(46,'Na',81,8),(49,'NA',84,1),(52,'1',87,1),(53,'Ninguna',90,6);
/*!40000 ALTER TABLE `aprendiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aprendiz_plan`
--

DROP TABLE IF EXISTS `aprendiz_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendiz_plan` (
  `id_aprendiz_plan` bigint NOT NULL AUTO_INCREMENT,
  `inicio` date NOT NULL,
  `finaliza` date NOT NULL,
  `aprendiz` bigint DEFAULT NULL,
  `plan` int DEFAULT NULL,
  PRIMARY KEY (`id_aprendiz_plan`),
  KEY `fk_aprendizplan_aprendiz` (`aprendiz`),
  KEY `fk_aprendizplan_plan` (`plan`),
  CONSTRAINT `fk_aprendizplan_aprendiz` FOREIGN KEY (`aprendiz`) REFERENCES `aprendiz` (`id_aprend`) ON DELETE CASCADE,
  CONSTRAINT `fk_aprendizplan_plan` FOREIGN KEY (`plan`) REFERENCES `plan` (`id_plan`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendiz_plan`
--

LOCK TABLES `aprendiz_plan` WRITE;
/*!40000 ALTER TABLE `aprendiz_plan` DISABLE KEYS */;
INSERT INTO `aprendiz_plan` VALUES (1,'2024-03-07','2024-09-07',1,2),(2,'2024-10-07','2024-10-07',1,1),(16,'2024-10-07','2024-10-13',1,2),(20,'2024-10-10','2024-10-13',1,7),(21,'2024-10-10','2024-10-13',1,8),(22,'2024-10-10','2024-10-13',1,5),(23,'2024-10-10','2024-10-13',1,10),(24,'2024-04-10','2024-10-10',2,2),(25,'2024-10-10','2024-10-13',3,5),(26,'2024-10-10','2025-05-10',4,5),(27,'2024-10-10','2025-05-10',5,5),(28,'2024-10-10','2025-01-10',6,10),(29,'2024-10-13','2024-10-14',1,5),(30,'2024-10-10','2025-04-10',7,6),(31,'2024-10-10','2025-03-10',8,11),(33,'2024-10-10','2024-11-10',9,12),(34,'2024-10-13','2024-10-13',2,1),(35,'2024-10-13','2024-10-14',3,1),(36,'2024-10-13','2025-05-13',10,5),(37,'2024-10-13','2025-01-13',3,1),(38,'2024-09-01','2025-03-03',1,1),(39,'2024-10-13','2024-10-14',2,5),(40,'2024-09-14','2025-05-14',2,7),(41,'2024-10-15','2025-04-15',11,2),(42,'2024-08-18','2024-10-18',12,8);
/*!40000 ALTER TABLE `aprendiz_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencia` (
  `id_asist` bigint NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `aprendiz` bigint DEFAULT NULL,
  PRIMARY KEY (`id_asist`),
  KEY `fk_asistencia_aprendiz` (`aprendiz`),
  CONSTRAINT `fk_asistencia_aprendiz` FOREIGN KEY (`aprendiz`) REFERENCES `aprendiz` (`id_aprend`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=393 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencia`
--

LOCK TABLES `asistencia` WRITE;
/*!40000 ALTER TABLE `asistencia` DISABLE KEYS */;
INSERT INTO `asistencia` VALUES (1,'2024-06-12 16:39:21',1),(2,'2024-07-14 16:30:31',1),(3,'2024-06-12 16:39:21',1),(4,'2024-07-14 16:30:31',2),(5,'2024-06-12 16:39:21',2),(6,'2024-07-14 16:30:31',2),(7,'2024-06-12 16:39:21',3),(8,'2024-07-14 16:30:31',3),(9,'2024-09-29 17:56:31',1),(10,'2024-09-29 17:56:30',1),(11,'2024-09-29 17:58:10',1),(12,'2024-09-29 17:58:10',1),(13,'2024-09-29 17:58:50',1),(14,'2024-09-29 17:58:50',1),(15,'2024-09-29 17:58:50',1),(16,'2024-09-29 18:05:55',2),(17,'2024-09-29 18:05:55',2),(18,'2024-09-29 18:05:55',2),(19,'2024-09-29 18:05:56',2),(20,'2024-09-29 18:06:09',3),(21,'2024-09-29 18:06:30',4),(22,'2024-09-29 18:06:31',4),(23,'2024-09-29 18:10:28',4),(24,'2024-09-29 18:11:50',3),(25,'2024-09-29 18:12:59',2),(26,'2024-09-29 18:39:11',2),(27,'2024-09-29 18:39:11',2),(28,'2024-09-29 18:39:11',2),(29,'2024-09-29 18:39:11',2),(30,'2024-09-29 18:39:11',2),(31,'2024-09-29 18:39:12',2),(32,'2024-09-29 18:39:12',2),(33,'2024-09-29 18:39:12',2),(34,'2024-09-29 18:39:12',2),(35,'2024-09-29 18:39:12',2),(36,'2024-09-29 18:39:12',2),(37,'2024-09-29 18:39:12',2),(38,'2024-09-29 18:40:57',3),(39,'2024-09-29 18:40:57',3),(40,'2024-09-29 18:49:41',3),(41,'2024-09-29 18:49:49',3),(42,'2024-09-29 18:49:50',3),(43,'2024-09-29 18:49:53',3),(44,'2024-09-29 18:49:54',3),(45,'2024-09-29 18:49:58',3),(46,'2024-09-29 18:50:04',3),(47,'2024-09-29 18:50:04',3),(48,'2024-09-29 18:50:38',4),(49,'2024-09-29 18:50:38',4),(50,'2024-09-29 18:50:39',4),(51,'2024-09-29 18:50:39',4),(52,'2024-09-29 18:50:40',4),(53,'2024-09-29 18:50:40',4),(54,'2024-09-29 18:50:42',4),(55,'2024-09-29 18:50:43',4),(56,'2024-09-29 18:50:43',4),(57,'2024-09-29 18:50:43',4),(58,'2024-09-29 18:50:43',4),(59,'2024-09-29 18:50:44',4),(60,'2024-09-29 18:50:44',4),(61,'2024-09-29 18:50:45',4),(62,'2024-09-29 18:50:45',4),(63,'2024-09-29 18:50:45',4),(64,'2024-09-29 18:50:45',4),(65,'2024-09-29 18:50:46',4),(66,'2024-09-29 18:50:46',4),(67,'2024-09-29 18:50:46',4),(68,'2024-09-29 18:50:46',4),(69,'2024-09-29 18:50:47',4),(70,'2024-09-29 18:50:47',4),(71,'2024-09-29 18:50:47',4),(72,'2024-09-29 18:50:47',4),(73,'2024-09-29 18:50:48',4),(74,'2024-09-29 18:50:48',4),(75,'2024-09-29 18:50:49',4),(76,'2024-09-29 18:50:49',4),(77,'2024-09-29 18:50:49',4),(78,'2024-09-29 18:50:49',4),(79,'2024-09-29 18:50:50',4),(80,'2024-09-29 18:50:50',4),(81,'2024-09-29 18:50:50',4),(82,'2024-09-29 18:50:50',4),(83,'2024-09-29 18:50:51',4),(84,'2024-09-29 18:50:51',4),(85,'2024-09-29 18:50:51',4),(86,'2024-09-29 18:50:51',4),(87,'2024-09-29 18:50:52',4),(88,'2024-09-29 18:50:52',4),(89,'2024-09-29 18:50:52',4),(90,'2024-09-29 18:50:53',4),(91,'2024-09-29 18:50:53',4),(92,'2024-09-29 18:50:53',4),(93,'2024-09-29 18:50:54',4),(94,'2024-09-29 18:50:54',4),(95,'2024-09-29 18:50:54',4),(96,'2024-09-29 18:50:54',4),(97,'2024-09-29 18:50:55',4),(98,'2024-09-29 18:50:55',4),(99,'2024-09-29 18:50:55',4),(100,'2024-09-29 18:50:55',4),(101,'2024-09-29 18:50:56',4),(102,'2024-09-29 18:50:56',4),(103,'2024-09-29 18:50:56',4),(104,'2024-09-29 18:50:56',4),(105,'2024-09-29 18:50:57',4),(106,'2024-09-29 18:50:57',4),(107,'2024-09-29 19:14:18',2),(108,'2024-09-29 19:14:33',2),(109,'2024-09-29 19:14:42',2),(110,'2024-09-29 19:14:49',2),(111,'2024-09-29 19:15:14',2),(112,'2024-09-29 19:16:40',2),(113,'2024-09-29 19:16:44',2),(114,'2024-09-29 19:16:49',2),(115,'2024-09-29 19:16:54',2),(116,'2024-09-29 19:16:59',2),(117,'2024-09-29 19:17:05',2),(118,'2024-09-29 19:17:09',2),(119,'2024-09-29 19:17:15',2),(120,'2024-09-29 19:17:22',2),(121,'2024-09-29 19:17:27',2),(122,'2024-09-29 19:17:33',2),(123,'2024-09-29 19:17:40',2),(124,'2024-09-29 19:17:46',2),(125,'2024-09-29 19:17:53',2),(126,'2024-09-29 19:17:59',2),(127,'2024-09-29 19:18:31',2),(128,'2024-09-29 19:18:37',2),(129,'2024-09-29 19:18:50',2),(130,'2024-09-29 19:18:58',2),(131,'2024-09-29 19:19:04',2),(132,'2024-09-29 19:19:14',2),(133,'2024-09-29 19:19:21',2),(134,'2024-09-29 19:19:29',2),(135,'2024-09-29 19:19:34',2),(136,'2024-09-29 19:19:43',2),(137,'2024-09-29 19:19:55',2),(138,'2024-09-29 19:20:11',2),(139,'2024-09-29 19:20:15',2),(140,'2024-09-29 19:20:20',2),(141,'2024-09-29 19:20:24',2),(142,'2024-09-29 19:20:32',2),(143,'2024-09-29 19:20:44',2),(144,'2024-09-29 19:20:49',2),(145,'2024-09-29 19:20:54',2),(146,'2024-09-29 19:20:59',2),(147,'2024-09-29 19:21:04',2),(148,'2024-09-29 19:21:09',2),(149,'2024-09-29 19:21:14',2),(150,'2024-09-29 19:21:18',2),(151,'2024-09-29 19:21:23',2),(152,'2024-09-29 19:21:33',2),(153,'2024-09-29 19:21:38',2),(154,'2024-09-29 19:21:57',2),(155,'2024-09-29 19:22:01',2),(156,'2024-09-29 19:22:06',2),(157,'2024-09-29 19:22:11',2),(158,'2024-09-29 19:22:15',2),(159,'2024-09-29 19:22:20',2),(160,'2024-09-29 19:22:24',2),(161,'2024-09-29 19:22:28',2),(162,'2024-09-29 19:22:31',2),(163,'2024-09-29 19:22:36',2),(164,'2024-09-29 19:22:39',2),(165,'2024-09-29 19:22:43',2),(166,'2024-09-29 19:22:47',2),(167,'2024-09-29 19:22:50',2),(168,'2024-09-29 19:22:53',2),(169,'2024-09-29 19:22:57',2),(170,'2024-09-29 19:23:00',2),(171,'2024-09-29 19:23:05',2),(172,'2024-09-29 19:23:11',2),(173,'2024-09-29 19:23:15',2),(174,'2024-09-29 19:23:19',2),(175,'2024-09-29 19:23:24',2),(176,'2024-09-29 19:23:27',2),(177,'2024-09-29 19:23:31',2),(178,'2024-09-29 19:23:34',2),(179,'2024-09-29 19:23:38',2),(180,'2024-09-29 19:23:41',2),(181,'2024-09-29 19:23:47',2),(182,'2024-09-29 19:23:51',2),(183,'2024-09-29 19:23:56',2),(184,'2024-09-29 19:24:01',2),(185,'2024-09-29 19:24:05',2),(186,'2024-09-29 19:24:09',2),(187,'2024-09-29 19:24:15',2),(188,'2024-09-29 19:24:19',2),(189,'2024-09-29 19:24:22',2),(190,'2024-09-29 19:24:27',2),(191,'2024-09-29 19:24:31',2),(192,'2024-09-29 19:24:35',2),(193,'2024-09-29 19:24:40',2),(194,'2024-09-29 19:24:43',2),(195,'2024-09-29 19:24:49',2),(196,'2024-09-29 19:24:52',2),(197,'2024-09-29 19:25:00',2),(198,'2024-09-29 19:25:10',2),(199,'2024-09-29 19:25:16',2),(200,'2024-09-29 19:25:19',2),(201,'2024-09-29 19:25:23',2),(202,'2024-09-29 19:25:27',2),(203,'2024-09-29 19:25:31',2),(204,'2024-09-29 19:25:35',2),(205,'2024-09-29 19:25:39',2),(206,'2024-09-29 19:25:43',2),(207,'2024-09-29 19:25:47',2),(208,'2024-09-29 19:25:51',2),(209,'2024-09-29 19:25:54',2),(210,'2024-09-29 19:26:00',2),(211,'2024-09-29 19:26:04',2),(212,'2024-09-29 19:26:08',2),(213,'2024-09-29 19:26:13',2),(214,'2024-09-29 19:26:17',2),(215,'2024-09-29 19:26:21',2),(216,'2024-09-29 19:26:24',2),(217,'2024-09-29 19:26:28',2),(218,'2024-09-29 19:26:32',2),(219,'2024-09-29 19:26:39',2),(220,'2024-09-29 19:26:42',2),(221,'2024-09-29 19:26:47',2),(222,'2024-09-29 19:26:53',2),(223,'2024-09-29 19:26:57',2),(224,'2024-09-29 19:27:01',2),(225,'2024-09-29 19:27:05',2),(226,'2024-09-29 19:27:10',2),(227,'2024-09-29 19:27:15',2),(228,'2024-09-29 19:27:18',2),(229,'2024-09-29 19:27:24',2),(230,'2024-09-29 19:27:27',2),(231,'2024-09-29 19:27:31',2),(232,'2024-09-29 19:27:35',2),(233,'2024-09-29 19:27:39',2),(234,'2024-09-29 19:27:42',2),(235,'2024-09-29 19:27:46',2),(236,'2024-09-29 19:27:50',2),(237,'2024-09-29 19:27:53',2),(238,'2024-09-29 19:27:57',2),(239,'2024-09-29 19:28:01',2),(240,'2024-09-29 19:28:05',2),(241,'2024-09-29 19:28:08',2),(242,'2024-09-29 19:32:27',1),(243,'2024-09-29 19:33:22',1),(244,'2024-09-29 19:33:30',1),(245,'2024-09-29 19:33:34',1),(246,'2024-09-29 19:33:38',1),(247,'2024-09-29 19:33:47',1),(248,'2024-09-29 19:33:58',1),(249,'2024-09-29 19:35:24',1),(250,'2024-09-29 19:35:32',1),(251,'2024-09-29 19:35:41',1),(252,'2024-09-29 19:35:52',1),(253,'2024-09-29 19:36:21',1),(254,'2024-09-29 19:36:42',1),(255,'2024-09-29 19:37:05',1),(256,'2024-09-29 19:37:43',1),(257,'2024-09-29 19:38:50',1),(258,'2024-09-29 19:39:02',1),(259,'2024-09-29 19:39:06',1),(260,'2024-09-29 19:39:15',1),(261,'2024-09-29 19:39:19',1),(262,'2024-09-29 19:40:52',4),(263,'2024-09-29 19:41:02',3),(264,'2024-09-29 19:41:14',4),(265,'2024-09-29 19:41:22',3),(266,'2024-09-29 19:41:29',4),(267,'2024-09-29 19:41:35',3),(268,'2024-09-29 19:41:41',4),(269,'2024-09-29 19:41:45',3),(270,'2024-09-29 19:41:49',4),(271,'2024-09-29 19:42:00',2),(272,'2024-09-29 19:42:08',2),(273,'2024-09-29 19:42:12',3),(274,'2024-09-29 19:42:15',4),(275,'2024-09-29 19:42:20',3),(276,'2024-09-29 19:42:24',2),(277,'2024-09-29 19:42:28',3),(278,'2024-09-29 19:42:33',4),(279,'2024-09-29 20:00:14',1),(280,'2024-09-29 20:00:21',1),(281,'2024-09-29 20:00:28',1),(282,'2024-09-29 20:00:32',1),(283,'2024-09-29 20:00:37',1),(284,'2024-09-29 20:00:51',1),(285,'2024-09-29 20:00:54',1),(286,'2024-09-29 20:00:59',1),(287,'2024-09-29 20:01:03',1),(288,'2024-09-29 20:01:06',1),(289,'2024-09-29 20:01:10',1),(290,'2024-09-29 20:01:13',1),(291,'2024-09-29 20:01:17',1),(292,'2024-09-29 20:01:21',1),(293,'2024-09-29 20:01:27',1),(294,'2024-09-29 20:01:32',1),(295,'2024-09-29 20:01:51',1),(296,'2024-09-29 20:01:55',1),(297,'2024-09-29 20:01:58',1),(298,'2024-09-29 20:02:02',1),(299,'2024-09-29 20:02:06',1),(300,'2024-09-29 20:02:09',1),(301,'2024-09-29 20:02:13',1),(302,'2024-09-29 20:02:16',1),(303,'2024-09-29 20:02:19',1),(304,'2024-09-29 20:04:02',1),(305,'2024-09-29 20:04:06',1),(306,'2024-09-29 20:04:26',1),(307,'2024-09-29 20:04:31',1),(308,'2024-09-29 20:04:35',1),(309,'2024-09-29 20:04:38',1),(310,'2024-09-29 20:05:37',1),(311,'2024-09-29 20:05:41',1),(312,'2024-09-29 20:05:44',1),(313,'2024-09-29 20:05:47',1),(314,'2024-09-29 20:07:30',1),(315,'2024-09-29 20:07:34',1),(316,'2024-09-29 20:07:38',1),(317,'2024-09-29 20:11:22',1),(318,'2024-09-29 20:12:04',1),(319,'2024-09-29 20:12:06',1),(320,'2024-09-29 20:12:09',1),(321,'2024-09-29 20:12:12',1),(322,'2024-09-29 20:12:14',1),(323,'2024-09-29 20:12:16',1),(324,'2024-09-29 20:12:19',1),(325,'2024-09-29 20:12:21',1),(326,'2024-09-29 20:12:23',1),(327,'2024-09-29 20:12:26',1),(328,'2024-09-29 20:12:28',1),(329,'2024-09-29 20:12:30',1),(330,'2024-09-29 20:12:33',1),(331,'2024-09-29 20:12:35',1),(332,'2024-09-29 20:12:37',1),(333,'2024-09-29 20:12:40',1),(334,'2024-09-29 20:12:42',1),(335,'2024-09-29 20:12:44',1),(336,'2024-09-29 20:12:47',1),(337,'2024-09-29 20:17:38',1),(338,'2024-09-29 20:17:46',1),(339,'2024-09-29 20:17:49',1),(340,'2024-09-29 20:17:51',1),(341,'2024-09-29 20:17:53',1),(342,'2024-09-29 20:17:56',1),(343,'2024-09-29 20:17:58',1),(344,'2024-09-29 20:18:00',1),(345,'2024-09-29 20:18:02',1),(346,'2024-09-29 20:41:16',1),(347,'2024-09-29 20:41:18',1),(348,'2024-09-29 20:41:21',1),(349,'2024-09-29 20:41:23',1),(350,'2024-09-29 20:41:27',1),(351,'2024-09-29 20:41:30',1),(352,'2024-09-29 20:41:32',1),(353,'2024-09-29 20:41:35',1),(354,'2024-09-29 20:41:38',1),(355,'2024-09-29 20:41:41',1),(356,'2024-09-29 20:41:43',1),(357,'2024-09-29 20:41:47',1),(358,'2024-09-29 20:41:49',1),(359,'2024-09-29 20:41:52',1),(360,'2024-09-29 20:41:54',1),(361,'2024-09-29 20:41:58',1),(362,'2024-09-29 20:42:01',1),(363,'2024-09-29 20:42:04',1),(364,'2024-09-29 20:42:07',1),(365,'2024-09-29 20:42:09',1),(366,'2024-09-29 20:42:11',1),(367,'2024-09-29 20:42:13',1),(368,'2024-09-29 20:42:16',1),(369,'2024-09-29 20:42:19',1),(370,'2024-09-29 20:42:21',1),(371,'2024-09-29 20:42:24',1),(372,'2024-09-29 20:42:28',1),(373,'2024-09-29 20:42:31',1),(374,'2024-09-29 20:42:33',1),(375,'2024-09-29 20:42:36',1),(376,'2024-09-29 20:42:38',1),(377,'2024-09-29 20:42:40',1),(378,'2024-09-29 20:42:43',1),(379,'2024-09-29 20:42:47',1),(380,'2024-09-29 20:42:49',1),(381,'2024-09-29 20:42:52',1),(382,'2024-09-29 20:42:54',1),(383,'2024-09-29 20:42:57',1),(384,'2024-09-29 20:42:59',1),(385,'2024-10-17 13:08:04',1),(386,'2024-10-17 13:08:07',1),(387,'2024-10-17 13:08:09',1),(388,'2024-10-17 13:08:11',1),(389,'2024-10-17 13:08:14',1),(390,'2024-10-17 13:08:16',1),(391,'2024-10-17 13:08:19',1),(392,'2024-10-17 13:08:21',1);
/*!40000 ALTER TABLE `asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `id_cargo` int NOT NULL AUTO_INCREMENT,
  `nom_cargo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (1,'Instructor'),(2,'Medico'),(3,'Administrador'),(4,'Instructora'),(5,'secretario\r'),(6,'docente\r'),(7,'encargado\r'),(8,'nutricionista\r'),(9,'psicologo\r'),(10,'fisioteareputa\r'),(11,'enfermera\r'),(12,'ingeniero\r'),(13,'entrenador\r'),(14,'limpieza\r'),(15,'Director técnico\r'),(16,'Mantenimiento\r'),(17,'Director gerente\r'),(18,'Instructor de actividades\r');
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejercicio`
--

DROP TABLE IF EXISTS `ejercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ejercicio` (
  `id_ejercicio` int NOT NULL AUTO_INCREMENT,
  `series` int NOT NULL,
  `repeticiones` int NOT NULL,
  `descanso` int NOT NULL,
  `nombre_ejercicio` int NOT NULL,
  `tipo_ejercicio` int NOT NULL,
  `musculo` int NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_ejercicio`),
  KEY `fk_ejercicio_nombreejercicio` (`nombre_ejercicio`),
  KEY `fk_ejercicio_tipoejercicio` (`tipo_ejercicio`),
  KEY `fk_ejercicio_musculo` (`musculo`),
  CONSTRAINT `fk_ejercicio_musculo` FOREIGN KEY (`musculo`) REFERENCES `musculo` (`id_musculo`),
  CONSTRAINT `fk_ejercicio_nombreejercicio` FOREIGN KEY (`nombre_ejercicio`) REFERENCES `nombre_ejercicio` (`id_nom_ejerc`),
  CONSTRAINT `fk_ejercicio_tipoejercicio` FOREIGN KEY (`tipo_ejercicio`) REFERENCES `tipo_ejercicio` (`id_tipo_ejerc`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejercicio`
--

LOCK TABLES `ejercicio` WRITE;
/*!40000 ALTER TABLE `ejercicio` DISABLE KEYS */;
INSERT INTO `ejercicio` VALUES (1,4,8,900,1,1,1,NULL),(2,6,12,30,7,2,2,'/imagenes/569ee2b4-2561-4be6-900a-05948263ff1d_1728347357615.png'),(3,10,15,21,5,3,6,NULL),(4,4,8,7,1,1,5,NULL),(5,1,2,10,8,5,7,NULL),(7,2,2,20,4,5,3,'/imagenes/0ab95eff-13c6-4e61-9285-f39d1245da62_1728367671573.png'),(9,4,4,2,9,1,4,NULL),(10,4,4,2,10,2,1,'/imagenes/1627af0f-2053-4650-9e0c-7a01e1388006_1728367377149.png'),(11,4,4,2,11,3,3,NULL),(12,44,4,4,1,5,2,'/imagenes/73bf94c8-f8fb-494b-b566-705ffec5ee84_1729390192275.png');
/*!40000 ALTER TABLE `ejercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ficha`
--

DROP TABLE IF EXISTS `ficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ficha` (
  `id_ficha` int NOT NULL AUTO_INCREMENT,
  `numero` bigint NOT NULL,
  `formacion` int NOT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `fk_ficha_formacion` (`formacion`),
  CONSTRAINT `fk_ficha_formacion` FOREIGN KEY (`formacion`) REFERENCES `formacion` (`id_formacion`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ficha`
--

LOCK TABLES `ficha` WRITE;
/*!40000 ALTER TABLE `ficha` DISABLE KEYS */;
INSERT INTO `ficha` VALUES (1,2521999,1),(2,2522000,1),(3,2522001,1),(4,2522002,1),(5,2522004,2),(6,2522010,3),(7,2522005,4),(8,2522007,5),(9,2522006,6),(10,2522003,7),(11,2522009,8),(12,2522011,10),(13,2522008,11),(14,2522006,2),(15,2522012,9);
/*!40000 ALTER TABLE `ficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichaantropo`
--

DROP TABLE IF EXISTS `fichaantropo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichaantropo` (
  `id_fich_ant` bigint NOT NULL AUTO_INCREMENT,
  `num_control` bigint NOT NULL,
  `fecha_toma` date DEFAULT NULL,
  `altura` float NOT NULL,
  `peso` float NOT NULL,
  `imc` float NOT NULL,
  `personal` bigint NOT NULL,
  `genero` int NOT NULL,
  `aprendiz` bigint DEFAULT NULL,
  PRIMARY KEY (`id_fich_ant`),
  KEY `fk_fichaAntropo_personal` (`personal`),
  KEY `fk_fichaAntropo_genero` (`genero`),
  KEY `fk_fichaAntropo_aprendiz` (`aprendiz`),
  CONSTRAINT `fk_fichaAntropo_aprendiz` FOREIGN KEY (`aprendiz`) REFERENCES `aprendiz` (`id_aprend`) ON DELETE CASCADE,
  CONSTRAINT `fk_fichaAntropo_genero` FOREIGN KEY (`genero`) REFERENCES `genero` (`id_genero`),
  CONSTRAINT `fk_fichaAntropo_personal` FOREIGN KEY (`personal`) REFERENCES `personal` (`id_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichaantropo`
--

LOCK TABLES `fichaantropo` WRITE;
/*!40000 ALTER TABLE `fichaantropo` DISABLE KEYS */;
INSERT INTO `fichaantropo` VALUES (1,1,'2024-06-09',1.55,61,25.39,1,2,1),(2,1,'2024-10-05',186.13,51.66,23.84,1,1,6),(3,1,'2024-06-23',166.39,99.03,24,2,2,7),(4,1,'2024-07-15',189.74,93.23,18.3,1,1,8),(5,1,'2024-01-08',166.11,84.5,29.99,1,2,9),(6,1,'2024-05-27',166.92,89.16,25.33,2,1,10),(7,1,'2024-02-07',188.24,58.38,21.55,2,2,11),(8,1,'2024-11-06',160.42,51.88,18.11,1,1,12),(9,1,'2024-08-18',174.1,76.16,28.52,1,2,13),(10,1,'2024-05-31',199.83,90.03,27.57,1,1,14),(11,1,'2024-07-25',158.49,99.61,18.68,2,2,15),(12,1,'2024-06-06',152.19,59.72,28.44,2,1,16),(13,1,'2024-12-08',194.67,64.62,21.54,2,2,17),(14,1,'2024-05-16',176.4,88.9,28.38,1,1,18),(15,1,'2024-06-29',171.84,71.92,18.41,1,2,19),(16,1,'2024-08-07',155.69,84.74,26.32,1,1,20),(17,1,'2024-05-08',150.19,97.46,21.6,1,2,21),(18,1,'2024-05-22',170.69,61.53,26.11,2,1,2),(19,2,'2024-07-20',1.63,59.43,22.37,1,2,1),(20,2,'2024-06-14',157.26,94.53,23.93,1,1,2),(24,1,'2024-06-14',157.26,94.53,23.93,1,1,4),(25,1,'2024-08-23',172.97,63,24.36,2,2,5),(36,1,'2024-09-27',1.6,63,24.61,4,2,44),(37,1,'2024-09-27',1.6,56,21.87,2,2,46);
/*!40000 ALTER TABLE `fichaantropo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formacion`
--

DROP TABLE IF EXISTS `formacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formacion` (
  `id_formacion` int NOT NULL AUTO_INCREMENT,
  `nom_formacion` varchar(70) NOT NULL,
  PRIMARY KEY (`id_formacion`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formacion`
--

LOCK TABLES `formacion` WRITE;
/*!40000 ALTER TABLE `formacion` DISABLE KEYS */;
INSERT INTO `formacion` VALUES (1,'Tecnologia en Analisis y Desarrollo de Software'),(2,'Gestión Administrativa\r'),(3,'Seguridad Ocupacional\r'),(4,'Análisis y Desarrollo de Sistemas de Información\r'),(5,'Electricidad Industrial\r'),(6,'Producción Multimedia\r'),(7,'Contabilidad y Finanzas\r'),(8,'Mantenimiento de Equipos de Cómputo\r'),(9,'Diseño de Moda\r'),(10,'Gestión del Talento Humano\r'),(11,'Soldadura y Ensamble de Productos Metálicos\r');
/*!40000 ALTER TABLE `formacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `nom_genero` varchar(45) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (1,'masculino'),(2,'femenino');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musculo`
--

DROP TABLE IF EXISTS `musculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musculo` (
  `id_musculo` int NOT NULL AUTO_INCREMENT,
  `nom_musculo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_musculo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musculo`
--

LOCK TABLES `musculo` WRITE;
/*!40000 ALTER TABLE `musculo` DISABLE KEYS */;
INSERT INTO `musculo` VALUES (1,'abdominal'),(2,'espalda'),(3,'pectoral'),(4,'bipces'),(5,'tripces'),(6,'muslo'),(7,'XD'),(8,'XDXD');
/*!40000 ALTER TABLE `musculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nombre_ejercicio`
--

DROP TABLE IF EXISTS `nombre_ejercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nombre_ejercicio` (
  `id_nom_ejerc` int NOT NULL AUTO_INCREMENT,
  `nom_ejerc` varchar(45) NOT NULL,
  PRIMARY KEY (`id_nom_ejerc`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nombre_ejercicio`
--

LOCK TABLES `nombre_ejercicio` WRITE;
/*!40000 ALTER TABLE `nombre_ejercicio` DISABLE KEYS */;
INSERT INTO `nombre_ejercicio` VALUES (1,'abdominales'),(2,'barra en supina'),(3,'barra en pronadas'),(4,'peso muerto'),(5,'sentadillas'),(6,'levantamiento de pesas'),(7,'flexiones de pecho'),(8,'hola'),(9,'test ejercicio1'),(10,'test ejercicio2'),(11,'test ejercicio3');
/*!40000 ALTER TABLE `nombre_ejercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perimetros`
--

DROP TABLE IF EXISTS `perimetros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perimetros` (
  `id_perimetros` bigint NOT NULL AUTO_INCREMENT,
  `cabeza` float NOT NULL,
  `cuello` float NOT NULL,
  `brazo_relax` float NOT NULL,
  `brazo_tensionado` float NOT NULL,
  `antebrazo` float NOT NULL,
  `muñeca` float NOT NULL,
  `torax` float NOT NULL,
  `cintura` float NOT NULL,
  `cadera` float NOT NULL,
  `muslo_max` float NOT NULL,
  `muslo_min` float NOT NULL,
  `pantorrilla_max` float NOT NULL,
  `pantorrilla_min` float NOT NULL,
  `fichaantropo` bigint NOT NULL,
  PRIMARY KEY (`id_perimetros`),
  UNIQUE KEY `fichaantropo` (`fichaantropo`),
  CONSTRAINT `fk_perimetros_fichaAntropo` FOREIGN KEY (`fichaantropo`) REFERENCES `fichaantropo` (`id_fich_ant`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perimetros`
--

LOCK TABLES `perimetros` WRITE;
/*!40000 ALTER TABLE `perimetros` DISABLE KEYS */;
INSERT INTO `perimetros` VALUES (1,55,30,27,28,22,14,85.5,67,90,54,52,32,20,1),(2,50.49,34.29,25.91,34.77,20.46,17.51,88.62,74.02,97.27,45.48,39.9,30.04,24.33,2),(3,55.33,37.29,25.23,25.19,20.91,10.16,74.5,78.31,87.95,46.57,33.19,33.72,23.27,3),(4,53.51,33.47,28.3,33.15,17.68,14.83,78.52,71.68,89.75,42.25,38.87,37.41,21.9,4),(5,55.34,38.75,24.58,34.03,21.8,16.24,81.45,63.5,97.23,46.94,32.89,39.24,27.38,5),(6,58.76,30.27,21.15,27.02,16.83,19.11,79.61,61.49,99.81,42.69,32.86,35.59,20.17,6),(7,58.6,37.64,26.65,26.55,20.22,11.77,85.54,68.12,95.64,42.28,31.83,34.33,29.67,7),(8,55.36,35.58,25.16,29.71,21.71,19.68,84.75,70.37,80.3,47.85,33.84,30.67,21.76,8),(9,56.08,31.3,25.12,30.53,24.72,14.02,77.45,76.76,93.68,44.04,39.83,34.12,26.74,9),(10,54.21,38.11,25,34.38,20.54,18.61,82.57,66.14,95.51,47.4,39.03,36.83,23.42,10),(11,59.19,35.33,27.58,29.33,24.15,12.12,81.15,60.62,95.46,47.89,31.68,37.57,27.16,11),(12,50.77,39.17,29.88,31.13,24.08,10.79,74.4,70.05,99.23,49.7,36.93,34.53,26.51,12),(13,54.35,32.52,23.31,31.14,23.36,15.52,88.9,64.23,99.77,49.99,35.71,31.73,28.23,13),(14,56.56,31.44,22.68,25.94,24.57,16.12,84.77,79.28,90.04,47.05,35.2,35.54,29.24,14),(15,51.07,39.31,20.68,33.68,18.75,19.27,77.59,66.71,83.23,46.74,39.42,38.51,24.37,15),(16,56.9,36.14,24.96,29.38,16.36,13.53,85.56,76.98,97.43,49.59,30.54,37.05,20.86,16),(17,52.73,35.57,24.3,27.33,24.57,12.15,76.2,71.36,87.74,44.57,32.91,37.9,25.25,17),(18,54.22,35.68,22.87,29.33,22.55,14.21,84.78,60.86,99.13,42.9,34.15,32.15,23.15,18),(19,55,30.51,24.93,29.76,22.24,15.88,87.35,70.99,98.73,48.2,31.25,33.77,24.05,19),(20,53.37,31.12,22.62,26.27,23.1,12.25,72.25,67.03,82.94,42.32,33.22,37.4,25.64,20),(24,53.37,31.12,22.62,26.27,23.1,12.25,72.25,67.03,82.94,42.32,33.22,37.4,25.64,24),(25,51.04,35.61,27.1,26.42,23.1,13.99,88.94,64.67,81,48.4,38.34,31.71,22.11,25),(36,22,22,22,22,22,22,22,22,22,22,22,22,22,36),(37,23,23,23,23,23,23,23,23,23,23,23,23,23,37);
/*!40000 ALTER TABLE `perimetros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id_person` bigint NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `cedula` bigint NOT NULL,
  `celular` bigint NOT NULL,
  `nom_contacto` varchar(45) NOT NULL,
  `celular_alt` bigint NOT NULL,
  `email` varchar(45) NOT NULL,
  `tipo_documento` int NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_person`),
  UNIQUE KEY `cedula` (`cedula`),
  KEY `fk_persona_tipodocumento` (`tipo_documento`),
  CONSTRAINT `fk_persona_tipodocumento` FOREIGN KEY (`tipo_documento`) REFERENCES `tipo_documento` (`id_tipo_docum`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'Diana','Acevedo Martinez',607901669,315683455,'Carlos Orozco',321409264,'kaitocrv2@gmail.com',1,'/imagenes/71e67e96-5820-4282-be17-b03c8c16ceac_1727711987041.jpeg'),(2,'Laura Nataly','Giraldo Rodriguez',1020123456,31012312345,'Liliana Rodriguez',3203456789,'kaitocrv21@gmail.com',2,'/imagenes/90490621-05e5-4ab7-a4d5-ee445892bb5f_1727606874813.png'),(3,'David Eduardo','Florez Gomez',803343451,3166483587,'Sofia Andrade',3178764803,'deflorez1@sena.edu.co',1,'/imagenes/4e4c69ef-e88f-4dfe-8132-1267f42bf832_1727639722739.jpg'),(4,'liliana','Zapata',1120127435,31112312327,'Liliana Castro',321640472,'liza232@gmail.com',1,'/imagenes/5b19268e-1109-4b73-9709-f971fee4366c_1727602461165.png'),(5,'Carlos','Cuervo',113324335,316683426,'Fredy Fandiño',323980777,'ca342@gmail.com',1,'/imagenes/a49e015d-3544-47e3-b7cf-50529189b989_1727608727097.png'),(6,'MATEO','GARCIA',3500167860,3001234567,'NA',123,'mateogarcia@test.com',1,'/imagenes/db7cbed8-25db-4338-adc7-868a9b34e560_1727608830640.png'),(7,'SOFIA','MARTINEZ',1134563692,3102345678,'NA',123,'sofiamartinez@test.com',1,'/imagenes/a0cb7e14-d194-4620-af79-6df5cac58954_1727609213312.png'),(8,'SEBASTIAN','LOPEZ',7142825452,3203456789,'NA',123,'sebastianlopez@test.com',2,'/imagenes/14bca3a3-baf1-45eb-98b0-79ed70bc0777_1727750465661.png'),(9,'VALENTINA','HERNANDEZ',1748326936,3004567890,'NA',123,'valentinahernandez@test.com',4,NULL),(10,'DIEGO','GONZALEZ',1339740552,3105678901,'NA',123,'diegogonzalez@test.com',3,NULL),(11,'CAMILA','RODRIGUEZ',9581983100,3206789012,'NA',123,'camilarodriguez@test.com',2,NULL),(12,'LUCAS','PEREZ',1038714722,3007890123,'NA',123,'lucasperez@test.com',3,NULL),(13,'ISABELLA','SANCHEZ',9626296174,3108901234,'NA',123,'isabellasanchez@test.com',2,NULL),(14,'MARTIN','RAMIREZ',336908249,3209012345,'NA',123,'martinramirez@test.com',3,NULL),(15,'GABRIELA','CRUZ',3055715439,3000123456,'NA',123,'gabrielacruz@test.com',4,NULL),(16,'DAMIAN','FLORES',7236119587,3101234567,'NA',123,'damianflores@test.com',4,NULL),(17,'MARIANA','TORRES',9807737387,3202345678,'NA',123,'marianatorres@test.com',2,NULL),(18,'JOAQUIN','VASQUEZ',5332824828,3003456789,'NA',123,'joaquinvasquez@test.com',2,NULL),(19,'VICTORIA','RIVERA',7524600497,3104567890,'NA',123,'victoriarivera@test.com',3,NULL),(20,'EMILIO','MORALES',1377140346,3205678901,'NA',123,'emiliomorales@test.com',1,NULL),(21,'LUCIA','ORTIZ',4190296088,3006789012,'NA',123,'luciaortiz@test.com',1,NULL),(22,'DANIEL','GUERRERO',1750729970,3107890123,'NA',123,'danielguerrero@test.com',1,NULL),(23,'RENATA','MENDOZA',6235683362,3208901234,'NA',123,'renatamendoza@test.com',1,NULL),(24,'SANTIAGO','RIOS',5725081353,3009012345,'NA',123,'santiagorios@test.com',2,NULL),(25,'FERNANDA','FERNANDEZ',3399153342,3100123456,'NA',123,'fernandafernandez@test.com',1,NULL),(26,'Paula andrea','Ruiz bedoya',42160943,3159844893,'carmenza ruiz',3134214113,'Ruizpaula659@gmail.com',1,'/imagenes/bfb55eee-cafe-48ae-8330-bc5cd4a3b5cc_1727632403124.jpg'),(27,'Alejandra','Morales',108956432,3163943643,'pedro morales',3119890467,'Alejamorales89m@gmail.com',1,'/imagenes/ddf3a7a4-6ac1-49a9-a4d5-ee684d8d070f_1727636744528.png'),(28,'Isabella','Martinez',1089763241,3181113459,'Alejandro martinez',3124745962,'Isaruimartinez234@gmail.com',3,'/imagenes/e7574416-d840-43d0-8bb2-fc779b1d5506_1727637476677.png'),(29,'Camilo','cardona',1004667718,3203456645,'martha correa',3113900532,'Camilo@gmail.com',1,NULL),(30,'Andres','Bedoya',100041282,3172341685,'leonisa alzate',3133783221,'Bedoya567andres@gmail.com',1,NULL),(31,'Sara','Ruiz',594592632,3223452925,'camila gomez',3205594692,'123456sara@gmail.com',1,NULL),(32,'Lucia','Manrique',109872341,3153483443,'satalina santana',3204783259,'Luciamanrique234@gmail.com',1,NULL),(33,'Salome','Correa',100477679,3213482367,'pedro ramirez',3105534218,'Salocorrea@gmail.com',1,NULL),(34,'Juan','Duque',109876436,3195768594,'camilo cardina',3145678932,'Juanduqe4444@gmail.com',1,NULL),(35,'Isaac','Carvajal',100001238,3172835612,'alejandra ramirez',3212609834,'Isaaccarvajal8@gmail.com',3,NULL),(36,'Vanessa','Cardona',108345674,3281341211,'manuela zuluaga',3209765423,'vaanessaardoan56@gmail.com',3,'/imagenes/9ff757bd-16de-4588-9106-de11bf73a0f7_1727640647732.png'),(37,'Martin','Echevrry',102840028,3222224282,'maria paz salazar',3124556788,'Zeusteamo@gmail.com',3,NULL),(38,'Carolina','Arana',100089733,3258235444,'juan jose aleman',3104031533,'Carolina.m234@gmail.com',1,NULL),(39,'Catalina','Restrepo',102678321,3152382323,'tatiana agudelo',3109876342,'Catalinar234@gmail.com',3,NULL),(41,'Angelica','Marcial',100467905,3123231445,'carolina gallego',3104567890,'Angelica@gmail.com',1,'/imagenes/134b491f-f0d4-4e2d-acae-9f2859f2f4df_1728012526255.png'),(70,'Yuzuru','Otonashi',80720590,31723341333,'Madre',3202874748,'kaito222@gmail.com',1,NULL),(71,'Yuzuru','Otonashi',807205901,31723341333,'Madre',3202874748,'kaito22211@gmail.com',1,NULL),(72,'Yuzuru','Otonashi',35435345,34534345,'madre',435345,'k@gmail.com',3,NULL),(73,'Yuzuru','Otonashi',3543534544,34534345,'madre',435345,'k4@gmail.com',3,NULL),(79,'Akari','Giraldo Rodriguez',123,31012312345,'Liliana Rodriguez',3203456789,'kai@gmail.com',3,NULL),(80,'Akari2','XD',456,456,'XD',456,'kafffi@gmail.com',2,NULL),(81,'Akari3','XD',6666775,567,'Sofia Andrade',567,'kai6765@gmail.com',4,NULL),(84,'test1','test2',1113332224,123,'XD',123,'t4@gmail.com',1,'/imagenes/6be8b715-491e-4499-851c-698aa6d8cdbd_1727596039770.png'),(87,'1','1',1,1,'1',1,'1@gmail.com',1,'/imagenes/f8befcdb-8687-44ea-8e22-1ddb9fae224c_1727626567885.jpg'),(89,'Paula andrea','Ruiz bedoya',421609434545,3159844893,'carmenza ruiz',3134214113,'Ruizpaula6454559@gmail.com',1,'/imagenes/2579004f-b1af-4ab6-a0ad-c40e6005a3f2_1727629552382.jpeg'),(90,'Laura Nataly','Giraldo Rodriguez',102012345612117,31012312345,'Liliana Rodriguez',3203456789,'kaitocrv212121@gmail.com',2,'/imagenes/90490621-05e5-4ab7-a4d5-ee445892bb5f_1727606874813.png');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal` (
  `id_personal` bigint NOT NULL AUTO_INCREMENT,
  `persona` bigint NOT NULL,
  `cargo` int NOT NULL,
  PRIMARY KEY (`id_personal`),
  UNIQUE KEY `persona` (`persona`),
  KEY `fk_personal_cargo` (`cargo`),
  CONSTRAINT `fk_personal_cargo` FOREIGN KEY (`cargo`) REFERENCES `cargo` (`id_cargo`),
  CONSTRAINT `fk_personal_persona` FOREIGN KEY (`persona`) REFERENCES `persona` (`id_person`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal`
--

LOCK TABLES `personal` WRITE;
/*!40000 ALTER TABLE `personal` DISABLE KEYS */;
INSERT INTO `personal` VALUES (1,1,4),(2,3,1),(3,26,5),(4,27,6),(5,28,7),(6,29,8),(7,30,9),(8,31,10),(9,32,11),(10,33,12),(11,34,13),(12,35,14),(13,36,10),(14,37,16),(15,38,17),(16,39,18),(18,41,2),(36,89,5);
/*!40000 ALTER TABLE `personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `id_plan` int NOT NULL AUTO_INCREMENT,
  `tipo_plan` int NOT NULL,
  `meses` int NOT NULL,
  PRIMARY KEY (`id_plan`),
  KEY `fk_tipoplan_plan` (`tipo_plan`),
  CONSTRAINT `fk_tipoplan_plan` FOREIGN KEY (`tipo_plan`) REFERENCES `tipo_plan` (`id_tipo_plan`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (1,1,6),(2,2,6),(3,3,3),(4,3,4),(5,3,7),(6,4,6),(7,5,8),(8,6,2),(9,1,1),(10,7,3),(11,8,5),(12,9,1);
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_rutina`
--

DROP TABLE IF EXISTS `plan_rutina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_rutina` (
  `id_plan_rutina` int NOT NULL AUTO_INCREMENT,
  `plan` int DEFAULT NULL,
  `rutina` int DEFAULT NULL,
  PRIMARY KEY (`id_plan_rutina`),
  KEY `fk_planrutina_plan` (`plan`),
  KEY `fk_planrutina_rutina` (`rutina`),
  CONSTRAINT `fk_planrutina_plan` FOREIGN KEY (`plan`) REFERENCES `plan` (`id_plan`) ON DELETE CASCADE,
  CONSTRAINT `fk_planrutina_rutina` FOREIGN KEY (`rutina`) REFERENCES `rutina` (`id_rutina`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_rutina`
--

LOCK TABLES `plan_rutina` WRITE;
/*!40000 ALTER TABLE `plan_rutina` DISABLE KEYS */;
INSERT INTO `plan_rutina` VALUES (28,1,1),(34,2,2),(35,2,3),(36,7,2),(37,7,8),(38,2,1),(39,2,8),(40,1,3),(41,1,8),(42,8,9),(44,8,8),(45,7,1),(46,5,1),(47,10,2),(48,6,1),(49,11,2),(50,12,3),(51,1,2),(52,12,8);
/*!40000 ALTER TABLE `plan_rutina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutina`
--

DROP TABLE IF EXISTS `rutina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutina` (
  `id_rutina` int NOT NULL AUTO_INCREMENT,
  `numero_rutina` int NOT NULL,
  `tipo_rutina` int NOT NULL,
  PRIMARY KEY (`id_rutina`),
  KEY `fk_rutina_tiporutina` (`tipo_rutina`),
  CONSTRAINT `fk_rutina_tiporutina` FOREIGN KEY (`tipo_rutina`) REFERENCES `tipo_rutina` (`id_tipo_rutina`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutina`
--

LOCK TABLES `rutina` WRITE;
/*!40000 ALTER TABLE `rutina` DISABLE KEYS */;
INSERT INTO `rutina` VALUES (1,1,1),(2,5,3),(3,3,1),(4,1,5),(5,1,4),(6,5,2),(7,1,9),(8,2,10),(9,1,11);
/*!40000 ALTER TABLE `rutina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutina_ejercicio`
--

DROP TABLE IF EXISTS `rutina_ejercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutina_ejercicio` (
  `id_rutina_ejercicio` int NOT NULL AUTO_INCREMENT,
  `rutina` int DEFAULT NULL,
  `ejercicio` int DEFAULT NULL,
  PRIMARY KEY (`id_rutina_ejercicio`),
  KEY `fk_rutinaejercicio_rutina` (`rutina`),
  KEY `fk_rutinaejercicio_ejercicio` (`ejercicio`),
  CONSTRAINT `fk_rutinaejercicio_ejercicio` FOREIGN KEY (`ejercicio`) REFERENCES `ejercicio` (`id_ejercicio`) ON DELETE CASCADE,
  CONSTRAINT `fk_rutinaejercicio_rutina` FOREIGN KEY (`rutina`) REFERENCES `rutina` (`id_rutina`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutina_ejercicio`
--

LOCK TABLES `rutina_ejercicio` WRITE;
/*!40000 ALTER TABLE `rutina_ejercicio` DISABLE KEYS */;
INSERT INTO `rutina_ejercicio` VALUES (57,2,2),(64,3,4),(69,1,3),(73,1,4),(74,9,11),(75,9,10),(76,9,9),(78,8,3),(79,8,2),(82,8,5),(83,1,5),(84,3,11),(85,2,12);
/*!40000 ALTER TABLE `rutina_ejercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento` (
  `id_tipo_docum` int NOT NULL AUTO_INCREMENT,
  `nom_documento` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_docum`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'cedula de ciudadania'),(2,'cedula de extranjeria'),(3,'tarjeta de identidad'),(4,'PP\r');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_ejercicio`
--

DROP TABLE IF EXISTS `tipo_ejercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_ejercicio` (
  `id_tipo_ejerc` int NOT NULL AUTO_INCREMENT,
  `nom_tipo_ejerc` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_ejerc`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_ejercicio`
--

LOCK TABLES `tipo_ejercicio` WRITE;
/*!40000 ALTER TABLE `tipo_ejercicio` DISABLE KEYS */;
INSERT INTO `tipo_ejercicio` VALUES (1,'fuerza'),(2,'equilibrado'),(3,'resistencia'),(5,'esto es una prueba');
/*!40000 ALTER TABLE `tipo_ejercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_plan`
--

DROP TABLE IF EXISTS `tipo_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_plan` (
  `id_tipo_plan` int NOT NULL AUTO_INCREMENT,
  `nom_plan` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_plan`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_plan`
--

LOCK TABLES `tipo_plan` WRITE;
/*!40000 ALTER TABLE `tipo_plan` DISABLE KEYS */;
INSERT INTO `tipo_plan` VALUES (1,'adelgazar'),(2,'aumento de masa muscular'),(3,'fortalecimiento'),(4,'test plan'),(5,'test2'),(6,'test final'),(7,'tonificar'),(8,'otro plan'),(9,'nuevo plan');
/*!40000 ALTER TABLE `tipo_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_rutina`
--

DROP TABLE IF EXISTS `tipo_rutina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_rutina` (
  `id_tipo_rutina` int NOT NULL AUTO_INCREMENT,
  `nom_rutina` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_rutina`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_rutina`
--

LOCK TABLES `tipo_rutina` WRITE;
/*!40000 ALTER TABLE `tipo_rutina` DISABLE KEYS */;
INSERT INTO `tipo_rutina` VALUES (1,'Full-Fuerza'),(2,'Full-Resistencia'),(3,'Fuerza'),(4,'Resistencia'),(5,'hibrido'),(9,'finnnes'),(10,'borrar2'),(11,'test');
/*!40000 ALTER TABLE `tipo_rutina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usu` bigint NOT NULL AUTO_INCREMENT,
  `nom_usu` varchar(45) NOT NULL,
  `cont_usu` varchar(45) NOT NULL,
  `personal` bigint NOT NULL,
  PRIMARY KEY (`id_usu`),
  UNIQUE KEY `nom_usu` (`nom_usu`),
  UNIQUE KEY `cont_usu` (`cont_usu`),
  KEY `fk_usuario_personal` (`personal`),
  CONSTRAINT `fk_usuario_personal` FOREIGN KEY (`personal`) REFERENCES `personal` (`id_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin2','admin2',1),(2,'admin','admin',2),(3,'pau26','Bedoya26',3),(4,'aleja27','27mo',4),(5,'Isa28','Mar28tinez',5),(6,'Camilo29','Careona29',6),(7,'And30','Yoya78',7),(8,'Sar31','Eli678',8),(9,'Luci32','23lulu',9),(10,'Salo33','Correa56',10),(11,'Juan34','3434sar',11),(12,'Isc35','28550',12),(13,'easy','easy',13),(14,'Marti37','Zeus17',14),(15,'Caro38','Motas28',15),(16,'Cata39','Martina06',16),(18,'Angel41','Luna89',18),(36,'pau264545','Bedoya264545',36);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-20  2:27:32
