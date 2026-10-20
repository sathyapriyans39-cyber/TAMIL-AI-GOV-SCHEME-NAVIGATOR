/**
 * MySQL Database Connection & Initialization Module
 * Uses mysql2/promise connection pool with utf8mb4 encoding for Tamil Unicode script support.
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const DB_CONFIG = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  database: process.env.DB_NAME || 'tamil_scheme_navigator_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

let pool = null;
let isConnected = false;

/**
 * Get or create MySQL Connection Pool
 */
export function getPool() {
  if (!pool) {
    pool = mysql.createPool(DB_CONFIG);
  }
  return pool;
}

/**
 * Execute parameterized SQL query
 */
export async function query(sql, params = []) {
  const p = getPool();
  const [rows, fields] = await p.execute(sql, params);
  return rows;
}

/**
 * Test MySQL connection status
 */
export async function testConnection() {
  try {
    const p = getPool();
    const [rows] = await p.query('SELECT 1 + 1 AS result');
    isConnected = true;

    // Get table counts
    const [[{ count: schemesCount }]] = await p.query('SELECT COUNT(*) AS count FROM schemes');
    const [[{ count: usersCount }]] = await p.query('SELECT COUNT(*) AS count FROM users');
    const [[{ count: centresCount }]] = await p.query('SELECT COUNT(*) AS count FROM centres');

    return {
      success: true,
      connected: true,
      database: DB_CONFIG.database,
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      tables: {
        schemes: schemesCount,
        users: usersCount,
        centres: centresCount
      }
    };
  } catch (err) {
    isConnected = false;
    return {
      success: false,
      connected: false,
      database: DB_CONFIG.database,
      error: err.message
    };
  }
}

/**
 * Auto-initialize database, tables, and seed initial data from JavaScript datasets if empty
 */
export async function initDatabase() {
  console.log('🔌 Connecting to MySQL Database:', DB_CONFIG.database, `at ${DB_CONFIG.host}:${DB_CONFIG.port}...`);

  try {
    // 1. First ensure database exists (connect without database specified)
    const rootConn = await mysql.createConnection({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password
    });

    await rootConn.query(`
      CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\`
      DEFAULT CHARACTER SET utf8mb4
      DEFAULT COLLATE utf8mb4_unicode_ci;
    `);
    await rootConn.end();

    // 2. Connect with pool and ensure tables exist
    const p = getPool();

    // Users table
    await p.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
        \`name\` VARCHAR(150) NOT NULL,
        \`email\` VARCHAR(150) NOT NULL UNIQUE,
        \`mobile\` VARCHAR(20) DEFAULT NULL,
        \`password_hash\` VARCHAR(255) NOT NULL,
        \`role\` ENUM('CITIZEN', 'ADMIN') NOT NULL DEFAULT 'CITIZEN',
        \`preferred_language\` VARCHAR(10) NOT NULL DEFAULT 'ta',
        \`profile\` JSON DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX \`idx_user_email\` (\`email\`),
        INDEX \`idx_user_role\` (\`role\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Schemes table
    await p.query(`
      CREATE TABLE IF NOT EXISTS \`schemes\` (
        \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
        \`scheme_name\` VARCHAR(255) NOT NULL,
        \`tamil_name\` VARCHAR(255) NOT NULL,
        \`government_level\` ENUM('TAMIL_NADU', 'CENTRAL') NOT NULL DEFAULT 'TAMIL_NADU',
        \`department\` VARCHAR(255) DEFAULT NULL,
        \`tamil_department\` VARCHAR(255) DEFAULT NULL,
        \`category\` VARCHAR(100) NOT NULL,
        \`tamil_category\` VARCHAR(100) NOT NULL,
        \`description\` TEXT DEFAULT NULL,
        \`tamil_description\` TEXT DEFAULT NULL,
        \`benefits\` TEXT DEFAULT NULL,
        \`tamil_benefits\` TEXT DEFAULT NULL,
        \`benefit_amount\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
        \`eligibility_criteria\` JSON DEFAULT NULL,
        \`documents_required\` JSON DEFAULT NULL,
        \`application_process\` JSON DEFAULT NULL,
        \`tamil_application_process\` JSON DEFAULT NULL,
        \`application_website\` VARCHAR(255) DEFAULT NULL,
        \`application_centre\` VARCHAR(255) DEFAULT NULL,
        \`helpline\` VARCHAR(100) DEFAULT '1100',
        \`status\` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX \`idx_scheme_level\` (\`government_level\`),
        INDEX \`idx_scheme_category\` (\`category\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Centres table
    await p.query(`
      CREATE TABLE IF NOT EXISTS \`centres\` (
        \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL,
        \`tamil_name\` VARCHAR(255) NOT NULL,
        \`type\` VARCHAR(100) DEFAULT 'e-Seva Centre',
        \`district\` VARCHAR(100) NOT NULL,
        \`taluk\` VARCHAR(100) DEFAULT NULL,
        \`address\` TEXT NOT NULL,
        \`tamil_address\` TEXT NOT NULL,
        \`pincode\` VARCHAR(20) DEFAULT NULL,
        \`phone\` VARCHAR(50) DEFAULT '1100',
        \`email\` VARCHAR(100) DEFAULT NULL,
        \`operating_hours\` VARCHAR(100) DEFAULT 'Monday - Saturday: 9:30 AM - 5:30 PM',
        \`lat\` DECIMAL(10, 6) NOT NULL,
        \`lng\` DECIMAL(10, 6) NOT NULL,
        \`services_provided\` JSON DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX \`idx_centre_district\` (\`district\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Applications table
    await p.query(`
      CREATE TABLE IF NOT EXISTS \`applications\` (
        \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
        \`user_id\` VARCHAR(64) NOT NULL,
        \`scheme_id\` VARCHAR(64) NOT NULL,
        \`applicant_name\` VARCHAR(150) NOT NULL,
        \`applicant_phone\` VARCHAR(20) DEFAULT NULL,
        \`applicant_district\` VARCHAR(100) DEFAULT NULL,
        \`status\` ENUM('SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'SUBMITTED',
        \`notes\` TEXT DEFAULT NULL,
        \`submitted_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX \`idx_app_user\` (\`user_id\`),
        INDEX \`idx_app_scheme\` (\`scheme_id\`),
        CONSTRAINT \`fk_app_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`fk_app_scheme\` FOREIGN KEY (\`scheme_id\` ) REFERENCES \`schemes\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Notifications table
    await p.query(`
      CREATE TABLE IF NOT EXISTS \`notifications\` (
        \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`tamil_title\` VARCHAR(255) NOT NULL,
        \`message\` TEXT NOT NULL,
        \`tamil_message\` TEXT NOT NULL,
        \`type\` VARCHAR(50) NOT NULL DEFAULT 'INFO',
        \`date\` DATE DEFAULT NULL,
        \`unread\` BOOLEAN NOT NULL DEFAULT TRUE,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Seed initial data if tables are empty
    await seedInitialData(p);

    isConnected = true;
    console.log('✅ MySQL Database connected & synchronized successfully!');
    return true;
  } catch (err) {
    isConnected = false;
    console.warn('⚠️ MySQL connection note:', err.message);
    console.warn('⚡ Application will operate with high-resilience in-memory fallback if MySQL is offline.');
    return false;
  }
}

/**
 * Seed initial records into MySQL if tables are empty
 */
async function seedInitialData(p) {
  // Check users count
  const [[{ count: userCount }]] = await p.query('SELECT COUNT(*) AS count FROM users');
  if (userCount === 0) {
    console.log('🌱 Seeding initial users into MySQL...');
    const { DEFAULT_USERS } = await import('../data/seedUsers.js');
    for (const u of DEFAULT_USERS) {
      await p.query(
        `INSERT INTO users (id, name, email, mobile, password_hash, role, preferred_language, profile)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=VALUES(name)`,
        [
          u.id,
          u.name,
          u.email,
          u.mobile || '1100',
          u.passwordHash,
          u.role || 'CITIZEN',
          u.preferredLanguage || 'ta',
          JSON.stringify(u.profile || {})
        ]
      );
    }
  }

  // Check schemes count
  const [[{ count: schemeCount }]] = await p.query('SELECT COUNT(*) AS count FROM schemes');
  if (schemeCount === 0) {
    console.log('🌱 Seeding verified schemes into MySQL...');
    const { SCHEMES } = await import('../data/schemes.js');
    for (const s of SCHEMES) {
      await p.query(
        `INSERT INTO schemes (
           id, scheme_name, tamil_name, government_level, department, tamil_department,
           category, tamil_category, description, tamil_description, benefits, tamil_benefits,
           benefit_amount, eligibility_criteria, documents_required, application_process,
           tamil_application_process, application_website, application_centre, helpline, status
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE scheme_name=VALUES(scheme_name)`,
        [
          s.id,
          s.schemeName,
          s.tamilName,
          s.governmentLevel || 'TAMIL_NADU',
          s.department || '',
          s.tamilDepartment || '',
          s.category || 'General',
          s.tamilCategory || 'பொது',
          s.description || '',
          s.tamilDescription || '',
          s.benefits || '',
          s.tamilBenefits || '',
          s.benefitAmount || 0,
          JSON.stringify(s.eligibilityCriteria || {}),
          JSON.stringify(s.documentsRequired || []),
          JSON.stringify(s.applicationProcess || []),
          JSON.stringify(s.tamilApplicationProcess || []),
          s.applicationWebsite || 'https://www.tn.gov.in',
          s.applicationCentre || 'e-Sevai Centre',
          s.helpline || '1100',
          'ACTIVE'
        ]
      );
    }
  }

  // Check centres count
  const [[{ count: centreCount }]] = await p.query('SELECT COUNT(*) AS count FROM centres');
  if (centreCount === 0) {
    console.log('🌱 Seeding e-Sevai centres into MySQL...');
    const { SERVICE_CENTRES } = await import('../data/centres.js');
    for (const c of SERVICE_CENTRES) {
      await p.query(
        `INSERT INTO centres (
           id, name, tamil_name, type, district, taluk, address, tamil_address,
           pincode, phone, email, operating_hours, lat, lng, services_provided
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=VALUES(name)`,
        [
          c.id,
          c.name,
          c.tamilName,
          c.type || 'e-Seva Centre',
          c.district,
          c.taluk || '',
          c.address,
          c.tamilAddress,
          c.pincode || '',
          c.phone || '1100',
          c.email || '',
          c.operatingHours || '09:30 AM - 05:30 PM',
          c.lat,
          c.lng,
          JSON.stringify(c.servicesProvided || [])
        ]
      );
    }
  }

  // Check notifications count
  const [[{ count: notifCount }]] = await p.query('SELECT COUNT(*) AS count FROM notifications');
  if (notifCount === 0) {
    console.log('🌱 Seeding initial notifications into MySQL...');
    const initialNotifs = [
      {
        id: "notif-01",
        title: "Kalaignar Magalir Urimai Thittam - Appeal Window Open",
        tamilTitle: "கலைஞர் மகளிர் உரிமைத் திட்டம் - மேல்முறையீட்டு விண்ணப்பம் தொடக்கம்",
        message: "Citizens whose applications were under verification can now visit their nearest e-Sevai centre with Revenue documents.",
        tamilMessage: "விண்ணப்பங்கள் சரிபார்ப்பில் உள்ள மகளிர் தங்களின் வருமான ஆவணங்களுடன் அருகிலுள்ள இ-சேவை மையத்தை அணுகலாம்.",
        type: "ANNOUNCEMENT",
        date: "2026-03-15"
      },
      {
        id: "notif-02",
        title: "Pudhumai Penn & Tamil Puthalvan - Next Tranche Credited",
        tamilTitle: "புதுமைப் பெண் & தமிழ்ப் புதல்வன் திட்டம் - புதிய தவணை வரவு",
        message: "Monthly financial aid of ₹1,000 has been disbursed directly into verified bank accounts of eligible college students.",
        tamilMessage: "கல்லூரி மாணவ மாணவிகளுக்கான மாதாந்திர உதவித்தொகை ₹1,000 அவர்களின் வங்கிக் கணக்கில் நேரடியாக வரவு வைக்கப்பட்டுள்ளது.",
        type: "DISBURSEMENT",
        date: "2026-03-10"
      },
      {
        id: "notif-03",
        title: "PM-KISAN e-KYC Mandatory for 17th Installment",
        tamilTitle: "PM-KISAN: 17-வது தவணைக்கு e-KYC கட்டாயம்",
        message: "Farmers must complete biometric Aadhaar e-KYC at their local e-Sevai centre to receive upcoming instalment.",
        tamilMessage: "விவசாயிகள் அடுத்த தவணை பெற தங்கள் ஆதார் விரல்ரேகை e-KYC ஐ இ-சேவை மையத்தில் நிறைவு செய்ய வேண்டும்.",
        type: "DEADLINE",
        date: "2026-03-01"
      }
    ];

    for (const n of initialNotifs) {
      await p.query(
        `INSERT INTO notifications (id, title, tamil_title, message, tamil_message, type, date, unread)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title=VALUES(title)`,
        [n.id, n.title, n.tamilTitle, n.message, n.tamilMessage, n.type, n.date, true]
      );
    }
  }
}

export { isConnected };
