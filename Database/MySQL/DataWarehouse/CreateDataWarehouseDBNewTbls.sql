-- --------------------------------------------------------
--
-- Table structure for table `dimExternalSourceCategory`
--

DROP TABLE IF EXISTS `dimExternalSourceCategory`;
CREATE TABLE `dimExternalSourceCategory` (
  `ExternalSourceCategoryID` int(11) NOT NULL,
  `ExternalSourceCategoryCode` varchar(5) NOT NULL,  
  `ExternalSourceCategoryDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'ExternalSourceCategory Title/Desc',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimExternalSourceCategory`
--
ALTER TABLE `dimExternalSourceCategory`
  ADD PRIMARY KEY (`ExternalSourceCategoryID`);

--
-- AUTO_INCREMENT for table `dimExternalSourceCategory`
--
ALTER TABLE `dimExternalSourceCategory`
  MODIFY `ExternalSourceCategoryID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ExternalSourceCategory Key';

-- --------------------------------------------------------
--
-- Table structure for table `dimExternalSource`
--

DROP TABLE IF EXISTS `dimExternalSource`;
CREATE TABLE `dimExternalSource` (
  `ExternalSourceID` int(11) NOT NULL,
  `ExternalSourceCode` varchar(5) NOT NULL,  
  `ExternalSourceShortDesc` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `ExternalSourceDesc` varchar(255) NOT NULL,
  `ExternalSourceRating` int(2) DEFAULT 5 COMMENT 'On a scale from 1-10 how trustworthy/objective is this source.',
  `ExteranlSourceCategoryID` int(11) NOT NULL,
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimExternalSource`
--
ALTER TABLE `dimExternalSource`
  ADD PRIMARY KEY (`ExternalSourceID`);

--
-- AUTO_INCREMENT for table `dimExternalSource`
--
ALTER TABLE `dimExternalSource`
  MODIFY `ExternalSourceID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ExternalSource Key';

-- --------------------------------------------------------
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
