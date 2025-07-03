import React from 'react';
import { FiBell, FiAlertCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';

const NotificationItem = ({ notification, onClick }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'alert':
        return <FiAlertCircle className="text-red-500" />;
      case 'warning':
        return <FiAlertCircle className="text-yellow-500" />;
      case 'info':
        return <FiInfo className="text-blue-500" />;
      case 'feature':
        return <FiCheckCircle className="text-green-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  return (
    <div
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
        !notification.read ? 'bg-blue-50 font-semibold' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">{notification.title}</h3>
          <p className="text-sm text-gray-600">{notification.message}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(notification.date).toLocaleString()}
          </p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;