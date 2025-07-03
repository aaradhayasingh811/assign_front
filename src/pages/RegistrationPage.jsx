import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
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
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [step]);

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      else if (formData.username.length < 3) newErrors.username = 'Must be at least 3 characters';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    } else if (step === 2) {
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'Must accept terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => validateStep(step) && setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      step < 3 ? nextStep() : handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setLoading(true);
    try {
      const { username, email, password, country, gender } = formData;
      await axios.post(`${API_URL}/auth/register`, { username, email, password, country, gender });
      setRegistrationSuccess(true);
      setTimeout(() => navigate('/login', { state: { registrationSuccess: true } }), 1500);
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      label: 'Account Info',
      component: (
        <div className="grid gap-4">
          {['username', 'email', 'password', 'confirmPassword'].map((field, i) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                ref={i === 0 ? firstInputRef : null}
                type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`mt-1 w-full p-2 border rounded-md ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>
      )
    },
    {
      label: 'Personal Info',
      component: (
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select
              ref={firstInputRef}
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`mt-1 w-full p-2 border rounded-md ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select</option>
              {["IN", "US", "UK", "CA"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex gap-4 mt-1">
              {["male", "female", "other"].map(g => (
                <label key={g} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender === g}
                    onChange={() => handleChange({ target: { name: 'gender', value: g } })}
                  />
                  <span className="capitalize">{g}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>
          <label className="inline-flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <span>I accept the <a href="#" className="text-blue-600 underline">terms & conditions</a></span>
          </label>
          {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}
        </div>
      )
    },
    {
      label: 'Review',
      component: (
        <div className="grid gap-2 text-sm text-gray-700">
          <p><strong>Username:</strong> {formData.username}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Country:</strong> {formData.country}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Accepted Terms:</strong> {formData.acceptTerms ? 'Yes' : 'No'}</p>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

      <div className="flex items-center justify-between mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold border-2 ${
                step === i + 1 ? 'bg-blue-500 text-white border-blue-500' : step > i + 1 ? 'bg-green-500 text-white border-green-500' : 'text-gray-500 border-gray-300'
              }`}
            >
              {step > i + 1 ? <FiCheck /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className="w-6 h-0.5 bg-gray-300"></div>}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {steps[step - 1].component}
        </motion.div>
      </AnimatePresence>

      {errors.form && <div className="text-red-600 text-sm mt-4">{errors.form}</div>}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Back</button>
        )}
        {step < steps.length ? (
          <button
            onClick={nextStep}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next <FiChevronRight className="inline ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading || registrationSuccess}
            className={`ml-auto px-4 py-2 rounded ${loading || registrationSuccess ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
          >
            {loading ? 'Submitting...' : registrationSuccess ? 'Success!' : 'Register'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;