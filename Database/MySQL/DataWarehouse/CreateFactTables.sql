-- ========================================================
-- Fact Tables
-- ========================================================

--
-- Table structure for table `fctIncidents`
--

DROP TABLE IF EXISTS `fctIncidents`;
CREATE TABLE `fctIncidents` (
  `IncidentID` int(11) NOT NULL COMMENT 'Incident Key',
  `DateID` int(11) NOT NULL COMMENT 'Date Key',
  `PlayerID` int(11) NOT NULL COMMENT 'Player Key',
  `TeamID` int(11) NOT NULL COMMENT 'Team Key',
  `PositionID` int(11) NOT NULL COMMENT 'Position Key',
  `InfractionID` int(11) NOT NULL COMMENT 'Infraction Key',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Date',
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Primary Fact Table';


--
-- Indexes for table `fctIncidents`
--
ALTER TABLE `fctIncidents`
  ADD PRIMARY KEY (`IncidentID`);

--
-- AUTO_INCREMENT for table `fctIncidents`
--
ALTER TABLE `fctIncidents`
  MODIFY `IncidentID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Incident Key';


ALTER TABLE `fctIncidents`
ADD FOREIGN KEY (`DateID`) REFERENCES dimDate(`DateID`);

ALTER TABLE `fctIncidents`
ADD FOREIGN KEY (`PlayerID`) REFERENCES dimPlayer(`PlayerID`);

ALTER TABLE `fctIncidents`
ADD FOREIGN KEY (`TeamID`) REFERENCES dimTeam(`TeamID`);

ALTER TABLE `fctIncidents`
ADD FOREIGN KEY (`PositionID`) REFERENCES dimPosition(`PositionID`);

ALTER TABLE `fctIncidents`
ADD FOREIGN KEY (`InfractionID`) REFERENCES dimInfraction(`InfractionID`);
