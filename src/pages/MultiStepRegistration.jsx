import React, { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Step components defined outside the main component
const StepOne = ({ formData, errors, handleChange }) => (
  <div className="space-y-5">
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          errors.username ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
        }`}
        placeholder="Enter your username"
      />
      {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
        }`}
        placeholder="your@email.com"
      />
      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
        }`}
        placeholder="At least 6 characters"
      />
      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
    </div>

    <div>
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          errors.confirmPassword ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
        }`}
        placeholder="Confirm your password"
      />
      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
    </div>
  </div>
);

const StepTwo = ({ formData, errors, handleChange }) => (
  <div className="space-y-5">
    <div>
      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
        Country
      </label>
      <select
        id="country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          errors.country ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <option value="">Select your country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="UK">United Kingdom</option>
        <option value="AU">Australia</option>
        <option value="IN">India</option>
      </select>
      {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
      <div className="grid grid-cols-3 gap-3">
        {['male', 'female', 'other'].map((gender) => (
          <div key={gender} className="flex items-center">
            <input
              id={gender}
              name="gender"
              type="radio"
              checked={formData.gender === gender}
              onChange={() => handleChange({ target: { name: 'gender', value: gender } })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor={gender} className="ml-2 block text-sm text-gray-700 capitalize">
              {gender}
            </label>
          </div>
        ))}
      </div>
      {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
    </div>

    <div className="flex items-start pt-2">
      <div className="flex items-center h-5">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="acceptTerms" className="font-medium text-gray-700">
          I accept the Terms and Conditions
        </label>
        <p className="text-gray-500">You agree to our Terms of Service and Privacy Policy</p>
        {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
      </div>
    </div>
  </div>
);

const StepThree = ({ formData }) => (
  <div className="space-y-4">
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <h4 className="text-sm font-medium text-blue-800">Account Information</h4>
      <div className="mt-2 space-y-1">
        <p className="text-sm text-gray-900"><span className="font-medium">Username:</span> {formData.username}</p>
        <p className="text-sm text-gray-900"><span className="font-medium">Email:</span> {formData.email}</p>
      </div>
    </div>

    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <h4 className="text-sm font-medium text-blue-800">Personal Details</h4>
      <div className="mt-2 space-y-1">
        <p className="text-sm text-gray-900"><span className="font-medium">Country:</span> {formData.country}</p>
        <p className="text-sm text-gray-900"><span className="font-medium">Gender:</span> {formData.gender}</p>
      </div>
    </div>

    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <h4 className="text-sm font-medium text-blue-800">Agreements</h4>
      <div className="mt-2">
        <p className="text-sm text-gray-900">
          <span className="font-medium">Terms Accepted:</span> {formData.acceptTerms ? (
            <span className="text-green-600">Yes</span>
          ) : (
            <span className="text-red-600">No</span>
          )}
        </p>
      </div>
    </div>
  </div>
);

const MultiStepRegistration = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    gender: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      else if (formData.username.length < 3) newErrors.username = 'Must be at least 3 characters';
      
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Must be at least 6 characters';
      
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (step === 2) {
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setLoading(true);
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        gender: formData.gender
      };

      const response = await axios.post(`${API_URL}/auth/register`, payload);
      setRegistrationSuccess(true);
      setTimeout(() => {
        onSuccess(response.data);
        onClose();
      }, 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      setErrors({ form: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <StepOne formData={formData} errors={errors} handleChange={handleChange} />;
      case 2: return <StepTwo formData={formData} errors={errors} handleChange={handleChange} />;
      case 3: return <StepThree formData={formData} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <motion.div 
          className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="bg-white px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {step === 1 && 'Create Account'}
                  {step === 2 && 'Personal Details'}
                  {step === 3 && 'Review Information'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Step {step} of 3
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8 mb-6">
              <div className="flex items-center justify-center">
                {[1, 2, 3].map((stepNumber) => (
                  <React.Fragment key={stepNumber}>
                    <div className="flex flex-col items-center relative">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                          step === stepNumber
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : step > stepNumber
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300 bg-white text-gray-500'
                        }`}
                        whileHover={{ scale: step >= stepNumber ? 1.05 : 1 }}
                      >
                        {step > stepNumber ? <FiCheck size={20} /> : stepNumber}
                      </motion.div>
                      <div className="absolute top-full mt-2 text-xs font-medium text-gray-500">
                        {stepNumber === 1 && 'Account'}
                        {stepNumber === 2 && 'Details'}
                        {stepNumber === 3 && 'Review'}
                      </div>
                    </div>
                    {stepNumber < 3 && (
                      <div className={`flex-1 h-1 mx-2 transition-colors ${
                        step > stepNumber ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: step > 2 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step > 2 ? 20 : -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {errors.form && (
              <motion.div 
                className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.form}
              </motion.div>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:justify-between rounded-b-2xl">
            {step < 3 ? (
              <motion.button
                onClick={nextStep}
                type="button"
                className="w-full inline-flex justify-center items-center rounded-xl shadow-sm px-6 py-3 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                disabled={
                  (step === 1 && (!formData.username || !formData.email || !formData.password || !formData.confirmPassword)) ||
                  (step === 2 && (!formData.country || !formData.gender || !formData.acceptTerms))
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next
                <FiChevronRight className="ml-2" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                type="button"
                disabled={loading || registrationSuccess}
                className="w-full inline-flex justify-center items-center rounded-xl shadow-sm px-6 py-3 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                whileHover={{ scale: loading || registrationSuccess ? 1 : 1.02 }}
                whileTap={{ scale: loading || registrationSuccess ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : registrationSuccess ? (
                  <div className="flex items-center">
                    <FiCheck className="mr-2" />
                    Success!
                  </div>
                ) : (
                  'Complete Registration'
                )}
              </motion.button>
            )}
            
            {step > 1 && (
              <motion.button
                onClick={prevStep}
                type="button"
                className="mt-3 w-full inline-flex justify-center items-center rounded-xl border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiChevronLeft className="mr-2" />
                Back
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MultiStepRegistration;