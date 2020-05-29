
--
-- Table structure for table `dimTeam`
--

DROP TABLE IF EXISTS `dimTeam`;
CREATE TABLE `dimTeam` (
  `TeamID` int(11) NOT NULL,
  `TeamCode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `TeamDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `TeamFullName` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `FranchiseID` int(11) NOT NULL,
  `City` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `State` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `Stadium` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `DivisionID` int(11) NOT NULL,
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimTeam`
--
ALTER TABLE `dimTeam`
  ADD PRIMARY KEY (`TeamID`);

--
-- AUTO_INCREMENT for table `dimTeam`
--
ALTER TABLE `dimTeam`
  MODIFY `TeamID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Team Key';

-- --------------------------------------------------------
