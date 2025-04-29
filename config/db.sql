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

INSERT INTO stadium (name, address, location, description, price, owner_id) VALUES
('Grand Arena', 'Yunusobod, 10', 'Tashkent', 'Yirik sport majmuasi.', 250.00, 1),
('Victory Stadium', 'Chilonzor, 5', 'Tashkent', 'Futbol va basketbol uchun maydon.', 180.00, 5),
('Silver Field', 'Olmazor, 2', 'Tashkent', 'Yangi qurilgan zamonaviy stadion.', 300.00, 8),
('Royal Sport Complex', 'Sergeli, 7', 'Tashkent', 'Sport o‘yinlari uchun majmua.', 220.00, 1),
('Sunrise Arena', 'Mirobod, 4', 'Tashkent', 'Ertalabki mashg‘ulotlar uchun ideal.', 150.00, 5),
('Diamond Stadium', 'Yakkasaroy, 9', 'Tashkent', 'Eksklyuziv sport tajribasi.', 400.00, 8),
('Green Field', 'Bektemir, 1', 'Tashkent', 'Yumshoq sun\'iy qoplama.', 170.00, 1),
('Blue Lagoon Arena', 'Shayxontohur, 3', 'Tashkent', 'Suv sportlari uchun ham mos.', 270.00, 5),
('Eagle Arena', 'Uchtepa, 6', 'Tashkent', 'Quyosh energiyasi bilan ishlaydigan stadion.', 320.00, 8),
('Legends Stadium', 'Yashnobod, 8', 'Tashkent', 'Afsonaviy sportchilar sharafi uchun qurilgan.', 500.00, 1),
('Nova Sport Arena', 'Chirchiq, 12', 'Tashkent', 'Texnologiyalangan zamonaviy majmua.', 350.00, 5),
('Arena Max', 'Angren, 15', 'Tashkent', 'Har xil sport turlari uchun.', 280.00, 8),
('Oasis Stadium', 'Nukus, 20', 'Tashkent', 'Sharqona arxitektura bilan bezatilgan.', 260.00, 1),
('Phoenix Arena', 'Navoi, 13', 'Tashkent', 'Qayta qurilgan zamonaviy stadion.', 330.00, 5),
('Cosmos Field', 'Samarkand Darvoza', 'Tashkent', 'Kechki sport tadbirlari uchun.', 390.00, 8);

select * from stadium

DROP TABLE booking

DROP TABLE IF EXISTS booking;

CREATE TABLE booking (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stadion_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    start_time VARCHAR(10) NOT NULL,
    booking_date DATE NOT NULL,
    end_time VARCHAR(10) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'CANCELLED', 'CONFIRMED', 'PAID') NOT NULL
);

INSERT INTO booking (stadion_id, user_id, start_time, booking_date, end_time, total_price, status) VALUES
(1, 3, '10:00', '2025-04-20', '12:30', 150.00, 'CONFIRMED'),
(2, 4, '14:00', '2025-04-21', '17:00', 180.00, 'PAID'),
(3, 5, '08:30', '2025-04-22', '10:00', 90.00, 'PENDING'),
(1, 6, '15:00', '2025-04-22', '18:30', 220.00, 'PAID'),
(4, 2, '09:00', '2025-04-23', '11:00', 130.00, 'CANCELLED'),
(5, 7, '12:15', '2025-04-23', '14:45', 160.00, 'CONFIRMED'),
(6, 3, '07:00', '2025-04-24', '09:30', 170.00, 'PAID'),
(7, 8, '16:00', '2025-04-24', '18:00', 140.00, 'CONFIRMED'),
(8, 9, '11:45', '2025-04-25', '13:15', 120.00, 'PENDING'),
(1, 10, '13:00', '2025-04-25', '15:45', 200.00, 'PAID'),
(2, 3, '09:30', '2025-04-26', '12:00', 150.00, 'PAID'),
(3, 4, '17:00', '2025-04-26', '19:30', 190.00, 'CONFIRMED'),
(4, 5, '06:30', '2025-04-27', '09:15', 210.00, 'PAID'),
(5, 6, '10:30', '2025-04-27', '12:00', 100.00, 'CANCELLED'),
(6, 7, '18:00', '2025-04-28', '20:30', 180.00, 'CONFIRMED'),
(7, 8, '08:00', '2025-04-28', '10:00', 160.00, 'PAID'),
(8, 9, '11:00', '2025-04-29', '13:30', 170.00, 'CONFIRMED'),
(1, 2, '07:30', '2025-04-29', '10:00', 190.00, 'PAID'),
(2, 3, '15:30', '2025-04-30', '18:00', 200.00, 'CONFIRMED'),
(3, 4, '19:00', '2025-04-30', '21:30', 210.00, 'PENDING');


select * from booking

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

-- REVIEW uchun INSERT
INSERT INTO review (stadion_id, user_id, rating, comment) VALUES
(1, 2, 5, 'Zo‘r stadion, xizmat yaxshi edi!'),
(2, 3, 4, 'Yaxshi joy, lekin narx baland.'),
(3, 5, 5, 'Juda qulay va toza.'),
(4, 7, 3, 'Maydonni holati o‘rtacha.'),
(5, 2, 4, 'Chiroyli joy, yana kelaman.'),
(1, 3, 5, 'Super o‘yin maydoni!'),
(6, 5, 4, 'Tartib va xizmat yaxshi.'),
(7, 8, 3, 'Tozalikka e’tibor kerak.');

CREATE TABLE `images`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `image_url` VARCHAR(255) NOT NULL
);

show TABLES


SELECT * from users u 
LEFT JOIN stadium  s
ON s.OWNER_id = u.id
where  first_name = "ali" 



SELECT u.first_name, u.last_name, s.name as stadion_name, b.booking_date FROM users u
JOIN booking b
ON u.id = b.user_id
JOIN stadium s 
ON s.id = b.stadion_id
order BY u.first_name


SELECT u.first_name, u.last_name, s.name as stadium_name, r.rating, r.comment FROM users u
JOIN stadium s
ON s.owner_id = u.id
JOIN review r 
ON r.user_id = u.id
WHERE u.phone = "998931112233"



select s.name, s.address, s.price, b.start_time, b.end_time FROM stadium s 
JOIN booking b 
ON b.stadion_id = s.id
WHERE s.price < 200 

SELECT * from stadium