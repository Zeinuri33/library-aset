-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Waktu pembuatan: 27 Bulan Mei 2026 pada 01.50
-- Versi server: 8.4.9
-- Versi PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Basis data: `aset`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `barangs`
--

CREATE TABLE `barangs` (
  `id` bigint UNSIGNED NOT NULL,
  `kategori_barang_id` bigint UNSIGNED NOT NULL,
  `kode_induk` int UNSIGNED DEFAULT NULL,
  `nama_barang` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `barangs`
--

INSERT INTO `barangs` (`id`, `kategori_barang_id`, `kode_induk`, `nama_barang`, `thumbnail`, `deskripsi`, `created_at`, `updated_at`) VALUES
(13, 13, NULL, 'Kipas Angin Baling-baling', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(14, 14, NULL, 'Lemari 2 Pintu', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(15, 15, NULL, 'Foto Copy IR 5000/6000', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(16, 16, NULL, 'Kursi Kayu', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(17, 16, NULL, 'Meja Rapat', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(18, 17, NULL, 'Kursi Lipat', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(19, 14, NULL, 'Lemari 3 Pintu', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(20, 16, NULL, 'Meja Baca', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(21, 16, NULL, 'Meja Kaca', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(22, 18, NULL, 'Gorden', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(23, 16, NULL, 'Meja Komputer', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(24, 19, NULL, 'Rak Sandal', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(25, 17, NULL, 'Kursi Tinggi', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(26, 16, NULL, 'Meja Kerja Kecil', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(27, 20, NULL, 'Bel', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(28, 16, NULL, 'Meja Kerja Besar', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(29, 21, NULL, 'Sekat Alumunium Ruang perpus putra', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(30, 22, NULL, 'Avalon Besar', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(31, 14, NULL, 'Rak Besar one side', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(32, 22, NULL, 'Avalon Kecil', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(33, 14, NULL, 'Lemari Administrasi/Bufet', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(34, 14, NULL, 'Lemari Kertas', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(35, 23, NULL, 'Slide Proyektor', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(36, 15, NULL, 'Barcode Scanner', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(37, 19, NULL, 'Rak Koran Kecil', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(38, 14, NULL, 'Lemari CPU', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(39, 19, NULL, 'Rak Penitipan Barang', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(40, 14, NULL, 'Rak Kecil 1 Sisi', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(41, 16, NULL, 'Meja Kecil', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(42, 19, NULL, 'Rak Koran Besar', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(43, 13, NULL, 'Kipas Angin Dinding Kecil', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(44, 23, NULL, 'Samsung LED 32\"', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(45, 21, NULL, 'Sekat Ruang / Tabir', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(46, 19, NULL, 'Troli Book/Rak Dorong Kayu', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(47, 24, NULL, 'PC HP All in one', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(48, 17, NULL, 'Kursi Putar Tanpa Sandaran', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(49, 25, NULL, 'Karpet Coklat', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(50, 26, NULL, 'Meja BI Corner (HPL)', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(51, 26, NULL, 'Rak Buku BI Corner (HPL)', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(52, 13, NULL, 'AC Panasonic 2 PK', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(53, 20, NULL, 'Jam Dinding', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(54, 25, NULL, 'Karpet Hijau', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(55, 17, NULL, 'Kursi Putar Besar (Polaris)', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(56, 27, NULL, 'Staples Max 12L/17', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(57, 28, NULL, 'Bor Listrik', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(58, 29, NULL, 'Paket CCTV Chennel IpeCam', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(59, 14, NULL, 'Gantungan Nama Rak Buku', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(60, 16, NULL, 'Meja Layanan Perpus Putri', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(61, 14, NULL, 'Rak Buku Double side', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(62, 15, NULL, 'Barcode Honeyweel 7120', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(63, 30, NULL, 'Detector Anti Pencurian', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(64, 16, NULL, 'Meja Baca Lesehan', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(65, 25, NULL, 'Karpet Tebal 5x2m 4 Lembar', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(66, 31, NULL, 'Blower Modern', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(67, 31, NULL, 'Blower Bosch', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(68, 32, NULL, 'Backdrop Lobi Perpustakaan', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(69, 25, NULL, 'Karpet Bali (Biru) 4x7m', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(70, 13, NULL, 'AC Polytron 2 PK', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(71, 33, NULL, 'Stavol/Stabilizer Samoto 10000Va', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(72, 17, NULL, 'Kursi Besi susun Hiyundhai', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(73, 17, NULL, 'Kursi Putar (Annex)', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(74, 13, NULL, 'Kipas Angin Hitam Maspion', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(75, 17, NULL, 'Kursi Tamu 1 Set', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(76, 15, NULL, 'Scenner Brother Ads2200', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(77, 23, NULL, 'LCD Proyektor Sony', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(78, 24, NULL, 'PC Dell Vostro 3670Mt i3', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(79, 32, NULL, 'Papan Nama Timbul Neon Box Akrilik', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(80, 33, NULL, 'Stavol/Stabilizer 3000Wat Samoto', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(81, 29, NULL, 'Tripot Stand Almunium', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(82, 29, NULL, 'Tripot Softboox 4 Socket', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(83, 34, NULL, 'Webcam Logitec Kamera C390e', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(84, 17, NULL, 'Kursi Besi susun Phoenix', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(85, 24, NULL, 'PC Rental', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(86, 24, NULL, 'PC Server, Rak Server & UPS', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(87, 13, NULL, 'AC Standing Double Blower 5 PK', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(88, 35, NULL, 'Salon Audio Bull 15,Mic Wereles', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(89, 24, NULL, 'PC Buildup Acer Tc 708Dc Ka', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(90, 36, NULL, 'Troli Book/Rak Dorong Brother', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(91, 32, NULL, 'Papan Informasi/ Mading', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(92, 37, NULL, 'Gelas Wine', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(93, 37, NULL, 'Cangkir Mug', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(94, 38, NULL, 'Mikrotik', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(95, 24, NULL, 'Komputer Mini PC Beelink Ser5 Pro', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(96, 39, NULL, 'Mesin Glue Blinding Telson', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(97, 40, NULL, 'Printer Epson L3210', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(98, 40, NULL, 'Printer Fargo DTC 1250', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(99, 14, NULL, 'Lemari Kaca Almunium', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(100, 24, NULL, 'PC HP SET Aio 24 Intel', NULL, 'Diimpor otomatis dari Excel', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(101, 13, NULL, 'AC Daikin 2 PK', '/storage/thumbnails/BWc2PwXaI5H8MWpcCgcnmikdfx1n9e7QddZ4JwLs.png', 'Diimpor otomatis dari Excel', '2026-05-26 11:09:29', '2026-05-26 19:03:14'),
(102, 41, NULL, 'Dispenser', '/storage/thumbnails/0CatD0xo85nAUlOohNyrPbszG2GNX2Yknh0if6x8.png', 'Diimpor otomatis dari Excel', '2026-05-26 11:09:29', '2026-05-26 18:43:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-f20b271a9163c8d2ad908e5d5a17a472', 'i:1;', 1779841054),
('laravel-cache-f20b271a9163c8d2ad908e5d5a17a472:timer', 'i:1779841054;', 1779841054),
('laravel-cache-spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:17:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:14:\"dashboard.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:5:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:5;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:14:\"inventory.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:5:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:5;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:16:\"inventory.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:14:\"inventory.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:4;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:16:\"inventory.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:15:\"kategori.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:12:\"ruang.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:18:\"sumber_dana.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:16:\"maintenance.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:5:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:5;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:18:\"maintenance.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:4;}}i:10;a:4:{s:1:\"a\";i:11;s:1:\"b\";s:16:\"maintenance.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:4;}}i:11;a:4:{s:1:\"a\";i:12;s:1:\"b\";s:18:\"maintenance.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:12;a:4:{s:1:\"a\";i:13;s:1:\"b\";s:11:\"label.print\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:12:\"label.export\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:13:\"report.export\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:5;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:11:\"user.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:11:\"role.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:5:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:11:\"Super Admin\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:16:\"Admin Inventaris\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:5:\"Staff\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:7:\"Teknisi\";s:1:\"c\";s:3:\"web\";}i:4;a:3:{s:1:\"a\";i:5;s:1:\"b\";s:8:\"Pimpinan\";s:1:\"c\";s:3:\"web\";}}}', 1779889194);

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_barangs`
--

CREATE TABLE `kategori_barangs` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kategori_barangs`
--

INSERT INTO `kategori_barangs` (`id`, `kode`, `nama`, `created_at`, `updated_at`) VALUES
(13, 'KAA', 'Kipas Angin, AC', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(14, 'LRBBD', 'Lemari, Rak Buku, Bufet, Dipan', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(15, 'SMFC', 'Scanner, Mesin Fhoto Copy', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(16, 'MMKP', 'Meja, Meja Kantor/Layanan, Podium', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(17, 'KL', 'Kursi Lipat/Putar', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(18, 'TTTK', 'Terop, Tenda, Tangga, Korden', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(19, 'RK', 'Rak kayu/besi', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(20, 'JDB', 'Jam Dinding, Bel', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(21, 'SR', 'Sket ruangan', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(22, 'AP', 'Avalon/rak plastik', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(23, 'TLOSR', 'Televisi, LCD, OHP, Slide, Receiver', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(24, 'KLN', 'Komputer, Laptop, Notebook', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(25, 'KHSKSD', 'Karpet, Hambal, Sajadah, Kain, sarung, dll.', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(26, 'MKOS', 'Meja & Kursi Olympic & sejenisnya', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(27, 'MJ', 'Mesin Jahit/Obras', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(28, 'PM', 'Peralatan Mebeler/Bangunan', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(29, 'HTCDF', 'HandyCamp, Tripod, CCTV, Drone, Fingerprint', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(30, 'KHD', 'Kalkulator/Alat Hitung, Detector', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(31, 'FCPD', 'Facum Cleaner (Penyedot Debu)', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(32, 'PTMP', 'Papan Tulis/Info, Mading, Plang', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(33, 'SUS', 'Stavolt, UPS, Stabiliser', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(34, 'KDLCSD', 'Kamera (DSLR, LENSA, Cam. Shooting dll)', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(35, 'SSM', 'Sound, Speaker, MegaPhone', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(36, 'LAI', 'Lain-lain', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(37, 'PD', 'Peralatan Dapur/Prasmanan', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(38, 'PKWH', 'Perangkat Komp, Wartel, Hunting', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(39, 'MB3P', 'Mesin Besar (>30 PK)', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(40, 'PPF', 'Printer, Printer Fotokopi', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(41, 'DKPSC', 'Dispenser, Kulkas, Pemanas, Setrika,Mesin Cuci', '2026-05-26 11:09:29', '2026-05-26 11:09:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_25_172052_create_kategori_barangs_table', 1),
(5, '2026_05_25_172053_create_ruangs_table', 1),
(6, '2026_05_25_172054_create_sumber_danas_table', 1),
(7, '2026_05_25_172055_create_barangs_table', 1),
(8, '2026_05_25_172056_create_unit_barangs_table', 1),
(9, '2026_05_25_172057_create_pemeliharaans_table', 1),
(10, '2026_05_25_235957_sync_schema_for_inventory', 1),
(11, '2026_05_26_010000_add_role_to_users_table', 2),
(12, '2026_05_26_015626_create_permission_tables', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3),
(4, 'App\\Models\\User', 4),
(5, 'App\\Models\\User', 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pemeliharaans`
--

CREATE TABLE `pemeliharaans` (
  `id` bigint UNSIGNED NOT NULL,
  `unit_barang_id` bigint UNSIGNED NOT NULL,
  `tanggal` date NOT NULL,
  `kategori` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `petugas` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biaya` decimal(15,2) NOT NULL DEFAULT '0.00',
  `bukti` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pemeliharaans`
--

INSERT INTO `pemeliharaans` (`id`, `unit_barang_id`, `tanggal`, `kategori`, `deskripsi`, `petugas`, `biaya`, `bukti`, `created_at`, `updated_at`) VALUES
(2, 280, '2026-05-26', 'Servis', 'asass', 'Saya', 500000.00, NULL, '2026-05-26 13:47:29', '2026-05-26 13:47:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'dashboard.view', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(2, 'inventory.view', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(3, 'inventory.create', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(4, 'inventory.edit', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(5, 'inventory.delete', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(6, 'kategori.manage', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(7, 'ruang.manage', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(8, 'sumber_dana.manage', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(9, 'maintenance.view', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(10, 'maintenance.create', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(11, 'maintenance.edit', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(12, 'maintenance.delete', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(13, 'label.print', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(14, 'label.export', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(15, 'report.export', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(16, 'user.manage', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(17, 'role.manage', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(2, 'Admin Inventaris', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(3, 'Staff', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(4, 'Teknisi', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00'),
(5, 'Pimpinan', 'web', '2026-05-26 01:57:00', '2026-05-26 01:57:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(15, 2),
(1, 3),
(2, 3),
(3, 3),
(9, 3),
(13, 3),
(1, 4),
(2, 4),
(4, 4),
(9, 4),
(10, 4),
(11, 4),
(1, 5),
(2, 5),
(9, 5),
(15, 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `ruangs`
--

CREATE TABLE `ruangs` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gedung` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `ruangs`
--

INSERT INTO `ruangs` (`id`, `nama`, `gedung`, `kode`, `created_at`, `updated_at`) VALUES
(11, 'Ruang Koleksi Putri', '-', 'RKP', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(12, 'Gudang Putri', '-', 'GP', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(13, 'Loby Putri', '-', 'LP', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(14, 'Loby Putra', '-', 'LP1', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(15, 'Ruang Koleksi Putra', '-', 'RKP1', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(16, 'Ruang Pimpinan', '-', 'RP', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(17, 'Ruang Tata Usaha Putra', '-', 'RTUP', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(18, 'Viar', '-', 'VIA', '2026-05-26 11:09:21', '2026-05-26 11:09:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('aDgYCuZFPnjlx3WQBaVey2yLin8Um5zFDZ95AR7d', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJkUWdzZ2g4djdWcXlSV0NMVDVFVmUzVU5qSTJ5OXd1TVpjc1hpNXZNIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJfcHJldmlvdXMiOnsidXJsIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwidXJsIjp7ImludGVuZGVkIjoiaHR0cDpcL1wvbG9jYWxob3N0XC91bml0LWJhcmFuZ1wvNTExIn19', 1779824922),
('Db52nKRTJ7062daO5ERLVH9bzbxd0zMx4vMImUEC', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.121.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'eyJfdG9rZW4iOiJpTDJsVVF3eUZncEhRTkJGSVhybXBlRE1ySURpbGE0dXh4ZWxLMDZMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsInJvdXRlIjoiaG9tZSJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1779818043),
('g37zDe0eBh7clMonTGCxe8yLCybUZ8OyN5v1V10A', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJQREV1aHplNmtVMzFMZ3JsWExzNnNqbUk2NmlYdlZHZ2tsSG13d2JTIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJfcHJldmlvdXMiOnsidXJsIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9sb2dpbiIsInJvdXRlIjoibG9naW4ifX0=', 1779841343),
('JXB3OBw3hxH8rF6HOma5Vtr1w9f7YyR2Ym6iQ3e3', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ1UWNWVkE0ZUxqSE1Tc2s5VUk0Wnl1Wm1zcWgzN2J1NWlpSTVwcTZZIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvbG9naW4iLCJyb3V0ZSI6ImxvZ2luIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1779841518),
('KpFcjx0KKURi0pUmjFSz29XQM6HcmrxIt8t3s4M4', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.121.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'eyJfdG9rZW4iOiJFbDhDeG5VUThFMmNaTVdKRUpXQ1lVRFRpdEhXSmlCU1lTS0l6Tlh3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsInJvdXRlIjoiaG9tZSJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1779818044),
('L8lhM55yG0TrACY5N2T9SUmnmbgc2iCjCpVp3LqR', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.121.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'eyJfdG9rZW4iOiJXWmpQSjBSd3VRdmFKT000UHlIVXFsTXFlMUU3RVFiSWlzekVjcGJtIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsInJvdXRlIjoiaG9tZSJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1779818044),
('n43L7CQCpHGOs8RUinAYsqLiqXMdX3OS2JjDtNhW', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJyM2hyS3p1U1ZFZE5LY0JXbWJQNUp2TDdtNjZOd1JxWEdmbExVYmZTIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvbG9naW4iLCJyb3V0ZSI6ImxvZ2luIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1779846616),
('rzYp8nicjLjiL1u9bbXM45Hb5tVvnRBqU6UYSAKO', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzUGx5NFdMWGlqYVJCSDdDZnQzRlc2YnVubExjalF5bk04S1hiQzlQIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvbG9naW4iLCJyb3V0ZSI6ImxvZ2luIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1779841462),
('UYmWnqsbDhTlYfMN6IjjRACmgpy9bF0sgd0SnnvM', NULL, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.121.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'eyJfdG9rZW4iOiJPQkZTZm9yMnRMc05lampCVUcxbjhiSUFrMVlGUDJyQ3JJQjB5UTlQIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdCIsInJvdXRlIjoiaG9tZSJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1779818044);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sumber_danas`
--

CREATE TABLE `sumber_danas` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sumber_danas`
--

INSERT INTO `sumber_danas` (`id`, `kode`, `nama`, `created_at`, `updated_at`) VALUES
(12, 'I', 'Hibah', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(13, 'II', 'APBM', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(14, 'III', 'Wisuda', '2026-05-26 11:09:23', '2026-05-26 11:09:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `unit_barangs`
--

CREATE TABLE `unit_barangs` (
  `id` bigint UNSIGNED NOT NULL,
  `barang_id` bigint UNSIGNED NOT NULL,
  `ruang_id` bigint UNSIGNED DEFAULT NULL,
  `sumber_dana_id` bigint UNSIGNED DEFAULT NULL,
  `tanggal_perolehan` date DEFAULT NULL,
  `harga` decimal(15,2) NOT NULL DEFAULT '0.00',
  `nomor_unit` int UNSIGNED NOT NULL,
  `kode_inventaris` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kondisi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'baik',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tersedia',
  `qr_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `unit_barangs`
--

INSERT INTO `unit_barangs` (`id`, `barang_id`, `ruang_id`, `sumber_dana_id`, `tanggal_perolehan`, `harga`, `nomor_unit`, `kode_inventaris`, `kondisi`, `status`, `qr_code`, `created_at`, `updated_at`) VALUES
(16, 13, 11, 12, '2000-01-01', 300.00, 4, 'B16/01.01.00/II/0002-001', 'baik', 'tersedia', 'B16/01.01.00/II/0002-001', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(17, 13, 11, 12, '2000-01-01', 300.00, 4, 'B16/01.01.00/II/0002-002', 'baik', 'tersedia', 'B16/01.01.00/II/0002-002', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(18, 13, 11, 12, '2000-01-01', 300.00, 4, 'B16/01.01.00/II/0002-003', 'baik', 'tersedia', 'B16/01.01.00/II/0002-003', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(19, 13, 11, 12, '2000-01-01', 300.00, 4, 'B16/01.01.00/II/0002-004', 'baik', 'tersedia', 'B16/01.01.00/II/0002-004', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(20, 14, 12, 13, '2003-01-01', 2000000.00, 2, 'C03/01.01.03/I/0004-001', 'baik', 'tersedia', 'C03/01.01.03/I/0004-001', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(21, 14, 12, 13, '2003-01-01', 2000000.00, 2, 'C03/01.01.03/I/0004-002', 'baik', 'tersedia', 'C03/01.01.03/I/0004-002', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(22, 15, 13, 13, '2003-01-01', 35000000.00, 2, 'B03/01.01.03/I/0132-001', 'baik', 'tersedia', 'B03/01.01.03/I/0132-001', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(23, 15, 14, 13, '2018-01-01', 35000000.00, 2, 'B03/01.01.18/I/0132-002', 'baik', 'tersedia', 'B03/01.01.18/I/0132-002', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(24, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-001', 'baik', 'tersedia', 'C05/01.01.03/I/0033-001', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(25, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-002', 'baik', 'tersedia', 'C05/01.01.03/I/0033-002', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(26, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-003', 'baik', 'tersedia', 'C05/01.01.03/I/0033-003', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(27, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-004', 'baik', 'tersedia', 'C05/01.01.03/I/0033-004', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(28, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-005', 'baik', 'tersedia', 'C05/01.01.03/I/0033-005', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(29, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-006', 'baik', 'tersedia', 'C05/01.01.03/I/0033-006', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(30, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-007', 'baik', 'tersedia', 'C05/01.01.03/I/0033-007', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(31, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-008', 'baik', 'tersedia', 'C05/01.01.03/I/0033-008', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(32, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-009', 'baik', 'tersedia', 'C05/01.01.03/I/0033-009', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(33, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-010', 'baik', 'tersedia', 'C05/01.01.03/I/0033-010', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(34, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-011', 'baik', 'tersedia', 'C05/01.01.03/I/0033-011', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(35, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-012', 'baik', 'tersedia', 'C05/01.01.03/I/0033-012', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(36, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-013', 'baik', 'tersedia', 'C05/01.01.03/I/0033-013', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(37, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-014', 'baik', 'tersedia', 'C05/01.01.03/I/0033-014', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(38, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-015', 'baik', 'tersedia', 'C05/01.01.03/I/0033-015', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(39, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-016', 'baik', 'tersedia', 'C05/01.01.03/I/0033-016', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(40, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-017', 'baik', 'tersedia', 'C05/01.01.03/I/0033-017', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(41, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-018', 'baik', 'tersedia', 'C05/01.01.03/I/0033-018', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(42, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-019', 'baik', 'tersedia', 'C05/01.01.03/I/0033-019', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(43, 16, 15, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-020', 'baik', 'tersedia', 'C05/01.01.03/I/0033-020', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(44, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-021', 'baik', 'tersedia', 'C05/01.01.03/I/0033-021', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(45, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-022', 'baik', 'tersedia', 'C05/01.01.03/I/0033-022', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(46, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-023', 'baik', 'tersedia', 'C05/01.01.03/I/0033-023', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(47, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-024', 'baik', 'tersedia', 'C05/01.01.03/I/0033-024', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(48, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-025', 'baik', 'tersedia', 'C05/01.01.03/I/0033-025', '2026-05-26 11:09:18', '2026-05-26 11:09:18'),
(49, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-026', 'baik', 'tersedia', 'C05/01.01.03/I/0033-026', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(50, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-027', 'baik', 'tersedia', 'C05/01.01.03/I/0033-027', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(51, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-028', 'baik', 'tersedia', 'C05/01.01.03/I/0033-028', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(52, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-029', 'baik', 'tersedia', 'C05/01.01.03/I/0033-029', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(53, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-030', 'baik', 'tersedia', 'C05/01.01.03/I/0033-030', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(54, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-031', 'baik', 'tersedia', 'C05/01.01.03/I/0033-031', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(55, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-032', 'baik', 'tersedia', 'C05/01.01.03/I/0033-032', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(56, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-033', 'baik', 'tersedia', 'C05/01.01.03/I/0033-033', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(57, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-034', 'baik', 'tersedia', 'C05/01.01.03/I/0033-034', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(58, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-035', 'baik', 'tersedia', 'C05/01.01.03/I/0033-035', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(59, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-036', 'baik', 'tersedia', 'C05/01.01.03/I/0033-036', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(60, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-037', 'baik', 'tersedia', 'C05/01.01.03/I/0033-037', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(61, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-038', 'baik', 'tersedia', 'C05/01.01.03/I/0033-038', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(62, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-039', 'baik', 'tersedia', 'C05/01.01.03/I/0033-039', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(63, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-040', 'baik', 'tersedia', 'C05/01.01.03/I/0033-040', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(64, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-041', 'baik', 'tersedia', 'C05/01.01.03/I/0033-041', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(65, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-042', 'baik', 'tersedia', 'C05/01.01.03/I/0033-042', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(66, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-043', 'baik', 'tersedia', 'C05/01.01.03/I/0033-043', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(67, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-044', 'baik', 'tersedia', 'C05/01.01.03/I/0033-044', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(68, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-045', 'baik', 'tersedia', 'C05/01.01.03/I/0033-045', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(69, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-046', 'baik', 'tersedia', 'C05/01.01.03/I/0033-046', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(70, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-047', 'baik', 'tersedia', 'C05/01.01.03/I/0033-047', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(71, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-048', 'baik', 'tersedia', 'C05/01.01.03/I/0033-048', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(72, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-049', 'baik', 'tersedia', 'C05/01.01.03/I/0033-049', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(73, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-050', 'baik', 'tersedia', 'C05/01.01.03/I/0033-050', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(74, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-051', 'baik', 'tersedia', 'C05/01.01.03/I/0033-051', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(75, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-052', 'baik', 'tersedia', 'C05/01.01.03/I/0033-052', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(76, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-053', 'baik', 'tersedia', 'C05/01.01.03/I/0033-053', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(77, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-054', 'baik', 'tersedia', 'C05/01.01.03/I/0033-054', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(78, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-055', 'baik', 'tersedia', 'C05/01.01.03/I/0033-055', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(79, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-056', 'baik', 'tersedia', 'C05/01.01.03/I/0033-056', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(80, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-057', 'baik', 'tersedia', 'C05/01.01.03/I/0033-057', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(81, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-058', 'baik', 'tersedia', 'C05/01.01.03/I/0033-058', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(82, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-059', 'baik', 'tersedia', 'C05/01.01.03/I/0033-059', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(83, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-060', 'baik', 'tersedia', 'C05/01.01.03/I/0033-060', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(84, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-061', 'baik', 'tersedia', 'C05/01.01.03/I/0033-061', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(85, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-062', 'baik', 'tersedia', 'C05/01.01.03/I/0033-062', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(86, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-063', 'baik', 'tersedia', 'C05/01.01.03/I/0033-063', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(87, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-064', 'baik', 'tersedia', 'C05/01.01.03/I/0033-064', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(88, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-065', 'baik', 'tersedia', 'C05/01.01.03/I/0033-065', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(89, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-066', 'baik', 'tersedia', 'C05/01.01.03/I/0033-066', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(90, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-067', 'baik', 'tersedia', 'C05/01.01.03/I/0033-067', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(91, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-068', 'baik', 'tersedia', 'C05/01.01.03/I/0033-068', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(92, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-069', 'baik', 'tersedia', 'C05/01.01.03/I/0033-069', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(93, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-070', 'baik', 'tersedia', 'C05/01.01.03/I/0033-070', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(94, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-071', 'baik', 'tersedia', 'C05/01.01.03/I/0033-071', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(95, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-072', 'baik', 'tersedia', 'C05/01.01.03/I/0033-072', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(96, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-073', 'baik', 'tersedia', 'C05/01.01.03/I/0033-073', '2026-05-26 11:09:19', '2026-05-26 11:09:19'),
(97, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-074', 'baik', 'tersedia', 'C05/01.01.03/I/0033-074', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(98, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-075', 'baik', 'tersedia', 'C05/01.01.03/I/0033-075', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(99, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-076', 'baik', 'tersedia', 'C05/01.01.03/I/0033-076', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(100, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-077', 'baik', 'tersedia', 'C05/01.01.03/I/0033-077', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(101, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-078', 'baik', 'tersedia', 'C05/01.01.03/I/0033-078', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(102, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-079', 'baik', 'tersedia', 'C05/01.01.03/I/0033-079', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(103, 16, 11, 13, '2003-01-01', 200.00, 80, 'C05/01.01.03/I/0033-080', 'baik', 'tersedia', 'C05/01.01.03/I/0033-080', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(104, 17, 16, 13, '2003-01-01', 750.00, 6, 'C05/01.01.03/I/0034-001', 'baik', 'tersedia', 'C05/01.01.03/I/0034-001', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(105, 17, 16, 13, '2003-01-01', 750.00, 6, 'C05/01.01.03/I/0034-002', 'baik', 'tersedia', 'C05/01.01.03/I/0034-002', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(106, 17, 16, 13, '2003-01-01', 750.00, 6, 'C05/01.01.03/I/0034-003', 'baik', 'tersedia', 'C05/01.01.03/I/0034-003', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(107, 17, 16, 13, '2003-01-01', 750.00, 6, 'C05/01.01.03/I/0034-004', 'baik', 'tersedia', 'C05/01.01.03/I/0034-004', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(108, 17, 16, 13, '2003-01-01', 750.00, 6, 'C05/01.01.03/I/0034-005', 'baik', 'tersedia', 'C05/01.01.03/I/0034-005', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(109, 17, 16, 13, '2003-01-01', 750.00, 6, 'C05/01.01.03/I/0034-006', 'baik', 'tersedia', 'C05/01.01.03/I/0034-006', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(110, 18, 11, 13, '2003-01-01', 249999.00, 7, 'C01/01.01.03/I/0067-001', 'baik', 'tersedia', 'C01/01.01.03/I/0067-001', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(111, 18, 11, 13, '2003-01-01', 249999.00, 7, 'C01/01.01.03/I/0067-002', 'baik', 'tersedia', 'C01/01.01.03/I/0067-002', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(112, 18, 11, 13, '2003-01-01', 249999.00, 7, 'C01/01.01.03/I/0067-003', 'baik', 'tersedia', 'C01/01.01.03/I/0067-003', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(113, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-001', 'baik', 'tersedia', 'C03/01.01.03/I/0068-001', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(114, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-002', 'baik', 'tersedia', 'C03/01.01.03/I/0068-002', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(115, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-003', 'baik', 'tersedia', 'C03/01.01.03/I/0068-003', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(116, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-004', 'baik', 'tersedia', 'C03/01.01.03/I/0068-004', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(117, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-005', 'baik', 'tersedia', 'C03/01.01.03/I/0068-005', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(118, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-006', 'baik', 'tersedia', 'C03/01.01.03/I/0068-006', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(119, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-007', 'baik', 'tersedia', 'C03/01.01.03/I/0068-007', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(120, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-008', 'baik', 'tersedia', 'C03/01.01.03/I/0068-008', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(121, 19, 11, 13, '2003-01-01', 3000000.00, 9, 'C03/01.01.03/I/0068-009', 'baik', 'tersedia', 'C03/01.01.03/I/0068-009', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(122, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-001', 'baik', 'tersedia', 'C05/01.01.03/I/0069-001', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(123, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-002', 'baik', 'tersedia', 'C05/01.01.03/I/0069-002', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(124, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-003', 'baik', 'tersedia', 'C05/01.01.03/I/0069-003', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(125, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-004', 'baik', 'tersedia', 'C05/01.01.03/I/0069-004', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(126, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-005', 'baik', 'tersedia', 'C05/01.01.03/I/0069-005', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(127, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-006', 'baik', 'tersedia', 'C05/01.01.03/I/0069-006', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(128, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-007', 'baik', 'tersedia', 'C05/01.01.03/I/0069-007', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(129, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-008', 'baik', 'tersedia', 'C05/01.01.03/I/0069-008', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(130, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-009', 'baik', 'tersedia', 'C05/01.01.03/I/0069-009', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(131, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-010', 'baik', 'tersedia', 'C05/01.01.03/I/0069-010', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(132, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-011', 'baik', 'tersedia', 'C05/01.01.03/I/0069-011', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(133, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-012', 'baik', 'tersedia', 'C05/01.01.03/I/0069-012', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(134, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-013', 'baik', 'tersedia', 'C05/01.01.03/I/0069-013', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(135, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-014', 'baik', 'tersedia', 'C05/01.01.03/I/0069-014', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(136, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-015', 'baik', 'tersedia', 'C05/01.01.03/I/0069-015', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(137, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-016', 'baik', 'tersedia', 'C05/01.01.03/I/0069-016', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(138, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-017', 'baik', 'tersedia', 'C05/01.01.03/I/0069-017', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(139, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-018', 'baik', 'tersedia', 'C05/01.01.03/I/0069-018', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(140, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-019', 'baik', 'tersedia', 'C05/01.01.03/I/0069-019', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(141, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-020', 'baik', 'tersedia', 'C05/01.01.03/I/0069-020', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(142, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-021', 'baik', 'tersedia', 'C05/01.01.03/I/0069-021', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(143, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-022', 'baik', 'tersedia', 'C05/01.01.03/I/0069-022', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(144, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-023', 'baik', 'tersedia', 'C05/01.01.03/I/0069-023', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(145, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-024', 'baik', 'tersedia', 'C05/01.01.03/I/0069-024', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(146, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-025', 'baik', 'tersedia', 'C05/01.01.03/I/0069-025', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(147, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-026', 'baik', 'tersedia', 'C05/01.01.03/I/0069-026', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(148, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-027', 'baik', 'tersedia', 'C05/01.01.03/I/0069-027', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(149, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-028', 'baik', 'tersedia', 'C05/01.01.03/I/0069-028', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(150, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-029', 'baik', 'tersedia', 'C05/01.01.03/I/0069-029', '2026-05-26 11:09:20', '2026-05-26 11:09:20'),
(151, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-030', 'baik', 'tersedia', 'C05/01.01.03/I/0069-030', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(152, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-031', 'baik', 'tersedia', 'C05/01.01.03/I/0069-031', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(153, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-032', 'baik', 'tersedia', 'C05/01.01.03/I/0069-032', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(154, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-033', 'baik', 'tersedia', 'C05/01.01.03/I/0069-033', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(155, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-034', 'baik', 'tersedia', 'C05/01.01.03/I/0069-034', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(156, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-035', 'baik', 'tersedia', 'C05/01.01.03/I/0069-035', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(157, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-036', 'baik', 'tersedia', 'C05/01.01.03/I/0069-036', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(158, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-037', 'baik', 'tersedia', 'C05/01.01.03/I/0069-037', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(159, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-038', 'baik', 'tersedia', 'C05/01.01.03/I/0069-038', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(160, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-039', 'baik', 'tersedia', 'C05/01.01.03/I/0069-039', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(161, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-040', 'baik', 'tersedia', 'C05/01.01.03/I/0069-040', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(162, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-041', 'baik', 'tersedia', 'C05/01.01.03/I/0069-041', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(163, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-042', 'baik', 'tersedia', 'C05/01.01.03/I/0069-042', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(164, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-043', 'baik', 'tersedia', 'C05/01.01.03/I/0069-043', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(165, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-044', 'baik', 'tersedia', 'C05/01.01.03/I/0069-044', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(166, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-045', 'baik', 'tersedia', 'C05/01.01.03/I/0069-045', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(167, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-046', 'baik', 'tersedia', 'C05/01.01.03/I/0069-046', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(168, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-047', 'baik', 'tersedia', 'C05/01.01.03/I/0069-047', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(169, 20, 11, 13, '2003-01-01', 500.00, 48, 'C05/01.01.03/I/0069-048', 'baik', 'tersedia', 'C05/01.01.03/I/0069-048', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(170, 21, 11, 13, '2003-01-01', 300.00, 1, 'C05/01.01.03/I/0070-001', 'baik', 'tersedia', 'C05/01.01.03/I/0070-001', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(171, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-001', 'baik', 'tersedia', 'D05/01.01.03/I/0032-001', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(172, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-002', 'baik', 'tersedia', 'D05/01.01.03/I/0032-002', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(173, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-003', 'baik', 'tersedia', 'D05/01.01.03/I/0032-003', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(174, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-004', 'baik', 'tersedia', 'D05/01.01.03/I/0032-004', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(175, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-005', 'baik', 'tersedia', 'D05/01.01.03/I/0032-005', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(176, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-006', 'baik', 'tersedia', 'D05/01.01.03/I/0032-006', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(177, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-007', 'baik', 'tersedia', 'D05/01.01.03/I/0032-007', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(178, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-008', 'baik', 'tersedia', 'D05/01.01.03/I/0032-008', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(179, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-009', 'baik', 'tersedia', 'D05/01.01.03/I/0032-009', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(180, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-010', 'baik', 'tersedia', 'D05/01.01.03/I/0032-010', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(181, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-011', 'baik', 'tersedia', 'D05/01.01.03/I/0032-011', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(182, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-012', 'baik', 'tersedia', 'D05/01.01.03/I/0032-012', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(183, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-013', 'baik', 'tersedia', 'D05/01.01.03/I/0032-013', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(184, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-014', 'baik', 'tersedia', 'D05/01.01.03/I/0032-014', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(185, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-015', 'baik', 'tersedia', 'D05/01.01.03/I/0032-015', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(186, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-016', 'baik', 'tersedia', 'D05/01.01.03/I/0032-016', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(187, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-017', 'baik', 'tersedia', 'D05/01.01.03/I/0032-017', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(188, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-018', 'baik', 'tersedia', 'D05/01.01.03/I/0032-018', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(189, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-019', 'baik', 'tersedia', 'D05/01.01.03/I/0032-019', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(190, 22, 15, 13, '2003-01-01', 99999.00, 20, 'D05/01.01.03/I/0032-020', 'baik', 'tersedia', 'D05/01.01.03/I/0032-020', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(191, 23, 15, 13, '2003-01-01', 300.00, 1, 'C05/01.01.03/I/0060-001', 'baik', 'tersedia', 'C05/01.01.03/I/0060-001', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(192, 24, 14, 13, '2003-01-01', 150.00, 1, 'C11/01.01.03/I/0094-001', 'baik', 'tersedia', 'C11/01.01.03/I/0094-001', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(193, 25, 17, 13, '2003-01-01', 200.00, 1, 'C01/01.01.03/I/0120-001', 'baik', 'tersedia', 'C01/01.01.03/I/0120-001', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(194, 18, 18, 13, '2003-01-01', 250.00, 7, 'C01/01.01.03/I/0067-004', 'baik', 'tersedia', 'C01/01.01.03/I/0067-004', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(195, 18, 18, 13, '2003-01-01', 250.00, 7, 'C01/01.01.03/I/0067-005', 'baik', 'tersedia', 'C01/01.01.03/I/0067-005', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(196, 18, 18, 13, '2003-01-01', 250.00, 7, 'C01/01.01.03/I/0067-006', 'baik', 'tersedia', 'C01/01.01.03/I/0067-006', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(197, 18, 18, 13, '2003-01-01', 250.00, 7, 'C01/01.01.03/I/0067-007', 'baik', 'tersedia', 'C01/01.01.03/I/0067-007', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(198, 26, 17, 13, '2005-01-01', 300.00, 5, 'C05/01.01.05/I/0122-001', 'baik', 'tersedia', 'C05/01.01.05/I/0122-001', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(199, 26, 17, 13, '2005-01-01', 300.00, 5, 'C05/01.01.05/I/0122-002', 'baik', 'tersedia', 'C05/01.01.05/I/0122-002', '2026-05-26 11:09:21', '2026-05-26 11:09:21'),
(200, 26, 17, 13, '2005-01-01', 300.00, 5, 'C05/01.01.05/I/0122-003', 'baik', 'tersedia', 'C05/01.01.05/I/0122-003', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(201, 26, 17, 13, '2005-01-01', 300.00, 5, 'C05/01.01.05/I/0122-004', 'baik', 'tersedia', 'C05/01.01.05/I/0122-004', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(202, 26, 17, 13, '2005-01-01', 300.00, 5, 'C05/01.01.05/I/0122-005', 'baik', 'tersedia', 'C05/01.01.05/I/0122-005', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(203, 27, 15, 13, '2007-01-01', 39999.00, 1, 'B13/01.01.07/I/0012-001', 'baik', 'tersedia', 'B13/01.01.07/I/0012-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(204, 28, 17, 12, '2007-01-01', 600.00, 12, 'C05/01.01.07/II/0125-001', 'baik', 'tersedia', 'C05/01.01.07/II/0125-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(205, 28, 17, 12, '2007-01-01', 600.00, 12, 'C05/01.01.07/II/0125-002', 'baik', 'tersedia', 'C05/01.01.07/II/0125-002', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(206, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-003', 'baik', 'tersedia', 'C05/01.01.07/I/0125-003', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(207, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-004', 'baik', 'tersedia', 'C05/01.01.07/I/0125-004', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(208, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-005', 'baik', 'tersedia', 'C05/01.01.07/I/0125-005', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(209, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-006', 'baik', 'tersedia', 'C05/01.01.07/I/0125-006', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(210, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-007', 'baik', 'tersedia', 'C05/01.01.07/I/0125-007', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(211, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-008', 'baik', 'tersedia', 'C05/01.01.07/I/0125-008', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(212, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-009', 'baik', 'tersedia', 'C05/01.01.07/I/0125-009', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(213, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-010', 'baik', 'tersedia', 'C05/01.01.07/I/0125-010', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(214, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-011', 'baik', 'tersedia', 'C05/01.01.07/I/0125-011', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(215, 28, 17, 13, '2007-01-01', 800.00, 12, 'C05/01.01.07/I/0125-012', 'baik', 'tersedia', 'C05/01.01.07/I/0125-012', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(216, 29, 15, 13, '2007-01-01', 26999999.00, 7, 'C09/01.01.07/I/0037-001', 'baik', 'tersedia', 'C09/01.01.07/I/0037-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(217, 29, 15, 13, '2007-01-01', 26999999.00, 7, 'C09/01.01.07/I/0037-002', 'baik', 'tersedia', 'C09/01.01.07/I/0037-002', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(218, 29, 15, 13, '2007-01-01', 26999999.00, 7, 'C09/01.01.07/I/0037-003', 'baik', 'tersedia', 'C09/01.01.07/I/0037-003', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(219, 29, 15, 13, '2007-01-01', 26999999.00, 7, 'C09/01.01.07/I/0037-004', 'baik', 'tersedia', 'C09/01.01.07/I/0037-004', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(220, 29, 15, 13, '2007-01-01', 26999999.00, 7, 'C09/01.01.07/I/0037-005', 'baik', 'tersedia', 'C09/01.01.07/I/0037-005', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(221, 29, 15, 13, '2007-01-01', 26999999.00, 7, 'C09/01.01.07/I/0037-006', 'baik', 'tersedia', 'C09/01.01.07/I/0037-006', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(222, 29, 15, 13, '2007-01-01', 26999999.00, 7, 'C09/01.01.07/I/0037-007', 'baik', 'tersedia', 'C09/01.01.07/I/0037-007', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(223, 30, 13, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-001', 'baik', 'tersedia', 'D03/01.01.07/I/0023-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(224, 30, 13, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-002', 'baik', 'tersedia', 'D03/01.01.07/I/0023-002', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(225, 30, 17, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-003', 'baik', 'tersedia', 'D03/01.01.07/I/0023-003', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(226, 30, 17, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-004', 'baik', 'tersedia', 'D03/01.01.07/I/0023-004', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(227, 30, 17, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-005', 'baik', 'tersedia', 'D03/01.01.07/I/0023-005', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(228, 30, 17, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-006', 'baik', 'tersedia', 'D03/01.01.07/I/0023-006', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(229, 30, 17, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-007', 'baik', 'tersedia', 'D03/01.01.07/I/0023-007', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(230, 30, 17, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-008', 'baik', 'tersedia', 'D03/01.01.07/I/0023-008', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(231, 30, 17, 13, '2007-01-01', 100.00, 9, 'D03/01.01.07/I/0023-009', 'baik', 'tersedia', 'D03/01.01.07/I/0023-009', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(232, 31, 15, 13, '2007-01-01', 2500000.00, 4, 'C03/01.01.07/I/0035-001', 'baik', 'tersedia', 'C03/01.01.07/I/0035-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(233, 31, 15, 13, '2007-01-01', 2500000.00, 4, 'C03/01.01.07/I/0035-002', 'baik', 'tersedia', 'C03/01.01.07/I/0035-002', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(234, 31, 15, 13, '2007-01-01', 2500000.00, 4, 'C03/01.01.07/I/0035-003', 'baik', 'tersedia', 'C03/01.01.07/I/0035-003', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(235, 31, 15, 13, '2007-01-01', 2500000.00, 4, 'C03/01.01.07/I/0035-004', 'baik', 'tersedia', 'C03/01.01.07/I/0035-004', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(236, 32, 17, 13, '2007-01-01', 34998.00, 1, 'D03/01.01.07/I/0095-001', 'baik', 'tersedia', 'D03/01.01.07/I/0095-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(237, 33, 16, 13, '2007-01-01', 2500000.00, 3, 'C03/01.01.07/I/0096-001', 'baik', 'tersedia', 'C03/01.01.07/I/0096-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(238, 33, 16, 13, '2007-01-01', 2500000.00, 3, 'C03/01.01.07/I/0096-002', 'baik', 'tersedia', 'C03/01.01.07/I/0096-002', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(239, 33, 16, 13, '2007-01-01', 2500000.00, 3, 'C03/01.01.07/I/0096-003', 'baik', 'tersedia', 'C03/01.01.07/I/0096-003', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(240, 34, 17, 13, '2007-01-01', 750.00, 1, 'C03/01.01.07/I/0124-001', 'baik', 'tersedia', 'C03/01.01.07/I/0124-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(241, 35, 17, 13, '2014-01-01', 480.00, 1, 'B06/01.01.14/I/0126-001', 'baik', 'tersedia', 'B06/01.01.14/I/0126-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(242, 36, 13, 13, '2015-01-05', 950.00, 2, 'B03/05.01.15/I/0024-001', 'baik', 'tersedia', 'B03/05.01.15/I/0024-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(243, 36, 13, 13, '2015-01-05', 950.00, 2, 'B03/05.01.15/I/0024-002', 'baik', 'tersedia', 'B03/05.01.15/I/0024-002', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(244, 37, 16, 13, '2015-01-20', 500.00, 1, 'C11/20.01.15/I/0071-001', 'baik', 'tersedia', 'C11/20.01.15/I/0071-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(245, 38, 17, 13, '2015-01-20', 313.00, 2, 'C03/20.01.15/I/0127-001', 'baik', 'tersedia', 'C03/20.01.15/I/0127-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(246, 38, 17, 13, '2015-01-20', 313.00, 2, 'C03/20.01.15/I/0127-002', 'baik', 'tersedia', 'C03/20.01.15/I/0127-002', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(247, 39, 13, 13, '2015-04-12', 300.00, 1, 'C11/12.04.15/I/0025-001', 'baik', 'tersedia', 'C11/12.04.15/I/0025-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(248, 40, 11, 13, '2015-04-12', 2975000.00, 14, 'C03/12.04.15/I/0072-001', 'baik', 'tersedia', 'C03/12.04.15/I/0072-001', '2026-05-26 11:09:22', '2026-05-26 11:09:22'),
(249, 40, 11, 13, '2015-04-12', 2975000.00, 14, 'C03/12.04.15/I/0072-002', 'baik', 'tersedia', 'C03/12.04.15/I/0072-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(250, 40, 11, 13, '2015-04-12', 2975000.00, 14, 'C03/12.04.15/I/0072-003', 'baik', 'tersedia', 'C03/12.04.15/I/0072-003', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(251, 40, 11, 13, '2015-04-12', 2975000.00, 14, 'C03/12.04.15/I/0072-004', 'baik', 'tersedia', 'C03/12.04.15/I/0072-004', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(252, 40, 11, 13, '2015-04-12', 2975000.00, 14, 'C03/12.04.15/I/0072-005', 'baik', 'tersedia', 'C03/12.04.15/I/0072-005', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(253, 40, 11, 13, '2015-04-12', 2975000.00, 14, 'C03/12.04.15/I/0072-006', 'baik', 'tersedia', 'C03/12.04.15/I/0072-006', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(254, 40, 11, 13, '2015-04-12', 2975000.00, 14, 'C03/12.04.15/I/0072-007', 'baik', 'tersedia', 'C03/12.04.15/I/0072-007', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(255, 41, 16, 13, '2015-04-12', 84.00, 3, 'C05/12.04.15/I/0097-001', 'baik', 'tersedia', 'C05/12.04.15/I/0097-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(256, 41, 16, 13, '2015-04-12', 84.00, 3, 'C05/12.04.15/I/0097-002', 'baik', 'tersedia', 'C05/12.04.15/I/0097-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(257, 41, 16, 13, '2015-04-12', 84.00, 3, 'C05/12.04.15/I/0097-003', 'baik', 'tersedia', 'C05/12.04.15/I/0097-003', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(258, 40, 11, 13, '2015-04-26', 900.00, 14, 'C03/26.04.15/I/0072-008', 'baik', 'tersedia', 'C03/26.04.15/I/0072-008', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(259, 40, 11, 13, '2015-04-26', 900.00, 14, 'C03/26.04.15/I/0072-009', 'baik', 'tersedia', 'C03/26.04.15/I/0072-009', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(260, 40, 11, 13, '2015-04-26', 900.00, 14, 'C03/26.04.15/I/0072-010', 'baik', 'tersedia', 'C03/26.04.15/I/0072-010', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(261, 42, 15, 13, '2015-05-11', 700.00, 1, 'C11/11.05.15/I/0038-001', 'baik', 'tersedia', 'C11/11.05.15/I/0038-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(262, 43, 15, 13, '2015-05-15', 280.00, 4, 'B16/15.05.15/I/0039-001', 'baik', 'tersedia', 'B16/15.05.15/I/0039-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(263, 43, 15, 13, '2015-05-15', 280.00, 4, 'B16/15.05.15/I/0039-002', 'baik', 'tersedia', 'B16/15.05.15/I/0039-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(264, 43, 15, 13, '2015-05-15', 280.00, 4, 'B16/15.05.15/I/0039-003', 'baik', 'tersedia', 'B16/15.05.15/I/0039-003', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(265, 43, 15, 13, '2015-05-15', 280.00, 4, 'B16/15.05.15/I/0039-004', 'baik', 'tersedia', 'B16/15.05.15/I/0039-004', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(266, 44, 16, 13, '2015-05-15', 2749000.00, 2, 'B06/15.05.15/I/0045-001', 'baik', 'tersedia', 'B06/15.05.15/I/0045-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(267, 45, 14, 13, '2015-06-06', 1095000.00, 3, 'C09/06.06.15/I/0015-001', 'baik', 'tersedia', 'C09/06.06.15/I/0015-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(268, 45, 14, 13, '2015-06-06', 1095000.00, 3, 'C09/06.06.15/I/0015-002', 'baik', 'tersedia', 'C09/06.06.15/I/0015-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(269, 45, 14, 13, '2015-06-06', 1095000.00, 3, 'C09/06.06.15/I/0015-003', 'baik', 'tersedia', 'C09/06.06.15/I/0015-003', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(270, 46, 15, 13, '2015-11-21', 200.00, 1, 'C11/21.11.15/I/0040-001', 'baik', 'tersedia', 'C11/21.11.15/I/0040-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(271, 47, 14, 13, '2016-01-01', 4500000.00, 2, 'B01/01.01.16/I/0016-001', 'baik', 'tersedia', 'B01/01.01.16/I/0016-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(272, 47, 14, 13, '2016-01-01', 4500000.00, 2, 'B01/01.01.16/I/0016-002', 'baik', 'tersedia', 'B01/01.01.16/I/0016-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(273, 48, 13, 12, '2016-01-01', 310.00, 1, 'C01/01.01.16/II/0026-001', 'baik', 'tersedia', 'C01/01.01.16/II/0026-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(274, 49, 15, 12, '2016-01-01', 200.00, 1, 'D04/01.01.16/II/0041-001', 'baik', 'tersedia', 'D04/01.01.16/II/0041-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(275, 50, 15, 13, '2016-01-01', 500.00, 1, 'C07/01.01.16/I/0043-001', 'baik', 'tersedia', 'C07/01.01.16/I/0043-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(276, 51, 15, 12, '2016-01-01', 7000000.00, 1, 'C07/01.01.16/II/0044-001', 'baik', 'tersedia', 'C07/01.01.16/II/0044-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(277, 44, 15, 12, '2016-01-01', 2749000.00, 2, 'B06/01.01.16/II/0045-002', 'baik', 'tersedia', 'B06/01.01.16/II/0045-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(278, 52, 11, 12, '2016-01-01', 6299999.00, 2, 'B16/01.01.16/II/0075-001', 'baik', 'tersedia', 'B16/01.01.16/II/0075-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(279, 52, 11, 12, '2016-01-01', 6299999.00, 2, 'B16/01.01.16/II/0075-002', 'baik', 'tersedia', 'B16/01.01.16/II/0075-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(280, 53, 16, 13, '2016-01-01', 65.00, 1, 'B13/01.01.16/I/0099-001', 'baik', 'tersedia', 'B13/01.01.16/I/0099-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(281, 54, 12, 13, '2016-01-01', 199999.00, 1, 'D04/01.01.16/I/0100-001', 'baik', 'tersedia', 'D04/01.01.16/I/0100-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(282, 55, 16, 13, '2016-01-01', 750.00, 1, 'C01/01.01.16/I/0101-001', 'baik', 'tersedia', 'C01/01.01.16/I/0101-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(283, 56, 17, 13, '2016-01-01', 1150000.00, 2, 'D09/01.01.16/I/0077-001', 'baik', 'tersedia', 'D09/01.01.16/I/0077-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(284, 57, 16, 14, '2016-08-13', 437499.00, 1, 'D12/13.08.16/III/0102-001', 'baik', 'tersedia', 'D12/13.08.16/III/0102-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(285, 56, 11, 13, '2016-12-31', 1100000.00, 2, 'D09/31.12.16/I/0077-002', 'baik', 'tersedia', 'D09/31.12.16/I/0077-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(286, 58, 14, 14, '2017-01-14', 3500000.00, 1, 'B07/14.01.17/III/0018-001', 'baik', 'tersedia', 'B07/14.01.17/III/0018-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(287, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-001', 'baik', 'tersedia', 'C03/20.03.17/III/0131-001', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(288, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-002', 'baik', 'tersedia', 'C03/20.03.17/III/0131-002', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(289, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-003', 'baik', 'tersedia', 'C03/20.03.17/III/0131-003', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(290, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-004', 'baik', 'tersedia', 'C03/20.03.17/III/0131-004', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(291, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-005', 'baik', 'tersedia', 'C03/20.03.17/III/0131-005', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(292, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-006', 'baik', 'tersedia', 'C03/20.03.17/III/0131-006', '2026-05-26 11:09:23', '2026-05-26 11:09:23'),
(293, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-007', 'baik', 'tersedia', 'C03/20.03.17/III/0131-007', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(294, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-008', 'baik', 'tersedia', 'C03/20.03.17/III/0131-008', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(295, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-009', 'baik', 'tersedia', 'C03/20.03.17/III/0131-009', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(296, 59, 17, 14, '2017-03-20', 20.00, 10, 'C03/20.03.17/III/0131-010', 'baik', 'tersedia', 'C03/20.03.17/III/0131-010', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(297, 60, 13, 13, '2017-03-27', 3500000.00, 1, 'C05/27.03.17/I/0027-001', 'baik', 'tersedia', 'C05/27.03.17/I/0027-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(298, 61, 15, 14, '2017-10-20', 2500000.00, 31, 'C03/20.10.17/III/0036-001', 'baik', 'tersedia', 'C03/20.10.17/III/0036-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(299, 61, 15, 14, '2017-10-20', 2500000.00, 31, 'C03/20.10.17/III/0036-002', 'baik', 'tersedia', 'C03/20.10.17/III/0036-002', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(300, 61, 15, 14, '2017-10-20', 2500000.00, 31, 'C03/20.10.17/III/0036-003', 'baik', 'tersedia', 'C03/20.10.17/III/0036-003', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(301, 62, 16, 13, '2018-10-12', 2505000.00, 4, 'B03/12.10.18/I/0103-001', 'baik', 'tersedia', 'B03/12.10.18/I/0103-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(302, 63, 15, 13, '2018-12-17', 53300000.00, 2, 'B12/17.12.18/I/0019-001', 'baik', 'tersedia', 'B12/17.12.18/I/0019-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(303, 63, 13, 13, '2018-12-17', 53300000.00, 2, 'B12/17.12.18/I/0019-002', 'baik', 'tersedia', 'B12/17.12.18/I/0019-002', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(304, 61, 15, 13, '2019-03-04', 7800000.00, 31, 'C03/04.03.19/I/0036-004', 'baik', 'tersedia', 'C03/04.03.19/I/0036-004', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(305, 61, 15, 13, '2019-03-04', 7800000.00, 31, 'C03/04.03.19/I/0036-005', 'baik', 'tersedia', 'C03/04.03.19/I/0036-005', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(306, 64, 11, 13, '2019-03-27', 2500000.00, 6, 'C05/27.03.19/I/0053-001', 'baik', 'tersedia', 'C05/27.03.19/I/0053-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(307, 64, 11, 13, '2019-03-27', 2500000.00, 6, 'C05/27.03.19/I/0053-002', 'baik', 'tersedia', 'C05/27.03.19/I/0053-002', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(308, 65, 15, 13, '2019-04-14', 1050000.00, 4, 'D04/14.04.19/I/0048-001', 'baik', 'tersedia', 'D04/14.04.19/I/0048-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(309, 65, 11, 13, '2019-04-14', 3150000.00, 4, 'D04/14.04.19/I/0048-002', 'baik', 'tersedia', 'D04/14.04.19/I/0048-002', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(310, 65, 11, 13, '2019-04-14', 3150000.00, 4, 'D04/14.04.19/I/0048-003', 'baik', 'tersedia', 'D04/14.04.19/I/0048-003', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(311, 65, 11, 13, '2019-04-14', 3150000.00, 4, 'D04/14.04.19/I/0048-004', 'baik', 'tersedia', 'D04/14.04.19/I/0048-004', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(312, 66, 11, 12, '2019-05-12', 1030000.00, 1, 'B21/12.05.19/II/0080-001', 'baik', 'tersedia', 'B21/12.05.19/II/0080-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(313, 67, 17, 13, '2019-12-23', 1030000.00, 1, 'B21/23.12.19/I/0137-001', 'baik', 'tersedia', 'B21/23.12.19/I/0137-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(314, 68, 13, 13, '2019-06-24', 2500000.00, 1, 'D07/24.06.19/I/0030-001', 'baik', 'tersedia', 'D07/24.06.19/I/0030-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(315, 69, 11, 13, '2019-07-16', 8890000.00, 8, 'D04/16.07.19/I/0081-001', 'baik', 'tersedia', 'D04/16.07.19/I/0081-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(316, 69, 11, 13, '2019-07-16', 8890000.00, 8, 'D04/16.07.19/I/0081-002', 'baik', 'tersedia', 'D04/16.07.19/I/0081-002', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(317, 69, 11, 13, '2019-07-16', 8890000.00, 8, 'D04/16.07.19/I/0081-003', 'baik', 'tersedia', 'D04/16.07.19/I/0081-003', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(318, 69, 11, 13, '2019-07-16', 8890000.00, 8, 'D04/16.07.19/I/0081-004', 'baik', 'tersedia', 'D04/16.07.19/I/0081-004', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(319, 69, 11, 13, '2019-07-16', 8890000.00, 8, 'D04/16.07.19/I/0081-005', 'baik', 'tersedia', 'D04/16.07.19/I/0081-005', '2026-05-26 11:09:24', '2026-05-26 11:09:24');
INSERT INTO `unit_barangs` (`id`, `barang_id`, `ruang_id`, `sumber_dana_id`, `tanggal_perolehan`, `harga`, `nomor_unit`, `kode_inventaris`, `kondisi`, `status`, `qr_code`, `created_at`, `updated_at`) VALUES
(320, 69, 15, 13, '2019-07-16', 1270000.00, 8, 'D04/16.07.19/I/0081-006', 'baik', 'tersedia', 'D04/16.07.19/I/0081-006', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(321, 70, 11, 13, '2019-08-03', 1.00, 1, 'B16/03.08.19/I/0082-001', 'baik', 'tersedia', 'B16/03.08.19/I/0082-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(322, 61, 15, 13, '2019-09-26', 4500000.00, 31, 'C03/26.09.19/I/0036-006', 'baik', 'tersedia', 'C03/26.09.19/I/0036-006', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(323, 61, 15, 13, '2019-09-26', 4500000.00, 31, 'C03/26.09.19/I/0036-007', 'baik', 'tersedia', 'C03/26.09.19/I/0036-007', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(324, 61, 15, 13, '2019-09-26', 4500000.00, 31, 'C03/26.09.19/I/0036-008', 'baik', 'tersedia', 'C03/26.09.19/I/0036-008', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(325, 71, 11, 13, '2019-10-22', 3900000.00, 1, 'B04/22.10.19/I/0083-001', 'baik', 'tersedia', 'B04/22.10.19/I/0083-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(326, 72, 13, 13, '2019-11-29', 600.00, 5, 'C01/29.11.19/I/0031-001', 'baik', 'tersedia', 'C01/29.11.19/I/0031-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(327, 72, 13, 13, '2019-11-29', 600.00, 5, 'C01/29.11.19/I/0031-002', 'baik', 'tersedia', 'C01/29.11.19/I/0031-002', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(328, 72, 13, 13, '2019-11-29', 600.00, 5, 'C01/29.11.19/I/0031-003', 'baik', 'tersedia', 'C01/29.11.19/I/0031-003', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(329, 72, 13, 13, '2019-11-29', 600.00, 5, 'C01/29.11.19/I/0031-004', 'baik', 'tersedia', 'C01/29.11.19/I/0031-004', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(330, 72, 13, 13, '2019-11-29', 600.00, 5, 'C01/29.11.19/I/0031-005', 'baik', 'tersedia', 'C01/29.11.19/I/0031-005', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(331, 73, 17, 13, '2019-11-21', 600.00, 5, 'C01/21.11.19/I/0136-001', 'baik', 'tersedia', 'C01/21.11.19/I/0136-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(332, 73, 17, 13, '2019-11-21', 600.00, 5, 'C01/21.11.19/I/0136-002', 'baik', 'tersedia', 'C01/21.11.19/I/0136-002', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(333, 73, 17, 13, '2019-11-21', 600.00, 5, 'C01/21.11.19/I/0136-003', 'baik', 'tersedia', 'C01/21.11.19/I/0136-003', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(334, 73, 17, 13, '2019-11-21', 600.00, 5, 'C01/21.11.19/I/0136-004', 'baik', 'tersedia', 'C01/21.11.19/I/0136-004', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(335, 73, 17, 13, '2019-11-21', 600.00, 5, 'C01/21.11.19/I/0136-005', 'baik', 'tersedia', 'C01/21.11.19/I/0136-005', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(336, 74, 15, 13, '2019-12-10', 520.00, 3, 'B16/10.12.19/I/0051-001', 'baik', 'tersedia', 'B16/10.12.19/I/0051-001', '2026-05-26 11:09:24', '2026-05-26 11:09:24'),
(337, 74, 15, 13, '2019-12-10', 520.00, 3, 'B16/10.12.19/I/0051-002', 'baik', 'tersedia', 'B16/10.12.19/I/0051-002', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(338, 74, 15, 13, '2019-12-10', 520.00, 3, 'B16/10.12.19/I/0051-003', 'baik', 'tersedia', 'B16/10.12.19/I/0051-003', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(339, 75, 16, 13, '2019-12-12', 3300000.00, 1, 'C01/12.12.19/I/0105-001', 'baik', 'tersedia', 'C01/12.12.19/I/0105-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(340, 76, 16, 13, '2019-12-23', 6150000.00, 1, 'B03/23.12.19/I/0106-001', 'baik', 'tersedia', 'B03/23.12.19/I/0106-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(341, 77, 16, 13, '2019-12-31', 6950000.00, 1, 'B06/31.12.19/I/0107-001', 'baik', 'tersedia', 'B06/31.12.19/I/0107-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(342, 78, 17, 13, '2019-12-31', 7050000.00, 2, 'B01/31.12.19/I/0138-001', 'baik', 'tersedia', 'B01/31.12.19/I/0138-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(343, 78, 17, 13, '2019-12-31', 7050000.00, 2, 'B01/31.12.19/I/0138-002', 'baik', 'tersedia', 'B01/31.12.19/I/0138-002', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(344, 79, 11, 13, '2020-07-15', 10000000.00, 1, 'D07/15.07.20/I/0084-001', 'baik', 'tersedia', 'D07/15.07.20/I/0084-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(345, 80, 15, 13, '2020-08-15', 1999999.00, 2, 'B04/15.08.20/I/0052-001', 'baik', 'tersedia', 'B04/15.08.20/I/0052-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(346, 69, 11, 13, '2020-09-28', 2275000.00, 8, 'D04/28.09.20/I/0081-007', 'baik', 'tersedia', 'D04/28.09.20/I/0081-007', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(347, 69, 16, 13, '2020-09-28', 974999.00, 8, 'D04/28.09.20/I/0081-008', 'baik', 'tersedia', 'D04/28.09.20/I/0081-008', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(348, 64, 15, 13, '2020-10-07', 1500000.00, 6, 'C05/07.10.20/I/0053-003', 'baik', 'tersedia', 'C05/07.10.20/I/0053-003', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(349, 64, 15, 13, '2020-10-07', 1500000.00, 6, 'C05/07.10.20/I/0053-004', 'baik', 'tersedia', 'C05/07.10.20/I/0053-004', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(350, 61, 15, 13, '2020-10-07', 3800000.00, 31, 'C03/07.10.20/I/0036-009', 'baik', 'tersedia', 'C03/07.10.20/I/0036-009', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(351, 61, 15, 13, '2020-10-07', 3800000.00, 31, 'C03/07.10.20/I/0036-010', 'baik', 'tersedia', 'C03/07.10.20/I/0036-010', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(352, 81, 17, 13, '2020-11-10', 320178.00, 2, 'B07/10.11.20/I/0086-001', 'baik', 'tersedia', 'B07/10.11.20/I/0086-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(353, 81, 13, 13, '2020-11-10', 320178.00, 2, 'B07/10.11.20/I/0086-002', 'baik', 'tersedia', 'B07/10.11.20/I/0086-002', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(354, 82, 17, 13, '2020-12-20', 700614.00, 2, 'B07/20.12.20/I/0087-001', 'baik', 'tersedia', 'B07/20.12.20/I/0087-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(355, 82, 11, 13, '2020-12-20', 700614.00, 2, 'B07/20.12.20/I/0087-002', 'baik', 'tersedia', 'B07/20.12.20/I/0087-002', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(356, 83, 11, 13, '2020-12-20', 1750000.00, 2, 'B08/20.12.20/I/0088-001', 'baik', 'tersedia', 'B08/20.12.20/I/0088-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(357, 83, 17, 13, '2020-12-20', 1750000.00, 2, 'B08/20.12.20/I/0088-002', 'baik', 'tersedia', 'B08/20.12.20/I/0088-002', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(358, 84, 17, 13, '2020-12-21', 300.00, 7, 'C01/21.12.20/I/0142-001', 'baik', 'tersedia', 'C01/21.12.20/I/0142-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(359, 84, 17, 13, '2020-12-21', 300.00, 7, 'C01/21.12.20/I/0142-002', 'baik', 'tersedia', 'C01/21.12.20/I/0142-002', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(360, 84, 17, 13, '2020-12-21', 300.00, 7, 'C01/21.12.20/I/0142-003', 'baik', 'tersedia', 'C01/21.12.20/I/0142-003', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(361, 84, 17, 13, '2020-12-21', 300.00, 7, 'C01/21.12.20/I/0142-004', 'baik', 'tersedia', 'C01/21.12.20/I/0142-004', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(362, 84, 17, 13, '2020-12-21', 300.00, 7, 'C01/21.12.20/I/0142-005', 'baik', 'tersedia', 'C01/21.12.20/I/0142-005', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(363, 84, 17, 13, '2020-12-21', 300.00, 7, 'C01/21.12.20/I/0142-006', 'baik', 'tersedia', 'C01/21.12.20/I/0142-006', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(364, 84, 17, 13, '2020-12-21', 300.00, 7, 'C01/21.12.20/I/0142-007', 'baik', 'tersedia', 'C01/21.12.20/I/0142-007', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(365, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-001', 'baik', 'tersedia', 'B01/01.01.21/II/0055-001', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(366, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-002', 'baik', 'tersedia', 'B01/01.01.21/II/0055-002', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(367, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-003', 'baik', 'tersedia', 'B01/01.01.21/II/0055-003', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(368, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-004', 'baik', 'tersedia', 'B01/01.01.21/II/0055-004', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(369, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-005', 'baik', 'tersedia', 'B01/01.01.21/II/0055-005', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(370, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-006', 'baik', 'tersedia', 'B01/01.01.21/II/0055-006', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(371, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-007', 'baik', 'tersedia', 'B01/01.01.21/II/0055-007', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(372, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-008', 'baik', 'tersedia', 'B01/01.01.21/II/0055-008', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(373, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-009', 'baik', 'tersedia', 'B01/01.01.21/II/0055-009', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(374, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-010', 'baik', 'tersedia', 'B01/01.01.21/II/0055-010', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(375, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-011', 'baik', 'tersedia', 'B01/01.01.21/II/0055-011', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(376, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-012', 'baik', 'tersedia', 'B01/01.01.21/II/0055-012', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(377, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-013', 'baik', 'tersedia', 'B01/01.01.21/II/0055-013', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(378, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-014', 'baik', 'tersedia', 'B01/01.01.21/II/0055-014', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(379, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-015', 'baik', 'tersedia', 'B01/01.01.21/II/0055-015', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(380, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-016', 'baik', 'tersedia', 'B01/01.01.21/II/0055-016', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(381, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-017', 'baik', 'tersedia', 'B01/01.01.21/II/0055-017', '2026-05-26 11:09:25', '2026-05-26 11:09:25'),
(382, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-018', 'baik', 'tersedia', 'B01/01.01.21/II/0055-018', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(383, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-019', 'baik', 'tersedia', 'B01/01.01.21/II/0055-019', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(384, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-020', 'baik', 'tersedia', 'B01/01.01.21/II/0055-020', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(385, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-021', 'baik', 'tersedia', 'B01/01.01.21/II/0055-021', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(386, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-022', 'baik', 'tersedia', 'B01/01.01.21/II/0055-022', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(387, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-023', 'baik', 'tersedia', 'B01/01.01.21/II/0055-023', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(388, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-024', 'baik', 'tersedia', 'B01/01.01.21/II/0055-024', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(389, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-025', 'baik', 'tersedia', 'B01/01.01.21/II/0055-025', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(390, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-026', 'baik', 'tersedia', 'B01/01.01.21/II/0055-026', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(391, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-027', 'baik', 'tersedia', 'B01/01.01.21/II/0055-027', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(392, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-028', 'baik', 'tersedia', 'B01/01.01.21/II/0055-028', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(393, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-029', 'baik', 'tersedia', 'B01/01.01.21/II/0055-029', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(394, 85, 15, 12, '2021-01-01', 3000000.00, 30, 'B01/01.01.21/II/0055-030', 'baik', 'tersedia', 'B01/01.01.21/II/0055-030', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(395, 86, 16, 13, '2021-01-20', 34800000.00, 1, 'B01/20.01.21/I/0109-001', 'baik', 'tersedia', 'B01/20.01.21/I/0109-001', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(396, 62, 17, 13, '2021-01-29', 1725000.00, 4, 'B03/29.01.21/I/0103-002', 'baik', 'tersedia', 'B03/29.01.21/I/0103-002', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(397, 62, 17, 13, '2021-01-29', 1725000.00, 4, 'B03/29.01.21/I/0103-003', 'baik', 'tersedia', 'B03/29.01.21/I/0103-003', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(398, 62, 17, 13, '2021-01-29', 1725000.00, 4, 'B03/29.01.21/I/0103-004', 'baik', 'tersedia', 'B03/29.01.21/I/0103-004', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(399, 64, 15, 13, '2021-01-31', 1500000.00, 6, 'C05/31.01.21/I/0053-005', 'baik', 'tersedia', 'C05/31.01.21/I/0053-005', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(400, 64, 15, 13, '2021-01-31', 1500000.00, 6, 'C05/31.01.21/I/0053-006', 'baik', 'tersedia', 'C05/31.01.21/I/0053-006', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(401, 87, 11, 12, '2021-02-10', 28324000.00, 1, 'B16/10.02.21/II/0089-001', 'baik', 'tersedia', 'B16/10.02.21/II/0089-001', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(402, 61, 15, 13, '2021-02-17', 3800000.00, 31, 'C03/17.02.21/I/0036-011', 'baik', 'tersedia', 'C03/17.02.21/I/0036-011', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(403, 61, 15, 13, '2021-02-17', 3800000.00, 31, 'C03/17.02.21/I/0036-012', 'baik', 'tersedia', 'C03/17.02.21/I/0036-012', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(404, 61, 15, 13, '2021-02-17', 3800000.00, 31, 'C03/17.02.21/I/0036-013', 'baik', 'tersedia', 'C03/17.02.21/I/0036-013', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(405, 61, 15, 13, '2021-02-17', 3800000.00, 31, 'C03/17.02.21/I/0036-014', 'baik', 'tersedia', 'C03/17.02.21/I/0036-014', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(406, 88, 17, 13, '2021-08-09', 2900000.00, 1, 'B11/09.08.21/I/0144-001', 'baik', 'tersedia', 'B11/09.08.21/I/0144-001', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(407, 89, 17, 13, '2021-08-13', 18090000.00, 1, 'B01/13.08.21/I/0029-001', 'baik', 'tersedia', 'B01/13.08.21/I/0029-001', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(408, 80, 17, 13, '2021-08-13', 1495000.00, 2, 'B04/13.08.21/I/0052-002', 'baik', 'tersedia', 'B04/13.08.21/I/0052-002', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(409, 90, 15, 13, '2021-10-15', 2800000.00, 4, 'D99/15.10.21/I/0058-001', 'baik', 'tersedia', 'D99/15.10.21/I/0058-001', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(410, 90, 11, 13, '2021-10-15', 2800000.00, 4, 'D99/15.10.21/I/0058-002', 'baik', 'tersedia', 'D99/15.10.21/I/0058-002', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(411, 61, 15, 13, '2021-12-24', 4750000.00, 31, 'C03/24.12.21/I/0036-015', 'baik', 'tersedia', 'C03/24.12.21/I/0036-015', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(412, 61, 15, 13, '2021-12-24', 4750000.00, 31, 'C03/24.12.21/I/0036-016', 'baik', 'tersedia', 'C03/24.12.21/I/0036-016', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(413, 91, 14, 13, '2022-02-12', 1500000.00, 2, 'D07/12.02.22/I/0021-001', 'baik', 'tersedia', 'D07/12.02.22/I/0021-001', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(414, 91, 14, 13, '2022-02-12', 1500000.00, 2, 'D07/12.02.22/I/0021-002', 'baik', 'tersedia', 'D07/12.02.22/I/0021-002', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(415, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-001', 'baik', 'tersedia', 'D14/30.10.23/I/0112-001', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(416, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-002', 'baik', 'tersedia', 'D14/30.10.23/I/0112-002', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(417, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-003', 'baik', 'tersedia', 'D14/30.10.23/I/0112-003', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(418, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-004', 'baik', 'tersedia', 'D14/30.10.23/I/0112-004', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(419, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-005', 'baik', 'tersedia', 'D14/30.10.23/I/0112-005', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(420, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-006', 'baik', 'tersedia', 'D14/30.10.23/I/0112-006', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(421, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-007', 'baik', 'tersedia', 'D14/30.10.23/I/0112-007', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(422, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-008', 'baik', 'tersedia', 'D14/30.10.23/I/0112-008', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(423, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-009', 'baik', 'tersedia', 'D14/30.10.23/I/0112-009', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(424, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-010', 'baik', 'tersedia', 'D14/30.10.23/I/0112-010', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(425, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-011', 'baik', 'tersedia', 'D14/30.10.23/I/0112-011', '2026-05-26 11:09:26', '2026-05-26 11:09:26'),
(426, 92, 16, 13, '2023-10-30', 2025.00, 12, 'D14/30.10.23/I/0112-012', 'baik', 'tersedia', 'D14/30.10.23/I/0112-012', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(427, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-001', 'baik', 'tersedia', 'D14/29.11.23/I/0113-001', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(428, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-002', 'baik', 'tersedia', 'D14/29.11.23/I/0113-002', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(429, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-003', 'baik', 'tersedia', 'D14/29.11.23/I/0113-003', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(430, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-004', 'baik', 'tersedia', 'D14/29.11.23/I/0113-004', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(431, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-005', 'baik', 'tersedia', 'D14/29.11.23/I/0113-005', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(432, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-006', 'baik', 'tersedia', 'D14/29.11.23/I/0113-006', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(433, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-007', 'baik', 'tersedia', 'D14/29.11.23/I/0113-007', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(434, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-008', 'baik', 'tersedia', 'D14/29.11.23/I/0113-008', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(435, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-009', 'baik', 'tersedia', 'D14/29.11.23/I/0113-009', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(436, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-010', 'baik', 'tersedia', 'D14/29.11.23/I/0113-010', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(437, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-011', 'baik', 'tersedia', 'D14/29.11.23/I/0113-011', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(438, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-012', 'baik', 'tersedia', 'D14/29.11.23/I/0113-012', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(439, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-013', 'baik', 'tersedia', 'D14/29.11.23/I/0113-013', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(440, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-014', 'baik', 'tersedia', 'D14/29.11.23/I/0113-014', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(441, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-015', 'baik', 'tersedia', 'D14/29.11.23/I/0113-015', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(442, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-016', 'baik', 'tersedia', 'D14/29.11.23/I/0113-016', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(443, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-017', 'baik', 'tersedia', 'D14/29.11.23/I/0113-017', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(444, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-018', 'baik', 'tersedia', 'D14/29.11.23/I/0113-018', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(445, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-019', 'baik', 'tersedia', 'D14/29.11.23/I/0113-019', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(446, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-020', 'baik', 'tersedia', 'D14/29.11.23/I/0113-020', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(447, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-021', 'baik', 'tersedia', 'D14/29.11.23/I/0113-021', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(448, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-022', 'baik', 'tersedia', 'D14/29.11.23/I/0113-022', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(449, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-023', 'baik', 'tersedia', 'D14/29.11.23/I/0113-023', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(450, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-024', 'baik', 'tersedia', 'D14/29.11.23/I/0113-024', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(451, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-025', 'baik', 'tersedia', 'D14/29.11.23/I/0113-025', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(452, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-026', 'baik', 'tersedia', 'D14/29.11.23/I/0113-026', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(453, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-027', 'baik', 'tersedia', 'D14/29.11.23/I/0113-027', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(454, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-028', 'baik', 'tersedia', 'D14/29.11.23/I/0113-028', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(455, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-029', 'baik', 'tersedia', 'D14/29.11.23/I/0113-029', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(456, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-030', 'baik', 'tersedia', 'D14/29.11.23/I/0113-030', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(457, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-031', 'baik', 'tersedia', 'D14/29.11.23/I/0113-031', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(458, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-032', 'baik', 'tersedia', 'D14/29.11.23/I/0113-032', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(459, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-033', 'baik', 'tersedia', 'D14/29.11.23/I/0113-033', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(460, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-034', 'baik', 'tersedia', 'D14/29.11.23/I/0113-034', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(461, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-035', 'baik', 'tersedia', 'D14/29.11.23/I/0113-035', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(462, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-036', 'baik', 'tersedia', 'D14/29.11.23/I/0113-036', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(463, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-037', 'baik', 'tersedia', 'D14/29.11.23/I/0113-037', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(464, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-038', 'baik', 'tersedia', 'D14/29.11.23/I/0113-038', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(465, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-039', 'baik', 'tersedia', 'D14/29.11.23/I/0113-039', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(466, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-040', 'baik', 'tersedia', 'D14/29.11.23/I/0113-040', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(467, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-041', 'baik', 'tersedia', 'D14/29.11.23/I/0113-041', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(468, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-042', 'baik', 'tersedia', 'D14/29.11.23/I/0113-042', '2026-05-26 11:09:27', '2026-05-26 11:09:27'),
(469, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-043', 'baik', 'tersedia', 'D14/29.11.23/I/0113-043', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(470, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-044', 'baik', 'tersedia', 'D14/29.11.23/I/0113-044', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(471, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-045', 'baik', 'tersedia', 'D14/29.11.23/I/0113-045', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(472, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-046', 'baik', 'tersedia', 'D14/29.11.23/I/0113-046', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(473, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-047', 'baik', 'tersedia', 'D14/29.11.23/I/0113-047', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(474, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-048', 'baik', 'tersedia', 'D14/29.11.23/I/0113-048', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(475, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-049', 'baik', 'tersedia', 'D14/29.11.23/I/0113-049', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(476, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-050', 'baik', 'tersedia', 'D14/29.11.23/I/0113-050', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(477, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-051', 'baik', 'tersedia', 'D14/29.11.23/I/0113-051', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(478, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-052', 'baik', 'tersedia', 'D14/29.11.23/I/0113-052', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(479, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-053', 'baik', 'tersedia', 'D14/29.11.23/I/0113-053', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(480, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-054', 'baik', 'tersedia', 'D14/29.11.23/I/0113-054', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(481, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-055', 'baik', 'tersedia', 'D14/29.11.23/I/0113-055', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(482, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-056', 'baik', 'tersedia', 'D14/29.11.23/I/0113-056', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(483, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-057', 'baik', 'tersedia', 'D14/29.11.23/I/0113-057', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(484, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-058', 'baik', 'tersedia', 'D14/29.11.23/I/0113-058', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(485, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-059', 'baik', 'tersedia', 'D14/29.11.23/I/0113-059', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(486, 93, 12, 13, '2023-11-29', 25.00, 60, 'D14/29.11.23/I/0113-060', 'baik', 'tersedia', 'D14/29.11.23/I/0113-060', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(487, 23, 15, 13, '2023-12-12', 1100000.00, 8, 'C05/12.12.23/I/0091-001', 'baik', 'tersedia', 'C05/12.12.23/I/0091-001', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(488, 23, 15, 13, '2023-12-12', 1100000.00, 8, 'C05/12.12.23/I/0091-002', 'baik', 'tersedia', 'C05/12.12.23/I/0091-002', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(489, 23, 15, 13, '2023-12-12', 1100000.00, 8, 'C05/12.12.23/I/0091-003', 'baik', 'tersedia', 'C05/12.12.23/I/0091-003', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(490, 23, 15, 13, '2023-12-12', 1100000.00, 8, 'C05/12.12.23/I/0091-004', 'baik', 'tersedia', 'C05/12.12.23/I/0091-004', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(491, 90, 15, 13, '2023-12-12', 3200000.00, 4, 'D99/12.12.23/I/0058-003', 'baik', 'tersedia', 'D99/12.12.23/I/0058-003', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(492, 90, 15, 13, '2023-12-12', 3200000.00, 4, 'D99/12.12.23/I/0058-004', 'baik', 'tersedia', 'D99/12.12.23/I/0058-004', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(493, 23, 11, 13, '2023-12-12', 1000000.00, 8, 'C05/12.12.23/I/0091-005', 'baik', 'tersedia', 'C05/12.12.23/I/0091-005', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(494, 23, 11, 13, '2023-12-12', 1000000.00, 8, 'C05/12.12.23/I/0091-006', 'baik', 'tersedia', 'C05/12.12.23/I/0091-006', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(495, 23, 11, 13, '2023-12-12', 1000000.00, 8, 'C05/12.12.23/I/0091-007', 'baik', 'tersedia', 'C05/12.12.23/I/0091-007', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(496, 23, 11, 13, '2023-12-12', 1000000.00, 8, 'C05/12.12.23/I/0091-008', 'baik', 'tersedia', 'C05/12.12.23/I/0091-008', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(497, 40, 11, 13, '2023-12-12', 2150000.00, 14, 'C03/12.12.23/I/0072-011', 'baik', 'tersedia', 'C03/12.12.23/I/0072-011', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(498, 40, 11, 13, '2023-12-12', 2150000.00, 14, 'C03/12.12.23/I/0072-012', 'baik', 'tersedia', 'C03/12.12.23/I/0072-012', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(499, 40, 11, 13, '2023-12-12', 2150000.00, 14, 'C03/12.12.23/I/0072-013', 'baik', 'tersedia', 'C03/12.12.23/I/0072-013', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(500, 40, 11, 13, '2023-12-12', 2150000.00, 14, 'C03/12.12.23/I/0072-014', 'baik', 'tersedia', 'C03/12.12.23/I/0072-014', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(501, 94, 16, 13, '2023-12-12', 2900000.00, 1, 'B05/12.12.23/I/0116-001', 'baik', 'tersedia', 'B05/12.12.23/I/0116-001', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(502, 95, 16, 13, '2023-12-12', 7000000.00, 2, 'B01/12.12.23/I/0114-001', 'baik', 'tersedia', 'B01/12.12.23/I/0114-001', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(503, 95, 16, 13, '2023-12-12', 7000000.00, 2, 'B01/12.12.23/I/0114-002', 'baik', 'tersedia', 'B01/12.12.23/I/0114-002', '2026-05-26 11:09:28', '2026-05-26 11:09:28'),
(504, 96, 17, 13, '2023-12-12', 15700000.00, 1, 'A04/12.12.23/I/0115-001', 'baik', 'tersedia', 'A04/12.12.23/I/0115-001', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(505, 97, 17, 13, '2024-12-29', 2400000.00, 1, 'B02/29.12.24/I/0118-001', 'baik', 'tersedia', 'B02/29.12.24/I/0118-001', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(506, 98, 13, 14, '2024-07-27', 14359999.00, 2, 'B02/27.07.24/III/0155-001', 'baik', 'tersedia', 'B02/27.07.24/III/0155-001', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(507, 98, 17, 14, '2024-11-30', 13900000.00, 2, 'B02/30.11.24/III/0155-002', 'baik', 'tersedia', 'B02/30.11.24/III/0155-002', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(508, 99, 17, 13, '2024-09-30', 425.00, 1, 'C03/30.09.24/I/0150-001', 'baik', 'tersedia', 'C03/30.09.24/I/0150-001', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(509, 100, 16, 12, '2024-11-06', 16700000.00, 1, 'B01/06.11.24/II/0156-001', 'baik', 'tersedia', 'B01/06.11.24/II/0156-001', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(511, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-018', 'baik', 'tersedia', 'C03/10.01.07/I/0036-018', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(512, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-019', 'baik', 'tersedia', 'C03/10.01.07/I/0036-019', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(513, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-020', 'baik', 'tersedia', 'C03/10.01.07/I/0036-020', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(514, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-021', 'baik', 'tersedia', 'C03/10.01.07/I/0036-021', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(515, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-022', 'baik', 'tersedia', 'C03/10.01.07/I/0036-022', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(516, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-023', 'baik', 'tersedia', 'C03/10.01.07/I/0036-023', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(517, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-024', 'baik', 'tersedia', 'C03/10.01.07/I/0036-024', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(518, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-025', 'baik', 'tersedia', 'C03/10.01.07/I/0036-025', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(519, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-026', 'baik', 'tersedia', 'C03/10.01.07/I/0036-026', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(520, 61, 15, 13, '2007-01-10', 5000000.00, 31, 'C03/10.01.07/I/0036-027', 'baik', 'tersedia', 'C03/10.01.07/I/0036-027', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(521, 61, 15, 13, '2023-12-12', 3050000.00, 31, 'C03/12.12.23/I/0036-028', 'baik', 'tersedia', 'C03/12.12.23/I/0036-028', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(522, 61, 15, 13, '2023-12-12', 3050000.00, 31, 'C03/12.12.23/I/0036-029', 'baik', 'tersedia', 'C03/12.12.23/I/0036-029', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(523, 61, 15, 13, '2023-12-12', 3050000.00, 31, 'C03/12.12.23/I/0036-030', 'baik', 'tersedia', 'C03/12.12.23/I/0036-030', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(524, 61, 15, 13, '2023-12-12', 3050000.00, 31, 'C03/12.12.23/I/0036-031', 'baik', 'tersedia', 'C03/12.12.23/I/0036-031', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(525, 101, 15, 13, '2025-01-16', 8250000.00, 6, 'B16/16.01.25/I/0158-001', 'baik', 'tersedia', 'B16/16.01.25/I/0158-001', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(526, 101, 15, 13, '2025-01-16', 8250000.00, 6, 'B16/16.01.25/I/0158-002', 'baik', 'tersedia', 'B16/16.01.25/I/0158-002', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(527, 101, 15, 13, '2025-01-16', 8250000.00, 6, 'B16/16.01.25/I/0158-003', 'baik', 'tersedia', 'B16/16.01.25/I/0158-003', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(528, 101, 15, 13, '2025-01-16', 8250000.00, 6, 'B16/16.01.25/I/0158-004', 'baik', 'tersedia', 'B16/16.01.25/I/0158-004', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(529, 101, 15, 13, '2025-01-16', 8250000.00, 6, 'B16/16.01.25/I/0158-005', 'baik', 'tersedia', 'B16/16.01.25/I/0158-005', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(530, 101, 15, 13, '2025-01-16', 8250000.00, 6, 'B16/16.01.25/I/0158-006', 'baik', 'tersedia', 'B16/16.01.25/I/0158-006', '2026-05-26 11:09:29', '2026-05-26 11:09:29'),
(531, 102, 16, 13, '2026-03-01', 2000000.00, 1, 'B14/01.03.26/I/0009-001', 'baik', 'tersedia', 'B14/01.03.26/I/0009-001', '2026-05-26 11:09:29', '2026-05-26 11:09:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Staff'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Admin', 'admin@gmail.com', '2026-05-26 00:29:10', '$2y$12$9MW8leTe/S5WULgK1Z12ROgnsc7SYqBpogaok1rrkZciqyC9NhnNa', 'Cw0tkltXLJ0JLxS9tvjEH8MDecX8u2xPikYOBvQHx7jXw74bar9jmPzkz4rH', '2026-05-26 00:29:10', '2026-05-26 01:57:00', 'Super Admin'),
(2, 'Admin Inventaris', 'admin_inventaris@gmail.com', '2026-05-26 01:57:01', '$2y$12$MM1.mLE9YhYZZhgnqfu/leZDTctM6RdKAui2SI71czrSoqtOQpBiC', NULL, '2026-05-26 01:57:01', '2026-05-26 01:57:01', 'Admin Inventaris'),
(3, 'Staff Inventaris', 'staff@gmail.com', '2026-05-26 01:57:01', '$2y$12$eMs/kdUL/9Jqp9ZCkWL/jOXoFZPHF669kJ7696ujVt430XsM1j8vi', NULL, '2026-05-26 01:57:01', '2026-05-26 01:57:01', 'Staff'),
(4, 'Teknisi Inventaris', 'teknisi@gmail.com', '2026-05-26 01:57:01', '$2y$12$CG9Q0V9xD11pclRT.hexceWHMRkWlC.ERio7qRx3unZVSEbkHiQRe', NULL, '2026-05-26 01:57:01', '2026-05-26 01:57:01', 'Teknisi'),
(5, 'Pimpinan Lembaga', 'pimpinan@gmail.com', '2026-05-26 01:57:02', '$2y$12$Y/KK5xnPfCN.QrOgo13msODreW.hk4M9woDsca6sPsKK3X5wm.nUO', NULL, '2026-05-26 01:57:02', '2026-05-26 01:57:02', 'Pimpinan');

--
-- Indeks untuk tabel yang dibuang
--

--
-- Indeks untuk tabel `barangs`
--
ALTER TABLE `barangs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `barangs_kode_induk_unique` (`kode_induk`),
  ADD KEY `barangs_kategori_barang_id_foreign` (`kategori_barang_id`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kategori_barangs`
--
ALTER TABLE `kategori_barangs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kategori_barangs_kode_unique` (`kode`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indeks untuk tabel `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `pemeliharaans`
--
ALTER TABLE `pemeliharaans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pemeliharaans_unit_barang_id_foreign` (`unit_barang_id`);

--
-- Indeks untuk tabel `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indeks untuk tabel `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indeks untuk tabel `ruangs`
--
ALTER TABLE `ruangs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ruangs_kode_unique` (`kode`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `sumber_danas`
--
ALTER TABLE `sumber_danas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sumber_danas_kode_unique` (`kode`);

--
-- Indeks untuk tabel `unit_barangs`
--
ALTER TABLE `unit_barangs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unit_barangs_kode_inventaris_unique` (`kode_inventaris`),
  ADD KEY `unit_barangs_barang_id_foreign` (`barang_id`),
  ADD KEY `unit_barangs_ruang_id_foreign` (`ruang_id`),
  ADD KEY `unit_barangs_sumber_dana_id_foreign` (`sumber_dana_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `barangs`
--
ALTER TABLE `barangs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kategori_barangs`
--
ALTER TABLE `kategori_barangs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `pemeliharaans`
--
ALTER TABLE `pemeliharaans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `ruangs`
--
ALTER TABLE `ruangs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `sumber_danas`
--
ALTER TABLE `sumber_danas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `unit_barangs`
--
ALTER TABLE `unit_barangs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=532;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `barangs`
--
ALTER TABLE `barangs`
  ADD CONSTRAINT `barangs_kategori_barang_id_foreign` FOREIGN KEY (`kategori_barang_id`) REFERENCES `kategori_barangs` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pemeliharaans`
--
ALTER TABLE `pemeliharaans`
  ADD CONSTRAINT `pemeliharaans_unit_barang_id_foreign` FOREIGN KEY (`unit_barang_id`) REFERENCES `unit_barangs` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `unit_barangs`
--
ALTER TABLE `unit_barangs`
  ADD CONSTRAINT `unit_barangs_barang_id_foreign` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `unit_barangs_ruang_id_foreign` FOREIGN KEY (`ruang_id`) REFERENCES `ruangs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `unit_barangs_sumber_dana_id_foreign` FOREIGN KEY (`sumber_dana_id`) REFERENCES `sumber_danas` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
