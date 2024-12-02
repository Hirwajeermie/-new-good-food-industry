// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePages = () => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const links = [
    { name: 'Raporo yibigori bishyashya', path: '/ProductForm' },
    { name: 'Raporo yo Gutunganywa 1', path: '/ProductFormPre'},
    { name: 'Raporo yibigori bigiye gukoborwa', path: '/ProductFormChe' },
   // { name: 'Raporo ya Sitoke', path: '/ProductFormStc' },
    { name: 'Raporo ya Buranda yakozwe', path: '/ProductFormBranPre' },
    { name: 'Raporo ya Buranda Yagurishijwe', path: '/ProductFormBranSel' },
    { name: 'Kawunga Yagiye kwisoko', path: '/ProductFormSel' },
    { name: 'Ugemuye kwisoko', path: '/ProductFormOut' },
    { name: 'Kawunga Yagarutse', path: '/ProductFormBack' },
    { name: 'Depanse', path: '/ProductFormDep' }, 
    { name: 'List Yabakozi Nimishahara', path: '/ProductFormEmp' },
    
  ];

  // Filter links based on search query
  const filteredLinks = links.filter(link =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    // Clear authentication token from localStorage
    localStorage.removeItem('userAuthenticated');
    // Redirect to login page
    navigate('/login-page');
  };

  return (
    <div className="d-flex flex flex-col items-center justify-center min-h-screen bg-indigo-100 px-4">
      <h1 className="d-flex text-center text-4xl font-bold text-indigo-700 mb-8">RAPORO YURUGANDA</h1>
      <h6 className="d-flex text-center text-2xl font-bold text-indigo-700 mb-8">New Good Food Ltd</h6>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="d-flex flex mb-8 px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500"
      />

      {/* Filtered Links Display */}
      <div className="space-y-4 w-full md:w-auto md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
        {filteredLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="d-flex flex px-6 py-3 text-lg font-semibold text-indigo-600 bg-white rounded-lg shadow-md hover:bg-indigo-50 text-center"
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePages;
