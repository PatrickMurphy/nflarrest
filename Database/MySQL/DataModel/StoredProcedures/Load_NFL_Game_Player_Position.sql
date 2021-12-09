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
END