
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiBell, FiUser, FiPlus, FiX, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
// import useNotifications from '../hooks/useNotifications';
// import NotificationList from '../components/Notifications/NotificationsList';
// import NotificationModal from '../components/Notifications/NotificationModal';
// import ProfileForm from '../components/ProfileForm';
// import CreateNotificationForm from '../components/Notifications/CreateNotificationForm';
// import RefreshButton from '../components/RefreshButton';
// const NotificationsPage = () => {
//   const {
//     notifications,
//     unreadCount,
//     loading,
//     error,
//     markAsRead,
//     createNotification,
//     deleteNotification,
//     setError
//   } = useNotifications();

//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   useEffect(()=>{
//     // window.location.reload();
// //   },[])

//   const handleNotificationClick = async (notification) => {
//     if (!notification.read) {
//       await markAsRead(notification._id);
//     }
    
//     if (notification.type === 'profile_update') {
//       setShowProfileModal(true);
//     } else {
//       setSelectedNotification(notification);
//     }
//   };

//   const handleCreateNotification = async (formData) => {
//     console.log('Creating notification with data:', formData);
//     // try {
//       const res = await createNotification(formData);
//       console.log(res, "Notification created successfully");
//       setShowCreateModal(false);
//     // } 
//     // catch (err) {
//     //   setError(err.message);
//     // }
//   };

//   // Animation variants
//   const pageVariants = {
//     initial: { opacity: 0 },
//     in: { opacity: 1, transition: { duration: 0.3 } },
//     out: { opacity: 0 }
//   };

//   const notificationItemVariants = {
//     initial: { y: 20, opacity: 0 },
//     animate: { y: 0, opacity: 1 },
//     exit: { opacity: 0 }
//   };

//   return (
//     <motion.div
//       initial="initial"
//       animate="in"
//       exit="out"
//       variants={pageVariants}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
//     >
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <FiBell className="h-6 w-6 text-blue-500 mr-2" />
//               <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
//               {unreadCount > 0 && (
//                 <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                   {unreadCount} unread
//                 </span>
//               )}
//               <button 
//                 onClick={() => window.location.reload()} // Simple refresh fallback
//                 disabled={loading}
//                 className="ml-4 p-1 rounded-full hover:bg-gray-100"
//               >
//                 <FiRefreshCw className={`h-4 w-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
//               </button>
//                            {/* <RefreshButton loading={loading} /> */}

              
//             </div>
            
//             {/* Desktop buttons */}
//             <div className="hidden md:flex space-x-3">
//               <button
//                 onClick={() => setShowProfileModal(true)}
//                 className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//               >
//                 <FiUser className="mr-2" /> Profile
//               </button>
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//               >
//                 <FiPlus className="mr-2" /> Create
//               </button>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
//               >
//                 <span className="sr-only">Open menu</span>
//                 {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiChevronRight className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden overflow-hidden"
//             >
//               <div className="pt-2 pb-4 px-4 space-y-2">
//                 <button
//                   onClick={() => {
//                     setShowProfileModal(true);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   <FiUser className="mr-2" /> Profile
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowCreateModal(true);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   <FiPlus className="mr-2" /> Create Notification
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       {/* Main content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-xl shadow-lg overflow-hidden"
//         >
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">
//               Your Notifications
//               {unreadCount > 0 && (
//                 <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                   {unreadCount} unread
//                 </span>
//               )}
//             </h2>
//           </div>

//           <AnimatePresence>
//             {loading ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="p-8 flex justify-center"
//               >
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               </motion.div>
//             ) : (
//               <motion.ul
//                 initial="initial"
//                 animate="animate"
//                 className="divide-y divide-gray-200"
//               >
//                 <AnimatePresence>
//                   <NotificationList
//                     notification={notifications}
//                     onNotificationClick={handleNotificationClick}
//                     onDeleteNotification={deleteNotification}
//                   />
//                 </AnimatePresence>
//               </motion.ul>
//             )}
//           </AnimatePresence>

//           {/* {notifications.length === 0 && !loading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="p-8 text-center text-gray-500"
//             >
//               No notifications available
//             </motion.div>
//           )} */}
//         </motion.div>
//       </main>

//       {/* Modals */}
//       <AnimatePresence>
//         {selectedNotification && (
//           <NotificationModal
//             notification={selectedNotification}
//             onClose={() => setSelectedNotification(null)}
//             onDelete={() => {
//               deleteNotification(selectedNotification._id);
//               setSelectedNotification(null);
//             }}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showCreateModal && (
//           <CreateNotificationForm
//             onClose={() => setShowCreateModal(false)}
//             onSubmit={handleCreateNotification}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showProfileModal && (
//           <ProfileForm
//             onClose={() => setShowProfileModal(false)}
//             onSubmit={(data) => {
//               console.log('Profile updated:', data);
//               // Handle profile update
//             }}
//           />
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default NotificationsPage;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiUser, FiPlus, FiX, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
import useNotifications from '../hooks/useNotifications';
import NotificationList from '../components/Notifications/NotificationsList';
import NotificationModal from '../components/Notifications/NotificationModal';
import ProfileForm from '../components/ProfileForm';
import CreateNotificationForm from '../components/Notifications/CreateNotificationForm';

const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    createNotification,
    deleteNotification,
    setError,
    fetchNotifications // Assuming your useNotifications hook exposes this
  } = useNotifications();

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Set up polling for notifications
  useEffect(() => {
    const pollInterval = 3000; // 3 seconds
    
    const pollNotifications = async () => {
      try {
        await fetchNotifications();
        setLastUpdated(Date.now());
      } catch (err) {
        console.error('Error polling notifications:', err);
      }
    };

    // Initial fetch
    pollNotifications();

    // Set up interval
    const intervalId = setInterval(pollNotifications, pollInterval);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification._id);
    }
    
    if (notification.type === 'profile_update') {
      setShowProfileModal(true);
    } else {
      setSelectedNotification(notification);
    }
  };

  const handleCreateNotification = async (formData) => {
    try {
      await createNotification(formData);
      setShowCreateModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1, transition: { duration: 0.3 } },
    out: { opacity: 0 }
  };

  const notificationItemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FiBell className="h-6 w-6 text-blue-500 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {unreadCount} unread
                </span>
              )}
              <div className="ml-2 text-xs text-gray-500">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </div>
            </div>
            
            {/* Desktop buttons */}
            <div className="hidden md:flex space-x-3">
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FiUser className="mr-2" /> Profile
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <FiPlus className="mr-2" /> Create
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiChevronRight className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-4 px-4 space-y-2">
                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <FiUser className="mr-2" /> Profile
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FiPlus className="mr-2" /> Create Notification
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Your Notifications
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {unreadCount} unread
                </span>
              )}
            </h2>
          </div>

          <AnimatePresence>
            {loading && notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 flex justify-center"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </motion.div>
            ) : (
              <motion.ul
                initial="initial"
                animate="animate"
                className="divide-y divide-gray-200"
              >
                <AnimatePresence>
                  <NotificationList
                    notification={notifications}
                    onNotificationClick={handleNotificationClick}
                    onDeleteNotification={deleteNotification}
                  />
                </AnimatePresence>
              </motion.ul>
            )}
          </AnimatePresence>

          {notifications.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center text-gray-500"
            >
              No notifications available
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {selectedNotification && (
          <NotificationModal
            notification={selectedNotification}
            onClose={() => setSelectedNotification(null)}
            onDelete={() => {
              deleteNotification(selectedNotification._id);
              setSelectedNotification(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateModal && (
          <CreateNotificationForm
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateNotification}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProfileModal && (
          <ProfileForm
            onClose={() => setShowProfileModal(false)}
            onSubmit={(data) => {
              console.log('Profile updated:', data);
              // Handle profile update
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationsPage;