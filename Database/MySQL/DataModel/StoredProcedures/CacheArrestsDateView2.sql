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
END