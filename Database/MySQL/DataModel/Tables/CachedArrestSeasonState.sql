
CREATE TABLE IF NOT EXISTS `CachedArrestSeasonState` (
  `arrest_stats_id` int(11) NOT NULL DEFAULT '0',
  `season` year(4) NOT NULL DEFAULT '0000',
  `SeasonState` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
