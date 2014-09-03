-- phpMyAdmin SQL Dump
-- version 2.11.10.1
-- http://www.phpmyadmin.net
--
-- Host: 209.237.150.136
-- Generation Time: Jun 04, 2014 at 10:43 AM
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
-- Table structure for table `rates`
--

CREATE TABLE IF NOT EXISTS `rates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL DEFAULT '',
  `rate` varchar(45) NOT NULL DEFAULT '',
  `status` char(1) NOT NULL DEFAULT '',
  `date_added` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `category` varchar(45) NOT NULL DEFAULT '',
  `minbal` varchar(45) NOT NULL DEFAULT '',
  `apy` varchar(45) NOT NULL DEFAULT '',
  `linenum` int(10) unsigned DEFAULT NULL,
  `minopen` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `rates`
--

INSERT INTO `rates` (`id`, `description`, `rate`, `status`, `date_added`, `date_updated`, `category`, `minbal`, `apy`, `linenum`, `minopen`) VALUES
(1, 'NOW Checking*', '.10%', 'A', '2006-06-20 00:00:00', '2012-12-14 10:24:23', '1', '$1,000', '.10%', 10, '$1,000'),
(2, 'Savings Account*', '.25%', 'A', '2006-06-20 00:00:00', '2012-08-16 17:04:56', '1', '$100', '.25%', 20, '$100'),
(6, '6 Month CD', '.20%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:09:11', '1', '$1,000', '.20%', 90, '$1,000'),
(7, '6 Month CD', '.30%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:09:57', '2', '$50,000', '.30%', 100, '$50,000'),
(8, '12 Month CD', '.40%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:10:45', '2', '$1,000', '.40%', 110, '$1,000'),
(9, '12 Month CD', '.50%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:11:28', '2', '$50,000', '.50%', 120, '$50,000'),
(10, '18 Month CD', '.50%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:12:12', '2', '$1,000', '.50%', 130, '$1,000'),
(11, '24 Month CD', '.60%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:12:53', '2', '$1,000', '.60%', 140, '$1,000'),
(12, '30 Month CD', '.85%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:13:25', '2', '$1,000', '.85%', 150, '$1,000'),
(13, '36 Month CD', '.90%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:14:02', '2', '$1,000', '.90%', 160, '$1,000'),
(14, '48 Month CD', '1.00%', 'A', '2006-06-20 00:00:00', '2014-01-02 11:17:40', '2', '$1,000', '1.00%', 170, '$1,000'),
(15, '60 Month CD', '1.30%', 'A', '2006-06-20 00:00:00', '2012-08-16 17:12:40', '2', '$1,000', '1.31%', 180, '$1,000'),
(16, 'Elite Money Market*', '.20%', 'A', '2006-06-20 00:00:00', '2012-12-14 10:47:28', '2', '$5,000', '.20%', 40, '$5,000'),
(17, '', '.25%', 'A', '2006-06-20 00:00:00', '2012-12-14 10:31:42', '2', '$10,000', '.25%', 50, ''),
(18, '', '.25%', 'A', '2006-06-20 00:00:00', '2012-12-14 10:32:47', '2', '$25,000+', '.25%', 60, ''),
(19, 'Certificates of Deposit', '', '', '2006-07-19 08:26:36', '2006-07-19 08:26:36', '', '', '', 65, ''),
(20, 'Money Market*', '.15%', '', '2006-08-01 08:42:43', '2012-12-14 10:24:51', '', '$500', '.15%', 22, '$2,500'),
(21, '', '.15%', '', '2006-08-01 08:43:35', '2012-12-14 10:25:09', '', '$2,500', '.15%', 24, ''),
(22, '', '.20%', '', '2006-08-01 08:44:54', '2012-12-14 10:25:32', '', '$10,000', '.20%', 26, ''),
(23, '', '.25%', '', '2006-08-01 08:45:41', '2012-12-14 10:28:19', '', '$25,000+', '.25%', 28, '');
