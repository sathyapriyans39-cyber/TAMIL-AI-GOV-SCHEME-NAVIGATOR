/**
 * Notifications API Routes
 */

import express from 'express';
import { getUserNotifications, markNotificationAsRead } from '../services/notificationService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET notifications for current user
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user ? req.user.id : 'all';
  const notifications = getUserNotifications(userId);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  res.json({
    success: true,
    unreadCount,
    notifications
  });
});

// Mark notification as read
router.put('/:id/read', authenticateToken, (req, res) => {
  const userId = req.user ? req.user.id : 'all';
  markNotificationAsRead(userId, req.params.id);
  res.json({ success: true, message: 'Notification marked as read' });
});

export default router;
