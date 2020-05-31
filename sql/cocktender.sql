-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cocktender
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cocktender
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cocktender` DEFAULT CHARACTER SET utf8 ;
USE `cocktender` ;

-- -----------------------------------------------------
-- Table `cocktender`.`base`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`base` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `img_url` VARCHAR(300) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `abv` TINYINT(1) NOT NULL,
  `description` VARCHAR(300) NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`idx`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`abv_classification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`abv_classification` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `classification` TINYINT(1) NOT NULL,
  `description` VARCHAR(200) NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`idx`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`cocktail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`cocktail` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `img_url` VARCHAR(300) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `ingredients` VARCHAR(300) NOT NULL,
  `abv` TINYINT(1) NOT NULL,
  `non_abv` TINYINT(1) NULL DEFAULT 0,
  `description` VARCHAR(300) NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  `base_idx` INT NOT NULL,
  `abv_classification_idx` INT NOT NULL,
  PRIMARY KEY (`idx`),
  INDEX `fk_cocktail_base1_idx` (`base_idx` ASC) VISIBLE,
  INDEX `fk_cocktail_proof_classification1_idx` (`abv_classification_idx` ASC) VISIBLE,
  CONSTRAINT `fk_cocktail_base1`
    FOREIGN KEY (`base_idx`)
    REFERENCES `cocktender`.`base` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cocktail_proof_classification1`
    FOREIGN KEY (`abv_classification_idx`)
    REFERENCES `cocktender`.`abv_classification` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`tag` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`idx`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`flavor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`flavor` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`idx`),
  UNIQUE INDEX `idx_UNIQUE` (`idx` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`banner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`banner` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `img_url` VARCHAR(300) NOT NULL,
  `url_link` VARCHAR(100) NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`idx`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`cocktail_has_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`cocktail_has_tag` (
  `cocktail_idx` INT NOT NULL,
  `tag_idx` INT NOT NULL,
  PRIMARY KEY (`cocktail_idx`, `tag_idx`),
  INDEX `fk_cocktail_has_tag_tag1_idx` (`tag_idx` ASC) VISIBLE,
  INDEX `fk_cocktail_has_tag_cocktail1_idx` (`cocktail_idx` ASC) VISIBLE,
  CONSTRAINT `fk_cocktail_has_tag_cocktail1`
    FOREIGN KEY (`cocktail_idx`)
    REFERENCES `cocktender`.`cocktail` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cocktail_has_tag_tag1`
    FOREIGN KEY (`tag_idx`)
    REFERENCES `cocktender`.`tag` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`user` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `access_token` VARCHAR(100) NOT NULL,
  `refresh_token` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`idx`),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`like` (
  `user_idx` INT NOT NULL,
  `cocktail_idx` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`user_idx`, `cocktail_idx`),
  INDEX `fk_user_has_cocktail_cocktail1_idx` (`cocktail_idx` ASC) VISIBLE,
  INDEX `fk_user_has_cocktail_user1_idx` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_cocktail_user1`
    FOREIGN KEY (`user_idx`)
    REFERENCES `cocktender`.`user` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_cocktail_cocktail1`
    FOREIGN KEY (`cocktail_idx`)
    REFERENCES `cocktender`.`cocktail` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`comment` (
  `user_idx` INT NOT NULL,
  `cocktail_idx` INT NOT NULL,
  `comment` VARCHAR(200) NOT NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`user_idx`, `cocktail_idx`),
  INDEX `fk_user_has_cocktail_cocktail3_idx` (`cocktail_idx` ASC) VISIBLE,
  INDEX `fk_user_has_cocktail_user3_idx` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_cocktail_user3`
    FOREIGN KEY (`user_idx`)
    REFERENCES `cocktender`.`user` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_cocktail_cocktail3`
    FOREIGN KEY (`cocktail_idx`)
    REFERENCES `cocktender`.`cocktail` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`search_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`search_history` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `age` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `cocktail_idx` INT NOT NULL,
  `user_idx` INT NOT NULL,
  PRIMARY KEY (`idx`),
  INDEX `fk_table1_cocktail1_idx` (`cocktail_idx` ASC) VISIBLE,
  INDEX `fk_table1_user1_idx` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `fk_table1_cocktail1`
    FOREIGN KEY (`cocktail_idx`)
    REFERENCES `cocktender`.`cocktail` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_user1`
    FOREIGN KEY (`user_idx`)
    REFERENCES `cocktender`.`user` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cocktender`.`cocktail_has_flavor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocktender`.`cocktail_has_flavor` (
  `cocktail_idx` INT NOT NULL,
  `flavor_idx` INT NOT NULL,
  PRIMARY KEY (`cocktail_idx`, `flavor_idx`),
  INDEX `fk_cocktail_has_flavor_flavor1_idx` (`flavor_idx` ASC) VISIBLE,
  INDEX `fk_cocktail_has_flavor_cocktail1_idx` (`cocktail_idx` ASC) VISIBLE,
  CONSTRAINT `fk_cocktail_has_flavor_cocktail1`
    FOREIGN KEY (`cocktail_idx`)
    REFERENCES `cocktender`.`cocktail` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cocktail_has_flavor_flavor1`
    FOREIGN KEY (`flavor_idx`)
    REFERENCES `cocktender`.`flavor` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
