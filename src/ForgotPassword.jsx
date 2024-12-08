import React, { useState } from 'react';
import { f, gS } from '../public/functions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }else{
      const scheme = gS
      let res = await f(`send-flink/${email}`,scheme)
      if (res.success) {
        setSuccessMessage(res.message);
      }else{
        setErrorMessage(res.message);
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email address"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          {/* Success Message */}
          {successMessage && ( 
            <p className="text-sm text-green-500">{successMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
