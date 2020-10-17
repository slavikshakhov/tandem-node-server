-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tandem
-- ------------------------------------------------------
-- Server version	5.7.29-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `offeredlgs`
--

DROP TABLE IF EXISTS `offeredlgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offeredlgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offeredlgs`
--

LOCK TABLES `offeredlgs` WRITE;
/*!40000 ALTER TABLE `offeredlgs` DISABLE KEYS */;
INSERT INTO `offeredlgs` VALUES (1,'english'),(2,'french'),(3,'spanish'),(4,'german'),(5,'italian'),(6,'chinese'),(7,'turkish'),(8,'russian'),(9,'japanese'),(10,'portuguese'),(11,'dutch'),(12,'greek');
/*!40000 ALTER TABLE `offeredlgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userofferedlg`
--

DROP TABLE IF EXISTS `userofferedlg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userofferedlg` (
  `userId` int(11) NOT NULL,
  `offeredlgId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`offeredlgId`),
  KEY `offeredlgId` (`offeredlgId`),
  CONSTRAINT `userofferedlg_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userofferedlg_ibfk_2` FOREIGN KEY (`offeredlgId`) REFERENCES `offeredlgs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userofferedlg`
--

LOCK TABLES `userofferedlg` WRITE;
/*!40000 ALTER TABLE `userofferedlg` DISABLE KEYS */;
INSERT INTO `userofferedlg` VALUES (33,1),(32,3),(32,5),(33,6),(32,7),(32,8),(32,9),(32,10),(33,11);
/*!40000 ALTER TABLE `userofferedlg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (32,'slavik','$2b$10$x/TcqDTc7TG1v9aH9DkJzuzib24SJZ1S8T9YokS16ELuPBDTFEUdC','Valencia','Spain','v.shakhov@yahoo.ca'),(33,'carlos','$2b$10$P0Yeu1.AgQTP674sl9Mqeu6tVakRogQKl0b3z0zFiUrhrwC1zcGvS','Valencia','Spain','carlos@yahoo.ca'),(34,'tamara','$2b$10$qRNboREyXHrQnpE71rIO.ek1hkgXJqj4cJvp23uq88rJkaiUPDlAy','Kremenchug','Ukraine','Tamara@yahoo.ca'),(35,'paqui','$2b$10$kJbdGFF9FomuiH4uqy0Og.tfJigD6WV3/BHcnrwm7BTG.QRTanHCS','Valencia','Spain','paqui@yahoo.ca'),(36,'claudia','$2b$10$OA7fIdRWOfgTBm9eJQuNAO3lBeYxhCi.rJ8hVYhjfzhQbXV8HJU8S','Valencia','Spain','Claudia@yahoo.ca'),(37,'johnnie','$2b$10$x2JR.tJmdpB7Qey4qjsSlu6NrR87EQCGJX0FoJ22yBYRO9eIUlya2','Vancouver','Canada','johnnie@yahoo.ca'),(38,'lena','$2b$10$jSBnfwBB0JOV/IqvXHy0Ze2a2Jk0yLH.9E82MTNnt1oB.tKaoHZAG','Kremenchug','Ukraine','lena@yahoo.ca'),(39,'gregory','$2b$10$IoVGFZ.V/sj5NbTdCBm0p.ARm/ipfzzb6kUZqOqj8u8iCu4axn8WW','Toronto','Canada','gregory@yahoo.ca'),(40,'carla','$2b$10$2KPVXuHRpxs866fWzSSuLu7dZv86yjK.hWmdTOxWAH7GkbcBuhXti','Valencia','Spain','carla@yahoo.ca'),(41,'marge','$2b$10$JHhDTNriBt42CzKWTmHMhOgpR1UxTuacWwcAQ1H9NmgTi47jwzEhu','Springfield','United States','marge1@yahoo.ca');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userwantedlg`
--

DROP TABLE IF EXISTS `userwantedlg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userwantedlg` (
  `userId` int(11) NOT NULL,
  `wantedlgId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`wantedlgId`),
  KEY `wantedlgId` (`wantedlgId`),
  CONSTRAINT `userwantedlg_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userwantedlg_ibfk_2` FOREIGN KEY (`wantedlgId`) REFERENCES `wantedlgs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userwantedlg`
--

LOCK TABLES `userwantedlg` WRITE;
/*!40000 ALTER TABLE `userwantedlg` DISABLE KEYS */;
INSERT INTO `userwantedlg` VALUES (32,1),(33,5),(32,6),(33,9),(33,10),(32,11);
/*!40000 ALTER TABLE `userwantedlg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wantedlgs`
--

DROP TABLE IF EXISTS `wantedlgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wantedlgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wantedlgs`
--

LOCK TABLES `wantedlgs` WRITE;
/*!40000 ALTER TABLE `wantedlgs` DISABLE KEYS */;
INSERT INTO `wantedlgs` VALUES (1,'english'),(2,'french'),(3,'spanish'),(4,'german'),(5,'italian'),(6,'chinese'),(7,'turkish'),(8,'russian'),(9,'japanese'),(10,'portuguese'),(11,'dutch'),(12,'greek');
/*!40000 ALTER TABLE `wantedlgs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-16 21:52:04
