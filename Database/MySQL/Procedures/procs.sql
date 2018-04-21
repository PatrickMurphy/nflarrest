
DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `CacheArrestsDateView`()
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

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `CacheArrestsDateView2`()
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

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `CacheArrestSeasonStateByArrest`()
    MODIFIES SQL DATA
BEGIN
DROP TABLE IF EXISTS CachedArrestSeasonState;

CREATE TABLE CachedArrestSeasonState AS SELECT * FROM ArrestSeasonStateByArrest;
END$$

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `CacheLastArrests`()
    MODIFIES SQL DATA
BEGIN
DROP TABLE IF EXISTS Cache_LastArrestByTeam;

CREATE TABLE Cache_LastArrestByTeam AS SELECT * FROM LastArrestByTeam;
END$$

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `FindTopTeamsByDate`()
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

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `Load_NFL_Game_Player_Details`()
    NO SQL
    COMMENT 'This completes the ETL process for Player Details'
INSERT INTO NFL_Game_Player_Details (player_id, first_name, last_name, full_name,birthdate,college,height,weight,profile_url)
SELECT player_id,first_name,last_name,full_name,STR_TO_DATE(birthdate, '%m/%d/%Y'),college,height,weight,profile_url
FROM SOURCE_NFL_Game_Player
 ON DUPLICATE KEY UPDATE height=VALUES(height), weight = VALUES(weight)$$

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `Load_NFL_Game_Player_Position`()
    MODIFIES SQL DATA
BEGIN
INSERT INTO NFL_Game_Player_Position (player_id, observed_change, position)
SELECT b.player_id, NOW() as observed_change, b.position 
FROM 
    SOURCE_NFL_Game_Player AS b 
    JOIN
    (SELECT t1.player_id, t1.observed_change, t1.position
    FROM NFL_Game_Player_Position t1
    WHERE t1.observed_change = (SELECT MAX(t2.observed_change)
                                 FROM NFL_Game_Player_Position t2
                                 WHERE t2.player_id = t1.player_id)) AS a
    ON  b.player_id = a.player_id 
        AND b.position <> a.position;
END$$

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `Load_NFL_Game_Player_Status`()
    MODIFIES SQL DATA
BEGIN
INSERT INTO NFL_Game_Player_Status (player_id, observed_change, status)
SELECT b.player_id, NOW() as observed_change, b.status 
FROM 
    SOURCE_NFL_Game_Player AS b 
    JOIN
    (SELECT t1.player_id, t1.observed_change, t1.status
    FROM NFL_Game_Player_Status t1
    WHERE t1.observed_change = (SELECT MAX(t2.observed_change)
                                 FROM NFL_Game_Player_Status t2
                                 WHERE t2.player_id = t1.player_id)) AS a
    ON  b.player_id = a.player_id 
        AND b.status <> a.status;
END$$

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `Load_NFL_Game_Player_Team`()
    NO SQL
BEGIN
INSERT INTO NFL_Game_Player_Team (player_id, observed_change, team)
SELECT b.player_id, NOW() as observed_change, b.team 
FROM 
    SOURCE_NFL_Game_Player AS b 
    JOIN
    (SELECT t1.player_id, t1.observed_change, t1.team
    FROM NFL_Game_Player_Team t1
    WHERE t1.observed_change = (SELECT MAX(t2.observed_change)
                                 FROM NFL_Game_Player_Team t2
                                 WHERE t2.player_id = t1.player_id)) AS a
    ON  b.player_id = a.player_id 
        AND b.team <> a.team;
END$$

CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `Log_Active_Player_Arrest_Stats`()
    NO SQL
INSERT INTO Active_Player_Arrest_Stats_Log SELECT NOW() as `observed_date`, arrested, active, percent FROM ActivePlayerArrestPercent_v
on duplicate key update arrested = values(arrested),active = values(active),percent = values(percent)$$

DELIMITER ;
