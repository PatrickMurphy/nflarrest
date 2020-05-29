--
-- Table structure for table `dimSeason`
--

DROP TABLE IF EXISTS `dimSeason`;
CREATE TABLE `dimSeason` (
  `SeasonID` int(11) NOT NULL,
  `SeasonCode` varchar(24) NOT NULL,  
  `SeasonDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Season Name',
  `Year` int(4) NOT NULL,
  `StartDate` datetime NOT NULL COMMENT 'Season Start Date',
  `EndDate` datetime NOT NULL COMMENT 'Season End Date',
  `PreSeasonDate` datetime NOT NULL COMMENT 'PreSeason Start Date',
  `ProBowlDate` datetime NOT NULL,
  `PlayoffDate` datetime NOT NULL COMMENT 'Season Playoff Start Date',
  `SuperBowlDate` datetime NOT NULL,
  `SuperBowlNumber` int(5) NOT NULL COMMENT 'Super Bowl #X',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimSeason`
--
ALTER TABLE `dimSeason`
  ADD PRIMARY KEY (`SeasonID`);

--
-- AUTO_INCREMENT for table `dimSeason`
--
ALTER TABLE `dimSeason`
  MODIFY `SeasonID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Season Key';

-- --------------------------------------------------------
