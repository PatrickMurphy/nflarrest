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
END