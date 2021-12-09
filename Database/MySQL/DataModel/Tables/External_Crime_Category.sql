CREATE TABLE IF NOT EXISTS `External_Crime_Category` (
  `External_Crime_Category_id` int(11) NOT NULL,
  `External_Source_id` int(11) NOT NULL COMMENT 'key of external source',
  `Name` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Title/Name of category',
  `Description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Crime Categories from external sources';
