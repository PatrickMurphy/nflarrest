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
