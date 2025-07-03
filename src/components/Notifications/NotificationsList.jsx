// // NotificationsList.jsx
// import React from 'react';
// import { useNotifications } from '../../hooks/useNotifications.jsx';
// import NotificationItem from './NotificationItem';
// import { styled } from '@mui/system';

// const Container = styled('div')({
//   maxWidth: '600px',
//   margin: '0 auto',
//   padding: '20px',
//   backgroundColor: '#f5f5f5',
//   borderRadius: '8px',
//   boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
// });

// const Header = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: '20px',
//   paddingBottom: '10px',
//   borderBottom: '1px solid #e0e0e0',
// });

// const Title = styled('h2')({
//   margin: 0,
//   fontSize: '1.5rem',
// });

// const UnreadBadge = styled('span')(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: 'white',
//   borderRadius: '50%',
//   padding: '4px 8px',
//   fontSize: '0.8rem',
//   marginLeft: '8px',
// }));

// const List = styled('div')({
//   maxHeight: '70vh',
//   overflowY: 'auto',
// });

// const NotificationsList = () => {
//   const { notification, unreadCount, isLoading, handleNotificationClick } = useNotifications();

//   if (isLoading) {
//     return <Container>Loading notification...</Container>;
//   }

//   return (
//     <Container>
//       <Header>
//         <Title>
//           Notification
//           {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
//         </Title>
//       </Header>
//       <List>
//         {notification.length === 0 ? (
//           <div>No notification to display</div>
//         ) : (
//           notification.map(notification => (
//             <NotificationItem
//               key={notification.id}
//               notification={notification}
//               onClick={handleNotificationClick}
//             />
//           ))
//         )}
//       </List>
//     </Container>
//   );
// };

// export default NotificationsList;

import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ 
  notification , 
  loading = false, 
  error = null, 
  onNotificationClick 
}) => {
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error loading notification</div>;
  }

  console.log(notification,"notification in list");

  const unreadNotifications = notification.filter(n => !n.read);
  const readNotifications = notification.filter(n => n.read);

  return (
    <div className="max-h-[500px] overflow-y-auto">
      {unreadNotifications.length > 0 && (
        <div className="sticky top-0 bg-white z-10 p-2 border-b">
          <h3 className="text-sm font-semibold text-gray-700">New</h3>
        </div>
      )}
      {unreadNotifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={() => onNotificationClick(notification)}
        />
      ))}

      {readNotifications.length > 0 && (
        <div className="sticky top-0 bg-white z-10 p-2 border-b">
          <h3 className="text-sm font-semibold text-gray-700">Earlier</h3>
        </div>
      )}
      {readNotifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={() => onNotificationClick(notification)}
        />
      ))}

      {notification.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No notification available
        </div>
      )}
    </div>
  );
};

export default NotificationList;