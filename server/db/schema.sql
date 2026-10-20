-- ============================================================================
-- Tamil AI Government Scheme Navigator - MySQL Database Schema
-- Database: tamil_scheme_navigator_db
-- Character Set: utf8mb4 (supports Tamil Unicode script seamlessly)
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `tamil_scheme_navigator_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `tamil_scheme_navigator_db`;

-- ----------------------------------------------------------------------------
-- Table: users (Citizens and Administrators)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `mobile` VARCHAR(20) DEFAULT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('CITIZEN', 'ADMIN') NOT NULL DEFAULT 'CITIZEN',
  `preferred_language` VARCHAR(10) NOT NULL DEFAULT 'ta',
  `profile` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_email` (`email`),
  INDEX `idx_user_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: schemes (Tamil Nadu State and Central Government Schemes)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `schemes` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `scheme_name` VARCHAR(255) NOT NULL,
  `tamil_name` VARCHAR(255) NOT NULL,
  `government_level` ENUM('TAMIL_NADU', 'CENTRAL') NOT NULL DEFAULT 'TAMIL_NADU',
  `department` VARCHAR(255) DEFAULT NULL,
  `tamil_department` VARCHAR(255) DEFAULT NULL,
  `category` VARCHAR(100) NOT NULL,
  `tamil_category` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `tamil_description` TEXT DEFAULT NULL,
  `benefits` TEXT DEFAULT NULL,
  `tamil_benefits` TEXT DEFAULT NULL,
  `benefit_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `eligibility_criteria` JSON DEFAULT NULL,
  `documents_required` JSON DEFAULT NULL,
  `application_process` JSON DEFAULT NULL,
  `tamil_application_process` JSON DEFAULT NULL,
  `application_website` VARCHAR(255) DEFAULT NULL,
  `application_centre` VARCHAR(255) DEFAULT NULL,
  `helpline` VARCHAR(100) DEFAULT '1100',
  `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_scheme_level` (`government_level`),
  INDEX `idx_scheme_category` (`category`),
  INDEX `idx_scheme_benefit` (`benefit_amount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: centres (Tamil Nadu e-Sevai Service Centres & Taluk Offices)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `centres` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `tamil_name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) DEFAULT 'e-Seva Centre',
  `district` VARCHAR(100) NOT NULL,
  `taluk` VARCHAR(100) DEFAULT NULL,
  `address` TEXT NOT NULL,
  `tamil_address` TEXT NOT NULL,
  `pincode` VARCHAR(20) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT '1100',
  `email` VARCHAR(100) DEFAULT NULL,
  `operating_hours` VARCHAR(100) DEFAULT 'Monday - Saturday: 9:30 AM - 5:30 PM',
  `lat` DECIMAL(10, 6) NOT NULL,
  `lng` DECIMAL(10, 6) NOT NULL,
  `services_provided` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_centre_district` (`district`),
  INDEX `idx_centre_taluk` (`taluk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: applications (Citizen Scheme Applications & Tracking)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `applications` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `scheme_id` VARCHAR(64) NOT NULL,
  `applicant_name` VARCHAR(150) NOT NULL,
  `applicant_phone` VARCHAR(20) DEFAULT NULL,
  `applicant_district` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'SUBMITTED',
  `notes` TEXT DEFAULT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_app_user` (`user_id`),
  INDEX `idx_app_scheme` (`scheme_id`),
  INDEX `idx_app_status` (`status`),
  CONSTRAINT `fk_app_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_app_scheme` FOREIGN KEY (`scheme_id`) REFERENCES `schemes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: notifications (Welfare Scheme Broadcasts & Updates)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `tamil_title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `tamil_message` TEXT NOT NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'INFO',
  `date` DATE DEFAULT NULL,
  `unread` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_notif_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: saved_schemes (Citizen Bookmarked Schemes)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `saved_schemes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `scheme_id` VARCHAR(64) NOT NULL,
  `saved_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_user_scheme` (`user_id`, `scheme_id`),
  CONSTRAINT `fk_saved_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_saved_scheme` FOREIGN KEY (`scheme_id`) REFERENCES `schemes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
