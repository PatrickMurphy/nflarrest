--
-- Table structure for table `dimTemplateName`
--

DROP TABLE IF EXISTS `dimTemplateName`;
CREATE TABLE `dimTemplateName` (
  `TemplateNameID` int(11) NOT NULL,
  `TemplateNameCode` varchar(5) NOT NULL,  
  `TemplateNameDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'TemplateName Name',
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `dimTemplateName`
--
ALTER TABLE `dimTemplateName`
  ADD PRIMARY KEY (`TemplateNameID`);

--
-- AUTO_INCREMENT for table `dimTemplateName`
--
ALTER TABLE `dimTemplateName`
  MODIFY `TemplateNameID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TemplateName Key';

-- --------------------------------------------------------
