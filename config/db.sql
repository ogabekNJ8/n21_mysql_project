-- Active: 1745317107860@@127.0.0.1@3306@rent_stadium

CREATE DATABASE rent_stadium

SHOW DATABASES

DROP Table users

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('owner', 'customer', 'admin') NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255),
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL
);

INSERT INTO users (`role`, first_name, last_name, email, password, `phone`) VALUES
('owner', 'Ali', 'Karimov', 'ali.karimov@example.com', 'pass123Ali', '998901234567'),
('customer', 'Laylo', 'Yusupova', 'laylo.yusupova@example.com', 'pass456Lay', '998911234567'),
('admin', 'Jasur', 'Ismoilov', 'jasur.ismoilov@example.com', 'adminPass', '998931112233'),
('customer', 'Malika', 'Toshpulatova', 'malika.tosh@example.com', 'Malika2024!', '998901112233'),
('owner', 'Bobur', 'Rasulov', 'bobur.rasulov@example.com', 'Bobur@321', '998939876543'),
('admin', 'Dilnoza', 'Bekmurodova', 'dilnoza.bek@example.com', 'D!lnoza2024', '998998765432'),
('customer', 'Sardor', 'Nazarov', 'sardor.nazarov@example.com', 'sardor_456', '998977654321'),
('owner', 'Zilola', 'Shukurova', 'zilola.shukurova@example.com', 'zilolaPass1', '998901199887'),
('admin', 'Shahboz', 'Jalilov', 'shahboz.jalilov@example.com', 'shahbozPass', '998931100221'),
('customer', 'Nilufar', 'Soliyeva', 'nilufar.soliyeva@example.com', 'nilufar123', '998911100223');

DROP TABLE stadium

CREATE TABLE `stadium`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(15, 2) NOT NULL,
    `owner_id` INT NOT NULL
);

DROP TABLE booking

CREATE TABLE `booking`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `start_time` VARCHAR(10) NOT NULL,
    `booking_date` DATE NOT NULL,
    `end_time` DATETIME NOT NULL,
    `total_price` DECIMAL NOT NULL,
    `status` ENUM('PENDING', 'CANCELLED', 'CONFIRMED', 'PAID' ) NOT NULL
);


CREATE TABLE `payment`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `booking_id` INT NOT NULL,
    `amount` INT NOT NULL,
    `payment_time` DATETIME NOT NULL,
    `payment_method` ENUM('CARD', 'CASH', 'ONLINE') NOT NULL
);
CREATE TABLE `review`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `rating` SMALLINT NOT NULL ,
    `comment` VARCHAR(255) NOT NULL
);
CREATE TABLE `images`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `image_url` VARCHAR(255) NOT NULL
);

show TABLES