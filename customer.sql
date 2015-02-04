-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Inang: localhost
-- Waktu pembuatan: 02 Mei 2014 pada 12.05
-- Versi Server: 5.5.34
-- Versi PHP: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Stable structure `jobboard`
--
CREATE DATABASE IF NOT EXISTS jobboard;
USE `jobboard`;

CREATE TABLE IF NOT EXISTS `jobboard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `company` varchar(200) NOT NULL,
  `category` tinyint NOT NULL,
  `location` varchar(200) NOT NULL,
  `hours`  boolean NOT NULL,
  `url` varchar(200) NOT NULL,
  `contact_details` text NOT NULL,
  `contact_mention` boolean NOT NULL,
  `contact_recruiters` boolean NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table`customer`
--

INSERT INTO `jobboard` (`id`, `title`, `company`, `category`, `location`, `hours`, `url`, `contact_details`, `contact_mention`, `contact_recruiters`, `description`) 
VALUES (1, 'Graduate Web Developer', 'Evoluted', 2, 'Sheffield', 1, 'http://www.evoluted.net/join-us/graduate-web-developer', 'To apply, please send your CV with a covering letter and an indication of your salary requirements to recruitment@evoluted.net.', 1, 0, 'Evoluted, a Sheffield based digital agency, is looking for a Graduate Web Developer to work on the development of exciting new projects and maintenance of existing sites. You’ll be an enthusiastic team player who can participate in the creative development of new ideas and solutions. You must be self-motivated and able to work on your own initiative. In return, you’ll have scope to put your own stamp on projects and make a real impact on the growth of the business. </p><p>In other words, you’ll be much more than a code monkey with us. Our workspace is a friendly, informal and stimulating environment in the heart of Sheffield. We’re a close knit team and we plan to stay that way. You’ll have your own top-of-the-line workstation, in an office that’s been newly redesigned to promote collaborative working. You’ll also receive excellent benefits. If you have the skills and can thrive in this kind of environment, this could be the opportunity for you.');
VALUES (2, 'Front End Developer', 'Uber Agency', 2, 'Sheffield', 1, 'http://www.uberagency.com/careers', 'If you\'re interested please send your details to frontenddev@uberagency.com', 1, 0, 'As a Front End Developer, your main responsibility is for the design and production of websites and web application user interfaces.</p><p>We\'re looking for someone with a creative eye and an attention to aesthetic detail that can take a blank canvas and make it into something unique.</p><p>Our ideal candidate has experience designing using Photoshop coupled with several years experience writing custom (X)HTML, CSS, and JavaScript. Expertise writing semantic, modular front end code using HTML5, CSS3, and W3C coding practices is a must. Knowledge of Flash and Illustrator would be a distinct advantage.</p><p>An understanding of the concepts of progressive enhancement, mobile first and future friendly design is also highly encouraged.');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
