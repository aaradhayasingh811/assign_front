import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const CreateNotificationForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: '',
    action: 'none',
    from: '',
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.post('http://localhost:5000/api/notifications', formData,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setResponse({ type: 'success', data: res.data });
      setFormData({
        title: '',
        message: '',
        type: '',
        action: 'none',
        from: '',
      });
      onSubmit?.(res.data);
      onClose?.();
    } catch (error) {
      setResponse({
        type: 'error',
        data: error.response?.data?.message || 'Error creating notification',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Create Notification</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['title', 'message', 'from'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {field === 'from' ? 'To ' : field}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Select type</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="alert">Alert</option>
              <option value="feature">Feature</option>
              <option value="profile_update">Profile Update</option>
            </select>
          </div>

          {/* Action Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
            <select
              name="action"
              value={formData.action}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="none">None</option>
              <option value="redirect">Redirect</option>
              <option value="modal">Modal</option>
              <option value="profile_update">Profile Update</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Creating...' : 'Create Notification'}
          </button>
        </form>

        {response && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm text-center ${
              response.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {response.type === 'success'
              ? 'Notification created successfully!'
              : `Error: ${response.data}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNotificationForm;
