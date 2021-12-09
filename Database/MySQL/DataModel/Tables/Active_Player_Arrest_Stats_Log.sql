CREATE TABLE IF NOT EXISTS `Active_Player_Arrest_Stats_Log` (
  `observed_date` date NOT NULL,
  `arrested` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `percent` decimal(10,5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;