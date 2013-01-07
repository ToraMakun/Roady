-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Lun 07 Janvier 2013 à 14:59
-- Version du serveur: 5.5.20-log
-- Version de PHP: 5.3.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `roads`
--

-- --------------------------------------------------------

--
-- Structure de la table `ami`
--

CREATE TABLE IF NOT EXISTS `ami` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user_emetteur` int(11) NOT NULL,
  `id_user_dest` int(11) NOT NULL,
  `visibilite` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_user_emetteur` (`id_user_emetteur`,`id_user_dest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `demandeami`
--

CREATE TABLE IF NOT EXISTS `demandeami` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user_emetteur` int(11) NOT NULL,
  `id_user_dest` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'En cours',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_user_emetteur` (`id_user_emetteur`,`id_user_dest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(20) NOT NULL,
  `mdp` varchar(36) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `mail` varchar(40) NOT NULL,
  `nb_essai` int(1) NOT NULL DEFAULT '0',
  `date_ban` timestamp NULL DEFAULT NULL,
  `telephone` int(11) NOT NULL,
  `latitude` varchar(10) DEFAULT NULL,
  `longitude` varchar(10) DEFAULT NULL,
  `token` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `login_2` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- --------------------------------------------------------

--
-- Utilisateur de la base
--

GRANT USAGE ON *.* TO 'RoadsServer'@'localhost' IDENTIFIED BY PASSWORD '*5BEE7733ABDA92468E5080F3BA5669F668075D70';

GRANT SELECT ON `roads`.* TO 'RoadsServer'@'localhost';

GRANT SELECT, INSERT (id_user_dest, id, id_user_emetteur), UPDATE (visibilite) ON `roads`.`ami` TO 'RoadsServer'@'localhost';

GRANT SELECT, INSERT (id_user_dest, id, id_user_emetteur), UPDATE (status) ON `roads`.`demandeami` TO 'RoadsServer'@'localhost';

GRANT SELECT, INSERT (nom, login, mdp, id, token, mail, telephone, prenom), UPDATE (latitude, longitude, nb_essai, token, date_ban) ON `roads`.`utilisateur` TO 'RoadsServer'@'localhost';
