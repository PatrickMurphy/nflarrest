
--
-- Table structure for table `dimPosition`
--

DROP TABLE IF EXISTS `dimPosition`;
CREATE TABLE `dimPosition` (
  `PositionID` int(11) NOT NULL COMMENT 'Position Key',
  `PositionCode` varchar(2) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Position Short Code',
  `PositionDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Position Title',
  `PositionTypeID` int(11) NOT NULL COMMENT 'Position Type (Off, Def, Spe)',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'First Created',
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Position Dimension: A record of positions and Types';

--
-- Indexes for table `dimPosition`
--
ALTER TABLE `dimPosition`
  ADD PRIMARY KEY (`PositionID`);

--
-- AUTO_INCREMENT for table `dimPosition`
--
ALTER TABLE `dimPosition`
  MODIFY `PositionID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Position Key';

-- --------------------------------------------------------
