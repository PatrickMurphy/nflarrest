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
