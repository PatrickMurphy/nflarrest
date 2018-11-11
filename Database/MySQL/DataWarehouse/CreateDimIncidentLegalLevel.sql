--
-- Table structure for table `dimIncidentLegalLevel`
--

DROP TABLE IF EXISTS `dimIncidentLegalLevel`;
CREATE TABLE `dimIncidentLegalLevel` (
  `IncidentLegalLevelID` int(11) NOT NULL,
  `IncidentLegalLevelCode` varchar(5) NOT NULL,  
  `IncidentLegalLevelDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'IncidentLegalLevel Name',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimIncidentLegalLevel`
--
ALTER TABLE `dimIncidentLegalLevel`
  ADD PRIMARY KEY (`IncidentLegalLevelID`);

--
-- AUTO_INCREMENT for table `dimIncidentLegalLevel`
--
ALTER TABLE `dimIncidentLegalLevel`
  MODIFY `IncidentLegalLevelID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IncidentLegalLevel Key';

-- --------------------------------------------------------
