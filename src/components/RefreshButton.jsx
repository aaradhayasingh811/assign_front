import { useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const RefreshButton = ({ loading }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 5000); // Reload every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <button
      onClick={() => window.location.reload()}
      disabled={loading}
      className="ml-4 p-1 rounded-full hover:bg-gray-100"
    >
      <FiRefreshCw className={`h-4 w-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
    </button>
  );
};

export default RefreshButton;
