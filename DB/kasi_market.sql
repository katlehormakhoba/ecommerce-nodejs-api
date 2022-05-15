-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2022 at 03:31 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kasi_market`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `title`, `description`, `price`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Cordless Driller', 'Rechargable driller with 18v ksjkhsjs ddg dgfggf isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj', 1200, 'assets/images/i1.png', '2022-04-20 02:31:22', '2022-04-20 02:31:22'),
(2, 'whisteling Kettle', 'Rechargable driller with 18v ksjkhsjs ddg dgfggf isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj', 500, 'assets/images/i2.png', '2022-04-20 02:33:47', '2022-04-20 02:33:47'),
(3, 'Yeezy', 'Rechargable driller with 18v ksjkhsjs ddg dgfggf isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj', 1500, 'assets/images/i3.png', '2022-04-20 02:34:15', '2022-04-20 02:34:15'),
(4, 'Black Pearl', 'Rechargable driller with 18v ksjkhsjs ddg dgfggf isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj', 1200, 'assets/images/i4.jpg', '2022-04-20 02:34:43', '2022-04-20 02:34:43'),
(5, 'Nike', 'Rechargable driller with 18v ksjkhsjs ddg dgfggf isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj', 1700, 'assets/images/i5.jpg', '2022-04-20 02:35:06', '2022-04-20 02:35:06'),
(6, 'Vase', 'Rechargable driller with 18v ksjkhsjs ddg dgfggf isjdjkjsk skjdsdjj sk ksjdjskdksj ksjdkdkjskj', 300, 'assets/images/i6.jpg', '2022-04-20 02:35:29', '2022-04-20 02:35:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `userType` varchar(255) NOT NULL DEFAULT 'user',
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `userType`, `password`, `createdAt`, `updatedAt`) VALUES
(5, 'mashh', '', 'mash@gmail.com', 'user', '$2a$12$CQcy9iU9vOTEUNpMDJyqLOdhx4XjZw1ktw93ihGfVuJYDl8aC1Z6i', '2022-04-21 12:55:54', '2022-04-21 12:55:54'),
(6, 'katleho', '', 'k@gmail.com', 'user', '$2a$12$PMaUSIYpRLwI8Fz/nPggPOzkYyUeV/Ljm2OLVuDuIOLOdJ7WDlSia', '2022-04-22 11:39:00', '2022-04-22 11:39:00'),
(18, 'Katleho', 'makhoba', 'kat@gmail.com', 'user', '$2a$12$ff1TrzxILuEbRIqYmbTUTOW.nHzEfTq1Lq37vv8nucdKCvN/t0gCq', '2022-04-23 10:20:40', '2022-04-23 10:20:40'),
(91, 'mashh', 'temaa', 'masht@gmail.com', 'user', '$2a$12$ijjTT9wSiNqSZX.5rkKp8eaD3VKjzbsPVLfcgLFa5DBtgcnJUcPdu', '2022-05-08 10:21:18', '2022-05-08 10:21:18'),
(6797, 'Katleho', 'makhoba', 'katt@gmail.com', 'user', '$2a$12$vwCHCxCPFC9p34051w1yF.GR7V7hQA3BflaGwyXsEB4y.I1tvVDZu', '2022-04-23 10:29:24', '2022-04-23 10:29:24');

-- --------------------------------------------------------

--
-- Table structure for table `wishes`
--

CREATE TABLE `wishes` (
  `id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `itermId` (`itemId`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projectId` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishes`
--
ALTER TABLE `wishes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `itemId` (`itemId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109577;

--
-- AUTO_INCREMENT for table `wishes`
--
ALTER TABLE `wishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishes`
--
ALTER TABLE `wishes`
  ADD CONSTRAINT `wishes_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishes_ibfk_4` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
