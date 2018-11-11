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
