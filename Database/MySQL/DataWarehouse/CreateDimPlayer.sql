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
