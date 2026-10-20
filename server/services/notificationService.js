/**
 * Notification & Auto-Match Engine
 * Dispatches notifications when schemes are added/updated and matches citizen profiles.
 */

import { v4 as uuidv4 } from 'uuid';
import { evaluateEligibility } from './eligibilityEngine.js';

// In-memory notifications store (per-user)
const userNotifications = new Map();

// Global notifications for all users
const systemNotifications = [
  {
    id: "notif-sys-01",
    userId: "all",
    type: "SYSTEM_ANNOUNCEMENT",
    title: "Welcome to Tamil AI Government Scheme Navigator",
    tamilTitle: "தமிழ் அரசு திட்டங்கள் AI வழிகாட்டிக்கு நல்வரவு",
    message: "Complete your profile to automatically discover Tamil Nadu State and Central Government schemes you are eligible for.",
    tamilMessage: "உங்களுக்கு கிடைக்கக்கூடிய மத்திய மற்றும் மாநில அரசு நலத்திட்டங்களை உடனுக்குடன் அறிந்துகொள்ள உங்கள் சுயவிவரத்தை முழுமையாக நிரப்பவும்.",
    schemeId: null,
    date: new Date().toISOString(),
    isRead: false,
    priority: "HIGH"
  },
  {
    id: "notif-sys-02",
    userId: "all",
    type: "NEW_SCHEME",
    title: "Tamil Puthalvan Higher Education Scheme Launched",
    tamilTitle: "தமிழ்ப் புதல்வன் திட்டம் - ₹1,000 மாதாந்திர உதவித்தொகை",
    message: "Male students from TN Govt schools studying degree/diploma can now receive ₹1,000 monthly.",
    tamilMessage: "அரசுப் பள்ளிகளில் படித்து உயர்கல்வி பயிலும் மாணவர்களுக்கு மாதம் ₹1,000 வழங்கும் தமிழ்ப் புதல்வன் திட்டம் தொடங்கப்பட்டுள்ளது.",
    schemeId: "tn-tamil-puthalvan",
    date: new Date(Date.now() - 86400000).toISOString(),
    isRead: false,
    priority: "HIGH"
  },
  {
    id: "notif-sys-03",
    userId: "all",
    type: "DEADLINE_ALERT",
    title: "Post-Matric Scholarship Applications Open for 2026",
    tamilTitle: "போஸ்ட் மெட்ரிக் கல்வி உதவித்தொகை விண்ணப்பங்கள் வரவேற்பு",
    message: "SC/ST/BC/MBC students are requested to submit community and income certificates through college helpdesk.",
    tamilMessage: "SC/ST/BC/MBC மாணவர்கள் தங்கள் கல்வி உதவித்தொகை விண்ணப்பங்களை கல்லூரி மூலம் சமர்ப்பிக்கலாம்.",
    schemeId: "tn-post-matric-scholarship",
    date: new Date(Date.now() - 172800000).toISOString(),
    isRead: false,
    priority: "NORMAL"
  }
];

export function getUserNotifications(userId) {
  const specific = userNotifications.get(userId) || [];
  return [...systemNotifications, ...specific].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function addNotificationForUser(userId, notification) {
  if (!userNotifications.has(userId)) {
    userNotifications.set(userId, []);
  }
  const notif = {
    id: uuidv4(),
    userId,
    ...notification,
    date: new Date().toISOString(),
    isRead: false
  };
  userNotifications.get(userId).push(notif);
  return notif;
}

export function markNotificationAsRead(userId, notificationId) {
  const specific = userNotifications.get(userId);
  if (specific) {
    const target = specific.find(n => n.id === notificationId);
    if (target) target.isRead = true;
  }
  const sysTarget = systemNotifications.find(n => n.id === notificationId);
  if (sysTarget) sysTarget.isRead = true;
  return true;
}

export function broadcastNewScheme(scheme, allUsers = []) {
  const notifsCreated = [];

  // Create system-wide announcement
  const sysNotif = {
    id: uuidv4(),
    userId: "all",
    type: "NEW_SCHEME",
    title: `New Scheme Added: ${scheme.schemeName}`,
    tamilTitle: `புதிய திட்டம் சேர்க்கப்பட்டுள்ளது: ${scheme.tamilName}`,
    message: `Benefit: ${scheme.benefits}. Check if your profile qualifies for this scheme.`,
    tamilMessage: `பயன்கள்: ${scheme.tamilBenefits}. உங்கள் சுயவிவரம் இத்திட்டத்திற்கு பொருந்துகிறதா என்பதை பார்க்கவும்.`,
    schemeId: scheme.id,
    date: new Date().toISOString(),
    isRead: false,
    priority: "HIGH"
  };
  systemNotifications.unshift(sysNotif);
  notifsCreated.push(sysNotif);

  // Auto match with existing user profiles and generate personalized alerts
  if (Array.isArray(allUsers)) {
    allUsers.forEach(user => {
      const match = evaluateEligibility(user.profile, scheme);
      if (match.isPotentiallyEligible) {
        const userNotif = addNotificationForUser(user.id, {
          type: "ELIGIBILITY_MATCH",
          title: `🎯 You May Be Eligible: ${scheme.schemeName}`,
          tamilTitle: `🎯 நீங்கள் தகுதி பெற வாய்ப்புள்ளது: ${scheme.tamilName}`,
          message: `Great news! Your profile matches ${match.matchPercentage}% with the newly added scheme (${scheme.department}).`,
          tamilMessage: `மகிழ்ச்சியான செய்தி! உங்கள் சுயவிவரம் புதிதாக சேர்க்கப்பட்ட இத்திட்டத்துடன் ${match.matchPercentage}% பொருந்துகிறது.`,
          schemeId: scheme.id,
          priority: "HIGH"
        });
        notifsCreated.push(userNotif);
      }
    });
  }

  return notifsCreated;
}
