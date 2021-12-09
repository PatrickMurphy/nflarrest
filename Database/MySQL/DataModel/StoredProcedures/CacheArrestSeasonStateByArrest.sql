CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `CacheArrestSeasonStateByArrest`()
    MODIFIES SQL DATA
BEGIN
DROP TABLE IF EXISTS CachedArrestSeasonState;

CREATE TABLE CachedArrestSeasonState AS SELECT * FROM ArrestSeasonStateByArrest;
END