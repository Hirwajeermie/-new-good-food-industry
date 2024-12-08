import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const links = [

    { name: 'Ibigori bishyashya', path: '/Ibishyashya' },
    { name: 'Gutunganywa 1', path: '/Gutunganya' },
    { name: 'Ibigori byakobowe', path: '/ibisanzwe' },
    { name: 'Sitoke', path: '/Ibyinjiye' },
    { name: 'Buranda yakozwe', path: '/Buranda 1' },
    { name: 'Buranda yacurujwe', path: '/Buranda 2' },
    { name: 'Ibyagiye Kwisoko', path: '/ibyagurishijwe' },
    { name: 'Uwagemuye kwisoko', path: '/ibyasohotse' },
    { name: 'Ibyagarutse', path: '/Ibyagarutse' },
    { name: 'Depanse', path: '/Depanse' },
    { name: 'List Yabakozi', path: '/List Yabakozi' },
    { name: 'Amadeni', path: '/Amadeni' },
    { name: 'Abishyuye amadeni', path: '/Abishyuyeideni' },
    { name: 'Market Report', path: '/Marketreport' },
  ];

  // Filter links based on search query
  const filteredLinks = links.filter(link =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    // Clear authentication token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
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
