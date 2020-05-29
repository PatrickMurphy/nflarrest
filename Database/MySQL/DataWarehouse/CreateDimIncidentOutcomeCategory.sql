--
-- Table structure for table `dimIncidentOutcomeCategory`
--

DROP TABLE IF EXISTS `dimIncidentOutcomeCategory`;
CREATE TABLE `dimIncidentOutcomeCategory` (
  `IncidentOutcomeCategoryID` int(11) NOT NULL,
  `IncidentOutcomeCategoryCode` varchar(5) NOT NULL,  
  `IncidentOutcomeCategoryDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'IncidentOutcomeCategory Name',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimIncidentOutcomeCategory`
--
ALTER TABLE `dimIncidentOutcomeCategory`
  ADD PRIMARY KEY (`IncidentOutcomeCategoryID`);

--
-- AUTO_INCREMENT for table `dimIncidentOutcomeCategory`
--
ALTER TABLE `dimIncidentOutcomeCategory`
  MODIFY `IncidentOutcomeCategoryID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IncidentOutcomeCategory Key';

-- --------------------------------------------------------
