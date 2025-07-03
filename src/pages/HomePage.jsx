// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
                Stay updated with real-time notifications
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mb-6 sm:mb-8 mx-auto lg:mx-0">
                Never miss important updates with our powerful notification system.
                Manage all your alerts in one place with our intuitive interface.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Link
                  to="/notifications"
                  className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-base sm:text-lg font-medium hover:bg-blue-50 transition-colors text-center"
                >
                  View Notifications
                </Link>
                <Link
                  to="/features"
                  className="bg-transparent border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-base sm:text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="mt-10 sm:mt-12 lg:mt-0">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md mx-auto lg:max-w-none">
                <div className="p-3 sm:p-4 bg-gray-50 border-b">
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-2"></div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5 sm:pt-1">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            Meeting Reminder
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            Team sync in 15 minutes
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5 sm:pt-1">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            Task Completed
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            "Update homepage design" marked as done
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5 sm:pt-1">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            Warning
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            Storage almost full (85% used)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Powerful notification features
            </h2>
            <p className="mt-3 max-w-2xl text-base sm:text-lg md:text-xl text-gray-500 mx-auto">
              Everything you need to stay informed and in control
            </p>
          </div>

          <div className="mt-12 sm:mt-20">
            <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="pt-4 sm:pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-6 sm:pb-8 h-full">
                  <div className="-mt-4 sm:-mt-6">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center justify-center p-2 sm:p-3 bg-indigo-500 rounded-md shadow-lg">
                        <svg
                          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-6 sm:mt-8 text-lg font-medium text-gray-900 tracking-tight text-center">
                      Real-time Updates
                    </h3>
                    <p className="mt-3 sm:mt-5 text-sm sm:text-base text-gray-500 text-center">
                      Get instant notifications as they happen, with no delay or
                      refresh required. Our system keeps you in the loop with
                      live updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="pt-4 sm:pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-6 sm:pb-8 h-full">
                  <div className="-mt-4 sm:-mt-6">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center justify-center p-2 sm:p-3 bg-indigo-500 rounded-md shadow-lg">
                        <svg
                          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-6 sm:mt-8 text-lg font-medium text-gray-900 tracking-tight text-center">
                      Secure & Private
                    </h3>
                    <p className="mt-3 sm:mt-5 text-sm sm:text-base text-gray-500 text-center">
                      Your data is encrypted and protected. We prioritize your
                      privacy and never share your information with third
                      parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="pt-4 sm:pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-6 sm:pb-8 h-full">
                  <div className="-mt-4 sm:-mt-6">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center justify-center p-2 sm:p-3 bg-indigo-500 rounded-md shadow-lg">
                        <svg
                          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-6 sm:mt-8 text-lg font-medium text-gray-900 tracking-tight text-center">
                      Customizable Settings
                    </h3>
                    <p className="mt-3 sm:mt-5 text-sm sm:text-base text-gray-500 text-center">
                      Tailor your notification preferences to your needs. Choose
                      what you want to be notified about and how you receive
                      alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
    <div className="bg-gray-50">
  <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <div className="text-center lg:text-left mb-6 lg:mb-0">
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
        <span className="block">Ready to dive in?</span>
        <span className="block text-indigo-600">
          Start managing your notifications today.
        </span>
      </h2>
    </div>
    <div className="flex justify-center lg:justify-start">
      <div className="rounded-md shadow">
        <Link
          to="/notifications"
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-8 transition-colors duration-200"
        >
          Get started
        </Link>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default HomePage;