-- phpMyAdmin SQL Dump
-- version 2.11.10.1
-- http://www.phpmyadmin.net
--
-- Host: 209.237.150.136
-- Generation Time: Jun 04, 2014 at 09:19 AM
-- Server version: 5.1.52
-- PHP Version: 5.1.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `34179_tboccom`
--

-- --------------------------------------------------------

--
-- Table structure for table `atm`
--

CREATE TABLE IF NOT EXISTS `atm` (
  `atm_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `city` varchar(45) NOT NULL DEFAULT '',
  `location` varchar(45) NOT NULL DEFAULT '',
  `status` char(1) NOT NULL DEFAULT '',
  `date_added` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`atm_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `atm`
--

INSERT INTO `atm` (`atm_id`, `city`, `location`, `status`, `date_added`, `date_updated`) VALUES
(1, 'Carbondale', 'The Bank of Carbondale, 216 E Main St', 'A', '2006-06-26 00:00:00', '0000-00-00 00:00:00'),
(6, 'Carbondale', 'Pick''s Liquors, 750 E Grand Ave', 'A', '2006-06-26 00:00:00', '0000-00-00 00:00:00'),
(7, 'Carbondale', 'SIU Student Center, 1255 Lincoln Dr', 'A', '2006-06-26 00:00:00', '0000-00-00 00:00:00'),
(9, 'Carbondale', 'Attitude Designs, 718 S Illinois Ave', 'A', '2006-06-26 00:00:00', '0000-00-00 00:00:00'),
(5, 'Carbondale', 'Murdale Shopping Center, 1875 W Main St', 'A', '2012-11-16 00:00:00', '0000-00-00 00:00:00'),
(11, 'Carterville', 'Carterville Banking Center, 200 W Plaza Dr', 'A', '2006-06-26 00:00:00', '0000-00-00 00:00:00'),
(12, 'Murphysboro', 'Murphysboro Banking Center, 900 Walnut St', 'A', '2006-06-26 00:00:00', '0000-00-00 00:00:00'),
(13, 'Murphysboro', 'Jackson County Courthouse, 1001 Walnut St', 'A', '2006-06-26 00:00:00', '0000-00-00 00:00:00'),
(15, 'Carbondale', 'Carbondale East Branch, 1399 E Main St', 'A', '2009-11-16 00:00:00', '0000-00-00 00:00:00'),
(16, 'Carterville', 'AJ''s Beer, Wine and Spirits, 1207 S Division ', 'A', '2012-12-28 00:00:00', '0000-00-00 00:00:00'),
(17, 'Murphysboro', 'Inside St Joseph Memorial, 2 S Hospital Dr', 'A', '2014-03-13 14:00:00', '0000-00-00 00:00:00');
