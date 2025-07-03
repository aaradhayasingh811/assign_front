import { useState, useEffect, useContext } from 'react';
import { notificationAPI } from '../services/api';
import { SocketContext } from '../contexts/SocketContext';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { socket } = useContext(SocketContext);

  // Fetch initial notifications and count
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [notificationsRes, countRes] = await Promise.all([
          notificationAPI.getAll(),
          notificationAPI.getUnreadCount(),
        ]);
        console.log('Fetched notifications:', notificationsRes);
        setNotifications(notificationsRes);
        setUnreadCount(countRes.count);
      } catch (err) {
        setError(err.message || 'Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Socket.io real-time updates
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    const handleNotificationRead = ({ id }) => {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    socket.on('new_notification', handleNewNotification);
    socket.on('notification_read', handleNotificationRead);

    return () => {
      socket.off('new_notification', handleNewNotification);
      socket.off('notification_read', handleNotificationRead);
    };
  }, [socket]);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      setError(err.message || 'Failed to mark as read');
    }
  };

  // Create new notification
  const createNotification = async (notificationData) => {
    try {
      const newNotification = await notificationAPI.create(notificationData);
      setNotifications((prev) => [newNotification, ...prev]);
      return newNotification;
    } catch (err) {
      setError(err.message || 'Failed to create notification');
      throw err;
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      await notificationAPI.delete(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      // Update unread count if notification was unread
      const notification = notifications.find((n) => n._id === id);
      if (notification && !notification.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      setError(err.message || 'Failed to delete notification');
      throw err;
    }
  };

   const fetchNotifications = async () => {
    try {
      const [notificationsRes, countRes] = await Promise.all([
        notificationAPI.getAll(),
        notificationAPI.getUnreadCount(),
      ]);
      setNotifications(notificationsRes);
      setUnreadCount(countRes.count);
    } catch (err) {
      setError(err.message || 'Failed to fetch notifications');
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    createNotification,
    deleteNotification,
    setError,
    fetchNotifications
  };
};

export default useNotifications;