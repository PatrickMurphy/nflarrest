-- -------------------------------- --
--           Overall Breakdown
-- -------------------------------- --
-- get repeat offenders across nfl
SELECT Name, Position, COUNT(Name) AS arrest_count FROM `arrest_stats` GROUP BY Name HAVING arrest_count > 1 ORDER BY arrest_count DESC

-- get repeat crime categories
SELECT Category, COUNT(Category) AS arrest_count FROM `arrest_stats` GROUP BY Category ORDER BY arrest_count DESC

-- get teams by arrest count desc
SELECT Team, count(arrest_stats_id) AS arrest_count FROM `arrest_stats` GROUP BY  Team ORDER BY arrest_count desc

-- get position by arrest count desc
SELECT Position, COUNT(Position) AS arrest_count FROM `arrest_stats` GROUP BY Position ORDER BY arrest_count DESC

-- -------------------------------- --
--           Team Breakdown
-- -------------------------------- --
-- get team arrest timeline for team
SELECT Date, Name, Description FROM `arrest_stats` WHERE team = 'sea'

-- get team arrest timeline for team between dates
SELECT Date, Name, Description FROM `arrest_stats` WHERE team = 'sea' && Date BETWEEN '2005-01-01' AND '2006-01-01'

-- get repeat offenders for team
SELECT Name, Position, COUNT(Name) AS arrest_count FROM `arrest_stats` WHERE team = 'sea' GROUP BY Name HAVING arrest_count > 1 ORDER BY arrest_count DESC

-- get repeat offenders for team by date range
SELECT Name, Position, COUNT(Name) AS arrest_count FROM `arrest_stats` WHERE team = 'sea' && Date BETWEEN '2005-01-01' AND '2006-01-01' GROUP BY Name HAVING arrest_count > 1 ORDER BY arrest_count DESC

-- get repeat crime categories for team
SELECT Category, COUNT(Category) AS arrest_count FROM `arrest_stats` WHERE team = 'sea' GROUP BY Category ORDER BY arrest_count DESC

-- -------------------------------- --
--           Crime Breakdown
-- -------------------------------- --
-- get distribution of teams for crime
SELECT Team, COUNT(Team) AS arrest_count FROM `arrest_stats` WHERE Category = 'DUI' GROUP BY Team ORDER BY arrest_count DESC

-- get distribution of positions for crime
SELECT Position, COUNT(Position) AS arrest_count FROM `arrest_stats` WHERE Category = 'DUI' GROUP BY Position ORDER BY arrest_count DESC

-- get occurance over time of crime details
SELECT Date, Name, Team FROM `arrest_stats` WHERE Category = 'DUI' ORDER BY Date DESC

-- get occurance over time of crime summary
SELECT MONTH(Date) AS Month, YEAR(Date) AS Year, COUNT(Category) AS arrest_count FROM `arrest_stats` WHERE Category = 'DUI' GROUP BY YEAR(Date), MONTH(Date) ORDER BY Date ASC

-- -------------------------------- --
--           Position Breakdown
-- -------------------------------- --
-- get distribution of crimes for position
SELECT Category, COUNT(Category) AS arrest_count FROM `arrest_stats` WHERE Position = 'QB' GROUP BY Category ORDER BY arrest_count DESC

-- get distribution of teams for position
SELECT Team, COUNT(Team) AS arrest_count FROM `arrest_stats` WHERE Position = 'QB' GROUP BY Team ORDER BY arrest_count DESC

-- get timeline of arrests for position by month
SELECT MONTH(Date), YEAR(Date), COUNT(Position) AS arrest_count FROM `arrest_stats` WHERE Position = 'QB' GROUP BY YEAR(Date), MONTH(Date)

-- -------------------------------- --
--           Player Breakdown
-- -------------------------------- --
-- get player feed
SELECT * FROM `arrest_stats` WHERE name = 'Aldon Smith' ORDER BY Date Desc

-- get crimes by player
SELECT category, COUNT(Category) FROM `arrest_stats` WHERE name = 'Aldon Smith' GROUP BY Category ORDER BY Date Desc

-- rank, picture, info, news stories
