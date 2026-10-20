/**
 * Seed users for MySQL database initialization and fallback
 */

import bcrypt from 'bcryptjs';

export const DEFAULT_USERS = [
  {
    id: "usr-admin-01",
    name: "Dr. S. Kabilan (TN Welfare Admin)",
    email: "admin@tamilnadugov.in",
    mobile: "9876543210",
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "ADMIN",
    preferredLanguage: "ta",
    profile: {
      name: "Dr. S. Kabilan",
      age: 42,
      gender: "MALE",
      state: "Tamil Nadu",
      district: "Chennai",
      annualIncome: 650000,
      occupation: "Government Employee",
      isStudent: false,
      community: "BC"
    },
    savedSchemes: [],
    createdAt: new Date().toISOString()
  },
  {
    id: "usr-citizen-01",
    name: "Kavitha Selvam",
    email: "kavitha@example.com",
    mobile: "9443322110",
    passwordHash: bcrypt.hashSync("user123", 10),
    role: "CITIZEN",
    preferredLanguage: "ta",
    profile: {
      name: "Kavitha Selvam",
      age: 20,
      gender: "FEMALE",
      state: "Tamil Nadu",
      district: "Madurai",
      annualIncome: 180000,
      occupation: "Student",
      isStudent: true,
      studiedInGovtSchool6to12: true,
      community: "MBC"
    },
    savedSchemes: [],
    createdAt: new Date().toISOString()
  }
];
