CREATE TABLE IF NOT EXISTS `ArrestCountByDateAndTeam` (
  `Date` date DEFAULT NULL,
  `team` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `arrest_count` bigint(21) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;