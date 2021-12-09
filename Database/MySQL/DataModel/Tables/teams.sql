
CREATE TABLE IF NOT EXISTS `teams` (
  `teams_id` int(11) NOT NULL,
  `teams_full_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Team_preffered_name` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `team_code` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'USA',
  `division` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `bandwagon_code` int(11) NOT NULL,
  `Team_logo_id` int(11) NOT NULL,
  `reddit_group_id` int(11) NOT NULL COMMENT 'ID from the Reddit Group Table'
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
