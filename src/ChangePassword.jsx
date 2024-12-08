import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { f, pS } from '../public/functions';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''),
  {token} = useParams()
  if (!token) {
    alert('invalid link!')
    return;
  } 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if ( !newPassword || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password must match.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }
    const scheme = pS
    scheme.body = JSON.stringify({password: newPassword})
    let res = await f(`reset-password/${token}`,scheme)
    if (res.success) {
      setSuccessMessage(res.message);
      Navigate('/');
    }else{
      alert(res.message);
    }
    setTimeout(() => {
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Change Password</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
         
          {/* New Password */}
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm your new password"
            />
          </div>

          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

          {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
