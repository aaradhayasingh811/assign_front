import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MultiStepModal = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    gender: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            formData={formData}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <StepTwo
            formData={formData}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <StepThree
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {step === 1 && 'Create Account'}
                  {step === 2 && 'Additional Information'}
                  {step === 3 && 'Review Details'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Step {step} of 3
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Progress steps */}
            <div className="mt-6">
              <div className="flex items-center">
                {[1, 2, 3].map((stepNumber) => (
                  <React.Fragment key={stepNumber}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          step === stepNumber
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : step > stepNumber
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300 text-gray-500'
                        }`}
                      >
                        {stepNumber}
                      </div>
                    </div>
                    {stepNumber < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step > stepNumber ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-4">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-between">
            {step < 3 ? (
              <button
                onClick={nextStep}
                type="button"
                className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                disabled={step === 1 && (!formData.username || !formData.email || !formData.password)}
              >
                Next
                <FiChevronRight className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
            )}
            
            {step > 1 && (
              <button
                onClick={prevStep}
                type="button"
                className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                <FiChevronLeft className="mr-2" />
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepModal;