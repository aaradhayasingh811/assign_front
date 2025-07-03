import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SocketContext } from '../contexts/SocketContext';
import NotificationBell from './Notifications/NotificationBell';
import { FiMenu, FiX } from 'react-icons/fi';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { socket } = useContext(SocketContext) || {};
  const token = localStorage.getItem('token');

  const isActive = (path) =>
    location.pathname === path
      ? 'text-indigo-600 font-semibold'
      : 'text-gray-500 hover:text-indigo-500';

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
                NotifyApp
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden sm:flex space-x-6 text-sm">
                <Link to="/" className={isActive('/')}>
                  Home
                </Link>
                <Link to="/login" className={isActive('/login')}>
                  Login
                </Link>
                <Link to="/notifications" className={isActive('/notifications')}>
                  Notifications
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {socket && <NotificationBell />}
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition"
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
            <nav className="px-4 py-4 space-y-2 text-sm">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md ${isActive('/')}`}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/login"
                className={`block px-3 py-2 rounded-md ${isActive('/login')}`}
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
              <Link
                to="/notifications"
                className={`block px-3 py-2 rounded-md ${isActive('/notifications')}`}
                onClick={toggleMobileMenu}
              >
                Notifications
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white">NotifyApp</h3>
              <p className="text-sm text-gray-400 mt-1">
                Stay updated with real-time notifications.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253..." />
                </svg>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2..." />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NotifyApp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
