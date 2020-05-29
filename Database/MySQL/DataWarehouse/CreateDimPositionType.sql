
--
-- Table structure for table `dimPositionType`
--

DROP TABLE IF EXISTS `dimPositionType`;
CREATE TABLE `dimPositionType` (
  `PositionTypeID` int(11) NOT NULL COMMENT 'Position Type Key',
  `PositionTypeCode` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `PositionTypeDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Position type Offense, Defense, Special, Front office etc';
--
-- Indexes for table `dimPositionType`
--
ALTER TABLE `dimPositionType`
  ADD PRIMARY KEY (`PositionTypeID`);

--
-- AUTO_INCREMENT for table `dimPositionType`
--
ALTER TABLE `dimPositionType`
  MODIFY `PositionTypeID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Position Type Key';

-- --------------------------------------------------------
