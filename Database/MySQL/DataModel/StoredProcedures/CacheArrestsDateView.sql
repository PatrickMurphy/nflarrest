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
END