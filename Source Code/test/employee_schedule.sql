-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: employee_schedule
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `ava`
--

DROP TABLE IF EXISTS `ava`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ava` (
  `eid` int NOT NULL,
  `start` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `end` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  KEY `eid_idx` (`eid`),
  CONSTRAINT `eid_ava` FOREIGN KEY (`eid`) REFERENCES `employee` (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ava`
--

LOCK TABLES `ava` WRITE;
/*!40000 ALTER TABLE `ava` DISABLE KEYS */;
/*!40000 ALTER TABLE `ava` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `eid` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `epos` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (12342987,'Stephanie Richards','Dishwasher'),(17459283,'Narly Fart','Owner'),(17482935,'Yuan Zifeng','Cleanup'),(17482938,'Larva Gross','Manager'),(17483920,'Patty Spunk','Cleanup'),(17492283,'Oh Hithere','Cook'),(23748905,'Dorkus Stevenson','Dishwasher'),(25794832,'Thicky Widdit','Cook'),(26789143,'Gordon Gordon','Dishwasher'),(27184923,'Marshall Lambert','Manager'),(27948357,'Veronica Sheep','Cook'),(40292813,'Large Boi','Cook'),(57194823,'Smort Employee','Server'),(57283492,'Leg Whodat','Server'),(59274013,'David Tatum','Server'),(59847234,'Melvin Heckleberry','Cook'),(71049283,'Garry Gergitch','Server'),(74892834,'Nathan Andrews','Cook'),(82916743,'Martha Speaks','Server'),(98723471,'Tammy TamTam','Cook');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `isscheduled`
--

DROP TABLE IF EXISTS `isscheduled`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `isscheduled` (
  `eid` int NOT NULL,
  `sid` int NOT NULL,
  PRIMARY KEY (`eid`,`sid`),
  KEY `eid_idx` (`eid`),
  KEY `sid_idx` (`sid`),
  CONSTRAINT `eid_isschedule` FOREIGN KEY (`eid`) REFERENCES `employee` (`eid`),
  CONSTRAINT `sid_isschedule` FOREIGN KEY (`sid`) REFERENCES `shift` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `isscheduled`
--

LOCK TABLES `isscheduled` WRITE;
/*!40000 ALTER TABLE `isscheduled` DISABLE KEYS */;
INSERT INTO `isscheduled` VALUES (12342987,1),(12342987,2),(12342987,3),(12342987,4),(12342987,5),(17459283,1),(17459283,3),(17459283,5),(17482935,0),(17482935,1),(17482935,2),(17482935,3),(17482935,4),(17482935,5),(17482935,6),(17482938,1),(17482938,2),(17482938,3),(17482938,4),(17482938,5),(17482938,6);
/*!40000 ALTER TABLE `isscheduled` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `sid` int NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (0,'2022-11-06 11:00:00','2022-11-06 17:00:00'),(1,'2022-11-07 10:00:00','2022-11-07 20:00:00'),(2,'2022-11-08 10:00:00','2022-11-08 20:00:00'),(3,'2022-11-09 10:00:00','2022-11-09 20:00:00'),(4,'2022-11-10 10:00:00','2022-11-10 20:00:00'),(5,'2022-11-11 10:00:00','2022-11-11 20:00:00'),(6,'2022-11-12 11:00:00','2022-11-12 17:00:00');
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `eid` int NOT NULL,
  `upassword` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uemail` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `permission` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uemail_UNIQUE` (`uemail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin',1,'admin123','admin@es.com','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-09  1:17:40
