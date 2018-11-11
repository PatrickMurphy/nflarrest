--
-- Table structure for table `dimIncidentOutcome`
--

DROP TABLE IF EXISTS `dimIncidentOutcome`;
CREATE TABLE `dimIncidentOutcome` (
  `IncidentOutcomeID` int(11) NOT NULL,
  `IncidentID` int(11) NOT NULL COMMENT 'The ID of the incident that this describes',
  `IncidentOutcomeTitle` varchar(63) NOT NULL,  
  `IncidentOutcomeDesc` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'IncidentOutcome Details',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimIncidentOutcome`
--
ALTER TABLE `dimIncidentOutcome`
  ADD PRIMARY KEY (`IncidentOutcomeID`);

--
-- AUTO_INCREMENT for table `dimIncidentOutcome`
--
ALTER TABLE `dimIncidentOutcome`
  MODIFY `IncidentOutcomeID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IncidentOutcome Key';

-- --------------------------------------------------------
