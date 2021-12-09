CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `Load_NFL_Game_Player_Details`()
    NO SQL
    COMMENT 'This completes the ETL process for Player Details'
INSERT INTO NFL_Game_Player_Details (player_id, first_name, last_name, full_name,birthdate,college,height,weight,profile_url)
SELECT player_id,first_name,last_name,full_name,STR_TO_DATE(birthdate, '%m/%d/%Y'),college,height,weight,profile_url
FROM SOURCE_NFL_Game_Player
 ON DUPLICATE KEY UPDATE height=VALUES(height), weight = VALUES(weight)