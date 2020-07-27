CREATE DATABASE `reserbox`;
USE `reserbox`;

CREATE TABLE `UserTypes` (
	`UserTypeId` INT NOT NULL AUTO_INCREMENT,
    `UserTypeName` VARCHAR(8) NOT NULL,
    PRIMARY KEY ( `UserTypeId` )
);

INSERT INTO `UserTypes` (`UserTypeId`, `UserTypeName`)
VALUES 
	(NULL, "Company"),
    (NULL, "Customer"),
    (NULL, "Mixed");

CREATE TABLE `Users`(
	`UserId` INT NOT NULL AUTO_INCREMENT,
    `UserFirstName` VARCHAR(255) NOT NULL,
    `UserLastName` VARCHAR(255) NOT NULL,
    `UserEmail` VARCHAR(255) NOT NULL,
    `UserPassword` VARCHAR(255) NOT NULL,
    `UserPhone` VARCHAR(255) NOT NULL,
    `UserTypeId` INT NOT NULL,
    `CreationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `LastModified` datetime NULL,
    PRIMARY KEY ( `UserId` ),
    FOREIGN KEY ( `UserTypeId` ) REFERENCES `UserTypes`( `UserTypeId` )
);