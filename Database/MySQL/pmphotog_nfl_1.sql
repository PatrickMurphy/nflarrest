-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 21, 2018 at 03:42 AM
-- Server version: 5.5.51-38.2
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- --------------------------------------------------------

--
-- Stand-in structure for view `ActivePlayerArrestPercent_v`
--
CREATE TABLE IF NOT EXISTS `ActivePlayerArrestPercent_v` (
`arrested` bigint(21)
,`active` bigint(21)
,`percent` decimal(24,4)
);

-- --------------------------------------------------------

--
-- Table structure for table `Active_Player_Arrest_Stats_Log`
--
-- Creation: Nov 02, 2017 at 05:46 PM
-- Last update: Dec 10, 2017 at 10:18 PM
--

CREATE TABLE IF NOT EXISTS `Active_Player_Arrest_Stats_Log` (
  `observed_date` date NOT NULL,
  `arrested` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `percent` decimal(10,5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `ArrestCountByDateAndTeam`
--
-- Creation: Feb 02, 2018 at 03:25 AM
-- Last update: Feb 02, 2018 at 03:25 AM
--

CREATE TABLE IF NOT EXISTS `ArrestCountByDateAndTeam` (
  `Date` date DEFAULT NULL,
  `team` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `arrest_count` bigint(21) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Stand-in structure for view `ArrestDateFact`
--
CREATE TABLE IF NOT EXISTS `ArrestDateFact` (
`arrest_stats_id` int(11)
,`Date` date
,`DateCount` bigint(21)
,`LastDate` date
,`LastTeamDate` date
,`LastCrimeDate` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestDateRedditGroups`
--
CREATE TABLE IF NOT EXISTS `ArrestDateRedditGroups` (
`arrest_stats_id` int(11)
,`Date` date
,`Team` varchar(5)
,`Team_name` varchar(25)
,`Team_preffered_name` varchar(55)
,`Team_city` varchar(35)
,`Team_logo_id` int(11)
,`Team_Conference` varchar(3)
,`Team_Division` varchar(5)
,`Team_Conference_Division` varchar(9)
,`Team_hex_color` varchar(6)
,`Team_hex_alt_color` varchar(6)
,`reddit_group_id` int(11)
,`Name` varchar(25)
,`Position` varchar(5)
,`Position_name` varchar(25)
,`Position_type` varchar(2)
,`Encounter` varchar(12)
,`Category` varchar(25)
,`Crime_category` varchar(25)
,`Crime_category_color` varchar(6)
,`Description` varchar(255)
,`Outcome` varchar(255)
,`Season` year(4)
,`ArrestSeasonState` varchar(9)
,`general_category_id` int(11)
,`legal_level_id` int(11)
,`resolution_category_id` int(11)
,`Year` int(4)
,`Month` int(2)
,`Day` int(2)
,`Day_of_Week` varchar(9)
,`Day_of_Week_int` int(1)
,`DaysSince` bigint(21)
,`DaysToLastArrest` bigint(21)
,`DaysToLastCrimeArrest` bigint(21)
,`DaysToLastTeamArrest` bigint(21)
,`Reddit_Group_Name` varchar(128)
,`Reddit_Group_SubReddit` varchar(255)
,`Reddit_Group_URL` varchar(255)
,`Reddit_Group_Description` longtext
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestOMeterStats`
--
CREATE TABLE IF NOT EXISTS `ArrestOMeterStats` (
`Average` decimal(24,4)
,`Record` bigint(21)
,`Current` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestsByDay`
--
CREATE TABLE IF NOT EXISTS `ArrestsByDay` (
`Year` int(4)
,`Month` int(2)
,`Day` int(2)
,`count(``arrest_stats_id``)` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestsByMonth`
--
CREATE TABLE IF NOT EXISTS `ArrestsByMonth` (
`Year` int(4)
,`Month` int(2)
,`Count(``arrest_stats_id``)` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestsByYear`
--
CREATE TABLE IF NOT EXISTS `ArrestsByYear` (
`Year` int(4)
,`TotalArrests` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestsByYearView`
--
CREATE TABLE IF NOT EXISTS `ArrestsByYearView` (
`Year` int(4)
,`TotalArrests` bigint(21)
,`ArrestsYTD` bigint(21)
,`ArrestsDiff` bigint(22)
);

-- --------------------------------------------------------

--
-- Table structure for table `ArrestsCacheTable`
--
-- Creation: Apr 20, 2018 at 07:56 AM
-- Last update: Apr 20, 2018 at 07:56 AM
-- Last check: Apr 20, 2018 at 07:56 AM
--

CREATE TABLE IF NOT EXISTS `ArrestsCacheTable` (
  `arrest_stats_id` int(11) NOT NULL DEFAULT '0',
  `Date` date DEFAULT NULL,
  `Team` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Team_preffered_name` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `Team_city` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `Team_logo_id` int(11) NOT NULL,
  `Team_Conference` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_Division` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_Conference_Division` varchar(9) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_hex_color` varchar(6) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'The hex value that represents the team main color, without the preceding # hash symbol',
  `Team_hex_alt_color` varchar(6) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'The hex value that represents the team second color, without the preceding # hash symbol',
  `reddit_group_id` int(11) NOT NULL COMMENT 'Reddit Group ID',
  `Name` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Position_type` varchar(2) COLLATE utf8_unicode_ci NOT NULL COMMENT 'O = offense, D = Defense, S = special teams',
  `Encounter` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Category` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Crime_category` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Crime_category_color` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Outcome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Season` year(4) NOT NULL DEFAULT '0000',
  `ArrestSeasonState` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `general_category_id` int(11) NOT NULL,
  `legal_level_id` int(11) NOT NULL,
  `resolution_category_id` int(11) NOT NULL,
  `Year` int(4) DEFAULT NULL,
  `Month` int(2) DEFAULT NULL,
  `Day` int(2) DEFAULT NULL,
  `Day_of_Week` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Day_of_Week_int` int(1) DEFAULT NULL,
  `YearToDate` int(0) DEFAULT NULL,
  `DaysSince` bigint(21) DEFAULT NULL,
  `DaysToLastArrest` bigint(21) DEFAULT NULL,
  `DaysToLastCrimeArrest` bigint(21) DEFAULT NULL,
  `DaysToLastTeamArrest` bigint(21) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `ArrestsCacheTable2`
--
-- Creation: Jan 30, 2018 at 12:36 AM
-- Last update: Jan 30, 2018 at 12:36 AM
-- Last check: Jan 30, 2018 at 12:36 AM
--

CREATE TABLE IF NOT EXISTS `ArrestsCacheTable2` (
  `arrest_stats_id` int(11) NOT NULL DEFAULT '0',
  `Date` date DEFAULT NULL,
  `Team` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Team_preffered_name` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `Team_city` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `Team_logo_id` int(11) NOT NULL,
  `Team_Conference` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_Division` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_Conference_Division` varchar(9) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_hex_color` varchar(6) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'The hex value that represents the team main color, without the preceding # hash symbol',
  `Team_hex_alt_color` varchar(6) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'The hex value that represents the team second color, without the preceding # hash symbol',
  `reddit_group_id` int(11) NOT NULL COMMENT 'Reddit Group ID',
  `Name` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Position_type` varchar(2) COLLATE utf8_unicode_ci NOT NULL COMMENT 'O = offense, D = Defense, S = special teams',
  `Encounter` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Category` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Crime_category` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Crime_category_color` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Outcome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Season` year(4) NOT NULL DEFAULT '0000',
  `ArrestSeasonState` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `general_category_id` int(11) NOT NULL,
  `legal_level_id` int(11) NOT NULL,
  `resolution_category_id` int(11) NOT NULL,
  `Year` int(4) DEFAULT NULL,
  `Month` int(2) DEFAULT NULL,
  `Day` int(2) DEFAULT NULL,
  `Day_of_Week` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Day_of_Week_int` int(1) DEFAULT NULL,
  `DaysSince` bigint(21) DEFAULT NULL,
  `DaysToLastArrest` bigint(21) DEFAULT NULL,
  `DaysToLastCrimeArrest` bigint(21) DEFAULT NULL,
  `DaysToLastTeamArrest` bigint(21) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Stand-in structure for view `ArrestsDateView`
--
CREATE TABLE IF NOT EXISTS `ArrestsDateView` (
`arrest_stats_id` int(11)
,`Date` date
,`Team` varchar(5)
,`Team_name` varchar(25)
,`Team_preffered_name` varchar(55)
,`Team_city` varchar(35)
,`Team_logo_id` int(11)
,`Team_Conference` varchar(3)
,`Team_Division` varchar(5)
,`Team_Conference_Division` varchar(9)
,`Team_hex_color` varchar(6)
,`Team_hex_alt_color` varchar(6)
,`reddit_group_id` int(11)
,`Name` varchar(25)
,`Position` varchar(5)
,`Position_name` varchar(25)
,`Position_type` varchar(2)
,`Encounter` varchar(12)
,`Category` varchar(25)
,`Crime_category` varchar(25)
,`Crime_category_color` varchar(6)
,`Description` varchar(255)
,`Outcome` varchar(255)
,`Season` year(4)
,`ArrestSeasonState` varchar(9)
,`general_category_id` int(11)
,`legal_level_id` int(11)
,`resolution_category_id` int(11)
,`Year` int(4)
,`Month` int(2)
,`Day` int(2)
,`Day_of_Week` varchar(9)
,`Day_of_Week_int` int(1)
,`YearToDate` int(0)
,`DaysSince` bigint(21)
,`DaysToLastArrest` bigint(21)
,`DaysToLastCrimeArrest` bigint(21)
,`DaysToLastTeamArrest` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestSeasonState`
--
CREATE TABLE IF NOT EXISTS `ArrestSeasonState` (
`season` year(4)
,`SeasonState` varchar(9)
,`cnt` decimal(42,0)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestSeasonStateByArrest`
--
CREATE TABLE IF NOT EXISTS `ArrestSeasonStateByArrest` (
`arrest_stats_id` int(11)
,`season` year(4)
,`SeasonState` varchar(9)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestSeasonStateByTeam`
--
CREATE TABLE IF NOT EXISTS `ArrestSeasonStateByTeam` (
`season` year(4)
,`SeasonState` varchar(9)
,`team` varchar(5)
,`cnt` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestSeasonStateSummary`
--
CREATE TABLE IF NOT EXISTS `ArrestSeasonStateSummary` (
`season` year(4)
,`InSeason` decimal(42,0)
,`OffSeason` decimal(42,0)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ArrestsYearToDate`
--
CREATE TABLE IF NOT EXISTS `ArrestsYearToDate` (
`Year` int(4)
,`ArrestsYTD` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `arrest_stats`
--
-- Creation: Jul 19, 2017 at 09:21 PM
-- Last update: Apr 17, 2018 at 03:51 PM
-- Last check: Aug 24, 2017 at 06:36 PM
--

CREATE TABLE IF NOT EXISTS `arrest_stats` (
  `arrest_stats_id` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Team` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Name` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Encounter` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Category` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Outcome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `general_category_id` int(11) NOT NULL,
  `legal_level_id` int(11) NOT NULL,
  `resolution_category_id` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=908 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `arrest_stats`
--


INSERT INTO `arrest_stats` (`arrest_stats_id`, `Date`, `Team`, `Name`, `Position`, `Encounter`, `Category`, `Description`, `Outcome`, `general_category_id`, `legal_level_id`, `resolution_category_id`) VALUES
(616, '2004-06-03', 'KC', 'Cliff Crosby', 'CB', 'Arrested', 'Disorderly conduct', 'Accused of screaming and swearing at police in Erie, Pa., after being stuck in traffic.', 'Pleaded guilty to disorderly conduct, $125.50 in costs, 25 hours of community service.', 5, 1, 1),
(617, '2004-06-02', 'DEN', 'Sam Brandon', 'S', 'Arrested', 'Domestic violence', 'Accused of misdemeanor child abuse and criminal mischief in domestic dispute.', 'Charges dropped.', 2, 2, 2),
(618, '2004-05-25', 'DET', 'Brock Marion', 'S', 'Charged', 'Theft', 'Accused of bilking his car insurance company out of $54,000 by falsely claiming his car was stolen in 2003.', 'Pleaded no contest, four years probation, $54,000 in restitution, $10,000 to the American Red Cross.', 9, 1, 1),
(619, '2004-05-06', 'HOU', 'Marcus Coleman', 'S', 'Arrested', 'DUI', 'Accused of hitting a curb with his Mercedes, failing a sobriety test and drunk driving in Houston.', 'Found guilty by jury, three days in jail, $2,000 fine and a one-year suspension of his driver''s license.', 1, 1, 1),
(620, '2004-04-27', 'NO', 'Jay Bellamy', 'S', 'Arrested', 'DUI', 'Pulled over about 12:50 a.m., accused of drunk driving in his 2002 Cadillac.', 'Resolution undetermined.', 1, 1, 1),
(621, '2004-04-24', 'LA', 'Leonard Little', 'DE', 'Arrested', 'DUI', 'Pulled over about 3:45 a.m. near St. Louis, accused of speeding and drunk driving. He previously drove drunk in 1998 accident that killed a woman.', 'Acquitted on drunk-driving charge by jury, convicted of speeding.', 1, 1, 1),
(622, '2004-04-20', 'BAL', 'Corey Fuller', 'CB', 'Arrested', 'Gambling, gun', 'Accused of hosting lucrative card games at his house, where police raid found him carrying a holstered gun.', 'Acquitted by jury. He had a permit for the gun.', 27, 1, 1),
(623, '2004-04-17', 'NE', 'Ty Law', 'CB', 'Arrested', 'Resisting arrest', 'Police tried to stop his Rolls-Royce for a lane violation in Miami before he sped away.', 'Charge dropped.', 10, 1 , 2),
(624, '2004-04-11', 'TB', 'Ellis Wyms', 'DT', 'Arrested', 'Criminal mischief', 'Accused of kicking in door of limousine, causing more than $1,000 in damage in argument with driver.', 'Diversion program, paid $1,400 for damage, in exchange for dropping charge.', 27, 1, 1),
(625, '2004-04-10', 'MIN', 'E.J. Henderson', 'LB', 'Arrested', 'DUI', 'Pulled over in Interstate 95 in Maryland, accused of drunk driving.', 'Convicted, two years of probation, $1,020 in fines and costs, ordered to attend shock trauma tour at hospital.', 1, 1, 1),
(626, '2004-04-03', 'IND', 'Joseph Jefferson', 'CB', 'Arrested', 'DUI', 'Accused of drunk driving after driving his Chevrolet Impala into a ditch in Indiana. Blood-alcohol measured at .15.', 'Pleaded guilty, sentenced to 30 days in jail before he sought a new attorney and new trial.', 1, 1, 1),
(627, '2004-03-15', 'GB', 'Joe Johnson', 'DE', 'Arrested', 'Violating court order', 'Accused of contempt of court after not showing up for a hearing on marijuana charge from May 2003.', 'Resolution undetermined. Bond doubled to $3,375 after hearing with the judge.', 27, 1, 1),
(628, '2004-03-02', 'NYG', 'David Tyree', 'WR', 'Arrested', 'Drugs', 'Pulled over for speeding in New Jersey, accused of having a half pound of marijuana in his car with intent to distribute.', 'Pleaded to a reduced charge, probation, treatment, night in jail.', 3, 1, 1),
(629, '2004-02-25', 'BAL', 'Jamal Lewis', 'RB', 'Indicted', 'Drugs', 'Federal indictment accused him of drug dealing and cocaine possession in Atlanta.', 'Pleaded guilty to using a cell phone to set up a drug deal, sentenced to four months in prison, suspended two games.', 3, 1, 1),
(630, '2004-02-15', 'TEN', 'Jason Gesser', 'QB', 'Arrested', 'DUI', 'Pulled over in Honululu for running a red light, accused of drunk driving.', 'Pleaded guilty, 14 hours of alcohol abuse classes, $150 fine, $307 in court fees, 30-day license suspension.', 1, 1, 1),
(631, '2004-02-02', 'CIN', 'Levi Jones', 'OT', 'Arrested', 'Obstruction', 'Accused of trying to take a baton from a police officer in a melee outside a club in Houston.', 'Charge dropped.', 10, 1, 2),
(632, '2004-01-14', 'SF', 'Jeff Garcia', 'QB', 'Arrested', 'DUI', 'Pulled over in San Jose, accused of drunk driving. Blood-alcohol measured at .219.', 'Pleaded guilty, three years of probation, $1,491 fine, eight days of community service.', 1, 1, 1),
(633, '2003-12-05', 'KC', 'Larry Johnson', 'RB', 'Charged', 'Domestic violence, gun', 'Accused of brandishing a gun during a dispute with his girlfriend, felony aggravated assault.', 'Diversion program, 120 hours of community service in exchange for dropping the case. Anger-management class.', 2, 3, 1),
(634, '2003-12-02', 'CIN', 'James Lynch', 'FB', 'Arrested', 'Public intoxication', 'Accused of public urination, resisting arrest, eluding police and driving with a suspended license. Police used chemical irritant to subdue him.', 'Pleaded guilty to disorderly conduct, two years of probation, 10 days in jail.', 7, 1, 1),
(635, '2003-11-18', 'MIN', 'Kenny Mixon', 'DE', 'Arrested', 'DUI', 'Pulled over in Deephaven, Min., accused of drunken driving. It was his third drunken driving arrest in the county in 16 months.', 'Found guilty, 216 hours of community service, 30 days in the county workhouse, 60 days house arrest.', 1, 1, 1),
(636, '2003-11-17', 'IND', 'Joseph Jefferson', 'CB', 'Arrested', 'DUI, gun', 'Accused of drunken driving in Bowling Green, Ky., after police saw him driving in a parking lot. He also had a gun on the passenger seat.', 'Pleaded guilty to driving with a suspended license.', 6, 1, 1),
(637, '2003-11-17', 'MIN', 'Kevin Williams', 'DT', 'Arrested', 'DUI', 'Pulled over in Edina, Min., accused of drunk driving. Blood-alcohol measured at .14.', 'Pleaded guilty to careless driving, $300 fine, 30-day suspended sentence.', 1, 1, 1),
(638, '2003-10-27', 'CLE', 'William Green', 'RB', 'Arrested', 'DUI, drugs', 'Pulled over, accused of drunk driving and having a bag of marijuana in his car. Blood-alcohol measured at .165.', 'Convicted, sentenced to three days in jail in February. NFL suspension of four games.', 1, 1, 1),
(639, '2003-10-26', 'JAC', 'T.J. Slaughter', 'LB', 'Arrested', 'Assault, gun', 'Accused of aggravated assault after two teens said he pointed a gun at them on a highway in verbal dispute. Police found the gun in his car.', 'Diversion program. Released by team a day later.', 6, 1, 1),
(640, '2003-10-21', 'NE', 'Kenyatta Jones', 'OT', 'Arrested', 'Assault', 'Accused of throwing a cup of hot water on his house guest.', 'Pleaded no contest, one year of probation. Team released him five days later.', 4, 1, 1),
(641, '2003-10-11', 'ATL', 'Juran Bolden', 'CB', 'Arrested', 'Theft, drugs', 'Accused of driving stoken 2000 GMC Denali vehicle, possession of marijuana in Atlanta.', 'Pleaded no contest to felony possession of stolen vehicle, misdemeanor stolen tags, three years probation, $3,000.', 9, 2, 1),
(642, '2003-10-07', 'CHI', 'Rabih Abdullah', 'RB', 'Arrested', 'DUI', 'Police said his SUV rolled over and gave him a concussion, accused him of drunk driving.', 'Pleaded guilty to DUI, sentenced to one year of probation, #1,344 fines and costs.', 1, 1, 1),
(643, '2003-10-01', 'NYJ', 'John Abraham', 'DE', 'Arrested', 'DUI', 'Accused of refusing a sobriety test, drunk driving after crashing Hummer into fire hydrant in Baldwin, N.Y.', 'Pleaded guilty to reduced charge of driving while impaired, fined $330, benched by team for one game.', 1, 1, 1),
(644, '2003-09-20', 'OAK', 'Sebastian Janikowski', 'K', 'Arrested', 'Assault, alcohol', 'Accused of misdemeanor assault, vandalism and public drunkenness after fight at supper club in Walnut Creek, Calif.', 'Charges dropped for lack of evidence.', 4, 2, 2),
(645, '2003-09-16', 'CAR', 'Jarrod Cooper', 'S', 'Arrested', 'DUI, drugs', 'Pulled over for speeding, accused of drunk driving, possession of a controlled substance (Xanax) without a prescription.', 'Pleaded guilty to driving while impaired, one year deferred sentence, one year probation, four-game NFL suspension.', 3, 1, 1),
(646, '2003-09-14', 'LAC', 'Matt Wilhelm', 'LB', 'Arrested', 'DUI', 'Police suspected him of drunk driving in San Diego. He acknowledged making a mistake.', 'Found guilty, five years probation, $1,700 fine, 180-day suspended jail sentence.', 1, 1, 1),
(647, '2003-09-10', 'BUF', 'Rodney Wright', 'WR', 'Arrested', 'DUI', 'Accused of refusing breath test, drunk driving, driving without a license and unsafe lane changes after three-car accident in which three were hurt.', 'Resolution undetermined. Released by team within hours.', 1, 1, 1),
(648, '2003-08-21', 'LAC', 'Leonardo Carson', 'DT', 'Arrested', 'Burglary, assault', 'On leave from team to attend his grandfather''s funeral, he was accused of breaking into a woman''s apartment and assaulting her in Mobile, Ala.', 'Pleaded guilty, sentenced to 30 days in jail.', 4, 1, 1),
(649, '2003-08-18', 'BAL', 'Chris McAlister', 'CB', 'Arrested', 'DUI', 'Accused of drunk driving in Northern Virginia, forcing him to miss team practice.', 'Charge dropped for lack of evidence.', 1, 1, 2),
(650, '2003-07-25', 'MIN', 'Mike Nattiel', 'LB', 'Arrested', 'DUI', 'Accused of drunk driving in Minnesota just hours before he was to report to the start of training camp in Mankato.', 'Pleaded guilty to careless driving, 30-day suspended sentence, one year of probation.', 1, 1, 1),
(651, '2003-07-18', 'DEN', 'Daryl Gardener', 'DT', 'Arrested', 'Disorderly conduct', 'Accused of fighting with another customer during long wait to be seated at restaurant. Gardener tore ligament in wrist.', 'Resolution undetermined.', 5, 1, 1),
(652, '2003-07-18', 'MIA', 'Justin Seaverns', 'LB', 'Arrested', 'Harassment', 'Accused of making harassing phone calls to his former girlfriend in North Carolina.', 'Pleaded no contest in September 2003, paid $100 in court costs.', 27, 1, 1),
(653, '2003-07-18', 'DEN', 'Russell Newman', 'DT', 'Arrested', 'Disorderly conduct', 'Accused of fighting with another customer during long wait to be seated at restaurant.', 'Resolution undetermined.', 5, 1, 1),
(654, '2003-07-15', 'SEA', 'Wayne Hunter', 'OT', 'Arrested', 'Domestic violence', 'Accused of assaulting his pregnant girlfriend, who had been carrying for eight months.', 'Diversion program. Domestic-violence counseling.', 2, 1, 1),
(655, '2003-07-12', 'MIN', 'Bryant McKinnie', 'OT', 'Arrested', 'Obstruction', 'Accused of interfering with police in Miami, where he played college football.', 'Charge dropped.', 10, 1, 2),
(656, '2003-07-04', 'DEN', 'Dwayne Carswell', 'TE', 'Arrested', 'Domestic violence', 'Accused of choking and biting his girlfriend outside a nightclub in Atlanta and also obstructing police.', 'Pleaded guilty to batter, one year of probation, one-game NFL suspension.', 2, 1, 1),
(657, '2003-06-24', 'ARI', 'Dennis McKinley', 'FB', 'Arrested', 'Drugs', 'Accused of heading a drug-trafficking ring, buying marijuana from Mexico and storing it at a warehouse he rented.', 'Convicted by jury, sentence of 2.5 years in prison, $180,000 in fines. Cut by team hours after arrest.', 3, 1, 1),
(658, '2003-05-31', 'TB', 'Michael Pittman', 'RB', 'Arrested', 'Domestic violence', 'Police said he rammed his Hummer into his wife''s Mercedes, which was carrying his 2-year-old child and a babysitter in Phoenix.', 'Pleaded guilty to felony endangerment, 14 days in jail.', 2, 3, 1),
(659, '2003-05-25', 'WAS', 'Jermaine Haley', 'DT', 'Arrested', 'DUI', 'Pulled over in Miami, accused of drunk driving and property damage after hitting another car with his Land Rover.', 'Pleaded no contest to reduced charge of reckless driving, one year probation, ordered to donate $3,000.', 1, 1, 1),
(660, '2003-05-22', 'GB', 'Joe Johnson', 'DE', 'Arrested', 'Drugs', 'Pulled over in Georgia after police saw his hazard lights flashing in a turn lane, accused of marijuana possession.', 'Resolution undetermined. He later failed to show up for court on the charge.', 3, 1, 1),
(661, '2003-05-22', 'NYG', 'Keith Hamilton', 'DT', 'Arrested', 'Drugs', 'Pulled over for window-tint violation, accused of cocaine and marijuana possession.', 'Pleaded guilty to cocaine possession, three years of probation, 1,000 community service, retired from NFL.', 3, 1, 1),
(662, '2003-05-22', 'TEN', 'Steve McNair', 'QB', 'Arrested', 'DUI, gun', 'Pulled over in Nashville, accused of drunk driving. Police also found pistol in his Lincoln Navigator.', 'Charges dropped after the judge said police didn''t have sufficient reason to stop him.', 1, 1, 2),
(663, '2003-05-03', 'HOU', 'Ramon Walker', 'S', 'Arrested', 'Alcohol', 'Accused of public intoxication and trespassing at a nightclub in Houston after he and a friend denied entry around midnight.', 'Resolution undetermined.', 7, 1, 1),
(664, '2003-04-27', 'WAS', 'Bruce Smith', 'DE', 'Arrested', 'DUI', 'Pulled over for speeding in Virginia Beach, accused of drunk driving and failing a sobriety test. Blood-alcohol measured at .07.', 'Acquitted by judge.', 1, 1, 4),
(665, '2003-04-26', 'TB', 'Kenyatta Walker', 'OT', 'Arrested', 'Disorderly conduct', 'Accused of getting into argument with club staff after being told to leave.', 'Resolution undetermined.', 5, 1, 1),
(666, '2003-04-16', 'TB', 'Dwight Smith', 'S', 'Arrested', 'Gun', 'Accused of flashing a gun at another motorist in Clearwater, Fla., during traffic dispute.', 'Pleaded guilty to brandishing gun, 25 hours of community service, one year of probation, $225 fine.', 6, 1, 1),
(667, '2003-04-03', 'SEA', 'Jerramy Stevens', 'TE', 'Arrested', 'DUI', 'Pulled over in Medina, Wash., for rolling through a stop sign, accused of drunk driving. Blood-alcohol measured at .14.', 'Pleaded guilty to reckless driving, two days in jail, 25 hours of community service, $1,000 fine.', 1, 1, 1),
(668, '2003-03-29', 'BAL', 'Terrell Suggs', 'LB', 'Charged', 'Assault', 'Accused of felony aggravated assault after a fight near Phoenix stadium. Suggs claimed he was hit over the head with an iron rod.', 'Acquitted by jury. He had a permit for the gun.', 4, 3, 1),
(669, '2003-03-15', 'PIT', 'Jason Gildon', 'LB', 'Arrested', 'Trespassing', 'Accused of refusing to leave club after being told they didn''t meet the dress code.', 'Diversion program, 60 hours of community service.', 27, 1, 1),
(670, '2003-03-13', 'KC', 'Eric Warfield', 'CB', 'Arrested', 'DUI', 'Accused of failing to maintain a single lane and drunk driving in Overland Park, Kan.', 'Pleaded no contest, 175 days of parole, two days in jail, three days under house arrest.', 1, 1, 1),
(671, '2003-02-14', 'DAL', 'Peppi Zellner', 'DE', 'Arrested', 'Drugs', 'Accused of cocaine possession, intent to distribute, after police in Georgia said they saw a package thrown from his car.', 'Charge dropped after his brother took responsibility.', 3, 1, 2),
(672, '2003-02-01', 'SEA', 'Koren Robinson', 'WR', 'Arrested', 'Disorderly conduct', 'Accused of being unruly and failing to disperse after being told to leave the street outside a crowded nightclub in Durham, N.C.', 'Resolution undetermined.', 5, 1, 1),
(673, '2003-01-14', 'DAL', 'Dwayne Goodrich', 'CB', 'Charged', 'Manslaughter', 'Accused killing two people in hit-and-run accident while speeding in BMW. The victims had been trying to help pull another driver from a burning car.', 'Convicted, sentenced to 7.5 years in prison, released on parole in 2011.', 23, 1, 1),
(674, '2003-01-04', 'CHI', 'Damon Moore', 'S', 'Arrested', 'DUI', 'Accused of driving wrong way on highway ramp in Columbus, Ohio, drunk driving, causing minor accident. Blood-alcohol measured at .18.', 'Found guilty, community service, released from team in April 2003.', 1, 1, 1),
(675, '2003-01-03', 'MIN', 'Kenny Mixon', 'DE', 'Arrested', 'DUI', 'Pulled over for speeding shortly after 3 a.m., accused of drunken driving, refusing sobriety test.', 'Acquitted by jury.', 1, 1, 4),
(676, '2002-12-28', 'DEN', 'John Mobley', 'LB', 'Arrested', 'DUI', 'Accused of speeding and driving drunk south of Denver. He failed a sobriety test.', 'Convicted, sentenced to seven days in jail, 100 hours of public service, two years probation.', 1, 1, 1),
(677, '2002-11-28', 'CAR', 'Lamar Smith', 'RB', 'Arrested', 'DUI', 'Pulled over by a state trooper in Mecklenburg County, accused of driving while impaired, speeding and reckless driving.', 'Resolution undetermined. Team placed him on paid leave the next day and released him in March 2003.', 1, 1, 1),
(678, '2002-11-22', 'CAR', 'Steve Smith', 'WR', 'Arrested', 'Assault', 'Accused of striking teammate Anthony Bright in a team film meeting. Bright ended up on the hospital and required facial surgery.', 'Diversion program, anger counseling, one-game suspension by team.', 4, 1, 1),
(679, '2002-11-20', 'CAR', 'Chris Terry', 'OT', 'Arrested', 'Failure to appear', 'Accused of failing to appear in court as scheduled on domestic violence charge from July 2002.', 'Guilty. Team released him within hours.', 2, 1, 1),
(680, '2002-11-18', 'NO', 'Victor Riley', 'OT', 'Arrested', 'DUI', 'Pulled over in New Orleans, accused of disobeying traffic signals and driving while intoxicated. Taken to jail at 2:25 a.m.', 'Resolution undetermined.', 1, 1, 1),
(681, '2002-10-26', 'NO', 'Deuce McAllister', 'RB', 'Arrested', 'License', 'Pulled over for allegedly driving 70 mph in a 40-mph zone on the way to team practice facility, accused of driving with a suspended license.', 'Pleaded guilty on license charge, fined.', 8, 1, 1),
(682, '2002-10-21', 'TB', 'Cosey Coleman', 'OG', 'Arrested', 'Domestic violence', 'Accused of misdemeanor battery after allegedly slapping and dragging his girlfriend outside day-care center.', 'Diversion program.', 2, 2, 1),
(683, '2002-10-18', 'CHI', 'Bryan Robinson', 'DE', 'Arrested', 'DUI', 'Pulled over at 2:30 a.m., accused of driving with a suspended license, drunk driving and refusing a breath test, his second DUI arrest since June.', 'Pleaded guilty, 360 hours of community service, alochol treatment, 18 months probation.', 1, 1, 1),
(684, '2002-10-07', 'CLE', 'Darren Hambrick', 'LB', 'Arrested', 'Theft', 'Accused of felony grand theft after he cashed a $5,682 check from the Carolina Panthers, then said he never received it and cashed the reissued check.', 'Pleaded no contest, 20 hours of community service, one year of probation.', 9, 3, 1),
(685, '2002-10-02', 'OAK', 'Sebastian Janikowski', 'K', 'Arrested', 'DUI', 'Pulled over in Oakland, accused of drunk driving. Blood-alcohol measured at .20.', 'Pleaded no contest to misdemeanor DUI, three years of probation, $1,292 fine, DUI school.', 1, 2, 1),
(686, '2002-09-25', 'KC', 'Lew Bush', 'LB', 'Arrested', 'DUI', 'Pulled over and ticketed for straddling a lane, accused of drunk driving, refusing sobriety test.', 'Guilty, driver''s license suspended.', 1, 1, 1),
(687, '2002-09-24', 'MIN', 'Randy Moss', 'WR', 'Arrested', 'Reckless driving, drugs', 'Accused of careless driving after the officer stepped in front of his car to prevent illegal turn. Moss pushed cop with car, where marijuana was found.', 'Pleaded guilty to misdemeanor careless driving, 40 hours of community service, 30-day jail sentence stayed.', 8, 2, 1),
(688, '2002-09-23', 'DAL', 'Deveren Johnson', 'WR', 'Arrested', 'Breach of peace', 'Accused of pushing past security at airport, saying he was worried about missing early flight in Connecticut.', 'Resolution undetermined.', 27, 1, 1),
(689, '2002-08-31', 'KC', 'Willie Roaf', 'OT', 'Arrested', 'DUI', 'Pulled over, accused of drunk driving in Wyandotte County, Kan.', 'Diversion program.', 1, 1, 1),
(690, '2002-08-25', 'OAK', 'Darrell Russell', 'DT', 'Arrested', 'DUI', 'Pulled over for speeding in Nevada, accused of drunk driving and failing a sobriety test after visiting a brothel.', 'Pleaded guilty, ordered to attend DUI school, 48 hours of community service.', 1, 1, 1),
(691, '2002-07-25', 'CAR', 'Chris Terry', 'OT', 'Arrested', 'Domestic violence', 'Accused of assault by his wife, who told police he pushed her up against a wall.', 'Diversion program, counseling and community service in exchange for deferred prosecution.', 2, 1, 1),
(692, '2002-07-23', 'MIN', 'Kenny Mixon', 'DE', 'Arrested', 'DUI', 'Pulled over in Deephaven, Min., accused of drunken driving, refusing sobriety test.', 'Pleaded guilty, 30 days in the county workhouse or 16 days of community service within three months.', 1, 1, 1),
(693, '2002-07-18', 'MIA', 'Derrick Rodgers', 'LB', 'Arrested', 'Domestic violence', 'Accused of attacking his wife and another man at a Miami restaurant after suspecting they were involved in an affair.', 'Pleaded no contest, 26 domestic violence classes, 100 hours of community service, one-game suspension.', 2, 1, 1),
(694, '2002-07-13', 'BUF', 'Charlie Rogers', 'RB', 'Arrested', 'Assault', 'Accused of punching a cop and resisting arrest in brawl at a go-go bar in New Jersey.', 'Acquitted.', 4, 1, 4),
(695, '2002-07-12', 'PIT', 'Marvel Smith', 'OT', 'Arrested', 'Drugs', 'Accused of marijuana possession at a hotel room in Tempe, Ariz., after police were called about the smell.', 'Charge dropped.', 3, 1, 2),
(696, '2002-07-08', 'GB', 'Najeh Davenport', 'RB', 'Arrested', 'Burglary', 'Accused of breaking into a woman''s dorm room at Barry University in Miami and defecating in her laundry basket.', 'Diversion program. Charge dropped in exchange for community service.', 9, 1, 2),
(697, '2002-07-06', 'NYJ', 'Aaron Beasley', 'CB', 'Charged', 'Battery', 'Accused of simple battery in bar fight in Jacksonville.', 'Dropped.', 4, 1, 2),
(698, '2002-07-06', 'SF', 'Mike Rumph', 'CB', 'Arrested', 'DUI', 'Pulled over after police said he ran stop signs in his Escalade, accused of drunk driving in Miami.', 'Acquitted.', 1, 1, 4),
(699, '2002-07-02', 'BUF', 'Rodney Wright', 'WR', 'Arrested', 'Reckless driving', 'Accused of hit-and-run after he crashed his SUV into a van in Fresno, Calif.', 'Pleaded no contest to leaving the scene of an accident, three years of probation.', 8, 1, 1),
(700, '2002-06-26', 'BUF', 'Sheldon Jackson', 'TE', 'Arrested', 'Drugs, license', 'Pulled over in Illinois, accused of possessing 2.5 grams of marijuana and driving with a suspended license .', 'Guilty, paid fines.', 3, 1, 1),
(701, '2002-06-23', 'CHI', 'Bryan Robinson', 'DE', 'Arrested', 'DUI', 'Accused of drunk driving in Lake County, Ill.', 'Pleaded guilty, driver''s license suspended.', 1, 1, 1),
(702, '2002-06-18', 'MIA', 'Ricky Williams', 'RB', 'Cited', 'License', 'Pulled over in Fort Lauderdale, accused of acting incoherently and driving his Hummer with expired tags, no license or proof of insurance. Handcuffed and ticketed.', 'Guilty on traffic tickets.', 8, 1, 1),
(703, '2002-06-13', 'CHI', 'David Terrell', 'WR', 'Arrested', 'Battery', 'Accused of getting into an altercation with a parking valet at a Chicago nightclub. He believed his car was stolen.', 'Charge dropped.', 4, 1, 2),
(704, '2002-06-12', 'IND', 'Joseph Jefferson', 'CB', 'Arrested', 'Gun', 'Police spotted a gun in his car and accused of him carrying a firearm without a license.', 'Resolution undetermined.', 6, 1, 1),
(705, '2002-06-09', 'NE', 'Chris Sullivan', 'DE', 'Arrested', 'DUI', 'Police found Sullivan in a parking lot, where they determined he had been driving drunk after team Super Bowl ring party.', 'Resolution undetermined. Team cut him the next month.', 1, 1, 1),
(706, '2002-05-24', 'SF', 'Jeremy Newberry', 'C', 'Arrested', 'Assault', 'Accused of hitting a woman several times in the face on a boat in Lake Berryessa. His sister was also accused of joining in.', 'Charge dropped.', 4, 1, 2),
(707, '2002-05-18', 'SF', 'Vinny Sutherland', 'WR', 'Arrested', 'DUI', 'Accused of a hit-and-run accident and drunk driving in Saratoga. Two teammates suffered minor injuries in the wreck.', 'Pleaded no contest, sentenced to 20 days in Santa Clara County jail. It was his second DUI in 10 months.', 1, 1, 1),
(708, '2002-05-11', 'PIT', 'Plaxico Burress', 'WR', 'Arrested', 'Public intoxication', 'Accused of being drunk in public and causing disturbances in Virginia Beach.', 'Deferred disposition. Charged dropped if he stays clean for a year.', 7, 1, 2),
(709, '2002-03-27', 'IND', 'Dominic Rhodes', 'RB', 'Arrested', 'Domestic violence', 'Accused of hitting and shoving his live-in girlfriend in Indiana.', 'Diversion program, $150 fee, counseling and treatment.', 2, 1, 1),
(710, '2002-03-13', 'ARI', 'David Boston', 'WR', 'Arrested', 'DUI, drugs', 'Accused of driving under the influence of cocaine and marijuana after testing positive for those drugs. He was arrested at his home after two people called 911.', 'Pleaded no contest to misdemeanors, suspended sentence.', 3, 2, 1),
(711, '2002-02-24', 'MIA', 'Ricky Williams', 'RB', 'Arrested', 'Reckless driving', 'Pulled over, arrested and accused of driving 126 mph on Interstate 10 in Louisiana.', 'Pleaded to a reduced charge of speeding, $500 fine.', 8, 1, 1),
(712, '2002-02-21', 'ARI', 'Yusuf Scott', 'OG', 'Indicted', 'Leaving scene.', 'Accused of leaving the scene of an accident with injuries on Jan. 7. He allegedly said he was moving his car out of traffic, then left.', 'Pleaded guilty to driving with an invalid license, probation.', 10, 1, 1),
(713, '2002-02-09', 'NE', 'Kevin Faulk', 'RB', 'Arrested', 'Resisting arrest', 'Accused of using inappropriate language after trying to remove barricade so he could drive past it in Lafayette, La.', 'Resolution undetermined.', 10, 1, 1),
(714, '2002-02-08', 'CAR', 'Jarrod Cooper', 'S', 'Arrested', 'DUI', 'Accused of drunk driving, losing control of his car in a single-car accident in North Carolina. Blood-alcohol measured at .18.', 'Pleaded no contest, one year of probation, 90-day suspended sentence, $800 fine.', 1, 1, 1),
(715, '2002-02-04', 'LAC', 'Leonardo Carson', 'DT', 'Arrested', 'Assault, gun', 'Accused of pulling a gun at a car repair shop in Mobile, Ala. Shop employee said Carson threatened him in argument over repairs.', 'Charge dropped.', 6, 1, 2),
(716, '2002-02-01', 'OAK', 'Darrell Russell', 'DT', 'Arrested', 'Sexual assault', 'Accused of drugging a woman and filming her rape by two associates in Alameda, Calif.', 'Charges dropped for lack of evidence.', 14, 1, 2),
(717, '2002-01-20', 'CAR', 'Muhsin Muhammad', 'WR', 'Arrested', 'Drugs, gun', 'Pulled over for speeding in North Carolina, accused of marijuana possession and carrying a concealed weapon.', 'Pleaded guilty, 30-day suspended sentence, $150 fine, one year of probation.', 3, 1, 1),
(718, '2002-01-19', 'LAC', 'Jeff Graham', 'WR', 'Arrested', 'Gun', 'Accused of carrying a concealed weapon in Dayton, Ohio, after police searched his truck. He was parked and talking on the phone when police approached.', 'Charge dropped.', 6, 1, 2),
(719, '2001-12-28', 'NO', 'Albert Connell', 'WR', 'Surrendered', 'Theft', 'Accused of taking $3,500 from car of teammate Deuce McAllister and $863 from his locker. He claimed it was a prank.', 'Charge dropped after he returend the money, and McAllister declined to press charges. Team released him Feb. 28', 9, 1, 2),
(720, '2001-12-27', 'NE', 'Bobby Hamilton', 'DE', 'Arrested', 'Domestic violence', 'Accused of domestic assault in dispute with his wife, who showed no sign of injury, according to police.', 'Charge dropped.', 2, 1, 2),
(721, '2001-12-24', 'PIT', 'Plaxico Burress', 'WR', 'Cited', 'Alcohol', 'Cited for carrying an open container of alcohol (beer) in the Cleveland warehouse district.', 'Pleaded no contest, $50 fine, $100 court costs.', 7, 1, 1),
(722, '2001-12-18', 'KC', 'Eric Warfield', 'CB', 'Arrested', 'DUI', 'Pulled over after police saw him weaving in traffic, accused of drunk driving in Lenexa, Kan.', 'Diversion program, later revoked when he was arrested again in 2003.', 1, 1, 1),
(723, '2001-12-09', 'CIN', 'Neil Rackers', 'K', 'Charged', 'Assault', 'Accused of choking man at a sports bar in Covington, Ky., after the man allegedly insulted Rackers'' wife and mother.', 'Diversion program. Charge dropped in exchange for confidential settlement with victim.', 4, 1, 2),
(724, '2001-12-07', 'CLE', 'O.J. Santiago', 'TE', 'Summoned', 'Drugs', 'Police searched teammate Gerard Warren''s car and found marijuana, which they said belonged to Santiago.', 'Guilty of disorderly conduct, $366 fine.', 3, 1, 1),
(725, '2001-11-20', 'PHI', 'Damon Moore', 'S', 'Charged', 'Animal abuse', 'Accused of abandoning Rottweiler puppy in a New Jersey field three days after buying it. He found the dog to be too much trouble.', 'Pleaded guilty, 15 hours of community service and animal center, $2,000 fine.', 16, 1, 1),
(726, '2001-11-20', 'CLE', 'Gerard Warren', 'DT', 'Arrested', 'Gun', 'Accused of carrying an unlicensed gun after police spotted a holster in his Suburban parked outside a nightclub party for Plaxico Burress.', 'Pleaded guilty to misdemeanor gun charge, one year of probation.', 6, 2, 1),
(727, '2001-11-19', 'CLE', 'Lamar Chapman', 'CB', 'Arrested', 'Drugs', 'Pulled over as passenger in Mike Sellers'' car, accused of marijuana and cocaine possession.', 'Pleaded guilty to possession of drug paraphernalia.', 3, 1, 1),
(728, '2001-11-19', 'CLE', 'Mike Sellers', 'FB', 'Arrested', 'DUI, drugs', 'Pulled over in Cleveland with teammate Lamar Champan, accused of speeding, drunk driving and marijuana and cocaine possesssion.', 'Pleaded guilty to drunk driving. Team cut him a week after arrest.', 3, 1, 1),
(729, '2001-11-16', 'PHI', 'Terrence Carroll', 'S', 'Arrested', 'Drugs', 'Police caught him smoking marijuana in the back of a car, accused of misdemeanor drug possession.', 'Diversion program, one month of probation, 10 hours of community service, substance-abuse class.', 3, 2, 1),
(730, '2001-11-11', 'JAC', 'Jimmy Smith', 'WR', 'Arrested', 'DUI', 'Pulled over for speeding in Jacksonville, accused of drunk driving. Tests later showed cocained in his system. Blood-alcohol measured below limit at .05.', 'Charge dropped.', 1, 1, 2),
(731, '2001-10-26', 'BUF', 'Travis Henry', 'RB', 'Charged', 'Sex', 'Accused of attempting to have sex with a 15-year-old girl, who claimed she was almost 18.', 'Pleaded guilty to misdemeanor sexual misconduct, 100 hours of community service.', 14, 2, 1),
(732, '2001-10-25', 'ARI', 'Ray Thompson', 'LB', 'Arrested', 'DUI', 'Accused of drunken driving after crash in Gilbert, Ariz.', 'Resolution undetermined. Team fined and deactivated him after missing practice due to accident.', 1, 1, 1),
(733, '2001-10-14', 'NYJ', 'Damien Robinson', 'S', 'Arrested', 'Gun', 'Pulled over outside Giants stadium, where bomb-sniffing dog helped lead police to an assault rifle in his trunk. He had permit for the gun in New York.', 'Charge dropped. Team fined him $30,000.', 6, 1, 2),
(734, '2001-09-14', 'SF', 'Vinny Sutherland', 'WR', 'Arrested', 'DUI', 'Pulled over on Highway 101 in Bay Area , accused of drunk driving.', 'Pleaded guilty to reduced charge of reckless driving, rehab, two years of probation.', 1, 1, 1),
(735, '2001-09-04', 'BAL', 'Cornell Brown', 'LB', 'Arrested', 'Drugs', 'Complaints from neighbors led police to find marijuana and drug paraphernalia at his home.', 'Charge dropped. Team cut him the next day but later re-signed him.', 3, 1, 2),
(736, '2001-09-02', 'DEN', 'Eddie Kennison', 'WR', 'Arrested', 'Disorderly conduct', 'Accused of inciting a riot at Louisiana nightclub after dispute with bouncer who denied him entry to club because he wasn''t properly dressed.', 'Charges dropped.', 5, 1, 2),
(737, '2001-08-31', 'CIN', 'Vaughn Booker', 'DE', 'Arrested', 'Domestic violence', 'Accused of pushing wife in argument at the couple''s home near Cincinnati.', 'Charge dropped.', 2, 1, 2),
(738, '2001-08-26', 'CIN', 'Tom Barndt', 'DT', 'Arrested', 'DUI', 'Pulled over in Covington, Ky., accused of drunk driving.', 'Resolution undetermined. Team released him the next week.', 1, 1, 1),
(739, '2001-08-12', 'CLE', 'Corey Fuller', 'CB', 'Arrested', 'Disorderly conduct', 'Accused of impeding traffic at crowded intersection, refusing to move car when asked to by police in Cleveland.', 'Pleaded no contest to disorderly conduct, fined $75.', 5, 1, 1),
(740, '2001-07-21', 'JAC', 'R. Jay Soward', 'WR', 'Arrested', 'Disorderly conduct', 'Accused of being intoxicated at theme park in Orlando, swearing at security guards.', 'Pleaded no contest, $361 in fines and costs.', 5, 1, 1),
(741, '2001-07-17', 'JAC', 'Stacey Mack', 'RB', 'Arrested', 'Solicitation', 'Accused of offering $15 to undercover police officer for oral sex.', 'Pleaded no contest, $300 fine.', 14, 1, 1),
(742, '2001-07-14', 'CHI', 'Paul Edinger', 'K', 'Arrested', 'DUI', 'Accused of drunk driving and crashing into mailboxes in Punta Gorda, Fla.', 'Pleaded guilty to a reduced charge of reckless driving.', 1, 1, 1),
(743, '2001-07-13', 'DET', 'Aaron Gibson', 'OT', 'Charged', 'Assault', 'Accused of hitting a woman in the buttocks and spitting in her face outside a club in Pontiac, Mich.', 'Pleaded guilty.', 4, 1, 1),
(744, '2001-07-05', 'NO', 'Michael Hawthorne', 'CB', 'Arrested', 'Drugs, reckless driving', 'Pulled over for weaving in New Orleans, accused of reckless driving and marijuana possession after police smelled dope.', 'Resolution undetermined.', 3, 1, 1),
(745, '2001-07-04', 'MIA', 'Ben Kelly', 'CB', 'Arrested', 'DUI', 'Accused of bumping into a parked police car, drunk driving and refusing breath test in Miami.', 'Acquitted by jury.', 1, 1, 4),
(746, '2001-06-23', 'ARI', 'Michael Pittman', 'RB', 'Arrested', 'Domestic violence', 'Accused of breaking sliding glass door and criminal trespass in dispute with his wife in Tempe, Ariz. It was the second domestic incident for him in two weeks.', 'Pleaded guilty, three years of probation, five days in jail, suspended one game.', 2, 1, 1),
(747, '2001-06-16', 'TB', 'Alex Ardley', 'CB', 'Charged', 'DUI', 'Accused of drunk driving and crashing Deuce McAllister''s SUV into a house in Tallahassee, Fla.', 'Pleaded guilty to a reduced charge, 150 hours of community service, released by team the next day.', 1, 1, 1),
(748, '2001-06-15', 'BAL', 'Chris McAlister', 'CB', 'Arrested', 'Disorderly conduct', 'Accused of disturbing the peace, verbal abuse and pushing a flight attendant in dispute over seating arrangments at Las Vegas airport.', 'Resolution undetermined.', 5, 1, 1),
(749, '2001-06-10', 'ARI', 'Michael Pittman', 'RB', 'Arrested', 'Domestic violence', 'Accused of getting into a heated argument with his wife, who locked herself in a car to get away from him.', 'Diversion program, anger management.', 2, 1, 1),
(750, '2001-05-23', 'KC', 'Victor Riley', 'OT', 'Arrested', 'Domestic violence', 'Accused of ramming his vehicle into another vehicle occupied by his wife and baby daughter, leaving the scene of an accident in Overland Park, Kan.', 'Diversion program, suspended one game.', 2, 1, 1),
(751, '2001-05-16', 'NE', 'Terry Glenn', 'WR', 'Arrested', 'Domestic violence', 'Accused of assaulting the mother of his child in Walpole, Mass.', 'Charge dropped after the mother recanted.', 2, 1, 2),
(752, '2001-05-14', 'NYG', 'Jeremiah Parker', 'DE', 'Charged', 'Manslaughter, child abuse', 'Accused of child abuse in the case of the 4-year-old son of his girlfriend. The boy went unconscious and died after being shaken. The mother also was accused.', 'Convicted of endangering a child, acquitted of manslaughter, sentenced to 10 years in prison.', 23, 1, 1),
(753, '2001-05-05', 'CHI', 'John Capel', 'WR', 'Arrested', 'Drugs', 'Pulled over in Florida, accused of misdemeanor possession less than 20 grams of marijuana.', 'Diversion program. Team waived rights to him in July.', 3, 2, 1),
(754, '2001-05-04', 'BAL', 'Leon Searcy', 'OT', 'Arrested', 'Domestic violence', 'Accused of kicking his wife in the leg during an argument.', 'Diversion program, anger management.', 2, 1, 1),
(755, '2001-05-01', 'CLE', 'Jeremiah Pharms', 'LB', 'Arrested', 'Theft, gun', 'Accused of stealing $1,500 worth of marijuana and shooting a drug dealer in Seattle in 2000. He was charged with the crime two weeks after getting drafted.', 'Pleaded no contest, 41 months in prison.', 6, 1, 1),
(756, '2001-04-04', 'PHI', 'Thomas Hamner', 'RB', 'Charged', 'Animal abuse', 'Accused of beating his pit pull in New Jersey, the second time since November 2000.', 'Pleaded guilty, put the dog up for adoption, fined $1,000.', 16, 1, 1),
(757, '2001-03-07', 'NE', 'Adrian Klemm', 'OT', 'Charged', 'Assault', 'Accused of property destruction and punching the windshield of another motorist in a road-rage incident. He didn''t like how the other motorist was driving.', 'Convicted, ordered to pay $455 in restitution, 50 hours of community service, one-year probation.', 4, 1, 1),
(758, '2001-03-03', 'MIA', 'Jermaine Haley', 'DT', 'Arrested', 'DUI', 'Accused of drunk driving in Miami Beach, bottle of vodka found in his SUV. Blood-alcohol measured at .22.', 'Pleaded no contest, 50 hours of community service, $500 fine, six months of probation.', 1, 1, 1),
(759, '2001-03-02', 'DEN', 'Dwayne Carswell', 'TE', 'Arrested', 'Domestic violence', 'Accused of pulling a woman''s hair and bruising her arm''s in altercation in Pueblo, Colo.', 'Diversion program, community service.', 2, 1, 1),
(760, '2001-02-14', 'LAC', 'Leonardo Carson', 'DT', 'Charged', 'Assault', 'Accused of third-degree assault and criminal mischief in Alabama.', 'Charge dropped.', 4, 1, 2),
(761, '2001-02-08', 'CIN', 'Akili Smith', 'QB', 'Arrested', 'DUI', 'Pulled over for driving the wrong way down a one-way street in San Diego, accused of drunk driving.', 'Acquitted.', 1, 1, 4),
(762, '2001-01-09', 'CIN', 'Tremain Mack', 'S', 'Jailed', 'Probation violation', 'Sentenced to a month in jail for probation violation stemming from previous drunk-driving conviction. A TV station filmed him driving, which violated probation.', 'Guilty, one month in jail.', 27, 1, 1),
(763, '2000-11-20', 'MIN', 'John Davis', 'TE', 'Arrested', 'DUI', 'Police said they found his vehicle stopped in the road with him sleeping behind wheel, accused of drunk driving in Wayzata, Minn.', 'Pleaded guilty to careless driving, fined $700, but $500 of it stayed along with 40-day jail sentence.', 1, 1, 1),
(764, '2000-11-12', 'PHI', 'Thomas Hamner', 'RB', 'Charged', 'Animal abuse', 'Investigated for animal cruelty involving his pit bull in New Jersey.', 'Pleaded guilty, $300 fine.', 16, 1, 1),
(765, '2000-10-28', 'DEN', 'Brian Griese', 'QB', 'Arrested', 'DUI', 'Pulled over for speeding near Denver, accused of drunk driving, failing sobriety tests.', 'Pleaded guilty, one year of probation.', 1, 1, 1),
(766, '2000-09-21', 'DAL', 'Joey Galloway', 'WR', 'Charged', 'Assault', 'Accused of assaulting a police officer at a hotel party in Wheeling, W. Va., in May 2000.', 'Charge dropped.', 4, 1, 2),
(767, '2000-09-20', 'WAS', 'Dana Stubblefield', 'DT', 'Arrested', 'Domestic violence', 'Accused of assaulting his wife at their homoe in Virginia during an argument about luggage. Police said there were no signs of physical injury.', 'Charge dropped.', 2, 1, 2),
(768, '2000-09-12', 'TB', 'Damien Robinson', 'S', 'Arrested', 'Theft', 'Police pulled him over for a traffic violation and found warrant for his arrest on charge of writing a bad $80 check to the tax collector.', 'Guilty, paid back funds.', 9, 1, 1),
(769, '2000-09-07', 'JAC', 'Stacey Mack', 'RB', 'Charged', 'Theft', 'Accused of writing a worthless check for property less than $150, according to county records. Offense date was April 18, 2000.', 'Pleaded no contest, $100 fine.', 9, 1, 1),
(770, '2000-08-26', 'CIN', 'Corey Dillon', 'RB', 'Arrested', 'Domestic violence', 'Accused of striking his wife in Washington, fourth-degree assault.', 'Diversion program, $750 donation to women''s shelter, treatment.', 2, 1, 1),
(771, '2000-08-24', 'KC', 'Andre Rison', 'WR', 'Charged', 'Theft', 'Accused of writing a bad check for $78,800 to a jewelry store while he was playing for the Chiefs.', 'Pleaded guilty, two years of probation, paid back in full.', 9, 1, 1),
(772, '2000-08-13', 'NO', 'Darren Perry', 'S', 'Arrested', 'DUI', 'Accused of drunk driving, hit-and-run and rear-ending another car near New Orleans. Police pursued him after seeing him swerving in traffic.', 'Resolution undetermined.', 1, 1, 1),
(773, '2000-08-09', 'DEN', 'Bill Romanowski', 'LB', 'Indicted', 'Drugs', 'Accused of illegaly obtaining prescription diet pills to boost his performance on the field.', 'Acquitted by jury.', 3, 1, 4),
(774, '2000-08-07', 'KC', 'Andre Rison', 'WR', 'Cited', 'False information', 'Accused of lying to police about his name after a bar fight in River Falls, Wis. He told the police his name was Brock Middlebrook.', 'Guilty, fined $219.50. Team cut him a few days later.', 10, 1, 1),
(775, '2000-07-28', 'TB', 'Darnell McDonald', 'WR', 'Arrested', 'Burglary, battery', 'Accused of aggravated battery with great bodily harm and burglary stemming from incident on July 14 in Tampa.', 'Pleaded out, two years probation, 150 hours of community service, anger management program, released by team.', 4, 1, 1),
(776, '2000-07-20', 'CIN', 'Darnay Scott', 'WR', 'Arrested', 'Theft', 'Accused of writing a back check for more than $5,100 to a motorcycle shop in Florence, Ky.', 'Charge dropped, but he spent a night in jail and had to pay back the money.', 9, 1, 2),
(777, '2000-07-18', 'MIA', 'Patrick Surtain', 'CB', 'Arrested', 'DUI', 'Pulled over in Miami for speeding, accused of drunk driving, refusing breath test.', 'Pleaded no contest to reckless driving, 50 hours of community service, $25,000 donation to MADD.', 1, 1, 1),
(778, '2000-07-07', 'LAC', 'Leonardo Carson', 'DT', 'Charged', 'Assault', 'Accused of third-degree assault, one of string of incidents for him in his hometown of Mobile, Ala.', 'Charge dropped.', 4, 1, 2),
(779, '2000-06-21', 'OAK', 'Sebastian Janikowski', 'K', 'Arrested', 'Drugs', 'Accused of possession of a controlled substance, the designer drug GHB, after police approached his car and found suspicious substance.', 'Acquitted by jury.', 3, 1, 4),
(780, '2000-06-11', 'CHI', 'Bryan Robinson', 'DE', 'Charged', 'Battery', 'Accused of spitting on a woman''s face at a bar in Chicago.', 'Resolution undetermined.', 4, 1, 1),
(781, '2000-05-24', 'OAK', 'Charles Woodson', 'CB', 'Arrested', 'DUI', 'Accused of drunk driving and driving with a suspended license in Ann Arbor, Mich. Blood-alcohol measured at .24.', 'Pleaded guilty to driving while impaired, 60 hours of community service.', 1, 1, 1),
(782, '2000-05-20', 'BAL', 'Chris McAlister', 'CB', 'Charged', 'Drugs', 'Accused of marijuana possession after authorities found small amounts in his house while investigating a burglary.', 'Charge dropped for lack of evidence.', 3, 1, 2),
(783, '2000-05-19', 'GB', 'Marco Rivera', 'OG', 'Arrested', 'DUI', 'Pulled over for speeding at 95 mph in Brown County, accused of drunk driving. Blood-alcohol measured at .19.', 'Pleaded no contest, $455 speeding ticket, $675 DUI fine.', 1, 1, 1),
(784, '2000-05-13', 'WAS', 'Mike Sellers', 'FB', 'Arrested', 'DUI', 'Pulled over in Arlington, Va., after police said his Mercedes was weaving, accused of drunk driving.', 'Convicted of DUI, 18-month suspended jail sentence, one-year license suspension.', 1, 1, 1),
(785, '2000-04-17', 'DAL', 'Tony Hutson', 'OT', 'Arrested', 'Failure to appear, gun', 'Pulled over for speeding in Texas, accused of failing to appear in court for previous incident. Police also found a pistol in his car.', 'Resolution undetermined.', 6, 1, 1),
(786, '2000-04-10', 'GB', 'Mark Chmura', 'TE', 'Arrested', 'Sexual assault', 'Accused of encouraging teenagers to drink, sexually assaulting 17-year-old girl in the bathroom at a prom party in Wisconsin.', 'Acquitted by jury.', 14, 1, 4),
(787, '2000-04-06', 'CIN', 'Steve Foley', 'LB', 'Arrested', 'Gun', 'Accused of firing gun into the air several times outside nightclub in Monroe, La. Pulled over and arrested, Foley yelled he was being illegal searched.', 'Charge dropped for lack of evidence.', 6, 1, 2),
(788, '2000-04-01', 'GB', 'De''Mond Parker', 'RB', 'Arrested', 'Drugs', 'Accused of marijuana possession near Chicago after police investigated loud music coming from his parked car.', 'Diversion program. Charge dropped in exchange for drug program.', 3, 1, 2),
(789, '2000-03-31', 'MIN', 'Chris Walsh', 'WR', 'Arrested', 'DUI', 'Pulled over near his home in Scottsdale, Ariz., accused of drunk driving. Blood-alcohol measured at .229.', 'Pleaded guilty to drunk driving, $1,277 fine, 12 days in jail, alcohol treatment.', 1, 1, 1),
(790, '2000-03-23', 'DAL', 'Solomon Page', 'OT', 'Arrested', 'Disorderly conduct', 'Accused of throwing punches and obstructing police in brawl in Morgantown, W.Va. Handcuffed and pepper-sprayed about 3 a.m.', 'Pleaded no contest to reduced charged, $200 fine.', 5, 1, 1),
(791, '2000-03-14', 'ARI', 'Mario Bates', 'RB', 'Arrested', 'Domestic violence', 'Accused of slapping his girlfriend in the face in Scottsdale, Ariz.', 'Pleaded guilty, $364 fine, two years of probation.', 2, 1, 1),
(792, '2000-02-22', 'KC', 'Tamarick Vanover', 'WR', 'Charged', 'Theft', 'Accused of assisting in the sale of a stolen vehicle, arranging to have it moved from Kansas City to Florida in exchange for $10,000.', 'Pleaded guilty, $10,000 fine, $6,241 to the insurance company, two months each in jail and home detention.', 9, 1, 1),
(793, '2000-02-21', 'NO', 'Ricky Williams', 'RB', 'Arrested', 'Failure to appear', 'Pulled over in Austin, Texas, accused of improperly signaling lane change, failure to appear in court for previous traffic incidents.', 'Guilty, pleaded $429 in fines.', 8, 1, 1),
(794, '2000-02-19', 'TEN', 'Benji Olson', 'OG', 'Arrested', 'DUI', 'Pulled over at a shopping center in Hopkinsville, Ky., accused of drunk driving. Blood-alcohol measured at .09.', 'Pleaded to a reduced charge of failing to operate vehicle carefully. Fined $100, plus costs.', 1, 1, 1),
(795, '2000-02-16', 'KC', 'Andre Rison', 'WR', 'Arrested', 'Theft', 'Accused of renting but not returning a $1,100 audio recorder from Guitar World in Overland Park, Kan.', 'Pleaded no contest, sentenced to one year of probation.', 9, 1, 1),
(796, '2000-02-06', 'IND', 'Keith Elias', 'RB', 'Arrested', 'Disorderly conduct', 'Accused of resisting arrest and disorderly conduct in incident outside Bamboo Bar in New Jersey, along with Wayne Chrebet of the Jets.', 'Pleaded guilty to nuisance violation, fined $230.', 5, 1, 1),
(797, '2000-02-06', 'NYJ', 'Wayne Chrebet', 'WR', 'Arrested', 'Disorderly conduct', 'Accused of disorderly conduct in altercation outside the Bamboo Bar in New Jersey.', 'Pleaded guilty to nuisance violation, fined $230.', 5, 1, 1),
(798, '2000-02-05', 'CIN', 'Steve Foley', 'LB', 'Arrested', 'Domestic violence', 'Accused of kicking in the door of his son''s mother and grabbing her by the throat.', 'Charge dropped after woman declined to cooperate.', 2, 1, 2),
(799, '2000-02-03', 'CAR', 'Fred Lane', 'RB', 'Arrested', 'Drugs, gun', 'Police pulled him over in Jackson, Tenn., for moving slowly and said they found an assault rifle in the trunk of his Mercedes and marijuana on the men n the car.', 'Indicted but shot and killed by his wife in July 2000.', 6, 1, 1),
(800, '2000-01-31', 'BAL', 'Ray Lewis', 'LB', 'Charged', 'Murder', 'Accused of murder in the stabbing deaths of two men outside a nightclub in Atlanta on the night of the Super Bowl.', 'Pleaded guilty to obstruction of justice, one year of probation, fined $250,000 by NFL. Crime unsolved.', 23, 1, 1),
(801, '2000-01-24', 'DEN', 'Rod Smith', 'WR', 'Arrested', 'Domestic violence', 'Accused of choking, beating and shoving his common-law wife at home near Denver.', 'Pleaded guilty to misdemeanor count of verbal abuse, two years probation, counseling.', 2, 2, 1),
(802, '2015-08-26', 'SF', 'Ahmad Brooks', 'LB', 'Indicted', 'Sexual battery', 'Accused of misdemeanor sexual battery stemming from a December 2014 incident at the home of teammate Ray McDonald.', 'Resolution undetermined.', 14, 0, 1),
(804, '2015-09-30', 'TEN', 'Dorial Green-Beckham', 'WR', 'Arrested', 'Outstanding warrant', 'Pulled over for speeding in Missouri, where officer found an outstanding warrant for previous unpaid speeding ticket.', 'Paid $92 and received warning.', 8, 0, 0),
(805, '2015-10-15', 'SEA', 'Derrick Coleman', 'FB', 'Arrested', 'Hit and Run', 'Derrick Coleman was involved in a two car accident in Bellevue, WA where he allegedly fled the scene.', 'Resolution undetermined. Team suspended him.', 27, 1, 1),
(806, '2015-12-25', 'CLE', 'De''Ante Saunders', 'S', 'Arrested', 'DUI', 'De''Ante Saunders, was pulled over operating a vehicle under the influence of alcohol and driving 75 mph in a 60 mph in Brook Park, Ohio. \nA gun was found in the car.', 'Resolution undetermined. Team released him three days after arrest.', 1, 0, 0),
(807, '2015-12-25', 'CLE', 'Armonty Bryant', 'LB', 'Arrested', 'Drugs', 'Accused of illegally possessing Adderrall after failing to produce a prescription for it in traffic stop with teammate De''Ante Saunders.', 'Pleaded guilty to misdemeanor drug charge, 68-day probation, $1,000 fine.', 3, 0, 0),
(808, '2016-01-23', 'NE', 'J.J. Worton', 'WR', 'Arrested', 'Assault', 'Accused of assault and battery after fight at a bar in Foxboro, Mass.\n', 'Pleaded guilty to misdemeanors.', 4, 0, 1),
(809, '2016-02-05', 'NE', 'Montee Ball', 'RB', 'Charged', 'Domestic violence', 'Accused of disorderly conduct and battery after allegedly striking his girlfriend in the face.\r\n', 'Pleaded guilty to two charges, 60 days in jail, probation. Team released him the next week.', 2, 0, 1),
(810, '2016-02-13', 'DEN', 'Shiloh Keo', 'S', 'Arrested', 'DUI', 'Accused of drunken driving in Ada County, Idaho.\n', 'Pleaded guilty to misdemeanor, one year probation, community service, fined nearly $1,000.', 1, 0, 1),
(811, '2016-03-18', 'NO', 'Damian Swann', 'CB', 'Arrested', 'Reckless driving', 'Pulled over in Athens, Ga., accused of driving 100 mph in 65-mph zone, reckless driving.', 'Resolution undetermined.', 8, 1, 1),
(812, '2016-03-05', 'LA', 'Tre Mason', 'RB', 'Arrested', 'Drugs', 'Pulled over in Hollywood, Fla., accused of reckless driving, marijuana possession and resisting arrest.', 'Pleaded no contest to three charges, $293 fine.', 3, 1, 1),
(813, '2016-03-04', 'BAL', 'Terrell Suggs', 'LB', 'Arrested', 'License', 'Accused of leaving the scene of an accident and driving with a suspended license in Scottsdale, Ariz.', 'Charges dropped, driving class for speeding.', 8, 1, 1),
(814, '2016-02-28', 'HOU', 'Jaelen Strong', 'WR', 'Arrested', 'Drugs', 'Accused of marijuana possession after traffic stop in Arizona.', 'Diversion program, education and counseling.', 3, 1, 1),
(815, '2016-05-30', 'DEN', 'Cody Latimer', 'WR', 'Arrested', 'Traffic warrant', 'Latimer called police and alleged his girlfriend hit him. Police found outstanding traffic warrant from 2015 and arrested him for that.', 'Paid $311 to settle ticket.', 8, 0, 0),
(816, '2016-05-10', 'LA', 'T.J. McDonald', 'S', 'Arrested', 'DUI', 'Suspected of hitting a parked car and driving under the influence of a substance other than alcohol.', 'Pleaded guilty to misdemeanor, 200 hours community service, three years probation, alcohol program.', 1, 0, 1),
(817, '2016-04-24', 'CAR', 'Cameron Artis-Payne', 'RB', 'Arrested', 'Reckless driving', 'Accused of driving 102 mph in a 65-mph zone in North Carolina.', 'Resolution undetermined.', 8, 0, 1),
(839, '2017-02-25', 'IND', 'David Parry', 'DT', 'Arrested', 'DUI, resisting arrest', 'Suspected of stealing golf cart, driving drunk, resisting arrest in Scottsdale, Ariz.', 'Pleaded guilty to reduced charges, two years of probation.', 1, 0, 1),
(826, '2016-03-21', 'ATL', 'Ra''Shede Hageman', 'DL', 'Arrested', 'Domestic Violence', 'From an incident with the mother of his child, Hageman was charged with interfering with a call for emergency help, battery family violence and cruelty to children in the third degree.', 'Undetermined', 2, 0, 0),
(846, '2017-02-25', 'BAL', 'Matt Elam', 'S', 'Arrested', 'Drugs', 'Pulled over in Miami Beach, accused of possessing marijuana, Oxycodone.', 'Resolution undetermined', 3, 0, 1),
(821, '2016-07-25', 'PHI', 'Nigel Bradham', 'LB', 'Arrested', 'Assault', 'Suspected of punching somebody in the nose at a Miami Beach hotel after verbal altercation.', 'Resolution undetermined.', 4, 0, 1),
(825, '2016-09-05', 'SF', 'Bruce Miller', 'TE', 'Arrested', 'Assault', 'Accused of assaulting a man and his 70-year-old father at hotel in San Francisco.', 'Resolution undetermined. Team released him same day.', 4, 0, 1),
(827, '2016-10-12', 'MIN', 'Isame Faciane', 'OG', 'Arrested', 'DUI', 'Charged with drunken driving after being pulled over for driving around barricades.', 'Resolution undetermined. Team released him later that week.', 1, 1, 1),
(828, '2016-10-02', 'PHI', 'Nigel Bradham', 'LB', 'Arrested', 'Gun', 'Accused of carrying loaded gun through airport security in Miami.', 'Resolution undetermined', 6, 2, 1),
(829, '2016-09-26', 'CLE', 'Alvin Bailey', 'OG', 'Arrested', 'DUI', 'Accused of operating a vehicle under the influence of alcohol and having drug paraphernalia in his car after returning from game in Miami.', 'Pleaded no contest, found guilty, three-day intervention program. NFL suspended him two games.', 1, 1, 1),
(830, '2016-09-16', 'TB', 'Austin Seferian-Jenkins', 'TE', 'Arrested', 'DUI', 'Pulled over for speeding and driving erratically, accused of drunken driving in Tampa.', 'Pleaded no contest to reduced charge, one-year probation, 50 hours community service. Team released him same day.', 1, 1, 1),
(831, '2016-11-19', 'LA', 'Troy Hill', 'CB', 'Arrested', 'DUI', 'Suspected of drunken driving after crashing into a big rig on the freeway.', 'Pleaded no contest, three years probation, 100 hours community service, NFL suspended two games.', 1, 0, 1),
(832, '2016-11-01', 'PHI', 'Josh Huff', 'WR', 'Arrested', 'DUI, drugs, gun', 'Pulled over and accused of drunken driving, marijuana possession and having an unloaded gun without a permit.', 'Resolution undetermined. Team released him later that week.', 1, 0, 1),
(833, '2017-01-12', 'GB', 'Sam Shields', 'CB', 'Charged', 'Drugs', 'Accused of misdemeanor marijuana possession from Oct. 19, 2016.', 'Pleaded no contest, $500 fine.', 3, 0, 1),
(834, '2017-01-10', 'LA', 'Tre Mason', 'RB', 'Arrested', 'Eluding police', 'Accused of fleeing law enforcement, careless driving on an ATV in July 2016.', 'Resolution undetermined.', 10, 0, 1),
(835, '2017-01-02', 'CIN', 'Adam Jones', 'CB', 'Arrested', 'Assault', 'Accused of poking hotel security employee in the eye in Cincinnati, obstructing police.', 'Pleaded guilty to misdemeanor charge, sentenced to time served of two days in jail.', 4, 0, 1),
(836, '2016-12-17', 'SEA', 'Damontre Moore', 'DE', 'Arrested', 'DUI', 'Suspected of driving while intoxicated in King County, Washington.', 'Resolution undetermined.', 1, 0, 1),
(837, '2016-12-12', 'ARI', 'Michael Floyd', 'WR', 'Arrested', 'DUI', 'Found unconscious in idle car in Scottsdale, charged with drunken driving.', 'Pleaded guilty to extreme DUI, 24 days in jail, 96 in home detention, 30 hours community service.', 1, 0, 1),
(838, '2016-11-29', 'MIA', 'Leon Orr', 'DT', 'Arrested', 'Drugs', 'Pulled over for tinted windows, charged with marijuana possession near Naples, Fla. Deputies also found gun in car.', 'Resolution undetermined. Team released him next day.', 3, 0, 1),
(845, '2017-03-05', 'LA', 'Ethan Westbrooks', 'DT', 'Arrested', 'Domestic Violence', 'Suspected of domestic violence in Sacramento after police observed injuries to mother of his child.', 'Dropped by prosecutors.', 2, 0, 1),
(843, '2017-03-07', 'KC', 'Demetrius Harris', 'TE', 'Arrested', 'Drugs', 'Suspected of felony marijuana possession as passenger in car pulled over in Missouri.', 'Resolution undetermined.', 3, 0, 1),
(847, '2017-02-16', 'NYJ', 'Darrelle Revis', 'CB', 'Charged', 'Assault', 'Accused of aggravated assault after altercation in Pittsburgh. Video shows two men on the ground unconscious.', 'Charges dismissed.', 4, 0, 0),
(848, '2017-02-16', 'LAC', 'King Dunlap', 'OT', 'Arrested', 'Violating court order', 'Suspected of violating protective order in Nashville stemming from domestic incident.	', 'Resolution undetermined.', 2, 0, 1),
(849, '2017-03-26', 'CHI', 'Deiondre'' Hall', 'CB', 'Arrested', 'Disorderly conduct', 'Accused of disorderly conduct, public intoxication and interference outside bar in Cedar Falls, Iowa.', 'Resolution undetermined.', 5, 0, 1),
(850, '2017-03-26', 'GB', 'Makinton Dorleant', 'CB', 'Arrested', 'Police interference', 'Accused of interference after scuffle outside of bar in Cedar Falls, Iowa.', 'Resolution undetermined.', 5, 0, 1),
(851, '2017-03-27', 'SEA', 'Trevone Boykin', 'QB', 'Arrested', 'Drugs', 'Accused of marijuana possession, public intoxication. He was a passenger in a car involved in accident in Dallas.', 'Resolution undetermined.', 3, 0, 1),
(852, '2017-04-06', 'SF', 'Tramaine Brock', 'CB', 'Arrested', 'Domestic violence', 'Suspected of felony domestic violence in Santa Clara, Calif. Officers said female had visible injuries.', 'Dropped by prosecutors based on insufficient evidence.', 2, 1, 1),
(853, '2017-04-06', 'SEA', 'Trevone Boykin', 'QB', 'Arrested', 'Probation violation', 'Suspected of violating probation with March 27 arrest. Probation stemmed from 2015 bar fight while at TCU.', 'Resolution undetermined.', 27, 1, 1),
(854, '2017-04-01', 'ARI', 'Marquis Bundy', 'WR', 'Arrested', 'Disorderly Conduct', 'Suspected of failing to obey police commands after getting agitated outside club in Scottsdale, Ariz.', 'Resolution undetermined.\r\n', 5, 1, 1),
(855, '2017-04-07', 'WAS', 'Junior Galette', 'RB', 'Arrested', 'Disorderly Conduct', 'He was arrested Friday night at MGM Park after getting into a fight and running away. Charged with disorderly conduct and failure to comply.', 'Resolution Undetermined.', 5, 1, 1),
(856, '2016-07-14', 'BUF', 'Jonathan Williams', 'RB', 'Arrested', 'DUI', 'Accused of driving while intoxicated in Fayetteville, Ark.', 'Resolution undetermined.\r\n', 1, 0, 1),
(857, '2016-07-08', 'IND', 'Robert Turbin', 'RB', 'Arrested', 'Drugs', 'Police in Utah accused him of marijuana possession after pulling him over for running a stop sign and then smelling it in his car.', 'Charges dropped.', 3, 0, 2),
(858, '2016-06-19', 'JAC', 'Dan Skuta', 'LB', 'Arrested', 'Battery', 'Accused of pushing a woman''s face with an open hand after she refused to give him her phone number in Orlando.', 'Dropped by prosecutors.', 27, 0, 2),
(859, '2016-02-17', 'IND', 'Jonathan Newsome', 'LB', 'Arrested', 'Drugs', 'Accused of marijuana possession in Indiana after police responded to a complaint about loud music at his residence.', 'Pleaded guilty to misdemeanor, sentenced to supervised probation. Team released him shortly after the incident.', 3, 0, 0),
(860, '2016-01-30', 'CLE', 'Johnny Manziel', 'QB', 'Indicted', 'Domestic violence', 'Former girlfriend accused him of striking her after leaving a bar in Dallas. Grand jury indicted him on misdemeanor charge in April 2016.', 'Diversion program, anger counseling. Team released him in March.', 2, 0, 0),
(861, '2015-12-19', 'JAC', 'Justin Blackmon', 'LB', 'Arrested', 'DUI', 'Accused of drunken driving in Carter County, Okla. Blackmon already was serving an indefinite NFL suspension at the time of his arrest.', 'Resolution undetermined.', 1, 0, 1),
(862, '2015-07-28', 'CAR', 'Stephen Hill', 'WR', 'Cited', 'Drugs', 'Pulled over for seatbelt violation, cited for possession of drug paraphernalia after officer smelled marijuana.', 'Pleaded guilty to misdemeanor, 48 hours community service, one year of probation.', 3, 0, 0),
(863, '2015-07-13', 'NYG', 'Josh Brown', 'K', 'Arrested', 'Violating court order', 'Accused of violating protective order obtained by wife after his previous arrest. The order prevented him from being within 500 feet of her.', 'Charge dropped.', 27, 0, 2),
(864, '2015-05-22', 'NYG', 'Josh Brown', 'K', 'Arrested', 'Domestic violence', 'Accused of fourth-degree domestic violence by wife, who later obtained a protective order against him.', 'Charge dropped. NFL suspended him one game.', 2, 0, 2),
(865, '2015-01-31', 'ARI', 'Bobby Massie', 'OT', 'Arrested', 'DUI', 'Suspected of drunken driving in Arizona, he flunked two sobriety tests and had a blood-alcohol content of 0.14 percent.', 'Resolution undetermined. NFL suspended three games.', 1, 0, 1),
(866, '2015-01-10', 'NYJ', 'Oday Aboushi', 'OG', 'Arrested', 'Drugs', 'Pulled over in New Jersey, accused of possessing marijuana and drug paraphernalia.', 'Diversion program, probation. NFL suspended one game.', 3, 0, 0),
(867, '2017-05-07', 'NYJ', 'Robby Anderson', 'WR', 'Arrested', 'Resisting Arrest', 'Allegedly fighting with "Rolling Loud" Concert security after being told to leave, when a police officer told him to sit down he pushed the officer and continued to resist.', 'Resolution undetermined.', 10, 1, 1),
(868, '2017-04-14', 'CAR', 'Michael Oher', 'OT', 'Cited', 'Assault', 'Cited for allegedly pushing and kicking an Uber driver in the early morning hours of April 14 following a dispute over the fare, according to the police report. The report states Oher had been drinking.', 'Resolution Undetermined ', 4, 0, 1),
(869, '2017-05-29', 'DAL', 'Nolan Carroll', 'CB', 'Arrested', 'DUI', 'Early Monday morning, Dallas Police stopped a vehicle for a traffic violation, Carroll was arrested for DWI.', 'Undetermined outcome.', 1, 0, 0),
(870, '2017-06-04', 'NYG', 'Roger Lewis', 'WR', 'Arrested', 'DUI, drugs', 'Pulled over in Ohio, accused of operating a vehicle while impaired after police smelled marijuana.', 'Resolution Undetermined.', 1, 0, 0),
(871, '2017-06-21', 'GB', 'Letroy Guion', 'DT', 'Arrested', 'DUI', 'Pulled over in Hawaii, suspected of drunken driving.', 'Resolution Undetermined.', 1, 0, 0),
(872, '2017-06-21', 'NYJ', 'Lorenzo Mauldin', 'LB', 'Charged', 'Assault', 'Accused of attacking man at nightclub in Manhattan April 2.', 'Resolution Undetermined.', 4, 0, 0),
(873, '2017-07-04', 'DAL', 'Damien Wilson', 'LB', 'Arrested', 'Assault', 'Arrested on two counts of felony aggravated assault with a deadly weapon by Frisco Police. Allegedly he backed a truck into a woman and brandished a firearm at a man.', 'Pending', 4, 0, 0),
(874, '2017-07-09', 'BUF', 'Adolphus Washington', 'DT', 'Arrested', 'Gun', 'Accused of carrying a concealed weapon at water park in Ohio, leading to intense encounter with police.', 'Resolution undetermined', 6, 0, 0),
(875, '2017-07-16', 'HOU', 'D''Onta Foreman', 'RB', 'Arrested', 'Drugs, Gun', 'University of Texas Officers responded to a report of the smell of marijuana coming from three occupied vehicles on campus just after midnight. Officers discovered marijuana in each vehicle and also discovered a firearm registered to Foreman.', 'Resolution Undetermined', 3, 0, 0),
(876, '2017-07-18', 'JAC', 'Dante Fowler', 'DE', 'Arrested', 'Battery', 'Fowler was seen "punching" a man after a "brief verbal confrontation." He stepped on the man''s glasses, Police stated the man did not claim injury in the incident.', 'Resolution Undetermined.', 4, 0, 0),
(882, '2017-06-29', 'PIT', 'Artie Burns', 'CB', 'Arrested', 'Suspended license', 'Pulled over in Miami Beach, accused of driving with a suspended license.', 'Resolution Undetermined.', 8, 2, 1),
(883, '2017-06-11', 'NO', 'Willie Snead', 'WR', 'Arrested', 'DUI', 'Accused of drunk driving in Kenner, La., where his car had crashed and he registered a blood-alcohol content of .125.', 'Resolution undetermined. Suspended three games.', 1, 2, 1),
(877, '2016-03-12', 'JAC', 'Dante Fowler', 'DE', 'Arrested', 'Assault', 'Fowler ignored verbal requests from officers, swung his arm at officers and tried to return to the crowd.', 'Resolution Undetermined.', 4, 0, 0),
(880, '2017-08-18', 'NYG', 'Michael Bowie', 'OT', 'Arrested', 'Domestic Violence', 'Bowie allegedly grabbed his girlfriend by the neck during an argument and threw her to the ground. He then allegedly broke two TVs and caused other property damage.', 'Resolution Undetermined.', 2, 2, 1),
(881, '2017-09-01', 'CLE', 'T.Y. McGill', 'DT', 'Arrested', 'Drugs', 'Accused of marijuana possession at a hotel in Charlotte, NC.', 'Resolution Undetermined.', 3, 2, 1),
(884, '2017-03-31', 'DEN', 'Will Parks', 'S', 'Arrested', 'Domestic violence', 'Accused of harassment and non-physical domestic violence in incident involving his former girlfriend.', 'Resolution Undetermined.', 2, 1, 1),
(885, '2017-08-17', 'OAK', 'Sean Smith', 'CB', 'Arrested', 'Assault', 'Charged with felony assault for incident in Pasadena, Calif., on July 4. Accused of stomping on head of sister''s boyfriend.', 'Resolution undetermined.', 4, 3, 1),
(886, '2017-09-25', 'LA', 'Ethan Westbrooks', 'DL', 'Arrested', 'Gun, Traffic', 'Westbrooks was pulled over by police in Bakersfield for speeding, at which point police found a gun in Westbrooks vehicle that was not registered to him.', 'Resolution Undetermined.', 6, 2, 1),
(887, '2017-11-11', 'KC', 'Roy Miller', 'DT', 'Arrested', 'Domestic Battery', 'Arrested by the Jacksonville sheriff''s office for allegedly pulling his wife by the hair, tearing hair from her head and ripping her shirt. ', 'Dropped by team 2 days later.', 2, 1, 1),
(888, '2017-11-18', 'MIA', 'Rey Maualuga', 'LB', 'Arrested', 'Battery', 'ESPN confirmed that court records in Miami-Dade County show an open battery case against Maualuga, though no other information was listed about that matter on Saturday.', 'Waived from team same day.', 4, 1, 1),
(889, '2017-10-01', 'GB', 'Aaron Jones', 'RB', 'Arrested', 'DUI', 'Jones was pulled over speeding, when the officer reportedly smelled the odor of Marijuana. He was charged with speeding, driving without a license and operating a vehicle under the influence.', 'Resolution Undetermined.', 1, 1, 1),
(890, '2017-12-10', 'SEA', 'Malik McDowell', 'DT', 'Arrested', 'Disorderly Conduct', 'McDowell was arrested after a dispute at a bar in Atlanta, GA. He reportedly shouted profanity at cops during the arrest.', 'Resolution Undetermined.', 5, 1, 1),
(891, '2018-01-03', 'TB', 'TJ Ward', 'S', 'Arrested', 'Outstanding Warrant', 'TJ Ward was arrested following an October drug possession arrest for an outstanding warrant related to that case.', 'Resolution Undetermined.', 3, 1, 1),
(893, '2018-01-09', 'NYG', 'Rashard Robinson', 'CB', 'Charged', 'Drugs', 'When pulled over in New Jersey he was found with candy allegedly laced with marijuana. The arrest reportedly happened in December.', 'Resolution Undetermined.', 3, 2, 1),
(894, '2018-01-12', 'SF', 'Reuben Foster', 'LB', 'Arrested', 'Drugs', 'Arrested for possession of marijuana in Alabama.', 'Resolution Undetermined.', 3, 1, 1),
(895, '2018-01-14', 'SEA', 'Jeremy Lane', 'CB', 'Arrested', 'DUI', 'Arrested 5:30 a.m. Sunday morning for suspicion of DUI.', 'Resolution Undetermined.', 1, 1, 1),
(896, '2018-01-14', 'DEN', 'Carlos Henderson', 'WR', 'Arrested', 'Drugs', 'Pulled over for speeding, cops found marijuana in the car.', 'Resolution Undetermined.', 3, 1, 1),
(897, '2018-01-25', 'BAL', 'Marlon Humphrey', 'CB', 'Arrested', 'Robbery', 'Arrested by Univ. of Alabama police for allegedly taking a phone charger from an uber driver.', 'Resolution Undetermined.', 9, 1, 1),
(898, '2018-01-25', 'KC', 'Kevin Pierre-Louis ', 'LB', 'Arrested', 'Drugs', 'Was allegedly arrested in Johnson County, Kansas after a traffic stop for not displaying a license plate, was found driving without a license and possession of marijuana.  ', 'Resolution Undetermined.', 3, 2, 1),
(899, '2018-02-11', 'SF', 'Reuben Foster', 'LB', 'Arrested', 'Domestic Violence', 'Arrested after a welfare check that lead to a domestic violence arrest and for possessing an assault rifle. He was held in Santa Clara but released after posting $75,000 bail.', 'Resolution Undetermined.', 2, 1, 1),
(900, '2018-02-26', 'NYJ', 'Dylan Donahue', 'LB', 'Arrested', 'DUI', 'Accused of drunken driving, driving wrong way in Lincoln Tunnel and crashing into a bus with a blood-alcohol content of 0.15.', 'Resolution Undetermined ', 1, 1, 1),
(901, '2018-03-07', 'DEN', 'Adam Gotsis', 'DE', 'Arrested', 'Sexual Assault', 'Accused of rape in an incident that happened in 2013 when Gotsis was a student at Georgia Tech.', 'Resolution Undetermined.', 14, 1, 1),
(902, '2018-03-19', 'BUF', 'Jay Jones', 'WR', 'Arrested', 'Vandalism', 'Jay Jones allegedly kicked a window of a 30th floor penthouse in Miami. Police arrested him on a vandalism charge.', 'Resolution Undetermined.', 27, 1, 1),
(903, '2018-04-08', 'GB', 'Trevor Davis', 'WR', 'Arrested', 'Threat', 'Davis was arrested at the Hawaiian Airlines check-in counter when, after being asked security questions about his luggage by an attendant, turned to a female companion and allegedly asked her, "Did you pack the explosives?"', 'Resolution Undetermined.', 5, 2, 1),
(904, '2018-03-03', 'OAK', 'Aldon Smith', 'LB', 'Warrant', 'Domestic Violence', 'Smith allegedly fled the scene of a domestic incident in which the victim suffered non-life-threating injuries.', 'Resolution Undetermined. Team cut him within 2 days', 2, 1, 1),
(905, '2018-03-23', 'PHI', 'Michael Bennett', 'DE', 'Arrested', 'Injury to elderly', 'Accused of pushing his way past a 66-year-old parapalegic security worker at the Super Bowl in Houston in 2017 when Bennett was a spectator and played for Seattle.', 'Resolution Undetermined.', 4, 1, 1),
(906, '2018-03-23', 'NE', 'Duron Harmond', 'S', 'Arrested', 'Drugs', 'Apprehended at Costa Rica airport, accused of carrying 58 grams of marijuana inside a can of iced tea.', 'Resolution Undetermined.', 3, 1, 1),
(907, '2018-04-15', 'PHI', 'Daryl Worley', 'WR', 'Arrested', 'DUI', 'Accused of resisting arrest after being found unconscious in car blocking highway. Gun without permit recovered from the scene.', 'Resolution undetermined. Team released him hours later.', 1, 1, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `Arrest_Stats_Player`
--
CREATE TABLE IF NOT EXISTS `Arrest_Stats_Player` (
`Name` varchar(25)
,`Position` varchar(5)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `Arrest_Stats_Player_Join`
--
CREATE TABLE IF NOT EXISTS `Arrest_Stats_Player_Join` (
`arrest_stats_id` int(11)
,`player_id` int(4)
,`full_name` varchar(27)
,`first_name` varchar(14)
,`last_name` varchar(17)
,`team_id` varchar(4)
,`position` varchar(4)
,`uniform_number` varchar(4)
,`birthdate` varchar(10)
,`college` varchar(39)
,`height` varchar(4)
,`weight` varchar(4)
,`years_pro` varchar(4)
,`status` varchar(4)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `Arrest_Stats_Player_mismatch`
--
CREATE TABLE IF NOT EXISTS `Arrest_Stats_Player_mismatch` (
`arrest_stats_id` int(11)
,`Date` date
,`Team` varchar(5)
,`Name` varchar(25)
,`Position` varchar(5)
,`Encounter` varchar(12)
,`Category` varchar(25)
,`Description` varchar(255)
,`Outcome` varchar(255)
,`general_category_id` int(11)
,`legal_level_id` int(11)
,`resolution_category_id` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `bandwagon_bipartite`
--
CREATE TABLE IF NOT EXISTS `bandwagon_bipartite` (
`flair_id` int(11)
,`old_flair_id` mediumtext
,`flair_team` varchar(25)
,`old_flair_team` varchar(25)
,`Bandwagonners` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `Bandwagon_users`
--
CREATE TABLE IF NOT EXISTS `Bandwagon_users` (
`date` timestamp
,`username` varchar(25)
,`flair_id` int(11)
,`old_flair_id` mediumtext
,`flair_team` varchar(25)
,`old_flair_team` varchar(25)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `Bandwagon_users_notnull`
--
CREATE TABLE IF NOT EXISTS `Bandwagon_users_notnull` (
`date` timestamp
,`username` varchar(25)
,`flair_id` int(11)
,`old_flair_id` mediumtext
,`flair_team` varchar(25)
,`old_flair_team` varchar(25)
);


--
-- Table structure for table `CachedArrestSeasonState`
--
-- Creation: Apr 17, 2018 at 03:51 PM
-- Last update: Apr 17, 2018 at 03:51 PM
--

CREATE TABLE IF NOT EXISTS `CachedArrestSeasonState` (
  `arrest_stats_id` int(11) NOT NULL DEFAULT '0',
  `season` year(4) NOT NULL DEFAULT '0000',
  `SeasonState` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
--
-- Table structure for table `Cache_LastArrestByTeam`
--
-- Creation: Apr 20, 2018 at 07:57 AM
-- Last update: Apr 20, 2018 at 07:57 AM
--

CREATE TABLE IF NOT EXISTS `Cache_LastArrestByTeam` (
  `arrest_stats_id` int(11) NOT NULL DEFAULT '0',
  `Date` date DEFAULT NULL,
  `Team` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Team_preffered_name` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `Team_city` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `Team_logo_id` int(11) NOT NULL,
  `Team_Conference` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_Division` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_Conference_Division` varchar(9) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_hex_color` varchar(6) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'The hex value that represents the team main color, without the preceding # hash symbol',
  `Team_hex_alt_color` varchar(6) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT 'The hex value that represents the team second color, without the preceding # hash symbol',
  `reddit_group_id` int(11) NOT NULL COMMENT 'Reddit Group ID',
  `Name` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Position_type` varchar(2) COLLATE utf8_unicode_ci NOT NULL COMMENT 'O = offense, D = Defense, S = special teams',
  `Encounter` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Category` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Crime_category` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Crime_category_color` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Outcome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Season` year(4) NOT NULL DEFAULT '0000',
  `ArrestSeasonState` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `general_category_id` int(11) NOT NULL,
  `legal_level_id` int(11) NOT NULL,
  `resolution_category_id` int(11) NOT NULL,
  `Year` int(4) DEFAULT NULL,
  `Month` int(2) DEFAULT NULL,
  `Day` int(2) DEFAULT NULL,
  `Day_of_Week` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Day_of_Week_int` int(1) DEFAULT NULL,
  `DaysSince` bigint(21) DEFAULT NULL,
  `DaysToLastArrest` bigint(21) DEFAULT NULL,
  `DaysToLastCrimeArrest` bigint(21) DEFAULT NULL,
  `DaysToLastTeamArrest` bigint(21) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `External_Crime_Category`
--
-- Creation: Sep 25, 2017 at 06:41 PM
-- Last update: Sep 25, 2017 at 06:42 PM
--

CREATE TABLE IF NOT EXISTS `External_Crime_Category` (
  `External_Crime_Category_id` int(11) NOT NULL,
  `External_Source_id` int(11) NOT NULL COMMENT 'key of external source',
  `Name` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Title/Name of category',
  `Description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Crime Categories from external sources';

--
-- Dumping data for table `External_Crime_Category`
--

INSERT INTO `External_Crime_Category` (`External_Crime_Category_id`, `External_Source_id`, `Name`, `Description`) VALUES
(1, 2, 'Violent Crime', 'Violent crime is composed of four offenses: murder and nonnegligent manslaughter, rape, robbery, and aggravated assault. Violent crimes are defined in the FBI UCR Program as those offenses that involve force or threat of force.'),
(2, 2, 'Property Crime', 'Property crime includes the offenses of burglary, larceny-theft, motor vehicle theft, and arson. The object of the theft-type offenses is the taking of money or property, but there is no force or threat of force against the victims.');

-- --------------------------------------------------------

--
-- Table structure for table `External_crime_category_relation`
--
-- Creation: Sep 25, 2017 at 06:47 PM
-- Last update: Sep 25, 2017 at 06:47 PM
--

CREATE TABLE IF NOT EXISTS `External_crime_category_relation` (
  `general_category_id` int(11) NOT NULL,
  `External_Crime_Category_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `External_Sources`
--
-- Creation: Sep 25, 2017 at 05:16 PM
-- Last update: Oct 22, 2017 at 09:46 PM
--

CREATE TABLE IF NOT EXISTS `External_Sources` (
  `External_Source_id` int(11) NOT NULL COMMENT 'Primary Key',
  `Name` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'title',
  `Primary_Use` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'what is this used for most',
  `URL` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'url of source'
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='This is a table of sources where I pull data for coding to match reports';

--
-- Dumping data for table `External_Sources`
--

INSERT INTO `External_Sources` (`External_Source_id`, `Name`, `Primary_Use`, `URL`) VALUES
(1, 'USA Today NFL Arrests', 'Original primary data source', 'http://usatoday.com/sports/nfl/arrests/'),
(2, 'FBI UCR Stats', 'Compare NFL to national crime stats', 'https://ucr.fbi.gov/'),
(3, 'NFL Game Python', 'Active Player Status', 'https://github.com/BurntSushi/nflgame');

-- --------------------------------------------------------

--
-- Table structure for table `free_arrests`
--
-- Creation: Nov 30, 2015 at 04:34 PM
-- Last update: May 25, 2017 at 03:22 PM
-- Last check: Aug 24, 2017 at 06:36 PM
--

CREATE TABLE IF NOT EXISTS `free_arrests` (
  `arrest_stats_id` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Team` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Name` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Encounter` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Category` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Outcome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `general_category_id` int(11) NOT NULL,
  `legal_level_id` int(11) NOT NULL,
  `resolution_category_id` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `free_arrests`
--

INSERT INTO `free_arrests` (`arrest_stats_id`, `Date`, `Team`, `Name`, `Position`, `Encounter`, `Category`, `Description`, `Outcome`, `general_category_id`, `legal_level_id`, `resolution_category_id`) VALUES
(1, '2013-02-08', 'Free ', 'Michael Boley', 'LB', 'Arrested', 'Child abuse', 'Accused of excessive spanking in incident involving a child at a hotel in Alabama in 2011. He later signed with Cincinnati.', 'Pleaded guilty, 10-year suspended sentence, treatment program.', 27, 1, 1),
(2, '2012-03-17', 'Free ', 'Samson Satele', 'C', 'Arrested', 'Disorderly conduct', 'Arrested at a shopping complex in Hawaii. He later signed with Indianapolis.', '--', 5, 1, 1),
(3, '2008-04-30', 'Free ', 'Darrion Scott', 'DE', 'Arrested', 'Assault', 'Accused of putting dry-cleaning bag over 2-year-old son''s head. After leaving Minnesota, he later signed with Washington Redskins.', 'Pleaded guilty to child endangement.', 4, 1, 1),
(4, '2015-11-24', 'free', 'Joseph Randle', 'RB', 'Arrested', 'Assault', 'He wasn''t active on any roster at the time of the arrest. In the Mulvane Kansas Star Casino. He was allegedly drunk and was asked to leave. While being escorted out, he spit on the floor and assaulted the casino security guards.', 'Bail set at $25,000', 4, 0, 0),
(5, '2017-05-22', 'Free', 'Matt Elam', 'SS', 'Arrested', 'Assault, Drugs', 'Delray Beach police arrested Elam on suspicion of felony grand theft, and misdemeanor battery after the confrontation. He was booked into the Palm Beach County Jail, his bond set at $4,500.', 'Undetermined Resolution', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `general_category`
--
-- Creation: Jul 31, 2017 at 07:56 AM
-- Last update: Jul 31, 2017 at 08:05 AM
-- Last check: Aug 24, 2017 at 06:36 PM
--

CREATE TABLE IF NOT EXISTS `general_category` (
  `general_category_id` int(11) NOT NULL,
  `Category` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `hex_color` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT '000000'
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `general_category`
--

INSERT INTO `general_category` (`general_category_id`, `Category`, `hex_color`) VALUES
(1, 'DUI', '1F77B4'),
(2, 'Domestic Violence', '2CA02C'),
(3, 'Drugs', 'FF7F0E'),
(4, 'Assault / Battery', 'D62728'),
(5, 'Disorderly conduct', 'E377C2'),
(6, 'Gun', '9467BD'),
(7, 'Alcohol', '7F7F7F'),
(8, 'License / Traffic', '8C564B'),
(9, 'Theft / Burglary', '154F78'),
(10, 'Resisting', '17BECF'),
(11, 'Reckless Driving', '000000'),
(12, 'Warrant', '000000'),
(13, 'Failure to appear', '000000'),
(14, 'Sex', 'B0580A'),
(15, 'Trespassing', '000000'),
(16, 'Animal Abuse', '7D1717'),
(17, 'Sexual Assault', '000000'),
(18, 'Solicitation', '000000'),
(19, 'Public Urination', '000000'),
(20, 'Harrassment', '000000'),
(21, 'Manslaughter', '000000'),
(22, 'Child Support', '000000'),
(23, 'Murder / Manslaughter', '248224'),
(24, 'Child Abuse', '000000'),
(25, 'False Information', '000000'),
(26, 'Traffic', '000000'),
(27, 'Other', 'BCBD22');

-- --------------------------------------------------------

--
-- Stand-in structure for view `InSeasonArrests`
--
CREATE TABLE IF NOT EXISTS `InSeasonArrests` (
`arrest_stats_id` int(11)
,`Date` date
,`Team` varchar(5)
,`Name` varchar(25)
,`Position` varchar(5)
,`Encounter` varchar(12)
,`Category` varchar(25)
,`Description` varchar(255)
,`Outcome` varchar(255)
,`general_category_id` int(11)
,`legal_level_id` int(11)
,`resolution_category_id` int(11)
,`season` year(4)
,`season_start` date
,`season_end` date
,`playoff_start` date
,`superbowl_date` date
,`superbowl_afc_team` varchar(10)
,`superbowl_nfc_team` varchar(10)
,`superbowl_winning_team` varchar(10)
,`probowl_date` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `LastArrestByTeam`
--
CREATE TABLE IF NOT EXISTS `LastArrestByTeam` (
`arrest_stats_id` int(11)
,`Date` date
,`Team` varchar(5)
,`Team_name` varchar(25)
,`Team_preffered_name` varchar(55)
,`Team_city` varchar(35)
,`Team_logo_id` int(11)
,`Team_Conference` varchar(3)
,`Team_Division` varchar(5)
,`Team_Conference_Division` varchar(9)
,`Team_hex_color` varchar(6)
,`Team_hex_alt_color` varchar(6)
,`reddit_group_id` int(11)
,`Name` varchar(25)
,`Position` varchar(5)
,`Position_name` varchar(25)
,`Position_type` varchar(2)
,`Encounter` varchar(12)
,`Category` varchar(25)
,`Crime_category` varchar(25)
,`Crime_category_color` varchar(6)
,`Description` varchar(255)
,`Outcome` varchar(255)
,`Season` year(4)
,`ArrestSeasonState` varchar(9)
,`general_category_id` int(11)
,`legal_level_id` int(11)
,`resolution_category_id` int(11)
,`Year` int(4)
,`Month` int(2)
,`Day` int(2)
,`Day_of_Week` varchar(9)
,`Day_of_Week_int` int(1)
,`DaysSince` bigint(21)
,`DaysToLastArrest` bigint(21)
,`DaysToLastCrimeArrest` bigint(21)
,`DaysToLastTeamArrest` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `LastArrestByTeam_id`
--
CREATE TABLE IF NOT EXISTS `LastArrestByTeam_id` (
`Team` varchar(5)
,`ArrestDate` date
,`arrest_stats_id` bigint(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `LastArrestDateByTeam`
--
CREATE TABLE IF NOT EXISTS `LastArrestDateByTeam` (
`Team` varchar(5)
,`ArrestDate` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `LastArrestDateFact`
--
CREATE TABLE IF NOT EXISTS `LastArrestDateFact` (
`arrest_stats_id` int(11)
,`Date` date
,`DateCount` bigint(21)
,`LastDate` date
,`DaysToLastArrest` bigint(21)
,`DaysToLastTeamArrest` bigint(21)
,`DaysToLastCrimeArrest` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `legal_level`
--
-- Creation: Aug 13, 2015 at 04:50 PM
-- Last update: Aug 13, 2015 at 04:51 PM
-- Last check: Sep 25, 2015 at 02:19 AM
--

CREATE TABLE IF NOT EXISTS `legal_level` (
  `legal_level_id` int(11) NOT NULL,
  `Category` varchar(25) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `legal_level`
--

INSERT INTO `legal_level` (`legal_level_id`, `Category`) VALUES
(1, 'Other'),
(2, 'Misdemeanor'),
(3, 'Felony');


--
-- Stand-in structure for view `OffSeasonArrests`
--
CREATE TABLE IF NOT EXISTS `OffSeasonArrests` (
`arrest_stats_id` int(11)
,`Date` date
,`Team` varchar(5)
,`Name` varchar(25)
,`Position` varchar(5)
,`Encounter` varchar(12)
,`Category` varchar(25)
,`Description` varchar(255)
,`Outcome` varchar(255)
,`general_category_id` int(11)
,`legal_level_id` int(11)
,`resolution_category_id` int(11)
,`season` year(4)
,`season_start` date
,`season_end` date
,`playoff_start` date
,`superbowl_date` date
,`superbowl_afc_team` varchar(10)
,`superbowl_nfc_team` varchar(10)
,`superbowl_winning_team` varchar(10)
,`probowl_date` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `PlayoffSeasonArrests`
--
CREATE TABLE IF NOT EXISTS `PlayoffSeasonArrests` (
`arrest_stats_id` int(11)
,`Date` date
,`Team` varchar(5)
,`Name` varchar(25)
,`Position` varchar(5)
,`Encounter` varchar(12)
,`Category` varchar(25)
,`Description` varchar(255)
,`Outcome` varchar(255)
,`general_category_id` int(11)
,`legal_level_id` int(11)
,`resolution_category_id` int(11)
,`season` year(4)
,`season_start` date
,`season_end` date
,`playoff_start` date
,`superbowl_date` date
,`superbowl_afc_team` varchar(10)
,`superbowl_nfc_team` varchar(10)
,`superbowl_winning_team` varchar(10)
,`probowl_date` date
);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--
-- Creation: Dec 04, 2015 at 09:52 PM
-- Last update: Sep 23, 2017 at 08:17 PM
-- Last check: Jan 26, 2016 at 04:08 AM
--

CREATE TABLE IF NOT EXISTS `position` (
  `position_id` int(11) NOT NULL,
  `position_tag` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `position_title` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `position_type` varchar(2) COLLATE utf8_unicode_ci NOT NULL COMMENT 'O = offense, D = Defense, S = special teams'
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position_tag`, `position_title`, `position_type`) VALUES
(1, 'CE', 'Center', 'O'),
(2, 'G', 'Guard', 'O'),
(3, 'OT', 'Offensive Tackle', 'O'),
(4, 'TE', 'Tight End', 'O'),
(5, 'WR', 'Wide Receiver', 'O'),
(6, 'FB', 'Fullback', 'O'),
(7, 'RB', 'Running Back', 'O'),
(8, 'TB', 'Tailback', 'O'),
(9, 'WB', 'Wingback', 'O'),
(10, 'SB', 'Slotback', 'O'),
(11, 'QB', 'Quarterback', 'O'),
(12, 'DE', 'Defensive End', 'D'),
(13, 'DT', 'Defensive Tackle', 'D'),
(14, 'LB', 'Linebacker', 'D'),
(15, 'CB', 'Cornerback', 'D'),
(16, 'SS', 'Strong Safety', 'D'),
(17, 'FS', 'Free Safety', 'D'),
(18, 'K', 'Kicker', 'S'),
(19, 'KR', 'Kick Returner', 'S'),
(20, 'P', 'Punter', 'S'),
(21, 'GN', 'Gunner', 'S'),
(22, 'WD', 'Wedge Buster', 'S'),
(23, 'PR', 'Punt Returner', 'S'),
(24, 'S', 'Safety', 'D'),
(25, 'DL', 'Defensive Lineman', 'D'),
(26, 'C', 'Center', 'O'),
(27, 'DB', 'Defensive Back', 'D'),
(28, 'OL', 'Offensive Lineman', 'O'),
(29, 'DE/DT', 'Defensive End / Tackle', 'D'),
(30, 'OG', 'Offensive Guard', 'O');


--
-- Table structure for table `resolution_category`
--
-- Creation: Aug 13, 2015 at 05:10 PM
-- Last update: May 30, 2017 at 05:59 AM
-- Last check: Aug 24, 2017 at 06:36 PM
--

CREATE TABLE IF NOT EXISTS `resolution_category` (
  `resolution_category_id` int(11) NOT NULL,
  `Category` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `resolution_category`
--

INSERT INTO `resolution_category` (`resolution_category_id`, `Category`) VALUES
(1, 'Other'),
(2, 'Charges Dropped.'),
(3, 'Jail Time'),
(4, 'Acquitted '),
(5, 'Paid Fines');

-- --------------------------------------------------------

--
-- Table structure for table `seasons`
--
-- Creation: Jul 19, 2017 at 09:23 PM
-- Last update: Feb 05, 2018 at 05:54 AM
-- Last check: Aug 24, 2017 at 06:36 PM
--

CREATE TABLE IF NOT EXISTS `seasons` (
  `season` year(4) NOT NULL,
  `season_start` date NOT NULL,
  `season_end` date NOT NULL,
  `playoff_start` date NOT NULL,
  `superbowl_date` date NOT NULL,
  `superbowl_afc_team` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `superbowl_nfc_team` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `superbowl_winning_team` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `probowl_date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='This table holds information about the dates and superbowl outcomes each year';

--
-- Dumping data for table `seasons`
--

INSERT INTO `seasons` (`season`, `season_start`, `season_end`, `playoff_start`, `superbowl_date`, `superbowl_afc_team`, `superbowl_nfc_team`, `superbowl_winning_team`, `probowl_date`) VALUES
(1999, '1999-09-12', '2000-01-03', '2000-01-08', '2000-01-30', 'TEN', 'STL', 'STL', '2000-02-06'),
(2000, '2000-09-03', '2000-12-25', '2000-12-30', '2001-01-28', 'BAL', 'NYG', 'BAL', '2001-02-04'),
(2001, '2001-09-09', '2002-01-07', '2002-01-12', '2002-02-03', 'NE', 'STL', 'NE', '2002-02-09'),
(2002, '2002-09-05', '2002-12-30', '2003-01-04', '2003-01-26', 'OAK', 'TB', 'TB', '2003-02-02'),
(2003, '2003-09-04', '2003-12-28', '2004-01-03', '2004-02-01', 'NE', 'CAR', 'NE', '2004-02-08'),
(2004, '2004-09-09', '2005-01-02', '2005-01-08', '2005-02-06', 'NE', 'PHI', 'NE', '2005-02-13'),
(2005, '2005-09-08', '2006-01-01', '2006-01-07', '2006-02-05', 'PIT', 'SEA', 'PIT', '2006-02-12'),
(2006, '2006-09-07', '2006-12-31', '2007-01-06', '2007-02-04', 'IND', 'CHI', 'IND', '2007-02-10'),
(2007, '2007-09-06', '2007-12-30', '2008-01-05', '2008-02-03', 'NE', 'NYG', 'NYG', '2008-02-10'),
(2008, '2008-09-04', '2008-12-28', '2009-01-03', '2009-02-01', 'PIT', 'ARI', 'PIT', '2009-02-08'),
(2009, '2009-09-10', '2010-01-03', '2010-01-09', '2010-02-07', 'IND', 'NO', 'NO', '2010-01-31'),
(2010, '2010-09-09', '2011-01-02', '2011-01-08', '2011-02-06', 'PIT', 'GB', 'GB', '2011-01-30'),
(2011, '2011-09-08', '2012-01-01', '2012-01-07', '2012-02-05', 'NE', 'NYG', 'NYG', '2012-01-29'),
(2012, '2012-09-05', '2012-12-30', '2013-01-05', '2013-02-03', 'BAL', 'SF', 'BAL', '2013-01-27'),
(2013, '2013-09-05', '2013-12-29', '2014-01-04', '2014-02-02', 'DEN', 'SEA', 'SEA', '2014-01-26'),
(2014, '2014-09-04', '2014-12-28', '2015-01-03', '2015-02-01', 'NE', 'SEA', 'NE', '2015-01-25'),
(2015, '2015-09-10', '2016-01-03', '2016-01-09', '2016-02-07', 'DEN', 'CAR', 'DEN', '2016-01-31'),
(2016, '2016-09-08', '2017-01-01', '2017-01-07', '2017-02-05', 'NE', 'ATL', 'NE', '2017-01-29'),
(2017, '2017-09-07', '2017-12-31', '2018-01-06', '2018-02-04', 'NE', 'PHI', 'PHI', '2018-01-28'),
(2018, '2018-09-06', '2018-12-30', '2019-01-05', '2019-02-03', '', '', '', '2019-01-27');

-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- Table structure for table `teams`
--
-- Creation: Jan 28, 2018 at 03:42 AM
-- Last update: Jan 28, 2018 at 04:00 AM
--

CREATE TABLE IF NOT EXISTS `teams` (
  `teams_id` int(11) NOT NULL,
  `teams_full_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Team_preffered_name` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `team_code` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'USA',
  `division` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `bandwagon_code` int(11) NOT NULL,
  `Team_logo_id` int(11) NOT NULL,
  `reddit_group_id` int(11) NOT NULL COMMENT 'ID from the Reddit Group Table'
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teams_id`, `teams_full_name`, `Team_preffered_name`, `team_code`, `city`, `state`, `division`, `bandwagon_code`, `Team_logo_id`, `reddit_group_id`) VALUES
(6, 'Bengals', 'Cincinnati Bengals', 'CIN', 'Cincinnati', 'Ohio', 'NFL', 1, 7, 2),
(5, 'Broncos', 'Denver Broncos', 'DEN', 'Denver', 'Colorado', 'NFL', 2, 10, 3),
(4, 'Vikings', 'Minnesota Vikings', 'MIN', 'Minneapolis', 'Minnesota', 'NFL', 31, 18, 4),
(7, 'Buccaneers', 'Tampa Bay Buccaneers', 'TB', 'Tampa Bay', 'Florida', 'NFL', 4, 30, 4),
(8, 'Titans', 'Tennessee Titans', 'TEN', 'Nashville', 'Tennessee', 'NFL', 30, 31, 4),
(9, 'Jaguars', 'Jacksonville Jaguars', 'JAC', 'Jacksonville', 'Florida', 'NFL', 15, 15, 2),
(10, 'Colts', 'Indianapolis Colts', 'IND', 'Indianapolis', 'Indiana', 'NFL', 9, 14, 3),
(11, 'Bears', 'Chicago Bears', 'CHI', 'Chicago', 'Illinois', 'NFL', 0, 6, 5),
(12, 'Chiefs', 'Kansas City Chiefs', 'KC', 'Kansas City', 'Missouri', 'NFL', 8, 16, 6),
(13, 'Dolphins', 'Miami Dolphins', 'MIA', 'Miami', 'Florida', 'NFL', 11, 17, 3),
(14, 'Browns', 'Cleveland Browns', 'CLE', 'Cleveland', 'Ohio', 'NFL', 3, 8, 6),
(15, 'Chargers', 'Los Angeles Chargers', 'LAC', 'Los Angeles', 'California', 'NFL', 7, 26, 3),
(16, 'Ravens', 'Baltimore Ravens', 'BAL', 'Baltimore', 'Maryland', 'NFL', 24, 3, 1),
(17, 'Steelers', 'Pittsburgh Steelers', 'PIT', 'Pittsburgh', 'Pennsylvania', 'NFL', 28, 25, 5),
(18, 'Saints', 'New Orleans Saints', 'NO', 'New Orleans', 'Louisiana', 'NFL', 26, 20, 6),
(19, 'Seahawks', 'Seattle Seahawks', 'SEA', 'Seattle', 'Washington', 'NFL', 27, 28, 1),
(20, 'Packers', 'Green Bay Packers', 'GB', 'Green Bay', 'Wisconsin', 'NFL', 19, 12, 5),
(22, 'Raiders', 'Oakland Raiders', 'OAK', 'Oakland', 'California', 'NFL', 22, 23, 4),
(23, 'Redskins', 'Washington Redskins', 'WAS', 'Washington DC', 'USA', 'NFL', 25, 32, 4),
(24, 'Falcons', 'Atlanta Falcons', 'ATL', 'Atlanta', 'Georgia', 'NFL', 13, 2, 1),
(25, 'Cardinals', 'Arizona Cardinals', 'ARI', 'Phoenix', 'Arizona', 'NFL', 6, 1, 1),
(26, 'Panthers', 'Carolina Panthers', 'CAR', 'Charlotte', 'North Carolina', 'NFL', 20, 5, 2),
(27, 'Patriots', 'New England Patriots', 'NE', 'Boston', 'Massachusetts', 'NFL', 21, 19, 5),
(28, 'Buffalo Bills', 'Buffalo Bills', 'BUF', 'Buffalo', 'New York', 'NFL', 5, 4, 3),
(29, 'Lions', 'Detroit Lions', 'DET', 'Detroit', 'Michigan', 'NFL', 17, 11, 2),
(30, 'Cowboys', 'Dallas Cowboys', 'DAL', 'Dallas', 'Texas', 'NFL', 10, 9, 5),
(31, 'Jets', 'New York Jets', 'NYJ', 'New York', 'New York', 'NFL', 16, 22, 6),
(32, 'Eagles', 'Philadelphia Eagles', 'PHI', 'Philadelphia', 'Pennsylvania', 'NFL', 12, 24, 1),
(33, 'NY Giants', 'New York Giants', 'NYG', 'New York', 'New York', 'NFL', 18, 21, 0),
(34, 'Texans', 'Houston Texans', 'HOU', 'Houston', 'Texas', 'NFL', 29, 13, 3),
(35, 'Rams', 'Los Angeles Rams', 'LA', 'Los Angeles', 'California', 'NFL', 23, 29, 3),
(36, 'Free Agents', 'Free Agents', 'FREE', 'N/A', 'N/A', 'NFL', 99, 0, 0),
(37, '49ers', 'San Francisco 49ers', 'SF', 'San Francisco', 'California', 'NFL', 14, 27, 5);

-- --------------------------------------------------------

--
-- Table structure for table `teams_detail`
--
-- Creation: Jan 28, 2018 at 03:04 AM
-- Last update: Jan 28, 2018 at 03:20 AM
--

CREATE TABLE IF NOT EXISTS `teams_detail` (
  `Team_Conference` varchar(3) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_Division` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `Team_City` varchar(19) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Stadium` varchar(35) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Stadium_Capacity` int(7) DEFAULT NULL,
  `Stadium_coords` varchar(18) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_nfl_season` int(4) DEFAULT NULL,
  `Head_coach_2016` varchar(14) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team_hex_color` varchar(6) NOT NULL DEFAULT '000' COMMENT 'The hex value that represents the team main color, without the preceding # hash symbol',
  `Team_hex_alt_color` varchar(6) NOT NULL DEFAULT 'fff' COMMENT 'The hex value that represents the team second color, without the preceding # hash symbol',
  `reddit_group_id` int(11) NOT NULL COMMENT 'Reddit Group ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams_detail`
--

INSERT INTO `teams_detail` (`Team_Conference`, `Team_Division`, `Team_name`, `Team_City`, `Stadium`, `Stadium_Capacity`, `Stadium_coords`, `first_nfl_season`, `Head_coach_2016`, `Team_hex_color`, `Team_hex_alt_color`, `reddit_group_id`) VALUES
('AFC', 'East', 'Buffalo Bills', 'Orchard Park, NY', 'New Era Field', 71608, '42.774?N 78.787?W', 1970, 'Sean McDermott', '00338D', 'C60C30', 3),
('AFC', 'East', 'Miami Dolphins', 'Miami Gardens, FL', 'Hard Rock Stadium', 65326, '25.958?N 80.239?W', 1970, 'Adam Gase', '008DB7', 'F5811F', 3),
('AFC', 'East', 'New England Patriots', 'Foxborough, MA', 'Gillette Stadium', 66829, '42.091?N 71.264?W', 1970, 'Bill Belichick', '0C2340', 'C8102E', 5),
('AFC', 'East', 'New York Jets', 'East Rutherford, NJ', 'MetLife Stadium', 82500, '40.814?N 74.074?W', 1970, 'Todd Bowles', '0C371D', 'FFFFFF', 6),
('AFC', 'North', 'Baltimore Ravens', 'Baltimore, MD', 'M&T Bank Stadium', 71008, '39.278?N 76.623?W', 1996, 'John Harbaugh', '280353', 'D0B240', 1),
('AFC', 'North', 'Cincinnati Bengals', 'Cincinnati, OH', 'Paul Brown Stadium', 65515, '39.095?N 84.516?W', 1970, 'Marvin Lewis', 'FB4F14', '000000', 2),
('AFC', 'North', 'Cleveland Browns', 'Cleveland, OH', 'FirstEnergy Stadium', 67431, '41.506?N 81.699?W', 1950, 'Hue Jackson', '382F2D', 'EB3300', 6),
('AFC', 'North', 'Pittsburgh Steelers', 'Pittsburgh, PA', 'Heinz Field', 68400, '40.447?N 80.016?W', 1933, 'Mike Tomlin', 'FFB81C', '101820', 5),
('AFC', 'South', 'Houston Texans', 'Houston, TX', 'NRG Stadium', 72220, '29.685?N 95.411?W', 2002, 'Bill O''Brien', '02253A', 'B31B34', 3),
('AFC', 'South', 'Indianapolis Colts', 'Indianapolis, IN', 'Lucas Oil Stadium', 67000, '39.760?N 86.164?W', 1953, 'Chuck Pagano', '003B7B', 'FFFFFF', 3),
('AFC', 'South', 'Jacksonville Jaguars', 'Jacksonville, FL', 'EverBank Fiel', 67246, '30.324?N 81.638?W', 1995, 'Doug Marrone', '000000', '9E792C', 2),
('AFC', 'South', 'Tennessee Titans', 'Nashville, TN', 'Nissan Stadium', 69143, '36.166?N 86.771?W', 1970, 'Mike Mularkey', '648FCC', '0D254C', 4),
('AFC', 'West', 'Denver Broncos', 'Denver, CO', 'Sports Authority Field at Mile High', 76125, '39.744?N 105.020?W', 1970, 'Vance Joseph', 'FC4C02', '0C2340', 3),
('AFC', 'West', 'Kansas City Chiefs', 'Kansas City, MO', 'Arrowhead Stadium', 76416, '39.049?N 94.484?W', 1970, 'Andy Reid', 'C8102E', 'FFB81C', 6),
('AFC', 'West', 'Los Angeles Chargers', 'Carson, CA', 'StubHub Cente', 30000, '33.864?N 118.261?W', 1970, 'Anthony Lynn', '0C2340', 'FFB81C', 3),
('AFC', 'West', 'Oakland Raiders', 'Oakland, CA', 'Oakland?Alameda County Coliseum', 56063, '37.752?N 122.201?W', 1970, 'Jack Del Rio', '101820', 'A5ACAF', 4),
('NFC', 'East', 'Dallas Cowboys', 'Arlington, TX', 'AT&T Stadium', 80000, '32.748?N 97.093?W', 1960, 'Jason Garrett', '041E42', '7F9695', 5),
('NFC', 'East', 'New York Giants', 'East Rutherford, NJ', 'MetLife Stadium', 82500, '40.814?N 74.074?W', 1925, 'Ben McAdoo', '001E62', 'A6192E', 5),
('NFC', 'East', 'Philadelphia Eagles', 'Philadelphia, PA', 'Lincoln Financial Field', 69596, '39.901?N 75.168?W', 1933, 'Doug Pederson', '0048F1', '869397', 1),
('NFC', 'East', 'Washington Redskins', 'Landover, MD', 'FedExField', 82000, '38.908?N 76.864?W', 1932, 'Jay Gruden', '862833', 'FFCD00', 4),
('NFC', 'North', 'Chicago Bears', 'Chicago, IL', 'Soldier Field', 61500, '41.863?N 87.617?W', 1920, 'John Fox', '051C2C', 'DC4405', 5),
('NFC', 'North', 'Detroit Lions', 'Detroit, MI', 'Ford Field', 65000, '42.340?N 83.046?W', 1930, 'Jim Caldwell', '0069B1', 'A2AAAD', 2),
('NFC', 'North', 'Green Bay Packers', 'Green Bay, WI', 'Lambeau Field', 81435, '44.501?N 88.062?W', 1921, 'Mike McCarthy', '175E33', 'FFB81C', 5),
('NFC', 'North', 'Minnesota Vikings', 'Minneapolis, MN', 'U.S. Bank Stadium', 66655, '44.974?N 93.258?W', 1961, 'Mike Zimmer', '512D6D', 'FFB81C', 4),
('NFC', 'South', 'Atlanta Falcons', 'Atlanta, GA', 'Mercedes-Benz Stadium', 71000, '33.755?N 84.401?W', 1966, 'Dan Quinn', 'A6192E', '101820', 1),
('NFC', 'South', 'Carolina Panthers', 'Charlotte, NC', 'Bank of America Stadium', 75419, '35.226?N 80.853?W', 1995, 'Ron Rivera', '0085CA', '101820', 2),
('NFC', 'South', 'New Orleans Saints', 'New Orleans, LA', 'Mercedes-Benz Superdome', 73000, '29.951?N 90.081?W', 1967, 'Sean Payton', 'A28D5B', '101820', 6),
('NFC', 'South', 'Tampa Bay Buccaneers', 'Tampa, FL', 'Raymond James Stadium', 65890, '27.976?N 82.503?W', 1976, 'Dirk Koetter', 'C8102E', 'FF8200', 4),
('NFC', 'West', 'Arizona Cardinals', 'Glendale, AZ', 'University of Phoenix Stadium', 63400, '33.528?N 112.263?W', 1920, 'Bruce Arians', '9B2743', 'FFCD00', 1),
('NFC', 'West', 'Los Angeles Rams', 'Los Angeles, CA', 'Los Angeles Memorial Coliseum', 93607, '34.014?N 118.288?W', 1937, 'Sean McVay', '041E42', '866D4B', 3),
('NFC', 'West', 'San Francisco 49ers', 'Santa Clara, CA', 'Levi''s Stadium', 68500, '37.403?N 121.970?W', 1950, 'Kyle Shanahan', '9B2743', 'D1A472', 5),
('NFC', 'West', 'Seattle Seahawks', 'Seattle, WA', 'CenturyLink Field', 68000, '47.595?N 122.332?W', 1976, 'Pete Carroll', '001433', '4DFF00', 1);





CREATE TABLE IF NOT EXISTS `Reddit_Team_Groups` (
  `group_id` int(11) NOT NULL COMMENT 'Group Identifier',
  `group_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Name of the Reddit group',
  `group_description` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT 'What do they have in common, colors etc',
  `group_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Reddit Full URL',
  `group_subreddit` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='A list of related nfl teams that have subreddits, like /r/BirdTeams';

--
-- Dumping data for table `Reddit_Team_Groups`
--

INSERT INTO `Reddit_Team_Groups` (`group_id`, `group_name`, `group_description`, `group_url`, `group_subreddit`) VALUES
(1, 'Bird Teams', 'A group of teams that have bird mascots.', 'reddit.com/r/BIRDTEAMS/', '/r/BirdTeams'),
(2, 'Cat Team Brotherhood', 'A group of teams that all have cat mascots.', 'reddit.com/r/CatTeamBrotherhood', '/r/CatTeamBrotherhood'),
(3, 'Ungulate Teams', 'Hoofed mascots... plus the dolphins ', 'reddit.com/r/ungulateteams', '/r/ungulateteams'),
(4, 'The Plunderhood', 'Teams that are known to raid and plunder.', 'reddit.com/r/theplunderhood', '/r/theplunderhood'),
(5, 'Evil League Of Evil', 'Evil teams', 'reddit.com/r/EvilLeagueOfEvil', '/r/EvilLeagueOfEvil'),
(6, 'Good League of Good', 'Good teams that play poorly ', 'reddit.com/r/GoodLeagueofGood', '/r/GoodLeagueofGood');
