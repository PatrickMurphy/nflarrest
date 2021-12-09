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

END