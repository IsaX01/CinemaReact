-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: cinema
-- Source Schemata: cinema
-- Created: Fri Oct 28 22:42:54 2022
-- Workbench Version: 8.0.31
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema cinema
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `cinema` ;
CREATE SCHEMA IF NOT EXISTS `cinema` ;

-- ----------------------------------------------------------------------------
-- Table cinema.actors
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`actors` (
  `id` VARCHAR(15) NOT NULL,
  `actor` VARCHAR(30) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.categories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`categories` (
  `id` VARCHAR(15) NOT NULL,
  `category` VARCHAR(25) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.countries
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`countries` (
  `id` VARCHAR(15) NOT NULL,
  `country` VARCHAR(10) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.foods
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`foods` (
  `id` VARCHAR(15) NOT NULL,
  `food` VARCHAR(30) NOT NULL,
  `price` DOUBLE NOT NULL,
  `url_image` VARCHAR(50) NOT NULL,
  `description` VARCHAR(150) NOT NULL,
  `categories_id` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `foods_categories_categories_id` (`categories_id` ASC) VISIBLE,
  CONSTRAINT `foods_categories_categories_id`
    FOREIGN KEY (`categories_id`)
    REFERENCES `cinema`.`categories` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.genres
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`genres` (
  `id` VARCHAR(15) NOT NULL,
  `genre` VARCHAR(30) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.invoice_ticket
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`invoice_ticket` (
  `invoices_id` VARCHAR(15) NOT NULL,
  `ticket_id` VARCHAR(15) NOT NULL,
  INDEX `invoice_ticket_invoices_invoices_id` (`invoices_id` ASC) VISIBLE,
  INDEX `invoice_ticket_ticket_ticket_id` (`ticket_id` ASC) VISIBLE,
  CONSTRAINT `invoice_ticket_invoices_invoices_id`
    FOREIGN KEY (`invoices_id`)
    REFERENCES `cinema`.`invoices` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `invoice_ticket_ticket_ticket_id`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `cinema`.`ticket` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.invoices
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`invoices` (
  `id` VARCHAR(15) NOT NULL,
  `date` DATETIME(6) NOT NULL,
  `price_total` DOUBLE NOT NULL,
  `url_code_qr` VARCHAR(45) NOT NULL,
  `users_id` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UQ__invoices__DCFE65D39649BE64` (`url_code_qr` ASC) VISIBLE,
  INDEX `invoices_users_users_id` (`users_id` ASC) VISIBLE,
  CONSTRAINT `invoices_users_users_id`
    FOREIGN KEY (`users_id`)
    REFERENCES `cinema`.`users` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.invoices_food
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`invoices_food` (
  `amount` BIGINT NOT NULL,
  `sub_total` BIGINT NOT NULL,
  `invoices_id` VARCHAR(15) NOT NULL,
  `foods_id` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `invoices_food_invoices_invoices_id` (`invoices_id` ASC) VISIBLE,
  INDEX `invoices_food_foods_foods_id` (`foods_id` ASC) VISIBLE,
  CONSTRAINT `invoices_food_foods_foods_id`
    FOREIGN KEY (`foods_id`)
    REFERENCES `cinema`.`foods` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `invoices_food_invoices_invoices_id`
    FOREIGN KEY (`invoices_id`)
    REFERENCES `cinema`.`invoices` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.languages
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`languages` (
  `id` VARCHAR(15) NOT NULL,
  `language` VARCHAR(10) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.letter
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`letter` (
  `id` VARCHAR(15) NOT NULL,
  `letter` VARCHAR(2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.movie
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`movie` (
  `id` VARCHAR(30) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `duration` BIGINT NOT NULL,
  `release` DATE NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `url_image` VARCHAR(100) NOT NULL,
  `url_trailer` VARCHAR(100) NOT NULL,
  `status_id` VARCHAR(15) NOT NULL,
  `restriction_id` VARCHAR(15) NOT NULL,
  `languages_id` VARCHAR(15) NOT NULL,
  `countries_id` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `movie_status_status_id` (`status_id` ASC) VISIBLE,
  INDEX `movie_restriction_restriction_id` (`restriction_id` ASC) VISIBLE,
  INDEX `movie_languages_languages_id` (`languages_id` ASC) VISIBLE,
  INDEX `movie_countries_countries_id` (`countries_id` ASC) VISIBLE,
  CONSTRAINT `movie_countries_countries_id`
    FOREIGN KEY (`countries_id`)
    REFERENCES `cinema`.`countries` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `movie_languages_languages_id`
    FOREIGN KEY (`languages_id`)
    REFERENCES `cinema`.`languages` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `movie_restriction_restriction_id`
    FOREIGN KEY (`restriction_id`)
    REFERENCES `cinema`.`restriction` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `movie_status_status_id`
    FOREIGN KEY (`status_id`)
    REFERENCES `cinema`.`status` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.movie_actors
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`movie_actors` (
  `actors_id` VARCHAR(15) NOT NULL,
  `movie_id` VARCHAR(30) NOT NULL,
  INDEX `movie_actors_actors_actors_id` (`actors_id` ASC) VISIBLE,
  INDEX `movie_actors_movie_movie_id` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `movie_actors_actors_actors_id`
    FOREIGN KEY (`actors_id`)
    REFERENCES `cinema`.`actors` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `movie_actors_movie_movie_id`
    FOREIGN KEY (`movie_id`)
    REFERENCES `cinema`.`movie` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.movie_genres
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`movie_genres` (
  `genres_id` VARCHAR(15) NOT NULL,
  `movie_id` VARCHAR(30) NOT NULL,
  INDEX `movie_genres_genres_genres_id` (`genres_id` ASC) VISIBLE,
  INDEX `movie_genres_movie_movie_id` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `movie_genres_genres_genres_id`
    FOREIGN KEY (`genres_id`)
    REFERENCES `cinema`.`genres` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `movie_genres_movie_movie_id`
    FOREIGN KEY (`movie_id`)
    REFERENCES `cinema`.`movie` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.restriction
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`restriction` (
  `id` VARCHAR(15) NOT NULL,
  `restriction` VARCHAR(15) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.roles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`roles` (
  `id` VARCHAR(15) NOT NULL,
  `rol` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.room
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`room` (
  `id` VARCHAR(15) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  `location` VARCHAR(15) NOT NULL,
  `is_vip` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.schedule
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`schedule` (
  `id` VARCHAR(15) NOT NULL,
  `schedule` DATETIME(6) NOT NULL,
  `movie_id` VARCHAR(30) NOT NULL,
  `room_id` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `schedule_movie_movie_id` (`movie_id` ASC) VISIBLE,
  INDEX `schedule_room_room_id` (`room_id` ASC) VISIBLE,
  CONSTRAINT `schedule_movie_movie_id`
    FOREIGN KEY (`movie_id`)
    REFERENCES `cinema`.`movie` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `schedule_room_room_id`
    FOREIGN KEY (`room_id`)
    REFERENCES `cinema`.`room` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.seat
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`seat` (
  `id` VARCHAR(15) NOT NULL,
  `number` BIGINT NOT NULL,
  `seat_statuses_id` VARCHAR(15) NOT NULL,
  `room_id` VARCHAR(15) NOT NULL,
  `letter_id` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `seat_seat_statuses_seat_statuses_id` (`seat_statuses_id` ASC) VISIBLE,
  INDEX `seat_letter_letter_id` (`letter_id` ASC) VISIBLE,
  CONSTRAINT `seat_letter_letter_id`
    FOREIGN KEY (`letter_id`)
    REFERENCES `cinema`.`letter` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `seat_seat_statuses_seat_statuses_id`
    FOREIGN KEY (`seat_statuses_id`)
    REFERENCES `cinema`.`seat_statuses` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.seat_statuses
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`seat_statuses` (
  `id` VARCHAR(15) NOT NULL,
  `seat_status` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.sex
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`sex` (
  `id` BIGINT NOT NULL,
  `label` VARCHAR(1) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.status
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`status` (
  `id` VARCHAR(15) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.sysdiagrams
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`sysdiagrams` (
  `name` VARCHAR(160) NOT NULL,
  `principal_id` INT NOT NULL,
  `diagram_id` INT NOT NULL,
  `version` INT NULL DEFAULT NULL,
  `definition` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`diagram_id`),
  UNIQUE INDEX `UK_principal_name` (`principal_id` ASC, `name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.ticket
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`ticket` (
  `id` VARCHAR(15) NOT NULL,
  `ticket_types_id` VARCHAR(15) NOT NULL,
  `schedule_id` VARCHAR(15) NOT NULL,
  `seat_id` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `ticket_ticket_types_ticket_types_id` (`ticket_types_id` ASC) VISIBLE,
  INDEX `ticket_schedule_schedule_id` (`schedule_id` ASC) VISIBLE,
  INDEX `ticket_seat_seat_id` (`seat_id` ASC) VISIBLE,
  CONSTRAINT `ticket_schedule_schedule_id`
    FOREIGN KEY (`schedule_id`)
    REFERENCES `cinema`.`schedule` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `ticket_seat_seat_id`
    FOREIGN KEY (`seat_id`)
    REFERENCES `cinema`.`seat` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `ticket_ticket_types_ticket_types_id`
    FOREIGN KEY (`ticket_types_id`)
    REFERENCES `cinema`.`ticket_types` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.ticket_types
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`ticket_types` (
  `id` VARCHAR(15) NOT NULL,
  `ticket_type` VARCHAR(15) NOT NULL,
  `price` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table cinema.users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`users` (
  `id` VARCHAR(15) NOT NULL,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `birthday` DATE NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `sex_id` BIGINT NOT NULL,
  `stripe_id` VARCHAR(50) NULL,
  `roles_id` VARCHAR(15) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '0',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UQ__users__502DD0213178D4D1` (`email` ASC, `phone` ASC) VISIBLE,
  INDEX `users_sex_sex_id` (`sex_id` ASC) VISIBLE,
  INDEX `users_roles_roles_id` (`roles_id` ASC) VISIBLE,
  CONSTRAINT `users_roles_roles_id`
    FOREIGN KEY (`roles_id`)
    REFERENCES `cinema`.`roles` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `users_sex_sex_id`
    FOREIGN KEY (`sex_id`)
    REFERENCES `cinema`.`sex` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;
