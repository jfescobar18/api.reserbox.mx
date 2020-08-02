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
    `EmailConfirmed` BOOLEAN NOT NULL DEFAULT 0,
    `CreationDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `LastModified` DATETIME NULL,
    PRIMARY KEY ( `UserId` ),
    FOREIGN KEY ( `UserTypeId` ) REFERENCES `UserTypes`( `UserTypeId` )
);

CREATE TABLE `CompanyRoles`(
	`CompanyRoleId` INT NOT NULL AUTO_INCREMENT,
    `CompanyRoleName` VARCHAR(125) NOT NULL,
    `CompanyRoleDescription` VARCHAR(255) NOT NULL,
    PRIMARY KEY ( `CompanyRoleId` )
);

INSERT INTO `CompanyRoles`(`CompanyRoleId`, `CompanyRoleName`, `CompanyRoleDescription`)
VALUES
    (NULL, 'Museo', ''),
    (NULL, 'Evento Cultural', ''),
    (NULL, 'Tienda de Retail', ''),
    (NULL, 'Centro Recreativo', ''),
    (NULL, 'Centro Nocturno', '');

CREATE TABLE `Companies`(
	`CompanyId` INT NOT NULL AUTO_INCREMENT,
    `CompanyName` VARCHAR(255) NOT NULL,
    `CompanySlogan` VARCHAR(255) NULL,
    `CompanyLogo` VARCHAR(255) NULL,
    `CompanyBanner` VARCHAR(255) NULL,
    `CompanyRoleId` INT NOT NULL,
    `CompanyColorsJsonConfig` TEXT NOT NULL,
    `CompanyAddress` VARCHAR(255) NOT NULL,
    `CompanyMapsPlaceId` VARCHAR(255) NOT NULL,
    `CompanyPhone` VARCHAR(255) NOT NULL,
    `CompanyDescription` TEXT NOT NULL,
    `CompanyNotes` VARCHAR(255) NOT NULL,
    PRIMARY KEY ( `CompanyId` ),
    FOREIGN KEY ( `CompanyRoleId` ) REFERENCES `CompanyRoles`( `CompanyRoleId` )
);

CREATE TABLE `Reviews` (
	`ReviewId` INT NOT NULL AUTO_INCREMENT,
    `UserId` INT NOT NULL,
    `ReviewContent` VARCHAR(255) NULL,
    `ReviewDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ReviewScore` INT NOT NULL,
     PRIMARY KEY ( `ReviewId` ),
     FOREIGN KEY ( `UserId` ) REFERENCES `Users`( `UserId` )
);

CREATE TABLE `ReviewPhotos` (
	`ReviewPhotoId` INT NOT NULL AUTO_INCREMENT,
    `ReviewId` INT NOT NULL,
    `ReviewPhotoKeyword` VARCHAR(125) NOT NULL,
    `ReviewPhotoUrl` VARCHAR(125) NOT NULL,
    PRIMARY KEY ( `ReviewPhotoId` ),
    FOREIGN KEY ( `ReviewId` ) REFERENCES `Reviews`( `ReviewId` )
);

CREATE TABLE `ReviewsHasReviewPhotos` (
	`ReviewId` INT NOT NULL,
	`ReviewPhotoId` INT NOT NULL,
    FOREIGN KEY ( `ReviewId` ) REFERENCES `Reviews`( `ReviewId` ),
    FOREIGN KEY ( `ReviewPhotoId` ) REFERENCES `ReviewPhotos`( `ReviewPhotoId` )
);

CREATE TABLE `CompanyPhotos` (
	`CompanyPhotoId` INT NOT NULL AUTO_INCREMENT,
    `CompanyPhotoKeyword` VARCHAR(125) NOT NULL,
    `CompanyPhotoUrl` VARCHAR(125) NOT NULL,
    `CompanyId` INT NOT NULL,
    PRIMARY KEY ( `CompanyPhotoId` ),
    FOREIGN KEY ( `CompanyId` ) REFERENCES `Companies`( `CompanyId` )
);

CREATE TABLE `CompaniesHasCompanyPhotos` (
	`CompanyId` INT NOT NULL,
	`CompanyPhotoId` INT NOT NULL,
    FOREIGN KEY ( `CompanyId` ) REFERENCES `Companies`( `CompanyId` ),
    FOREIGN KEY ( `CompanyPhotoId` ) REFERENCES `CompanyPhotos`( `CompanyPhotoId` )
);

CREATE TABLE `CompanyHighlights` (
	`CompanyHighlightId` INT NOT NULL AUTO_INCREMENT,
    `CompanyHighlightIcon` VARCHAR(125) NOT NULL,
    `CompanyHighlightDescription` VARCHAR(125) NOT NULL,
    PRIMARY KEY ( `CompanyHighlightId` )
);

CREATE TABLE `CompaniesHasCompanyHighlights` (
	`CompanyId` INT NOT NULL,
	`CompanyHighlightId` INT NOT NULL,
    FOREIGN KEY ( `CompanyId` ) REFERENCES `Companies`( `CompanyId` ),
    FOREIGN KEY ( `CompanyHighlightId` ) REFERENCES `CompanyHighlights`( `CompanyHighlightId` )
);

CREATE TABLE `Spaces` (
	`SpaceId` INT NOT NULL AUTO_INCREMENT,
    `SpaceName` VARCHAR(255) NOT NULL,
    `SpaceDueDate` DATETIME NOT NULL,
    `SpaceStartHour` TIME NOT NULL,
    `SpaceEndHour` TIME NOT NULL,
    `SpaceTimePerBlock` FLOAT NOT NULL,
    `SpacePeoplePerBlock` INT NOT NULL,
    PRIMARY KEY ( `SpaceId` )
);

CREATE TABLE `SpaceBlocks` (
	`SpaceBlockId` INT NOT NULL AUTO_INCREMENT,
    `SpaceId` INT NOT NULL,
    `SpaceBlockDate` DATE NOT NULL,
    `SpaceBlockStartHour` TIME NOT NULL,
    `SpaceBlockEndHour` TIME NOT NULL,
    PRIMARY KEY ( `SpaceBlockId` ),
    FOREIGN KEY ( `SpaceId` ) REFERENCES `Spaces`( `SpaceId` )
);

CREATE TABLE `CompaniesHasSpaces` (
	`CompanyId` INT NOT NULL,
	`SpaceId` INT NOT NULL,
    FOREIGN KEY ( `CompanyId` ) REFERENCES `Companies`( `CompanyId` ),
    FOREIGN KEY ( `SpaceId` ) REFERENCES `Spaces`( `SpaceId` )
);

CREATE TABLE `Reservations` (
	`ReservationId` INT NOT NULL AUTO_INCREMENT,
    `UserId` INT NOT NULL,
    `SpaceBlockId` INT,
    `ReservationVisitorsCount` INT NOT NULL,
    `ReservationNotes` VARCHAR(255) NULL,
    PRIMARY KEY ( `ReservationId` ),
    FOREIGN KEY ( `UserId` ) REFERENCES `Users`( `UserId` ),
    FOREIGN KEY ( `SpaceBlockId` ) REFERENCES `SpaceBlocks`( `SpaceBlockId` )
);