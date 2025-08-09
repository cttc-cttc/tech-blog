-- 처음 실행
INSERT INTO `blog`.`category` (`depth`, `name`) VALUES ('0', 'IT');
INSERT INTO `blog`.`category` (`depth`, `name`) VALUES ('0', '일본어');

-- 그 다음 실행
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'HTML', '1');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'CSS', '1');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'JavaScript', '1');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'React', '1');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'DataBase', '1');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'Java', '1');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'Spring Boot', '1');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'JLPT N2 단어', '2');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'JLPT N2 문법', '2');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', '존경어와 겸양어', '2');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'JLPT N1 단어', '2');
INSERT INTO `blog`.`category` (`depth`, `name`, `parent_id`) VALUES ('1', 'JLPT N1 문법', '2');