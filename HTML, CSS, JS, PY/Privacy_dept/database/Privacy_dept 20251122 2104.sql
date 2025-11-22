-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.0.22-community-nt


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema privacy_dept
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ privacy_dept;
USE privacy_dept;

--
-- Table structure for table `privacy_dept`.`one_time_password`
--

DROP TABLE IF EXISTS `one_time_password`;
CREATE TABLE `one_time_password` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `otp` varchar(5) NOT NULL default '',
  `datetime` varchar(45) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `privacy_dept`.`one_time_password`
--

/*!40000 ALTER TABLE `one_time_password` DISABLE KEYS */;
INSERT INTO `one_time_password` (`id`,`otp`,`datetime`) VALUES 
 (164739088,'5810','2025-11-17 20:31:05.560598'),
 (277349998,'5265','2025-11-20 14:39:42.480567'),
 (354955264,'1648','2025-11-20 14:41:58.077830'),
 (982730960,'9043','2025-11-20 14:44:01.424518');
/*!40000 ALTER TABLE `one_time_password` ENABLE KEYS */;


--
-- Table structure for table `privacy_dept`.`pointsdb`
--

DROP TABLE IF EXISTS `pointsdb`;
CREATE TABLE `pointsdb` (
  `username` varchar(50) default NULL,
  `points` int(10) default NULL,
  `datetime` varchar(40) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `privacy_dept`.`pointsdb`
--

/*!40000 ALTER TABLE `pointsdb` DISABLE KEYS */;
INSERT INTO `pointsdb` (`username`,`points`,`datetime`) VALUES 
 ('sumitthombare12',12,'2025-11-20 23:16:10'),
 ('sumitthombare12',150,'2025-11-20 23:36:18.693874'),
 ('sumitthombare12',0,'2025-11-20 23:38:14.002091'),
 ('sumitthombare12',0,'2025-11-20 23:38:47.430894'),
 ('sumitthombare12',0,'2025-11-20 23:39:14.034843'),
 ('sumitthombare12',-395,'2025-11-21 01:58:51.979634'),
 ('sumitthombare12',0,'2025-11-21 21:56:06.749064'),
 ('sumitthombare12',0,'2025-11-21 22:03:19.361600');
/*!40000 ALTER TABLE `pointsdb` ENABLE KEYS */;


--
-- Table structure for table `privacy_dept`.`user_details`
--

DROP TABLE IF EXISTS `user_details`;
CREATE TABLE `user_details` (
  `username` varchar(50) NOT NULL default '',
  `full_name` varchar(70) NOT NULL default '',
  `email` varchar(80) NOT NULL default '',
  `password` varchar(30) NOT NULL default '',
  `points` int(11) NOT NULL default '0',
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `privacy_dept`.`user_details`
--

/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` (`username`,`full_name`,`email`,`password`,`points`) VALUES 
 ('sumitthombare12','Sumit Thombare','sumitthombare2005@gmail.com','Sumit@123',-233),
 ('sumit_t_12','Sumit Thombare','sumitthombare2005@gmail.com','Sumit@123',0);
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
