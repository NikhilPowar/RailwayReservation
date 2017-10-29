-- This MySQL script creates a scheduled event
-- that runs every 5 mins to remove old dates and
-- add new ones for reserved seats status
DELIMITER $$
CREATE EVENT `refresh_trains` 
ON SCHEDULE EVERY 5 MINUTE
ON COMPLETION PRESERVE
DO BEGIN
    DECLARE X INT;
	-- delete past trains
    DELETE FROM railres.seat_status WHERE DATEDIFF(`date`, CURDATE())<=0;
    -- add new trains
    SET X = 1;
    WHILE X<=7 DO
		INSERT IGNORE INTO railres.seat_status (train_num, `date`, ac_seats, nonac_seats, general_seats, sleeper_seats)
        SELECT train_num, CURDATE()+INTERVAL X DAY AS `date`, ac_seats, nonac_seats, general_seats, sleeper_seats
        FROM railres.trains;
        SET X = X+1;
	END WHILE;
END $$
DELIMITER ;
