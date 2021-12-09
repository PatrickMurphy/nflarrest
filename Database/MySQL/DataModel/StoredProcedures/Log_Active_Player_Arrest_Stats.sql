CREATE DEFINER=`pmphotog`@`localhost` PROCEDURE `Log_Active_Player_Arrest_Stats`()
    NO SQL
INSERT INTO Active_Player_Arrest_Stats_Log SELECT NOW() as `observed_date`, arrested, active, percent FROM ActivePlayerArrestPercent_v
on duplicate key update arrested = values(arrested),active = values(active),percent = values(percent)