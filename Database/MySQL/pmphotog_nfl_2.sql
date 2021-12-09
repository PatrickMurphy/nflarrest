-- --------------------------------------------------------

--
-- Stand-in structure for view `Teams_view`
--
CREATE TABLE IF NOT EXISTS `Teams_view` (
`teams_full_name` varchar(25)
,`bandwagon_code` bigint(20)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `Team_details_view`
--
CREATE TABLE IF NOT EXISTS `Team_details_view` (
`teams_id` int(11)
,`teams_full_name` varchar(25)
,`Team_preffered_name` varchar(55)
,`team_code` varchar(7)
,`city` varchar(35)
,`state` varchar(25)
,`Team_logo_id` int(11)
,`Team_Conference` varchar(3)
,`Team_Division` varchar(5)
,`Stadium` varchar(35)
,`Stadium_Capacity` int(7)
,`first_nfl_season` int(4)
,`Head_coach_2016` varchar(14)
,`Team_hex_color` varchar(6)
,`Team_hex_alt_color` varchar(6)
,`reddit_group_id` int(11)
);


--
-- Structure for view `Teams_view`
--
DROP TABLE IF EXISTS `Teams_view`;

CREATE  VIEW `Teams_view` AS select `teams`.`teams_full_name` AS `teams_full_name`,`teams`.`bandwagon_code` AS `bandwagon_code` from `teams` union select 'NFL Badge' AS `teams_full_name`,32 AS `bandwagon_code` union select 'NFC Badge' AS `teams_full_name`,33 AS `bandwagon_code` union select 'AFC Badge' AS `teams_full_name`,34 AS `bandwagon_code`;

-- --------------------------------------------------------

--
-- Structure for view `Team_details_view`
--
DROP TABLE IF EXISTS `Team_details_view`;

CREATE  VIEW `Team_details_view` AS select `t1`.`teams_id` AS `teams_id`,`t1`.`teams_full_name` AS `teams_full_name`,`t1`.`Team_preffered_name` AS `Team_preffered_name`,`t1`.`team_code` AS `team_code`,`t1`.`city` AS `city`,`t1`.`state` AS `state`,`t1`.`Team_logo_id` AS `Team_logo_id`,`t2`.`Team_Conference` AS `Team_Conference`,`t2`.`Team_Division` AS `Team_Division`,`t2`.`Stadium` AS `Stadium`,`t2`.`Stadium_Capacity` AS `Stadium_Capacity`,`t2`.`first_nfl_season` AS `first_nfl_season`,`t2`.`Head_coach_2016` AS `Head_coach_2016`,`t2`.`Team_hex_color` AS `Team_hex_color`,`t2`.`Team_hex_alt_color` AS `Team_hex_alt_color`,`t2`.`reddit_group_id` AS `reddit_group_id` from (`teams` `t1` join `teams_detail` `t2`) where (`t1`.`Team_preffered_name` = `t2`.`Team_name`);

-- --------------------------------------------------------


--
-- Structure for view `ArrestDateFact`
--
DROP TABLE IF EXISTS `ArrestDateFact`;

CREATE  VIEW `ArrestDateFact` AS select `a1`.`arrest_stats_id` AS `arrest_stats_id`,`a1`.`Date` AS `Date`,(select count(1) from `arrest_stats` where (`arrest_stats`.`Date` = `a1`.`Date`)) AS `DateCount`,if((`a1`.`arrest_stats_id` = (select `arrest_stats`.`arrest_stats_id` from `arrest_stats` where (`arrest_stats`.`Date` = `a1`.`Date`) order by `arrest_stats`.`Date` desc,`arrest_stats`.`arrest_stats_id` limit 1)),(select `a2`.`Date` from `arrest_stats` `a2` where ((`a2`.`Date` < `a1`.`Date`) and (`a1`.`arrest_stats_id` <> `a2`.`arrest_stats_id`)) order by `a2`.`Date` desc limit 1),`a1`.`Date`) AS `LastDate`,if((`a1`.`arrest_stats_id` = (select `arrest_stats`.`arrest_stats_id` from `arrest_stats` where ((`arrest_stats`.`Date` = `a1`.`Date`) and (`a1`.`Team` = `arrest_stats`.`Team`)) order by `arrest_stats`.`Date` desc,`arrest_stats`.`arrest_stats_id` limit 1)),(select `a2`.`Date` from `arrest_stats` `a2` where ((`a2`.`Date` < `a1`.`Date`) and (`a1`.`arrest_stats_id` <> `a2`.`arrest_stats_id`) and (`a1`.`Team` = `a2`.`Team`)) order by `a2`.`Date` desc limit 1),`a1`.`Date`) AS `LastTeamDate`,if((`a1`.`arrest_stats_id` = (select `arrest_stats`.`arrest_stats_id` from `arrest_stats` where ((`arrest_stats`.`Date` = `a1`.`Date`) and (`a1`.`general_category_id` = `arrest_stats`.`general_category_id`)) order by `arrest_stats`.`Date` desc,`arrest_stats`.`arrest_stats_id` limit 1)),(select `a2`.`Date` from `arrest_stats` `a2` where ((`a2`.`Date` < `a1`.`Date`) and (`a1`.`arrest_stats_id` <> `a2`.`arrest_stats_id`) and (`a1`.`general_category_id` = `a2`.`general_category_id`)) order by `a2`.`Date` desc limit 1),`a1`.`Date`) AS `LastCrimeDate` from `arrest_stats` `a1` order by `a1`.`Date`;

-- --------------------------------------------------------

--
-- Structure for view `ArrestOMeterStats`
--
DROP TABLE IF EXISTS `ArrestOMeterStats`;

CREATE  VIEW `ArrestOMeterStats` AS select avg(`arr`.`DaysToLastArrest`) AS `Average`,max(`arr`.`DaysToLastArrest`) AS `Record`,min(`arr`.`DaysSince`) AS `Current` from `ArrestsCacheTable` `arr`;


--
-- Structure for view `InSeasonArrests`
--
DROP TABLE IF EXISTS `InSeasonArrests`;

CREATE  VIEW `InSeasonArrests` AS select `a`.`arrest_stats_id` AS `arrest_stats_id`,`a`.`Date` AS `Date`,`a`.`Team` AS `Team`,`a`.`Name` AS `Name`,`a`.`Position` AS `Position`,`a`.`Encounter` AS `Encounter`,`a`.`Category` AS `Category`,`a`.`Description` AS `Description`,`a`.`Outcome` AS `Outcome`,`a`.`general_category_id` AS `general_category_id`,`a`.`legal_level_id` AS `legal_level_id`,`a`.`resolution_category_id` AS `resolution_category_id`,`s`.`season` AS `season`,`s`.`season_start` AS `season_start`,`s`.`season_end` AS `season_end`,`s`.`playoff_start` AS `playoff_start`,`s`.`superbowl_date` AS `superbowl_date`,`s`.`superbowl_afc_team` AS `superbowl_afc_team`,`s`.`superbowl_nfc_team` AS `superbowl_nfc_team`,`s`.`superbowl_winning_team` AS `superbowl_winning_team`,`s`.`probowl_date` AS `probowl_date` from (`arrest_stats` `a` join `seasons` `s`) where (`a`.`Date` between `s`.`season_start` and `s`.`season_end`);

-- --------------------------------------------------------


--
-- Structure for view `OffSeasonArrests`
--
DROP TABLE IF EXISTS `OffSeasonArrests`;

CREATE  VIEW `OffSeasonArrests` AS select `a`.`arrest_stats_id` AS `arrest_stats_id`,`a`.`Date` AS `Date`,`a`.`Team` AS `Team`,`a`.`Name` AS `Name`,`a`.`Position` AS `Position`,`a`.`Encounter` AS `Encounter`,`a`.`Category` AS `Category`,`a`.`Description` AS `Description`,`a`.`Outcome` AS `Outcome`,`a`.`general_category_id` AS `general_category_id`,`a`.`legal_level_id` AS `legal_level_id`,`a`.`resolution_category_id` AS `resolution_category_id`,`s`.`season` AS `season`,`s`.`season_start` AS `season_start`,`s`.`season_end` AS `season_end`,`s`.`playoff_start` AS `playoff_start`,`s`.`superbowl_date` AS `superbowl_date`,`s`.`superbowl_afc_team` AS `superbowl_afc_team`,`s`.`superbowl_nfc_team` AS `superbowl_nfc_team`,`s`.`superbowl_winning_team` AS `superbowl_winning_team`,`s`.`probowl_date` AS `probowl_date` 
from (`arrest_stats` `a` join `seasons` `s`) where ((year(`a`.`Date`) = `s`.`season`) and (`a`.`Date` not between `s`.`season_start` and `s`.`season_end`) and (not(`a`.`arrest_stats_id` in (select `InSeasonArrests`.`arrest_stats_id` from `InSeasonArrests`))));

-- --------------------------------------------------------

--
-- Structure for view `PlayoffSeasonArrests`
--
DROP TABLE IF EXISTS `PlayoffSeasonArrests`;

CREATE  VIEW `PlayoffSeasonArrests` AS select `a`.`arrest_stats_id` AS `arrest_stats_id`,`a`.`Date` AS `Date`,`a`.`Team` AS `Team`,`a`.`Name` AS `Name`,`a`.`Position` AS `Position`,`a`.`Encounter` AS `Encounter`,`a`.`Category` AS `Category`,`a`.`Description` AS `Description`,`a`.`Outcome` AS `Outcome`,`a`.`general_category_id` AS `general_category_id`,`a`.`legal_level_id` AS `legal_level_id`,`a`.`resolution_category_id` AS `resolution_category_id`,`s`.`season` AS `season`,`s`.`season_start` AS `season_start`,`s`.`season_end` AS `season_end`,`s`.`playoff_start` AS `playoff_start`,`s`.`superbowl_date` AS `superbowl_date`,`s`.`superbowl_afc_team` AS `superbowl_afc_team`,`s`.`superbowl_nfc_team` AS `superbowl_nfc_team`,`s`.`superbowl_winning_team` AS `superbowl_winning_team`,`s`.`probowl_date` AS `probowl_date` from (`arrest_stats` `a` join `seasons` `s`) where (`a`.`Date` between `s`.`playoff_start` and `s`.`superbowl_date`);

-- --------------------------------------------------------


--
-- Structure for view `ArrestSeasonStateByArrest`
--
DROP TABLE IF EXISTS `ArrestSeasonStateByArrest`;

CREATE  VIEW `ArrestSeasonStateByArrest` AS 
  (select `i`.`arrest_stats_id` AS `arrest_stats_id`
    ,`i`.`season` AS `season`
    ,'InSeason' AS `SeasonState` 
    from `InSeasonArrests` `i`) 
  union 
  (select `o`.`arrest_stats_id` AS `arrest_stats_id`
    ,`o`.`season` AS `season`
    ,'OffSeason' AS `SeasonState` 
    from `OffSeasonArrests` `o`);

-- --------------------------------------------------------

-- --------------------------------------------------------



-- --------------------------------------------------------
--
--
-- Structure for view `LastArrestDateFact`
--
DROP TABLE IF EXISTS `LastArrestDateFact`;

CREATE  VIEW `LastArrestDateFact` AS select `ArrestDateFact`.`arrest_stats_id` AS `arrest_stats_id`,`ArrestDateFact`.`Date` AS `Date`,`ArrestDateFact`.`DateCount` AS `DateCount`,`ArrestDateFact`.`LastDate` AS `LastDate`,timestampdiff(DAY,`ArrestDateFact`.`LastDate`,`ArrestDateFact`.`Date`) AS `DaysToLastArrest`,timestampdiff(DAY,`ArrestDateFact`.`LastTeamDate`,`ArrestDateFact`.`Date`) AS `DaysToLastTeamArrest`,timestampdiff(DAY,`ArrestDateFact`.`LastCrimeDate`,`ArrestDateFact`.`Date`) AS `DaysToLastCrimeArrest` from `ArrestDateFact`;



-- Structure for view `ArrestsDateView`
--
DROP TABLE IF EXISTS `ArrestsDateView`;

CREATE  VIEW `ArrestsDateView` AS 
  select 
    `arrest_source`.`arrest_stats_id` AS `arrest_stats_id`
    ,`arrest_source`.`Date` AS `Date`
    ,`arrest_source`.`Team` AS `Team`
    ,`team_v`.`teams_full_name` AS `Team_name`
    ,`team_v`.`Team_preffered_name` AS `Team_preffered_name`
    ,`team_v`.`city` AS `Team_city`
    ,`team_v`.`Team_logo_id` AS `Team_logo_id`
    ,`team_v`.`Team_Conference` AS `Team_Conference`
    ,`team_v`.`Team_Division` AS `Team_Division`
    ,concat(`team_v`.`Team_Conference`,' ',`team_v`.`Team_Division`) AS `Team_Conference_Division`
    ,`team_v`.`Team_hex_color` AS `Team_hex_color`
    ,`team_v`.`Team_hex_alt_color` AS `Team_hex_alt_color`
    ,`team_v`.`reddit_group_id` AS `reddit_group_id`
    ,`arrest_source`.`Name` AS `Name`
    ,`arrest_source`.`Position` AS `Position`
    ,`posTable`.`position_title` AS `Position_name`
    ,`posTable`.`position_type` AS `Position_type`
    ,`arrest_source`.`Encounter` AS `Encounter`
    ,`arrest_source`.`Category` AS `Category`
    ,`crimes`.`Category` AS `Crime_category`
    ,`crimes`.`hex_color` AS `Crime_category_color`
    ,`arrest_source`.`Description` AS `Description`
    ,`arrest_source`.`Outcome` AS `Outcome`
    ,`seasonTable`.`season` AS `Season`
    ,`seasonTable`.`SeasonState` AS `ArrestSeasonState`
    ,`arrest_source`.`general_category_id` AS `general_category_id`
    ,`arrest_source`.`legal_level_id` AS `legal_level_id`
    ,`arrest_source`.`resolution_category_id` AS `resolution_category_id`
    ,year(`arrest_source`.`Date`) AS `Year`
    ,month(`arrest_source`.`Date`) AS `Month`
    ,dayofmonth(`arrest_source`.`Date`) AS `Day`
    ,dayname(`arrest_source`.`Date`) AS `Day_of_Week`
    ,dayofweek(`arrest_source`.`Date`) AS `Day_of_Week_int`
    ,(case when ((month(`arrest_source`.`Date`) < month(now())) 
        or 
          (
            (month(`arrest_source`.`Date`) = month(now())) 
            and 
            (dayofmonth(`arrest_source`.`Date`) <= dayofmonth(now()))
          )) 
        then 1 
        else 0 end) AS `YearToDate`
    ,timestampdiff(DAY,`arrest_source`.`Date`,curdate()) AS `DaysSince`
    ,`LADF`.`DaysToLastArrest` AS `DaysToLastArrest`
    ,`LADF`.`DaysToLastCrimeArrest` AS `DaysToLastCrimeArrest`
    ,`LADF`.`DaysToLastTeamArrest` AS `DaysToLastTeamArrest` 
from `arrest_stats` AS `arrest_source` 
  join `Team_details_view` AS `team_v` 
    on `arrest_source`.`Team` = `team_v`.`team_code` 
  join `general_category` AS `crimes` 
    on `arrest_source`.`general_category_id` = `crimes`.`general_category_id` 
  join `ArrestSeasonStateByArrest` AS `seasonTable` 
    on `arrest_source`.`arrest_stats_id` = `seasonTable`.`arrest_stats_id` 
  join `position` AS `posTable` 
    on `arrest_source`.`Position` = `posTable`.`position_tag` 
  join `LastArrestDateFact` AS `LADF` 
    on `arrest_source`.`arrest_stats_id` = `LADF`.`arrest_stats_id`;


--
-- Structure for view `ArrestSeasonStateByTeam`
--
DROP TABLE IF EXISTS `ArrestSeasonStateByTeam`;

CREATE  VIEW `ArrestSeasonStateByTeam` AS
  select `ss`.`season` AS `season`
    ,`ss`.`SeasonState` AS `SeasonState`
    ,`ar`.`Team` AS `team`
    ,count(1) AS `cnt` 
    from `ArrestSeasonStateByArrest` as `ss` 
      join `ArrestsDateView` as `ar` on `ss`.`arrest_stats_id` = `ar`.`arrest_stats_id` 
    group by `ss`.`season`, `ss`.`SeasonState`, `ar`.`Team`;



--
-- Structure for view `ArrestsYearToDate`
--
DROP TABLE IF EXISTS `ArrestsYearToDate`;

CREATE  VIEW `ArrestsYearToDate` AS 
  select `ArrestsDateView`.`Year` AS `Year`
  ,count(`ArrestsDateView`.`arrest_stats_id`) AS `ArrestsYTD` 
from `ArrestsDateView` 
where (
        (`ArrestsDateView`.`Month` < month(now())) 
        or 
        (
          (`ArrestsDateView`.`Month` = month(now())) 
          and 
          (`ArrestsDateView`.`Day` <= dayofmonth(now()))
        )
      ) group by `ArrestsDateView`.`Year`;


-- --------------------------------------------------------

--
-- Structure for view `ArrestsByDay`
--
DROP TABLE IF EXISTS `ArrestsByDay`;

CREATE VIEW `ArrestsByDay` AS 
  select `ArrestsDateView`.`Year` AS `Year`
    ,`ArrestsDateView`.`Month` AS `Month`
    ,`ArrestsDateView`.`Day` AS `Day`
    ,count(1) AS `count` 
    from `ArrestsDateView` 
  group by `ArrestsDateView`.`Year`
    ,`ArrestsDateView`.`Month`
    ,`ArrestsDateView`.`Day`;

-- --------------------------------------------------------

--
-- Structure for view `ArrestsByMonth`
--
DROP TABLE IF EXISTS `ArrestsByMonth`;

CREATE  VIEW `ArrestsByMonth` AS 
  select `ArrestsDateView`.`Year` AS `Year`
  ,`ArrestsDateView`.`Month` AS `Month`
  ,count(`ArrestsDateView`.`arrest_stats_id`) AS `count` 
  from `ArrestsDateView` 
  group by `ArrestsDateView`.`Year`,`ArrestsDateView`.`Month`;

-- --------------------------------------------------------

--
-- Structure for view `ArrestsByYear`
--
DROP TABLE IF EXISTS `ArrestsByYear`;

CREATE  VIEW `ArrestsByYear` AS
  select `ArrestsDateView`.`Year` AS `Year`
  ,count(`ArrestsDateView`.`arrest_stats_id`) AS `TotalArrests` 
  from `ArrestsDateView` group by `ArrestsDateView`.`Year`;

-- --------------------------------------------------------

--
-- Structure for view `ArrestsByYearView`
--
DROP TABLE IF EXISTS `ArrestsByYearView`;

CREATE  VIEW `ArrestsByYearView` AS select `ArrestsByYear`.`Year` AS `Year`
,`ArrestsByYear`.`TotalArrests` AS `TotalArrests`
,`ArrestsYearToDate`.`ArrestsYTD` AS `ArrestsYTD`
,(`ArrestsByYear`.`TotalArrests` - `ArrestsYearToDate`.`ArrestsYTD`) AS `ArrestsDiff` 
from `ArrestsByYear` join `ArrestsYearToDate` on`ArrestsByYear`.`Year` = `ArrestsYearToDate`.`Year`;

-- --------------------------------------------------------


--
-- Structure for view `ArrestSeasonState`
--
DROP TABLE IF EXISTS `ArrestSeasonState`;

CREATE  VIEW `ArrestSeasonState` AS select `ArrestSeasonStateByTeam`.`season` AS `season`,`ArrestSeasonStateByTeam`.`SeasonState` AS `SeasonState`,sum(`ArrestSeasonStateByTeam`.`cnt`) AS `cnt` from `ArrestSeasonStateByTeam` group by `ArrestSeasonStateByTeam`.`season`,`ArrestSeasonStateByTeam`.`SeasonState`;

-- --------------------------------------------------------


--
-- Structure for view `ArrestSeasonStateSummary`
--
DROP TABLE IF EXISTS `ArrestSeasonStateSummary`;

CREATE  VIEW `ArrestSeasonStateSummary` AS select `ArrestSeasonState`.`season` AS `season`,max((case when (`ArrestSeasonState`.`SeasonState` = 'InSeason') then `ArrestSeasonState`.`cnt` else 0 end)) AS `InSeason`,max((case when (`ArrestSeasonState`.`SeasonState` = 'OffSeason') then `ArrestSeasonState`.`cnt` else 0 end)) AS `OffSeason` from `ArrestSeasonState` group by `ArrestSeasonState`.`season`;

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Structure for view `Arrest_Stats_Player`
--
DROP TABLE IF EXISTS `Arrest_Stats_Player`;

CREATE  VIEW `Arrest_Stats_Player` AS select `arrest_stats`.`Name` AS `Name`,`arrest_stats`.`Position` AS `Position` from `arrest_stats` group by `arrest_stats`.`Name`,`arrest_stats`.`Position`;

-- --------------------------------------------------------


--
-- Structure for view `LastArrestDateByTeam`
--
DROP TABLE IF EXISTS `LastArrestDateByTeam`;

CREATE VIEW `LastArrestDateByTeam` AS
    SELECT 
        `ArrestsDateView`.`Team` AS `Team`,
        MAX(`ArrestsDateView`.`Date`) AS `ArrestDate`
    FROM
        `ArrestsDateView`
    GROUP BY `ArrestsDateView`.`Team`
    ORDER BY MAX(`ArrestsDateView`.`Date`) DESC;

-- --------------------------------------------------------
--
-- Structure for view `LastArrestByTeam_id`
--
DROP TABLE IF EXISTS `LastArrestByTeam_id`;

CREATE  VIEW `LastArrestByTeam_id` AS select `ladbt`.`Team` AS `Team`,`ladbt`.`ArrestDate` AS `ArrestDate`,(select `adv`.`arrest_stats_id` from `ArrestsDateView` `adv` where ((`ladbt`.`Team` = `adv`.`Team`) and (`ladbt`.`ArrestDate` = `adv`.`Date`)) limit 1) AS `arrest_stats_id` from `LastArrestDateByTeam` `ladbt`;

-- --------------------------------------------------------


--
-- Structure for view `LastArrestByTeam`
--
DROP TABLE IF EXISTS `LastArrestByTeam`;

CREATE  VIEW `LastArrestByTeam` AS select `b`.`arrest_stats_id` AS `arrest_stats_id`,`b`.`Date` AS `Date`,`b`.`Team` AS `Team`,`b`.`Team_name` AS `Team_name`,`b`.`Team_preffered_name` AS `Team_preffered_name`,`b`.`Team_city` AS `Team_city`,`b`.`Team_logo_id` AS `Team_logo_id`,`b`.`Team_Conference` AS `Team_Conference`,`b`.`Team_Division` AS `Team_Division`,`b`.`Team_Conference_Division` AS `Team_Conference_Division`,`b`.`Team_hex_color` AS `Team_hex_color`,`b`.`Team_hex_alt_color` AS `Team_hex_alt_color`,`b`.`reddit_group_id` AS `reddit_group_id`,`b`.`Name` AS `Name`,`b`.`Position` AS `Position`,`b`.`Position_name` AS `Position_name`,`b`.`Position_type` AS `Position_type`,`b`.`Encounter` AS `Encounter`,`b`.`Category` AS `Category`,`b`.`Crime_category` AS `Crime_category`,`b`.`Crime_category_color` AS `Crime_category_color`,`b`.`Description` AS `Description`,`b`.`Outcome` AS `Outcome`,`b`.`Season` AS `Season`,`b`.`ArrestSeasonState` AS `ArrestSeasonState`,`b`.`general_category_id` AS `general_category_id`,`b`.`legal_level_id` AS `legal_level_id`,`b`.`resolution_category_id` AS `resolution_category_id`,`b`.`Year` AS `Year`,`b`.`Month` AS `Month`,`b`.`Day` AS `Day`,`b`.`Day_of_Week` AS `Day_of_Week`,`b`.`Day_of_Week_int` AS `Day_of_Week_int`,`b`.`DaysSince` AS `DaysSince`,`b`.`DaysToLastArrest` AS `DaysToLastArrest`,`b`.`DaysToLastCrimeArrest` AS `DaysToLastCrimeArrest`,`b`.`DaysToLastTeamArrest` AS `DaysToLastTeamArrest` from (`LastArrestByTeam_id` join `ArrestsDateView` `b` on((`LastArrestByTeam_id`.`arrest_stats_id` = `b`.`arrest_stats_id`))) order by `b`.`DaysSince`;

-- --------------------------------------------------------
