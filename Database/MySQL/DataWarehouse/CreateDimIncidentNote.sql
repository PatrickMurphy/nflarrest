--
-- Table structure for table `dimIncidentNote`
--

DROP TABLE IF EXISTS `dimIncidentNote`;
CREATE TABLE `dimIncidentNote` (
  `IncidentNoteID` int(11) NOT NULL,
  `IncidentID` int(11) NOT NULL COMMENT 'The ID of the incident that this describes',
  `IncidentNoteCode` varchar(5) NOT NULL,  
  `IncidentNoteTitle` varchar(25) DEFAULT NULL COMMENT 'A title for the note (optional)',
  `IncidentNoteDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Incident Note',
  `Active` int(1) NOT NULL COMMENT 'Is this the most recent record',
  `InActiveDate` datetime DEFAULT NULL COMMENT 'The date that the record became inactive',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'PatrickMurphy'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimIncidentNote`
--
ALTER TABLE `dimIncidentNote`
  ADD PRIMARY KEY (`IncidentNoteID`);

--
-- AUTO_INCREMENT for table `dimIncidentNote`
--
ALTER TABLE `dimIncidentNote`
  MODIFY `IncidentNoteID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IncidentNote Key';

-- --------------------------------------------------------
