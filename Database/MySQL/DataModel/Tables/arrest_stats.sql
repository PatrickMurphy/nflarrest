CREATE TABLE IF NOT EXISTS `arrest_stats` (
  `arrest_stats_id` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Team` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Name` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Encounter` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Category` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Outcome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `general_category_id` int(11) NOT NULL,
  `legal_level_id` int(11) NOT NULL,
  `resolution_category_id` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=908 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
