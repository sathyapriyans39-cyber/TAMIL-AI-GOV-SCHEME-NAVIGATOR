/**
 * Notification Repository (MySQL persistence for alerts and updates with in-memory fallback)
 */

import { query } from './connection.js';

const FALLBACK_NOTIFICATIONS = [
  {
    id: "notif-01",
    title: "Kalaignar Magalir Urimai Thittam - Appeal Window Open",
    tamilTitle: "கலைஞர் மகளிர் உரிமைத் திட்டம் - மேல்முறையீட்டு விண்ணப்பம் தொடக்கம்",
    message: "Citizens whose applications were under verification can now visit their nearest e-Sevai centre with Revenue documents.",
    tamilMessage: "விண்ணப்பங்கள் சரிபார்ப்பில் உள்ள மகளிர் தங்களின் வருமான ஆவணங்களுடன் அருகிலுள்ள இ-சேவை மையத்தை அணுகலாம்.",
    type: "ANNOUNCEMENT",
    date: "2026-03-15",
    unread: true
  },
  {
    id: "notif-02",
    title: "Pudhumai Penn & Tamil Puthalvan - Next Tranche Credited",
    tamilTitle: "புதுமைப் பெண் & தமிழ்ப் புதல்வன் திட்டம் - புதிய தவணை வரவு",
    message: "Monthly financial aid of ₹1,000 has been disbursed directly into verified bank accounts of eligible college students.",
    tamilMessage: "கல்லூரி மாணவ மாணவிகளுக்கான மாதாந்திர உதவித்தொகை ₹1,000 அவர்களின் வங்கிக் கணக்கில் நேரடியாக வரவு வைக்கப்பட்டுள்ளது.",
    type: "DISBURSEMENT",
    date: "2026-03-10",
    unread: true
  },
  {
    id: "notif-03",
    title: "PM-KISAN e-KYC Mandatory for 17th Installment",
    tamilTitle: "PM-KISAN: 17-வது தவணைக்கு e-KYC கட்டாயம்",
    message: "Farmers must complete biometric Aadhaar e-KYC at their local e-Sevai centre to receive upcoming instalment.",
    tamilMessage: "விவசாயிகள் அடுத்த தவணை பெற தங்கள் ஆதார் விரல்ரேகை e-KYC ஐ இ-சேவை மையத்தில் நிறைவு செய்ய வேண்டும்.",
    type: "DEADLINE",
    date: "2026-03-01",
    unread: true
  }
];

let inMemoryNotifications = [...FALLBACK_NOTIFICATIONS];

function formatNotifRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    tamilTitle: row.tamil_title,
    message: row.message,
    tamilMessage: row.tamil_message,
    type: row.type,
    date: row.date,
    unread: Boolean(row.unread),
    createdAt: row.created_at
  };
}

export async function getNotifications(limit = 10) {
  try {
    const rows = await query('SELECT * FROM notifications ORDER BY date DESC, created_at DESC LIMIT ?', [limit]);
    return rows.map(formatNotifRow);
  } catch (err) {
    console.warn('MySQL getNotifications fallback to in-memory notifications:', err.message);
    return inMemoryNotifications.slice(0, limit);
  }
}

export async function createNotification(notif) {
  const newId = notif.id || `notif-${Date.now()}`;
  const notifObj = {
    id: newId,
    title: notif.title,
    tamilTitle: notif.tamilTitle,
    message: notif.message,
    tamilMessage: notif.tamilMessage,
    type: notif.type || 'INFO',
    date: notif.date || new Date().toISOString().split('T')[0],
    unread: true,
    createdAt: new Date().toISOString()
  };

  try {
    const sql = `
      INSERT INTO notifications (id, title, tamil_title, message, tamil_message, type, date, unread)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      newId,
      notifObj.title,
      notifObj.tamilTitle,
      notifObj.message,
      notifObj.tamilMessage,
      notifObj.type,
      notifObj.date,
      true
    ];
    await query(sql, params);
  } catch (err) {
    console.warn('MySQL createNotification notice:', err.message);
  }

  inMemoryNotifications.unshift(notifObj);
  return notifObj;
}
