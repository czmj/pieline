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
  `hours`  boolean NOT NULL,
  `category` tinyint NOT NULL,
  `contact_mention` boolean NOT NULL,
  `contact_recruiters` boolean NOT NULL,
  `title` varchar(200) NOT NULL,
  `company` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `contact_details` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table`customer`
--

-- hours=1=fulltime
-- category = 2 = web, 3 = design
-- contact_mention=1=Do mention jobboard
-- contact_recruiters=1=recruiters may contact poster

INSERT INTO `jobboard` (`id`, `title`, `company`, `category`, `location`, `hours`, `url`, `contact_details`, `contact_mention`, `contact_recruiters`, `description`) VALUES (1, 1, 2, 1, 0, 'Graduate Web Developer', 'Evoluted', 'Sheffield', 'http://www.evoluted.net/join-us/graduate-web-developer', 'To apply, please send your CV with a covering letter and an indication of your salary requirements to recruitment@evoluted.net.', 'Evoluted, a Sheffield based digital agency, is looking for a Graduate Web Developer to work on the development of exciting new projects and maintenance of existing sites. You will be an enthusiastic team player who can participate in the creative development of new ideas and solutions. You must be self-motivated and able to work on your own initiative. In return, you will have scope to put your own stamp on projects and make a real impact on the growth of the business. </p><p>In other words, you will be much more than a code monkey with us. Our workspace is a friendly, informal and stimulating environment in the heart of Sheffield. We are a close knit team and we plan to stay that way. You will have your own top-of-the-line workstation, in an office that has been newly redesigned to promote collaborative working. You will also receive excellent benefits. If you have the skills and can thrive in this kind of environment, this could be the opportunity for you.'), (2, 1, 2, 1, 0, 'Front End Developer', 'Uber Agency', 'Sheffield', 'http://www.uberagency.com/careers', 'If you are interested please send your details to frontenddev@uberagency.com', 'As a Front End Developer, your main responsibility is for the design and production of websites and web application user interfaces.</p><p>We are looking for someone with a creative eye and an attention to aesthetic detail that can take a blank canvas and make it into something unique.</p><p>Our ideal candidate has experience designing using Photoshop coupled with several years experience writing custom (X)HTML, CSS, and JavaScript. Expertise writing semantic, modular front end code using HTML5, CSS3, and W3C coding practices is a must. Knowledge of Flash and Illustrator would be a distinct advantage.</p><p>An understanding of the concepts of progressive enhancement, mobile first and future friendly design is also highly encouraged.'), (3, 1, 3, 1, 0, 'Middleweight Designer', 'Whitespace', 'Sheffield', 'http://www.white-space.co.uk/system/resources/W1siZiIsIjIwMTQvMTEvMjEvMTZfMTlfMThfMzcwX1dTX01pZGRsZXdlaWdodERlc2lnbmVySm9iRGVzY3JpcHRpb24ucGRmIl1d/WS_MiddleweightDesignerJobDescription.pdf', 'In the first instance please send your CV to stef@white­space.co.uk together with a covering letter explaining how you meet the requirements of the job description along with with work samples.', 'We require a talented, ambitious and passionate individual with strong ideas and sound print production skills. You will have the opportunity to work with a dynamic and exciting range of brands and organisations with the responsibility for generating creative design concepts, visuals and artwork from brief through to completion. You will be able to showcase a variety of great work including campaigns, branding and identity, point of sale and packaging. You will be equally comfortable at demonstrating your production skills in the form of brochures and other printed material.'), (4, 1, 2, 1, 0, 'Junior Web Developer', 'Esvelte', 'Sheffield', 'http://esvelte.com/work-with-us/', 'If you are interested in working with us or would like to know more, please email jobs@esvelte.com and we can schedule an informal chat with you.', 'We are looking for a new Junior Web Designer to join our talented web team. The successful candidate will get the opportunity to work on a variety of projects and learn new emerging web design trends and techniques. </p><p>We are a small, friendly and agile web design and development studio and are looking for someone who is ready to take the initiative and put their own mark on our work.'), (5, 1, 3, 1, 0, 'Junior Web Designer', 'diva creative', 'Sheffield', 'http://www.divacreative.com/recruitment/junior-web-designer/', 'To apply please send us your portfolio and CV, along with a covering letter to vacancies@divacreative.com', 'Do you have a strong portfolio that demonstrates a keen understanding of how to meet a brief and a passion to keep developing your skills? If so, we’d love to hear from you.</p> <p>Due to significant company growth and new account wins, we are looking to recruit a junior web designer/front-end developer with a minimum of one year of industry experience.'), (6, 1, 4, 1, 0, 'Digital Producer', 'Rckt', 'Sheffield', 'http://www.rckt.co.uk/careers/digital-producers', 'Please send your CV and covering email to careers@rckt.co.uk', 'The producer’s role is to come up with creative concepts and ideas which solve the problems of our clients; be the driving force to lead projects from concept to completion; and ensuring we deliver our projects, to time and budget and to the highest possible standards.</p> <p>We’re looking for someone with more than just the ability to plug figures into a spreadsheet or churn out Gantt charts. You will be able to talk confidently and authoritatively about web technology, design, user experience, accessibility, ecommerce, digital culture, social media, etc. You will have a natural curiosity for the interesting and intriguing. You will also be able to quickly identify business opportunities, find innovative solutions to problems, come up with brilliant ideas, offer constructive criticism, communicate clearly in person and writing, able to switch between left and right side of your brain at will, plan and organise yourself and others, and be motivated and driven to do it all without someone standing over your shoulder telling you what to do.'), (7, 1, 2, 1, 0, 'PHP Web Developer', 'Grey Matter', 'Sheffield', 'http://www.usegreymatter.com/index.php', 'Send your CV to careers@usegreymatter.com', 'Grey Matter are seeking a PHP/ MySQL developer to join their expanding team. This is an excellent opportunity for an enthusiastic and passionate PHP Developer to help our rapid progress both regionally and nationally. The successful candidate will work closely with our team of designers and developers on a variety of exciting projects and will also have regular client contact with an opportunity to take a hands on role in managing projects.');
;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
