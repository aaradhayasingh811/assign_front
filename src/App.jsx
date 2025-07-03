// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { NotificationProvider } from './contexts/NotificationContext';
// import Layout from './components/Layout';
// import HomePage from './pages/HomePage';
// import NotificationsPage from './pages/NotificationsPage';
// import LoginPage from './pages/LoginPage';
// // import RegisterPage from './pages/RegisterPage';
// import ProfilePage from './pages/ProfilePage';
// import ProtectedRoute from './components/ProtectedRoute';
// import { SocketProvider } from './contexts/SocketContext.jsx';
// import MultiStepRegistration from './pages/MultiStepRegistration.jsx';
// import { useState } from 'react';
// import RegistrationPage from './pages/RegistrationPage.jsx';

// function App() {
//   const token = localStorage.getItem('token');
//   console.log('Token from localStorage:', token);
//   const [showRegistration, setShowRegistration] = useState(false);


//   return (
//     <Router>
//       <NotificationProvider>
//         <Layout>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegistrationPage />} />

//             {/* Protected Routes (with socket) */}
//             {token && (
//               <Route
//                 path="/*"
//                 element={
//                   <SocketProvider>
//                     <Routes>
//                       <Route
//                         path="/notifications"
//                         element={
//                           <ProtectedRoute>
//                             <NotificationsPage />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/profile"
//                         element={
//                           <ProtectedRoute>
//                             <ProfilePage />
//                           </ProtectedRoute>
//                         }
//                       />
//                     </Routes>
//                   </SocketProvider>
//                 }
//               />
//             )}
//           </Routes>
//         </Layout>
//       </NotificationProvider>
//     </Router>
//   );
// }
// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotificationsPage from './pages/NotificationsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { SocketProvider } from './contexts/SocketContext';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <Layout>
          <Routes>
            {/* Public Routes (No SocketProvider) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />

            {/* Protected Routes (Wrap with SocketProvider) */}
            <Route
              path="/notifications"
              element={
                <SocketProvider>
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                </SocketProvider>
              }
            />
            <Route
              path="/profile"
              element={
                <SocketProvider>
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                </SocketProvider>
              }
            />
          </Routes>
        </Layout>
      </NotificationProvider>
    </Router>
  );
}

export default App;
