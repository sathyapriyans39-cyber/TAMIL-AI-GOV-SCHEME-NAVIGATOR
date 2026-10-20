/**
 * Notifications Routes
 * In-app notifications for scheme updates and announcements.
 * Backed by MySQL database with fallback.
 */

import express from 'express';
import { getUserNotifications, markNotificationAsRead } from '../services/notificationService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getNotifications } from '../db/notificationRepo.js';

const router = express.Router();

// GET /api/notifications from MySQL
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'all';
    let dbNotifs = [];
    try {
      dbNotifs = await getNotifications(20);
    } catch (e) {
      console.warn('MySQL notifications read error:', e.message);
    }

    const memoryNotifs = getUserNotifications(userId);

    // Merge unique by ID
    const seen = new Set();
    const combined = [];

    for (const n of [...dbNotifs, ...memoryNotifs]) {
      const key = n.id || n.title;
      if (!seen.has(key)) {
        seen.add(key);
        combined.push({
          id: n.id,
          userId: n.userId || 'all',
          title: n.title,
          tamilTitle: n.tamilTitle || n.tamil_title,
          message: n.message,
          tamilMessage: n.tamilMessage || n.tamil_message,
          type: n.type,
          date: n.date,
          isRead: n.unread !== undefined ? !n.unread : (n.isRead || false),
          priority: n.priority || 'NORMAL'
        });
      }
    }

    const unreadCount = combined.filter(n => !n.isRead).length;

    res.json({
      success: true,
      unreadCount,
      notifications: combined
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve notifications: ' + err.message });
  }
});

// PUT /api/notifications/:id/read
router.put('/:id/read', authenticateToken, (req, res) => {
  const userId = req.user ? req.user.id : 'all';
  markNotificationAsRead(userId, req.params.id);
  res.json({ success: true, message: 'Notification marked as read' });
});

export default router;
