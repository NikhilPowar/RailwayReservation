CREATE OR REPLACE
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `history` AS
    SELECT 
        `a`.`email` AS `email`,
        `a`.`train_num` AS `train_num`,
        `railres`.`trains`.`train_name` AS `train_name`,
        `a`.`from` AS `from`,
        `a`.`to` AS `to`,
        `a`.`from_time` AS `from_time`,
        `a`.`to_time` AS `to_time`,
        `a`.`class` AS `class`,
        `a`.`seats` AS `seats`,
        `a`.`total_fare` AS `total_fare`,
        `a`.`time` AS `time`,
        `a`.`date` As `date`
    FROM
        (((SELECT 
            `railres`.`tickets`.`train_num` AS `train_num`,
                `railres`.`tickets`.`user_email` AS `user_email`,
                `railres`.`tickets`.`time` AS `time`,
                `railres`.`tickets`.`date` AS `date`,
                `railres`.`tickets`.`class` AS `class`,
                `railres`.`tickets`.`seats` AS `seats`,
                `railres`.`tickets`.`from` AS `from`,
                `railres`.`tickets`.`to` AS `to`,
                `railres`.`tickets`.`total_fare` AS `total_fare`,
                `railres`.`tickets`.`from_time` AS `from_time`,
                `railres`.`tickets`.`to_time` AS `to_time`,
                `railres`.`users`.`fullname` AS `fullname`,
                `railres`.`users`.`email` AS `email`,
                `railres`.`users`.`password` AS `password`,
                `railres`.`users`.`salt` AS `salt`,
                `railres`.`users`.`role` AS `role`
        FROM
            (`railres`.`tickets`
        JOIN `railres`.`users` ON `railres`.`tickets`.`user_email` = `railres`.`users`.`email`))) `a`
        JOIN `railres`.`trains` ON ((`a`.`train_num` = `railres`.`trains`.`train_num`)))