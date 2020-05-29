--
-- Table structure for table `dimFranchise`
--

DROP TABLE IF EXISTS `dimFranchise`;
CREATE TABLE `dimFranchise` (
  `FranchiseID` int(11) NOT NULL COMMENT 'Team Franchise Key',
  `FranchiseCode` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `FranchiseDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='A team may move but still part of a franchise';

--
-- Indexes for table `dimFranchise`
--
ALTER TABLE `dimFranchise`
  ADD PRIMARY KEY (`FranchiseID`);
--
-- AUTO_INCREMENT for table `dimFranchise`
--
ALTER TABLE `dimFranchise`
  MODIFY `FranchiseID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Team Franchise Key';

-- --------------------------------------------------------