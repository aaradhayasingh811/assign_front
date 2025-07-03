import React from 'react';

const StepThree = ({ formData, onConfirm, onBack }) => {
  const getGenderLabel = (value) => {
    switch (value) {
      case 'male': return 'Male';
      case 'female': return 'Female';
      case 'other': return 'Other';
      case 'prefer-not-to-say': return 'Prefer not to say';
      default: return 'Not specified';
    }
  };

  const getCountryLabel = (value) => {
    switch (value) {
      case 'us': return 'United States';
      case 'ca': return 'Canada';
      case 'uk': return 'United Kingdom';
      case 'au': return 'Australia';
      case 'in': return 'India';
      default: return 'Not specified';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Please review your information:</h3>
        
        <div className="mb-3">
          <h4 className="font-medium text-gray-700">User Information</h4>
          <p className="text-gray-600">Username: {formData.username || 'Not provided'}</p>
          <p className="text-gray-600">Email: {formData.email || 'Not provided'}</p>
          <p className="text-gray-600">Password: {'*'.repeat(formData.password?.length || 0)}</p>
        </div>

        <div className="mb-3">
          <h4 className="font-medium text-gray-700">Additional Details</h4>
          <p className="text-gray-600">Country: {getCountryLabel(formData.country)}</p>
          <p className="text-gray-600">Gender: {getGenderLabel(formData.gender)}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default StepThree;