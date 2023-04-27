-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2023 at 11:16 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nfmb_drone_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `dispatches`
--

CREATE TABLE `dispatches` (
  `id` int(11) NOT NULL,
  `loadId` int(11) NOT NULL,
  `droneId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dispatches`
--

INSERT INTO `dispatches` (`id`, `loadId`, `droneId`, `createdAt`, `updatedAt`) VALUES
(3, 2, 12345678, '2023-04-27 01:21:50', '2023-04-27 01:21:50'),
(4, 2, 787899006, '2023-04-27 01:53:26', '2023-04-27 01:53:26'),
(5, 2, 787899006, '2023-04-27 03:33:02', '2023-04-27 03:33:02'),
(6, 2, 787899006, '2023-04-27 03:39:03', '2023-04-27 03:39:03'),
(7, 2, 787899006, '2023-04-27 03:45:16', '2023-04-27 03:45:16'),
(8, 4, 2341234, '2023-04-27 07:49:43', '2023-04-27 07:49:43'),
(9, 6, 220111446, '2023-04-27 09:16:00', '2023-04-27 09:16:00');

-- --------------------------------------------------------

--
-- Table structure for table `drones`
--

CREATE TABLE `drones` (
  `serialnumber` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `weightLimit` int(11) NOT NULL,
  `batteryCapacity` int(11) NOT NULL,
  `state` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drones`
--

INSERT INTO `drones` (`serialnumber`, `model`, `weightLimit`, `batteryCapacity`, `state`, `createdAt`, `updatedAt`) VALUES
('00220111446', 'FG-786573', 56, 85, 'LOADED', '2023-04-27 09:13:55', '2023-04-27 09:16:00'),
('0987654321', '1234567890', 56, 85, 'IDLE', '2023-04-27 08:32:09', '2023-04-27 08:32:09'),
('12345678', 'x1-750AB', 100, 700, 'LOADED', '2023-04-26 21:51:26', '2023-04-27 01:21:50'),
('2341234', 'x1-750AB', 100, 700, 'LOADED', '2023-04-27 07:47:31', '2023-04-27 07:49:43'),
('787899006', 'x1-750AB', 100, 700, 'LOADED', '2023-04-26 21:59:00', '2023-04-27 03:45:16');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `drone_id` int(11) NOT NULL,
  `battery_level` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `drone_id`, `battery_level`, `createdAt`, `updatedAt`) VALUES
(1, 787899006, 585, '2023-04-27 03:45:16', '2023-04-27 09:15:00'),
(2, 2341234, 20, '2023-04-27 07:49:43', '2023-04-27 09:15:00'),
(3, 220111446, 100, '2023-04-27 09:16:00', '2023-04-27 09:16:00');

-- --------------------------------------------------------

--
-- Table structure for table `medications`
--

CREATE TABLE `medications` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `weight` float UNSIGNED NOT NULL,
  `image` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medications`
--

INSERT INTO `medications` (`id`, `name`, `weight`, `image`, `code`, `createdAt`, `updatedAt`) VALUES
(1, 'Arthemeter', 350.5, 'URL', '12345', '2023-04-27 00:20:16', '2023-04-27 00:20:16'),
(2, 'Arthemeter', 250.05, 'URL', '#12345', '2023-04-27 00:22:05', '2023-04-27 00:22:05'),
(3, 'Arthemeter', 2500.05, 'URL', '#123450', '2023-04-27 00:22:35', '2023-04-27 00:22:35'),
(4, 'Arthemeter', 50.75, 'URL', '#1237450', '2023-04-27 07:47:42', '2023-04-27 07:47:42'),
(5, 'Lumerthem', 2500.05, 'URL', '0x1237450', '2023-04-27 09:02:33', '2023-04-27 09:02:33'),
(6, 'Lumerthem', 10.05, 'URL', 'AG-54346', '2023-04-27 09:14:55', '2023-04-27 09:14:55');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220427-create-dispatch.js'),
('20230426164458-create_drone_table.js'),
('20230426222631-create_medications_table.js'),
('20230427031453-create_history_table.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dispatches`
--
ALTER TABLE `dispatches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drones`
--
ALTER TABLE `drones`
  ADD PRIMARY KEY (`serialnumber`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medications`
--
ALTER TABLE `medications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dispatches`
--
ALTER TABLE `dispatches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medications`
--
ALTER TABLE `medications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
