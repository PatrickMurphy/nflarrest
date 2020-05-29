--
-- Table structure for table `dimIncidentSource`
--

DROP TABLE IF EXISTS `dimIncidentSource`;
CREATE TABLE `dimIncidentSource` (
  `IncidentSourceID` int(11) NOT NULL,
  `IncidentID` int(11) NOT NULL COMMENT 'The ID of the incident that this describes',
  `IncidentSourceURL` varchar(127) DEFAULT NULL,
  `ExternalSourceID` int(11) NOT NULL COMMENT 'The Key for the External Source, describe and rate source.',
  `Active` int(1) DEFAULT 0,
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimIncidentSource`
--
ALTER TABLE `dimIncidentSource`
  ADD PRIMARY KEY (`IncidentSourceID`);

--
-- AUTO_INCREMENT for table `dimIncidentSource`
--
ALTER TABLE `dimIncidentSource`
  MODIFY `IncidentSourceID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IncidentSource Key';

-- --------------------------------------------------------
