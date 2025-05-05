drop DATABASE webbanhang;
CREATE DATABASE webbanhang;
use webbanhang;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2025 at 08:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webbanhang`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(45) NOT NULL,
  `role_id` int(11) NOT NULL,
  `status` enum('active','banned') DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `email`, `role_id`, `status`, `created`, `updated`) VALUES
(4, 'user1', '123456', 'user1@gmail.com', 3, 'active', '2025-04-21 13:20:29', '2025-04-21 13:20:29'),
(5, 'user2', '123456', 'user2@gmail.com', 3, 'active', '2025-04-21 13:20:29', '2025-04-21 13:20:29'),
(6, 'user3', '123456', 'user3@gmail.com', 3, 'active', '2025-04-21 13:20:29', '2025-04-21 13:20:29'),
(7, 'employee2', 'emp456', 'employee2@example.com', 2, 'active', '2025-04-21 13:20:29', '2025-04-21 13:20:29'),
(8, 'admin2', 'admin456', 'admin2@example.com', 1, 'active', '2025-04-21 13:20:29', '2025-04-21 13:20:29');

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `street` varchar(45) DEFAULT NULL,
  `ward` varchar(45) DEFAULT NULL,
  `district` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `profile_id`, `phone_number`, `street`, `ward`, `district`, `city`) VALUES
(3, 4, '0900000004', '10 Tran Hung Dao', 'Ward 1', 'District 3', 'HCM'),
(4, 5, '0900000005', '22 Vo Van Tan', 'Ward 7', 'District 5', 'HCM'),
(5, 6, '0900000006', '35 Cach Mang T8', 'Ward 10', 'District 10', 'HCM'),
(6, 7, '0900000007', '15 Nguyen Thi Minh Khai', 'Ward 3', 'District 1', 'HCM'),
(7, 8, '0900000008', '1 Le Duan', 'Ward Ben Nghe', 'District 1', 'HCM');

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `description`) VALUES
(1, 'Adidas', 'Thương hiệu thể thao nổi tiếng thế giới với các sản phẩm giày dép, quần áo và phụ kiện.'),
(2, 'Nike', 'Công ty hàng đầu trong lĩnh vực trang phục và dụng cụ thể thao, nổi bật với các sản phẩm giày thể thao.'),
(3, 'Peak', 'Thương hiệu Trung Quốc chuyên về sản phẩm thể thao, đặc biệt là giày bóng rổ và quần áo thể thao.'),
(4, 'Santic', 'Hãng chuyên sản xuất quần áo và phụ kiện thể thao, đặc biệt trong lĩnh vực xe đạp.'),
(5, 'Shimano', 'Thương hiệu Nhật Bản nổi tiếng toàn cầu với các bộ truyền động xe đạp và thiết bị thể thao ngoài trời.');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `profile_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `size` int(11) NOT NULL DEFAULT 1,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`profile_id`, `product_id`, `amount`, `size`, `created`) VALUES
(4, 1, 2, 1, '2025-04-01 10:00:00'),
(4, 3, 3, 13, '2025-04-29 08:21:46'),
(4, 12, 3, 61, '2025-04-29 08:22:58'),
(5, 20, 1, 103, '2025-04-29 08:23:42'),
(5, 49, 1, 246, '2025-04-29 08:24:10'),
(6, 18, 1, 95, '2025-04-29 08:26:26'),
(7, 28, 1, 140, '2025-04-29 08:26:54'),
(8, 11, 1, 56, '2025-04-29 08:27:26');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Giày bóng rổ'),
(2, 'Giày bóng đá'),
(3, 'Xe đạp');

-- --------------------------------------------------------

--
-- Table structure for table `import`
--

CREATE TABLE `import` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `import`
--

INSERT INTO `import` (`id`, `supplier_id`, `employee_id`, `status`, `created_at`) VALUES
(1, 1, 7, NULL, '2025-04-29 06:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `import_detail`
--

CREATE TABLE `import_detail` (
  `id` int(11) NOT NULL,
  `import_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `import_price` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `import_detail`
--

INSERT INTO `import_detail` (`id`, `import_id`, `product_id`, `import_price`, `size_id`, `amount`) VALUES
(1, 1, 1, 200000, 5, 10),
(2, 1, 3, 300000, 17, 10);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL, 
  `status` enum('pending','processing','shipped','cancelled') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `employee_id` int(11) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `updated_at` datetime NOT NULL,
  `reason` mediumtext DEFAULT NULL,
  `total` int(11) NOT NULL,
  `payment_method` enum('cash','banking','credit_card','e_wallet') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `account_id`, `address_id`,`status`, `created_at`, `phone_number`, `employee_id`, `updated_at`, `reason`, `total`, `payment_method`) VALUES
(2, 4, 3, 'pending', '2025-04-29 06:45:01', '512432534', 7, '2025-04-29 08:39:46', 'thích đổi 1', 2000000, 'banking');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `size` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `product_id`, `amount`, `size`) VALUES
(1, 2, 3, 2, 16),
(2, 2, 10, 1, 51);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `icon` varchar(45) NOT NULL,
  `link` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `icon`, `link`) VALUES
(1, 'Quản lý tài khoản', 'bi-person-vcard', 'index.php?page=account_management'),
(2, 'Quản lý sản phẩm', 'bi-box', 'index.php?page=product_management'),
(3, 'Quản lý đơn hàng', 'bi-cart', 'index.php?page=order_management'),
(4, 'Thống kê', 'bi-graph-up', 'index.php?page=statistics');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`attributes`)),
  `description` longtext DEFAULT NULL,
  `url` longtext DEFAULT NULL,
  `brand` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `category_id`, `attributes`, `description`, `url`, `brand`, `price`) VALUES
(1, 'D.O.N Issue 4 Tigers', 1, '{}', '', '../static/img/giay/bong ro/adidas/1-1.jpg', 1, 3350000),
(2, 'Dame 6 Geek Up', 1, '{}', '', '../static/img/giay/bong ro/adidas/1-2.jpg', 1, 2450000),
(3, 'Dame 7 LNY', 1, '{}', '', '../static/img/giay/bong ro/adidas/1-3.jpg', 1, 2550000),
(4, 'Giày bóng rổ Harden Vol.6 Clear Pink', 1, '{}', '', '../static/img/giay/bong ro/adidas/1-4.jpg', 1, 3850000),
(5, 'Giày bóng rổ Trae Young 3 96 Olympics', 1, '{}', '', '../static/img/giay/bong ro/adidas/1-5.jpg', 1, 3650000),
(6, 'Giày bóng rổ Trae Young 3 Lucid Cyan', 1, '{}', '', '../static/img/giay/bong ro/adidas/1-6.jpg', 1, 3650000),
(7, 'Harden Vol.5 Dove and Flower', 1, '{}', '', '../static/img/giay/bong ro/adidas/1-7.jpg', 1, 3450000),
(8, 'PRO BOOST LOW - White', 1, '{}', '', '../static/img/giay/bong ro/adidas/1-8.jpg', 1, 2950000),
(9, 'Giày bóng rổ Air Jordan 37 Low Lapis', 1, '{}', '', '../static/img/giay/bong ro/nike/2-1.jpg', 2, 4950000),
(10, 'Giày bóng rổ Book 1 EP Sunset', 1, '{}', '', '../static/img/giay/bong ro/nike/2-2.jpg', 2, 4450000),
(11, 'Giày bóng rổ Ja 2 Christmas', 1, '{}', '', '../static/img/giay/bong ro/nike/2-3.jpg', 2, 4850000),
(12, 'Giày bóng rổ Ja 2 Heart Eyes', 1, '{}', '', '../static/img/giay/bong ro/nike/2-4.jpg', 2, 4450000),
(13, 'Giày bóng rổ KD16 EP Pathway Royalties', 1, '{}', '', '../static/img/giay/bong ro/nike/2-5.jpg', 2, 4950000),
(14, 'Giày bóng rổ Puma MB.03 Spark', 1, '{}', '', '../static/img/giay/bong ro/nike/2-6.jpg', 2, 4550000),
(15, 'Giày bóng rổ Zoom Freak 5 Alphabet Bros', 1, '{}', '', '../static/img/giay/bong ro/nike/2-7.jpg', 2, 4250000),
(16, 'Jordan One Take 4 PF', 1, '{}', '', '../static/img/giay/bong ro/nike/2-8.jpg', 2, 3090000),
(17, 'Giày bóng rổ Peak Beast Series', 1, '{}', '', '../static/img/giay/bong ro/peak/3-1.jpg', 3, 1690000),
(18, 'Giày bóng rổ Peak DA240081', 1, '{}', '', '../static/img/giay/bong ro/peak/3-2.jpg', 3, 1590000),
(19, 'Giày bóng rổ Peak DA420001', 1, '{}', '', '../static/img/giay/bong ro/peak/3-3.jpg', 3, 1890000),
(20, 'Giày bóng rổ Peak Flash Speed', 1, '{}', '', '../static/img/giay/bong ro/peak/3-4.jpg', 3, 1590000),
(21, 'Giày bóng rổ Peak Ranger 2.0', 1, '{}', '', '../static/img/giay/bong ro/peak/3-5.jpg', 3, 1890000),
(22, 'Peak Cavalry 3 Skyblue', 1, '{}', '', '../static/img/giay/bong ro/peak/3-6.jpg', 3, 1790000),
(23, 'Peak Light Spirit 1.0', 1, '{}', '', '../static/img/giay/bong ro/peak/3-7.jpg', 3, 1990000),
(24, 'adidas F50 League TF Advancement', 2, '{}', '', '../static/img/giay/bong da/adidas/4-1.jpg', 1, 2400000),
(25, 'adidas F50 League TF Dark Spark', 2, '{}', '', '../static/img/giay/bong da/adidas/4-2.jpg', 1, 2400000),
(26, 'Adidas Predator Accuracy .1 TF Marinerush', 2, '{}', '', '../static/img/giay/bong da/adidas/4-3.jpg', 1, 3500000),
(27, 'adidas Predator Accuracy .4 TF Crazyrush', 2, '{}', '', '../static/img/giay/bong da/adidas/4-4.jpg', 1, 1600000),
(28, 'Nike Air Zoom Mercurial Superfly 9 Academy TF', 2, '{}', '', '../static/img/giay/bong da/nike/5-1.jpg', 2, 2349000),
(29, 'Nike Air Zoom Mercurial Superfly 10 Academy T', 2, '{}', '', '../static/img/giay/bong da/nike/5-2.jpg', 2, 2929000),
(30, 'Nike Air Zoom Mercurial Superfly 10 Academy T', 2, '{}', '', '../static/img/giay/bong da/nike/5-3.jpg', 2, 3003000),
(31, 'Nike Air Zoom Mercurial Vapor 16 Academy TF S', 2, '{}', '', '../static/img/giay/bong da/nike/5-4.jpg', 2, 2629000),
(32, 'Nike Mercurial Vapor 15 Club TF Mad Ready', 2, '{}', '', '../static/img/giay/bong da/nike/5-5.jpg', 2, 1669000),
(33, 'Nike Phantom GT Pro TF Spectrum', 2, '{}', '', '../static/img/giay/bong da/nike/5-6.jpg', 2, 3519000),
(34, 'Nike Phantom GX Academy DF TF Peak Ready', 2, '{}', '', '../static/img/giay/bong da/nike/5-7.jpg', 2, 2929000),
(35, 'Nike Phantom GX II Pro TF Mad Voltage', 2, '{}', '', '../static/img/giay/bong da/nike/5-8.jpg', 2, 4109000),
(36, 'Nike Tiempo Legend 10 Pro TF Mad Ambition', 2, '{}', '', '../static/img/giay/bong da/nike/5-9.jpg', 2, 4103000),
(37, 'Nike Tiempo Legend 10 Pro TF Mad Voltage', 2, '{}', '', '../static/img/giay/bong da/nike/5-10.jpg', 2, 4109000),
(38, 'Nike Phantom GX II Elite FG United', 2, '{}', '', '../static/img/giay/bong da/nike/5-11.jpg', 2, 8239000),
(39, 'Nike Phantom GX II Pro TF Mad Energy', 2, '{}', '', '../static/img/giay/bong da/nike/5-12.jpg', 2, 4109000),
(40, 'Giày Đạp Xe Đa Năng SANTIC Caribbean Palladiu', 3, '{}', '', '../static/img/giay/xe dap/santic/6-1.jpg', 4, 1290000),
(41, 'Giày Đạp Xe Địa Hình Santic Battlefield', 3, '{}', '', '../static/img/giay/xe dap/santic/6-2.jpg', 4, 1290000),
(42, 'Giày Đạp Xe Đường Santic Picasso', 3, '{}', '', '../static/img/giay/xe dap/santic/6-3.jpg', 4, 1190000),
(43, 'Giày Đạp Xe MTB SANTIC Cross Border Buckle', 3, '{}', '', '../static/img/giay/xe dap/santic/6-4.jpg', 4, 1490000),
(44, 'Giày Đạp Xe MTB SANTIC Knight Palladium', 3, '{}', '', '../static/img/giay/xe dap/santic/6-5.jpg', 4, 1290000),
(45, 'Giày Đạp Xe MTB SANTIC Norman Buckle', 3, '{}', '', '../static/img/giay/xe dap/santic/6-6.jpg', 4, 1490000),
(46, 'Giày Đạp Xe MTB SANTIC Osa Palladium', 3, '{}', '', '../static/img/giay/xe dap/santic/6-7.jpg', 4, 1490000),
(47, 'Giày Đạp Xe Road SANTIC Cross Border Buckle', 3, '{}', '', '../static/img/giay/xe dap/santic/6-8.jpg', 4, 2190000),
(48, 'Giày Đạp Xe Thể Thao Nam SHIMANO SH-RC102', 3, '{}', '', '../static/img/giay/xe dap/shimano/7-1.jpg', 5, 2090000),
(49, 'Giày Đạp Xe Thể Thao Nam SHIMANO SH-RC302', 3, '{}', '', '../static/img/giay/xe dap/shimano/7-2.jpg', 5, 2790000),
(50, 'Giày Đạp Xe Thể Thao Nam SHIMANO SH-RC702', 3, '{}', '', '../static/img/giay/xe dap/shimano/7-3.jpg', 5, 4190000),
(51, 'Giày Đạp Xe Thể Thao Nam SHIMANO SH-RC703', 3, '{}', '', '../static/img/giay/xe dap/shimano/7-4.jpg', 5, 4390000),
(52, 'Giày Đạp Xe Thể Thao Nam SHIMANO SH-XC903', 3, '{}', '', '../static/img/giay/xe dap/shimano/7-5.jpg', 5, 7090000),
(53, 'Giày Đạp Xe Thể Thao Nữ SHIMANO SH-RC300', 3, '{}', '', '../static/img/giay/xe dap/shimano/7-6.jpg', 5, 2690000),
(54, 'Giày Đạp Xe Thể Thao Nữ SHIMANO SH-RC502', 3, '{}', '', '../static/img/giay/xe dap/shimano/7-7.jpg', 5, 3190000),
(55, 'Giày Đạp Xe Thể Thao Nữ SHIMANO SH-RC903', 3, '{}', '', '../static/img/giay/xe dap/shimano/7-8.jpg', 5, 6890000);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `fullname` varchar(256) DEFAULT NULL,
  `phone_number` varchar(10) NOT NULL,
  `avatar` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `fullname`, `phone_number`, `avatar`) VALUES
(4, 'Pham Minh Tuan', '0900000004', NULL),
(5, 'Nguyen Thi Hoa', '0900000005', NULL),
(6, 'Le Thi Hanh', '0900000006', NULL),
(7, 'Tran Van Duy', '0900000007', NULL),
(8, 'Doan Van Hieu', '0900000008', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Editor'),
(3, 'Manager'),
(9, 'test1'),
(10, 'custumer');

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

CREATE TABLE `role_permission` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `add` varchar(45) NOT NULL,
  `update` varchar(45) NOT NULL,
  `delete` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_permission`
--

INSERT INTO `role_permission` (`role_id`, `permission_id`, `add`, `update`, `delete`, `status`) VALUES
(1, 1, '1', '1', '1', NULL),
(1, 2, '1', '1', '1', NULL),
(1, 3, '1', '1', '1', NULL),
(1, 4, '1', '1', '1', '1'),
(2, 1, '0', '1', '1', '0'),
(2, 2, '1', '1', '0', '0'),
(2, 3, '0', '1', '0', '0'),
(3, 1, '1', '1', '1', NULL),
(3, 2, '1', '1', '1', NULL),
(3, 3, '1', '1', '1', NULL),
(9, 1, '1', '0', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `size_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `product_id`, `amount`, `size_number`) VALUES
(1, 1, 10, 38),
(2, 1, 15, 39),
(3, 1, 20, 40),
(4, 1, 25, 41),
(5, 1, 30, 42),
(6, 2, 10, 38),
(7, 2, 15, 39),
(8, 2, 20, 40),
(9, 2, 25, 41),
(10, 2, 30, 42),
(11, 3, 10, 38),
(12, 3, 15, 39),
(13, 3, 20, 40),
(14, 3, 25, 41),
(15, 3, 30, 42),
(16, 4, 10, 38),
(17, 4, 15, 39),
(18, 4, 20, 40),
(19, 4, 25, 41),
(20, 4, 30, 42),
(21, 5, 10, 38),
(22, 5, 15, 39),
(23, 5, 20, 40),
(24, 5, 25, 41),
(25, 5, 30, 42),
(26, 6, 10, 38),
(27, 6, 15, 39),
(28, 6, 20, 40),
(29, 6, 25, 41),
(30, 6, 30, 42),
(31, 7, 10, 38),
(32, 7, 15, 39),
(33, 7, 20, 40),
(34, 7, 25, 41),
(35, 7, 30, 42),
(36, 8, 10, 38),
(37, 8, 15, 39),
(38, 8, 20, 40),
(39, 8, 25, 41),
(40, 8, 30, 42),
(41, 9, 10, 38),
(42, 9, 15, 39),
(43, 9, 20, 40),
(44, 9, 25, 41),
(45, 9, 30, 42),
(46, 10, 10, 38),
(47, 10, 15, 39),
(48, 10, 20, 40),
(49, 10, 25, 41),
(50, 10, 30, 42),
(51, 11, 10, 38),
(52, 11, 15, 39),
(53, 11, 20, 40),
(54, 11, 25, 41),
(55, 11, 30, 42),
(56, 12, 10, 38),
(57, 12, 15, 39),
(58, 12, 20, 40),
(59, 12, 25, 41),
(60, 12, 30, 42),
(61, 13, 10, 38),
(62, 13, 15, 39),
(63, 13, 20, 40),
(64, 13, 25, 41),
(65, 13, 30, 42),
(66, 14, 10, 38),
(67, 14, 15, 39),
(68, 14, 20, 40),
(69, 14, 25, 41),
(70, 14, 30, 42),
(71, 15, 10, 38),
(72, 15, 15, 39),
(73, 15, 20, 40),
(74, 15, 25, 41),
(75, 15, 30, 42),
(76, 16, 10, 38),
(77, 16, 15, 39),
(78, 16, 20, 40),
(79, 16, 25, 41),
(80, 16, 30, 42),
(81, 17, 10, 38),
(82, 17, 15, 39),
(83, 17, 20, 40),
(84, 17, 25, 41),
(85, 17, 30, 42),
(86, 18, 10, 38),
(87, 18, 15, 39),
(88, 18, 20, 40),
(89, 18, 25, 41),
(90, 18, 30, 42),
(91, 19, 10, 38),
(92, 19, 15, 39),
(93, 19, 20, 40),
(94, 19, 25, 41),
(95, 19, 30, 42),
(96, 20, 10, 38),
(97, 20, 15, 39),
(98, 20, 20, 40),
(99, 20, 25, 41),
(100, 20, 30, 42),
(101, 21, 10, 38),
(102, 21, 15, 39),
(103, 21, 20, 40),
(104, 21, 25, 41),
(105, 21, 30, 42),
(106, 22, 10, 38),
(107, 22, 15, 39),
(108, 22, 20, 40),
(109, 22, 25, 41),
(110, 22, 30, 42),
(111, 23, 10, 38),
(112, 23, 15, 39),
(113, 23, 20, 40),
(114, 23, 25, 41),
(115, 23, 30, 42),
(116, 24, 10, 38),
(117, 24, 15, 39),
(118, 24, 20, 40),
(119, 24, 25, 41),
(120, 24, 30, 42),
(121, 25, 10, 38),
(122, 25, 15, 39),
(123, 25, 20, 40),
(124, 25, 25, 41),
(125, 25, 30, 42),
(126, 26, 10, 38),
(127, 26, 15, 39),
(128, 26, 20, 40),
(129, 26, 25, 41),
(130, 26, 30, 42),
(131, 27, 10, 38),
(132, 27, 15, 39),
(133, 27, 20, 40),
(134, 27, 25, 41),
(135, 27, 30, 42),
(136, 28, 10, 38),
(137, 28, 15, 39),
(138, 28, 20, 40),
(139, 28, 25, 41),
(140, 28, 30, 42),
(141, 29, 10, 38),
(142, 29, 15, 39),
(143, 29, 20, 40),
(144, 29, 25, 41),
(145, 29, 30, 42),
(146, 30, 10, 38),
(147, 30, 15, 39),
(148, 30, 20, 40),
(149, 30, 25, 41),
(150, 30, 30, 42),
(151, 31, 10, 38),
(152, 31, 15, 39),
(153, 31, 20, 40),
(154, 31, 25, 41),
(155, 31, 30, 42),
(156, 32, 10, 38),
(157, 32, 15, 39),
(158, 32, 20, 40),
(159, 32, 25, 41),
(160, 32, 30, 42),
(161, 33, 10, 38),
(162, 33, 15, 39),
(163, 33, 20, 40),
(164, 33, 25, 41),
(165, 33, 30, 42),
(166, 34, 10, 38),
(167, 34, 15, 39),
(168, 34, 20, 40),
(169, 34, 25, 41),
(170, 34, 30, 42),
(171, 35, 10, 38),
(172, 35, 15, 39),
(173, 35, 20, 40),
(174, 35, 25, 41),
(175, 35, 30, 42),
(176, 36, 10, 38),
(177, 36, 15, 39),
(178, 36, 20, 40),
(179, 36, 25, 41),
(180, 36, 30, 42),
(181, 37, 10, 38),
(182, 37, 15, 39),
(183, 37, 20, 40),
(184, 37, 25, 41),
(185, 37, 30, 42),
(186, 38, 10, 38),
(187, 38, 15, 39),
(188, 38, 20, 40),
(189, 38, 25, 41),
(190, 38, 30, 42),
(191, 39, 10, 38),
(192, 39, 15, 39),
(193, 39, 20, 40),
(194, 39, 25, 41),
(195, 39, 30, 42),
(196, 40, 10, 38),
(197, 40, 15, 39),
(198, 40, 20, 40),
(199, 40, 25, 41),
(200, 40, 30, 42),
(201, 41, 10, 38),
(202, 41, 15, 39),
(203, 41, 20, 40),
(204, 41, 25, 41),
(205, 41, 30, 42),
(206, 42, 10, 38),
(207, 42, 15, 39),
(208, 42, 20, 40),
(209, 42, 25, 41),
(210, 42, 30, 42),
(211, 43, 10, 38),
(212, 43, 15, 39),
(213, 43, 20, 40),
(214, 43, 25, 41),
(215, 43, 30, 42),
(216, 44, 10, 38),
(217, 44, 15, 39),
(218, 44, 20, 40),
(219, 44, 25, 41),
(220, 44, 30, 42),
(221, 45, 10, 38),
(222, 45, 15, 39),
(223, 45, 20, 40),
(224, 45, 25, 41),
(225, 45, 30, 42),
(226, 46, 10, 38),
(227, 46, 15, 39),
(228, 46, 20, 40),
(229, 46, 25, 41),
(230, 46, 30, 42),
(231, 47, 10, 38),
(232, 47, 15, 39),
(233, 47, 20, 40),
(234, 47, 25, 41),
(235, 47, 30, 42),
(236, 48, 10, 38),
(237, 48, 15, 39),
(238, 48, 20, 40),
(239, 48, 25, 41),
(240, 48, 30, 42),
(241, 49, 10, 38),
(242, 49, 15, 39),
(243, 49, 20, 40),
(244, 49, 25, 41),
(245, 49, 30, 42),
(246, 50, 10, 38),
(247, 50, 15, 39),
(248, 50, 20, 40),
(249, 50, 25, 41),
(250, 50, 30, 42),
(251, 51, 10, 38),
(252, 51, 15, 39),
(253, 51, 20, 40),
(254, 51, 25, 41),
(255, 51, 30, 42),
(256, 52, 10, 38),
(257, 52, 15, 39),
(258, 52, 20, 40),
(259, 52, 25, 41),
(260, 52, 30, 42),
(261, 53, 10, 38),
(262, 53, 15, 39),
(263, 53, 20, 40),
(264, 53, 25, 41),
(265, 53, 30, 42),
(266, 54, 10, 38),
(267, 54, 15, 39),
(268, 54, 20, 40),
(269, 54, 25, 41),
(270, 54, 30, 42),
(271, 55, 10, 38),
(272, 55, 15, 39),
(273, 55, 20, 40),
(274, 55, 25, 41),
(275, 55, 30, 42);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `tax` varchar(45) DEFAULT NULL,
  `contact_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(10) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `tax`, `contact_name`, `phone_number`, `email`, `status`, `created_at`) VALUES
(1, 'Công ty TNHH Thể Thao Việt', '0101234567', 'Nguyễn Văn A', '0905123456', 'contact@thethaoviet.vn', 'active', '2025-04-29 06:03:48'),
(2, 'SportPro Co.', '0202345678', 'Trần Thị B', '0916345678', 'info@sportpro.vn', 'active', '2025-04-29 06:03:48'),
(3, 'Nhập Khẩu Thể Thao 123', '0303456789', 'Lê Văn C', '0987123456', 'sales@thethao123.vn', 'inactive', '2025-04-29 06:03:48');

-- --------------------------------------------------------

--
-- Table structure for table `warranty`
--

CREATE TABLE `warranty` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `issue_date` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected','Cancelled') DEFAULT 'Pending',
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `warranty`
--

INSERT INTO `warranty` (`id`, `product_id`, `supplier_id`, `issue_date`, `expiration_date`, `status`, `note`) VALUES
(1, 2, 1, '2025-04-01', '2025-04-30', 'Pending', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_brand_name` (`name`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`profile_id`,`product_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_ibfk_3` (`size`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `import`
--
ALTER TABLE `import`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `import_detail`
--
ALTER TABLE `import_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `import_id` (`import_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `import_detail_ibfk_3` (`size_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_detail_ibfk_3` (`size`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `brand` (`brand`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number_UNIQUE` (`phone_number`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_product_size` (`product_id`,`size_number`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tax_UNIQUE` (`tax`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- Indexes for table `warranty`
--
ALTER TABLE `warranty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `import`
--
ALTER TABLE `import`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `import_detail`
--
ALTER TABLE `import_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `warranty`
--
ALTER TABLE `warranty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`) ON DELETE CASCADE;
ALTER TABLE `orders`
  ADD constraint `orders-address_1` FOREIGN KEY  (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE;
--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`size`) REFERENCES `size` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `import`
--
ALTER TABLE `import`
  ADD CONSTRAINT `import_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `import_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `account` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `import_detail`
--
ALTER TABLE `import_detail`
  ADD CONSTRAINT `import_detail_ibfk_1` FOREIGN KEY (`import_id`) REFERENCES `import` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `import_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `import_detail_ibfk_3` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_3` FOREIGN KEY (`size`) REFERENCES `size` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_brand` FOREIGN KEY (`brand`) REFERENCES `brand` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL;

ALTER TABLE `size`
  ADD CONSTRAINT `size_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)  ON DELETE CASCADE;

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `warranty`
--
ALTER TABLE `warranty`
  ADD CONSTRAINT `warranty_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `order_detail` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `warranty_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
