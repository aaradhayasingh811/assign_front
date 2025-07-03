// import React, { useState, useEffect } from 'react';
// import { FiBell } from 'react-icons/fi';
// import NotificationList from './NotificationsList';

// const NotificationBell = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [showMultiStepModal, setShowMultiStepModal] = useState(false);

//   // Simulate real-time notifications
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // In a real app, this would come from a WebSocket
//       const newNotification = {
//         id: Date.now(),
//         title: 'New update available',
//         message: 'Click here to update your profile information',
//         type: 'info',
//         read: false,
//         date: new Date().toISOString(),
//       };

//       setUnreadCount(prev => prev + 1);
      
//       // In a real app, you would add this to your notifications list
//       // setNotifications(prev => [newNotification, ...prev]);
//     }, 30000); // Every 30 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const handleNotificationClick = (notification) => {
//     if (notification.type === 'profile_update') {
//       setShowMultiStepModal(true);
//     } else {
//       setSelectedNotification(notification);
//     }
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 rounded-full hover:bg-gray-100 relative"
//       >
//         <FiBell className="text-gray-600 text-xl" />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
//           <div className="p-3 border-b">
//             <h3 className="font-medium">Notifications</h3>
//           </div>
//           <NotificationList onNotificationClick={handleNotificationClick} />
//           <div className="p-3 border-t text-center">
//             <button
//               onClick={() => {
//                 setShowMultiStepModal(true);
//                 setIsOpen(false);
//               }}
//               className="text-blue-500 text-sm hover:underline"
//             >
//               Create New Profile
//             </button>
//           </div>
//         </div>
//       )}

//       {selectedNotification && (
//         <NotificationModal
//           notification={selectedNotification}
//           onClose={() => setSelectedNotification(null)}
//         />
//       )}

//       {showMultiStepModal && (
//         <MultiStepModal
//           onClose={() => setShowMultiStepModal(false)}
//           onSubmit={(data) => {
//             console.log('Form submitted:', data);
//             // Here you would typically send the data to your backend
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default NotificationBell;

import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import NotificationList from './NotificationsList';
import NotificationModal from './NotificationModal';
import MultiStepModal from './MultiStepModal/MultiStepModal';
import useNotifications from '../../hooks/useNotifications.jsx';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showMultiStepModal, setShowMultiStepModal] = useState(false);
  const [pulse, setPulse] = useState(false);

  const {
    notifications,
    loading,
    error,
    markAsRead,
  } = useNotifications();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    
    if (notification.type === 'profile_update') {
      setShowMultiStepModal(true);
    } else {
      setSelectedNotification(notification);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setPulse(false);
        }}
        className="p-2 rounded-full hover:bg-gray-100 relative"
      >
        <FiBell className="text-gray-600 text-xl" />
        {unreadCount > 0 && (
          <span
            className={`absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
              pulse ? 'animate-pulse-once' : ''
            }`}
          >
            {unreadCount}
          </span>
        )}
      </button>

{isOpen && (
  <div className={`
    fixed sm:absolute 
    top-0 sm:top-auto
    left-0 sm:left-auto
    right-0 sm:right-1 md:right-0
    mt-0 sm:mt-2
    w-full sm:w-72 md:w-80
    bg-white
    rounded-t-lg sm:rounded-lg
    shadow-xl
    z-50
    transform 
    sm:transform-none
    max-h-[100vh]
    overflow-y-auto
  `}>
    {/* Header with close button (visible on mobile) */}
    <div className="sticky top-0 p-3 border-b bg-white flex justify-between items-center">
      <h3 className="font-medium">Notifications</h3>
      <button
        onClick={() => setIsOpen(false)}
        className="sm:hidden text-gray-500 hover:text-gray-700"
        aria-label="Close notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>

    {/* Notification list with scroll */}
    <div className="overflow-y-auto max-h-[80vh]">
      <NotificationList
        notifications={notifications}
        loading={loading}
        error={error}
        onNotificationClick={handleNotificationClick}
      />
    </div>

    {/* Footer */}
    {/* <div className="sticky bottom-0 p-3 border-t bg-white text-center">
      <button
        onClick={() => {
          setShowMultiStepModal(true);
          setIsOpen(false);
        }}
        className="text-blue-500 hover:text-blue-700 text-sm font-medium w-full py-2 focus:outline-none"
      >
        Create New Profile
      </button>
    </div> */}
  </div>
)}

      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}

      {showMultiStepModal && (
        <MultiStepModal
          onClose={() => setShowMultiStepModal(false)}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            // Here you would typically send the data to your backend
          }}
        />
      )}
    </div>
  );
};

export default NotificationBell;