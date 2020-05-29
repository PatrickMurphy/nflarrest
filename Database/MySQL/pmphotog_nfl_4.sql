
--
-- Database: `pmphotog_nfl`
--

DELIMITER $$
--
-- Procedures
--
CREATE PROCEDURE `CacheArrestsDateView`()
    MODIFIES SQL DATA
BEGIN
DROP TABLE IF EXISTS ArrestsCacheTable;

CREATE TABLE ArrestsCacheTable AS SELECT * FROM ArrestsDateView;

ALTER TABLE ArrestsCacheTable
  ADD CONSTRAINT ArrestsCache_pk 
    PRIMARY KEY (arrest_stats_id);

ALTER TABLE ArrestsCacheTable ADD INDEX `date_index` (`Date`);
ALTER TABLE ArrestsCacheTable ADD INDEX `team_index` (`Team`);
ALTER TABLE ArrestsCacheTable ADD INDEX `player_index` (`Name`);
ALTER TABLE ArrestsCacheTable ADD INDEX `crime_index` (`Category`);
ALTER TABLE ArrestsCacheTable ADD INDEX `crime_category_index` (`Crime_category`);
ALTER TABLE ArrestsCacheTable ADD INDEX `position_index` (`Position`);
ALTER TABLE ArrestsCacheTable ADD INDEX `reddit_index` (`reddit_group_id`);
END$$

CREATE PROCEDURE `CacheArrestsDateView2`()
    NO SQL
BEGIN
DROP TABLE IF EXISTS ArrestsCacheTable2;

CREATE TABLE ArrestsCacheTable2 AS SELECT * FROM ArrestsDateView;

ALTER TABLE ArrestsCacheTable2
  ADD CONSTRAINT ArrestsCache_pk 
    PRIMARY KEY (arrest_stats_id);

ALTER TABLE ArrestsCacheTable2 ADD INDEX `date_index` (`Date`);
ALTER TABLE ArrestsCacheTable2 ADD INDEX `team_index` (`Team`);
ALTER TABLE ArrestsCacheTable2 ADD INDEX `player_index` (`Name`);
ALTER TABLE ArrestsCacheTable2 ADD INDEX `crime_index` (`Category`);
ALTER TABLE ArrestsCacheTable2 ADD INDEX `crime_category_index` (`Crime_category`);
ALTER TABLE ArrestsCacheTable2 ADD INDEX `position_index` (`Position`);
END$$

CREATE PROCEDURE `CacheArrestSeasonStateByArrest`()
    MODIFIES SQL DATA
BEGIN
DROP TABLE IF EXISTS CachedArrestSeasonState;

CREATE TABLE CachedArrestSeasonState AS SELECT * FROM ArrestSeasonStateByArrest;
END$$

CREATE PROCEDURE `CacheLastArrests`()
    MODIFIES SQL DATA
BEGIN
DROP TABLE IF EXISTS Cache_LastArrestByTeam;

CREATE TABLE Cache_LastArrestByTeam AS SELECT * FROM LastArrestByTeam;
END$$

CREATE PROCEDURE `FindTopTeamsByDate`()
    NO SQL
BEGIN

CREATE TEMPORARY TABLE IF NOT EXISTS distinct_arrest_dates 
AS (SELECT DISTINCT a.Date
  FROM ArrestsCacheTable AS a);

CREATE TEMPORARY TABLE IF NOT EXISTS arrests_by_team 
AS (SELECT dad.Date, a.team, count(1) as arrest_count  
    FROM distinct_arrest_dates as dad
   LEFT JOIN ArrestsCacheTable as a 
    ON a.Date <= dad.Date
   GROUP BY dad.Date, a.Team);


CREATE TABLE ArrestCountByDateAndTeam AS 
  (SELECT *
  FROM arrests_by_team);

END$$

DELIMITER ;
