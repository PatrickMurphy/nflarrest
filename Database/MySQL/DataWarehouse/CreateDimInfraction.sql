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
