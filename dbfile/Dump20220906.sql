-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: carwash
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `approvals`
--

DROP TABLE IF EXISTS `approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approvals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvals`
--

LOCK TABLES `approvals` WRITE;
/*!40000 ALTER TABLE `approvals` DISABLE KEYS */;
INSERT INTO `approvals` VALUES (5,'3','180','pending','2022-09-06 11:45:21','2022-09-06 11:45:21'),(6,'3','150','pending','2022-09-06 12:08:01','2022-09-06 12:08:01');
/*!40000 ALTER TABLE `approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carType` varchar(255) DEFAULT NULL,
  `planId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `extraFeatures` varchar(255) DEFAULT '',
  `date` varchar(255) DEFAULT '',
  `bookingType` varchar(255) DEFAULT '',
  `assignCleaner` varchar(255) DEFAULT '',
  `status` varchar(255) DEFAULT '',
  `amount` varchar(255) DEFAULT '',
  `review` varchar(255) DEFAULT '',
  `time` varchar(255) DEFAULT '',
  `brand` varchar(255) DEFAULT '',
  `model` varchar(255) DEFAULT '',
  `plate` varchar(255) DEFAULT '',
  `color` varchar(255) DEFAULT '',
  `parkingNo` varchar(255) DEFAULT '',
  `parkingFloor` varchar(255) DEFAULT '',
  `couponCode` varchar(255) DEFAULT NULL,
  `couponApplied` varchar(255) DEFAULT NULL,
  `cleanerImg1` varchar(255) DEFAULT '',
  `cleanerImg2` varchar(255) DEFAULT '',
  `cleanerImg3` varchar(255) DEFAULT '',
  `cleanerImgLink1` varchar(255) DEFAULT '',
  `cleanerImgLink2` varchar(255) DEFAULT '',
  `cleanerImgLink3` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (2,'SUV','[6,4]','6','[3,1]','2022-09-14','onetime','4','reviewed','187','neat and clean','8-10','Honda','Honda','LEA-4747','Black','3','2',NULL,NULL,'978207385017880400435435.jpg','971373929680541800mswindows2_2040.0.0.jpg','543487323020371100PngItem_6871448.png','http://localhost:4700/cleaner-images/978207385017880400435435.jpg','http://localhost:4700/cleaner-images/971373929680541800mswindows2_2040.0.0.jpg','http://localhost:4700/cleaner-images/543487323020371100PngItem_6871448.png','2022-09-05 07:52:38','2022-09-05 12:30:03'),(3,'SUV','[6]','6','[1,2,3]','2020-01-11','onetime','5','reviewed','128','all neat and tidy','10-12','toyata ','crolla','Lea-4444','black','3','3',NULL,NULL,'502629329197024200435435.jpg','475890461120945300mswindows2_2040.0.0.jpg','553105027246004700PngItem_6871448.png','http://localhost:4700/cleaner-images/502629329197024200435435.jpg','http://localhost:4700/cleaner-images/475890461120945300mswindows2_2040.0.0.jpg','http://localhost:4700/cleaner-images/553105027246004700PngItem_6871448.png','2022-09-05 12:50:22','2022-09-05 12:53:34'),(4,'SUV','[4,6]','7','[2,1,3]','1994-06-23','onetime','4','reviewed','202','5','8-10','Ex in facere ut itaq','Dolorum totam dolore','Non voluptatum provi','Molestias ad omnis o','Dolore ullam magni n','Consequatur Eos te',NULL,NULL,'834897616471919900download - Copy.jpg','699984925401518000download (1) - Copy.jpg','602551513312887900images - Copy.png','http://localhost:4700/cleaner-images/834897616471919900download - Copy.jpg','http://localhost:4700/cleaner-images/699984925401518000download (1) - Copy.jpg','http://localhost:4700/cleaner-images/602551513312887900images - Copy.png','2022-09-05 12:57:43','2022-09-06 10:48:38'),(5,'SUV','[6]','8','[2,1,3]','2022-09-28','onetime','4','assigned','128','','8-10','toyota','crolla','lea-5551','pink','3','1','','No','','','','','','','2022-09-06 07:14:36','2022-09-06 10:39:44'),(6,'SUV','[6]','8','[2,3]','1991-05-20','onetime','5','assigned','105','','10-12','Odio rem dolore sunt','Voluptatem aute aut ','Ipsum ea autem quis','Commodi quia cupidit','Magni fugiat aliqua','Sequi possimus mole','','No','','','','','','','2022-09-06 07:21:54','2022-09-06 10:39:47'),(7,'SUV','[6]','8','[3,2]','1983-12-10','onetime','5','assigned','105','','Select','Sint veritatis accus','Voluptatem esse dolo','Vitae in at aut non ','Architecto itaque vo','Ex animi laborum la','Nostrud vitae archit','','No','','','','','','','2022-09-06 07:35:18','2022-09-06 10:39:51'),(8,'SUV','[6]','8','[3]','2021-06-01','onetime','5','assigned','75','','8-10','Consectetur id mini','Voluptatem Maiores ','Cupiditate sit earu','Harum sunt sit solut','Reprehenderit et et','Nam minima veniam u','','No','','','','','','','2022-09-06 07:52:37','2022-09-06 10:39:54'),(9,'SUV','[6]','8','[2]','2001-04-07','onetime','4','assigned','80','','10-12','Aute et ad debitis v','Neque quae iste comm','Repellendus Et veli','Exercitationem exerc','Voluptate quos at ip','Culpa aut adipisici','9267','Yes','','','','','','','2022-09-06 07:59:12','2022-09-06 10:39:58'),(10,'SUV','6','6','[3]','2017-04-25','onetime','5','assigned','87.3','','12-2','Ex esse nisi debitis','Adipisci nulla a qui','Consectetur omnis n','Enim inventore ut ma','Est consequatur des','At asperiores volupt','7126','Yes','','','','','','','2022-09-06 10:38:31','2022-09-06 10:40:01'),(11,'SUV','7','11','[3,4]','2022-09-22','onetime','9','reviewed','55','4','10-12','toyata','crolla','lea-8889','yello','8','2','9267','Yes','309132466010711040download - Copy.jpg','680570411502360200download (1) - Copy.jpg','778592091691037600images - Copy.png','http://localhost:4700/cleaner-images/309132466010711040download - Copy.jpg','http://localhost:4700/cleaner-images/680570411502360200download (1) - Copy.jpg','http://localhost:4700/cleaner-images/778592091691037600images - Copy.png','2022-09-06 12:03:23','2022-09-06 12:06:04');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extra_features`
--

DROP TABLE IF EXISTS `extra_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extra_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  `time` varchar(255) DEFAULT '',
  `price` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extra_features`
--

LOCK TABLES `extra_features` WRITE;
/*!40000 ALTER TABLE `extra_features` DISABLE KEYS */;
INSERT INTO `extra_features` VALUES (1,'Engine Wash','48','23','2022-09-05 06:59:58','2022-09-05 06:59:58'),(2,'Rim Wash','','15','2022-09-05 07:00:10','2022-09-05 07:00:10'),(3,'Window Wash','','10','2022-09-05 07:00:19','2022-09-05 07:00:19'),(4,'Seats Wash',NULL,'20','2022-09-06 11:58:31','2022-09-06 11:58:31');
/*!40000 ALTER TABLE `extra_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT '',
  `code` varchar(255) DEFAULT '',
  `type` varchar(255) DEFAULT '',
  `commission` varchar(255) DEFAULT '',
  `discount` varchar(255) DEFAULT '',
  `timesUsed` varchar(255) DEFAULT '',
  `phone` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES (7,'2','7166','absolute','30','10','0','3433444444','2022-09-06 05:34:43','2022-09-06 05:34:43'),(8,'3','9267','absolute','35','15','2','6587697777','2022-09-06 05:34:58','2022-09-06 12:03:22'),(9,'2','4096','discount','4','2','0','3433444444','2022-09-06 05:35:12','2022-09-06 05:35:12'),(10,'3','7126','discount','5','3','1','6587697777','2022-09-06 05:35:21','2022-09-06 10:38:29'),(11,'4','4639','absolute','200','100','0','6697898798','2022-09-06 11:57:30','2022-09-06 11:57:30');
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carType` varchar(255) DEFAULT '',
  `name` varchar(255) DEFAULT '',
  `price` varchar(255) DEFAULT '',
  `time` varchar(255) DEFAULT '',
  `feature1` varchar(255) DEFAULT '',
  `planType` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (2,'Sedan','Plan 2','12',NULL,'<p>Write here ...</p>','onetime','2022-09-05 06:54:30','2022-09-05 06:54:30'),(3,'SUV','Plan 3','85',NULL,'<p>Write here ...</p>','monthly','2022-09-05 06:54:45','2022-09-05 06:54:45'),(4,'SUV','Plan 5','74',NULL,'<p>Write here ...</p>','onetime','2022-09-05 06:55:02','2022-09-05 06:56:55'),(5,'Sedan','Plan 4','6',NULL,'<p>Write here ...</p>','monthly','2022-09-05 06:55:25','2022-09-05 06:55:25'),(6,'SUV','Plan 1','80',NULL,'<p>Write here ...</p>','onetime','2022-09-05 06:57:12','2022-09-05 06:57:12'),(7,'SUV','Plan 6','40',NULL,'<p>We provide this this and that</p>','onetime','2022-09-06 11:59:05','2022-09-06 11:59:05');
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slots`
--

DROP TABLE IF EXISTS `slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` varchar(255) DEFAULT '',
  `allowed` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slots`
--

LOCK TABLES `slots` WRITE;
/*!40000 ALTER TABLE `slots` DISABLE KEYS */;
INSERT INTO `slots` VALUES (1,'8-10','2','2022-09-05 06:52:24','2022-09-05 06:52:24'),(2,'10-12','2','2022-09-05 06:52:36','2022-09-05 06:52:36'),(3,'12-2','2','2022-09-05 06:52:43','2022-09-05 06:52:43'),(4,'2-4','2','2022-09-06 11:59:20','2022-09-06 11:59:20');
/*!40000 ALTER TABLE `slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  `email` varchar(255) DEFAULT '',
  `password` text,
  `phone` varchar(255) DEFAULT '',
  `address` varchar(255) DEFAULT '',
  `type` varchar(255) DEFAULT '',
  `roll` varchar(255) DEFAULT '',
  `bankHolder` varchar(255) DEFAULT '',
  `bankName` varchar(255) DEFAULT '',
  `iban` varchar(255) DEFAULT '',
  `accountNumber` varchar(255) DEFAULT '',
  `profile_pic` varchar(255) DEFAULT '',
  `profile_pic_url` varchar(255) DEFAULT '',
  `reset_code` varchar(255) DEFAULT '',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `total` varchar(255) DEFAULT '0',
  `paid` varchar(255) DEFAULT '0',
  `nonpaid` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@gmail.com','$2b$05$PXAyGqlBD7lYcv4r8iagI.MZtn9Bj88/1rJyzHeIU3O1s3qdrXQ1G','','','admin','0','','','','','','','','2022-09-05 06:52:00','2022-09-05 06:52:00','0','0','0'),(2,'Affiliate 1','kykunig@mailinator.com','','3433444444','Ut do facere aut inc','affiliate','2','','','','','','','','2022-09-05 06:57:37','2022-09-06 10:07:08','0','0','0'),(3,'Affiliate 2','xyjigat@mailinator.com','','6587697777','Aliquid aut aut ipsu','affiliate','2','hitman','Allied','PKAPA0000022312312','0000022312312','','','','2022-09-05 06:57:49','2022-09-06 12:08:01','45','0','0'),(4,'Cleaner 1','nesipowu@mailinator.com','','6697898798','Consequuntur mollit ','cleaner','1','','','','','','','','2022-09-05 06:58:03','2022-09-06 10:40:31','0','0','0'),(5,'Cleaner 2','wacu@mailinator.com','','5735546544','Rerum velit possimus','cleaner','1','','','','','','','','2022-09-05 06:58:14','2022-09-06 10:06:51','0','0','0'),(6,'Usman','usman@gmail.com','','8594057940','unknown','user','3','','','','','','','','2022-09-05 07:36:42','2022-09-06 10:34:35','0','0','0'),(7,'Officia dolor accusa','dovuho@mailinator.com','','6575676576','Aspernatur ad quia m','user','3','','','','','','','','2022-09-05 12:54:11','2022-09-06 10:47:31','0','0','0'),(8,'Qui aut suscipit dol','caxozo@mailinator.com','','3856436463','Neque error nemo sin','user','3','','','','','','','','2022-09-06 04:22:27','2022-09-06 07:54:55','0','0','0'),(9,'Cleaner 3','cleaner3@gmail.com','','3223534547','some address','cleaner','1','','','','','','','','2022-09-06 11:56:18','2022-09-06 12:04:31','','',''),(10,'Affiliate 4','affiliate4@gmail.com','','3975834597','some address','affiliate','2','','','','','','','','2022-09-06 11:56:44','2022-09-06 11:56:44','0','0','0'),(11,'Test','test@gmail.com','','3435345098','some address','user','3','','','','','','','','2022-09-06 11:59:58','2022-09-06 12:05:39','','','');
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

-- Dump completed on 2022-09-06 17:43:28
