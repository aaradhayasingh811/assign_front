// services/notifications.js
const API_BASE_URL = 'https://your-api-url.com/api';

export const fetchNotifications = async () => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        notifications: [
          {
            id: 1,
            title: 'Welcome to our app!',
            message: 'Thank you for signing up. We hope you enjoy using our platform.',
            isRead: false,
            type: 'info',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 2,
            title: 'New feature available',
            message: 'Check out our latest feature that can help you be more productive.',
            isRead: true,
            type: 'update',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 3,
            title: 'Complete your profile',
            message: 'Please complete your profile to access all features.',
            isRead: false,
            type: 'multistep',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
          },
        ],
        unreadCount: 2,
      });
    }, 500);
  });
};

export const markAsRead = async (notificationId) => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Notification ${notificationId} marked as read`);
      resolve();
    }, 300);
  });
};