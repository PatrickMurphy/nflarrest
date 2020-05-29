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
