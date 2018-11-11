-- replace Date


--
-- Table structure for table `dimDate`
--

DROP TABLE IF EXISTS `dimDate`;
CREATE TABLE `dimDate` (
  `DateID` int(11) NOT NULL,
  `DateCode` int(8) NOT NULL COMMENT 'MMDDYYYY',
  `DateDesc` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT 'MM/DD/YYYY',
  `Date` datetime NOT NULL COMMENT 'The date in MySQL DateTime Format',
  `SeasonYear` int(4) NOT NULL,
  `SeasonStartDateFlag` int(1) DEFAULT 0,
  `SeasonEndDateFlag` int(1) DEFAULT 0,
  `PlayoffStartDateFlag` int(1) DEFAULT 0,
  `SuperBowlDateFlag` int(1) DEFAULT 0,
  `ProBowlDateFlag` int(1) DEFAULT 0,
  `InSeasonFlag` int(1) DEFAULT 0,
  `OffSeasonFlag` int(1) DEFAULT 1,
  `CalendarYear` int(4) NOT NULL,
  `CalendarMonth` int(2) NOT NULL,
  `CalendarMonthName` varchar(9) NOT NULL,
  `CalendarDay` int(2) NOT NULL COMMENT 'integer day of month',
  `CalendarDayName` varchar(9) NOT NULL COMMENT 'Monday, Tuesday etc',

  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimDate`
--
ALTER TABLE `dimDate`
  ADD PRIMARY KEY (`DateID`);

--
-- AUTO_INCREMENT for table `dimDate`
--
ALTER TABLE `dimDate`
  MODIFY `DateID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Date Key';

-- --------------------------------------------------------
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
-- replace InfractionCategory


--
-- Table structure for table `dimInfractionCategory`
--

DROP TABLE IF EXISTS `dimInfractionCategory`;
CREATE TABLE `dimInfractionCategory` (
  `InfractionCategoryID` int(11) NOT NULL,
  `InfractionCategoryCode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `InfractionCategoryDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimInfractionCategory`
--
ALTER TABLE `dimInfractionCategory`
  ADD PRIMARY KEY (`InfractionCategoryID`);

--
-- AUTO_INCREMENT for table `dimInfractionCategory`
--
ALTER TABLE `dimInfractionCategory`
  MODIFY `InfractionCategoryID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'InfractionCategory Key';

-- --------------------------------------------------------
-- replace Infraction


--
-- Table structure for table `dimInfraction`
--

DROP TABLE IF EXISTS `dimInfraction`;
CREATE TABLE `dimInfraction` (
  `InfractionID` int(11) NOT NULL,
  `InfractionCode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `InfractionDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `InfractionColor` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT '000000',
  `InfractionCategoryID` int(11) NOT NULL,
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimInfraction`
--
ALTER TABLE `dimInfraction`
  ADD PRIMARY KEY (`InfractionID`);

ALTER TABLE `dimInfraction`
ADD FOREIGN KEY (`InfractionCategoryID`) REFERENCES dimInfractionCategory(`InfractionCategoryID`);

ALTER TABLE `dimInfraction`
  MODIFY `InfractionID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Infraction Key';

-- --------------------------------------------------------

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

--
-- Table structure for table `dimPosition`
--

DROP TABLE IF EXISTS `dimPosition`;
CREATE TABLE `dimPosition` (
  `PositionID` int(11) NOT NULL COMMENT 'Position Key',
  `PositionCode` varchar(2) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Position Short Code',
  `PositionDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Position Title',
  `PositionTypeID` int(11) NOT NULL COMMENT 'Position Type (Off, Def, Spe)',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'First Created',
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Position Dimension: A record of positions and Types';

--
-- Indexes for table `dimPosition`
--
ALTER TABLE `dimPosition`
  ADD PRIMARY KEY (`PositionID`);

--
-- AUTO_INCREMENT for table `dimPosition`
--
ALTER TABLE `dimPosition`
  MODIFY `PositionID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Position Key';

-- --------------------------------------------------------
-- replace Player


--
-- Table structure for table `dimPlayer`
--

DROP TABLE IF EXISTS `dimPlayer`;
CREATE TABLE `dimPlayer` (
  `PlayerID` int(11) NOT NULL,
  `PlayerBirthDate` int(8) NOT NULL,  
  `PlayerDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Player Name',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimPlayer`
--
ALTER TABLE `dimPlayer`
  ADD PRIMARY KEY (`PlayerID`);

--
-- AUTO_INCREMENT for table `dimPlayer`
--
ALTER TABLE `dimPlayer`
  MODIFY `PlayerID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Player Key';

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

-- --------------------------------------------------------
--
-- Table structure for table `dimSeason`
--

DROP TABLE IF EXISTS `dimSeason`;
CREATE TABLE `dimSeason` (
  `SeasonID` int(11) NOT NULL,
  `SeasonCode` varchar(24) NOT NULL,  
  `SeasonDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Season Name',
  `Year` int(4) NOT NULL,
  `StartDate` datetime NOT NULL COMMENT 'Season Start Date',
  `EndDate` datetime NOT NULL COMMENT 'Season End Date',
  `PreSeasonDate` datetime NOT NULL COMMENT 'PreSeason Start Date',
  `ProBowlDate` datetime NOT NULL,
  `PlayoffDate` datetime NOT NULL COMMENT 'Season Playoff Start Date',
  `SuperBowlDate` datetime NOT NULL,
  `SuperBowlNumber` int(5) NOT NULL COMMENT 'Super Bowl #X',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimSeason`
--
ALTER TABLE `dimSeason`
  ADD PRIMARY KEY (`SeasonID`);

--
-- AUTO_INCREMENT for table `dimSeason`
--
ALTER TABLE `dimSeason`
  MODIFY `SeasonID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Season Key';

-- --------------------------------------------------------
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
