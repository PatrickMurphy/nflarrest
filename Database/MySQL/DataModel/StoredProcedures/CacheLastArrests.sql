CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `CacheLastArrests`()
    MODIFIES SQL DATA
BEGIN
DROP TABLE IF EXISTS Cache_LastArrestByTeam;

CREATE TABLE Cache_LastArrestByTeam AS SELECT * FROM LastArrestByTeam;
END