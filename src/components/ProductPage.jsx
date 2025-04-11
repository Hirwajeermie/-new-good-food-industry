import React, { useState } from 'react';
import { Home, Menu } from 'lucide-react';
import hawunga from "../assets/kawunga.png"
import new50 from "../assets/new50.png"
import new10 from "../assets/new10.png"
import Newfood44 from "../assets/Newfood44.png"
import Isezerano22 from "../assets/Isezerano22.png"
import Isez11 from "../assets/Isez11.png"
import Ifunguro99 from "../assets/Ifunguro99.png"
import ifung10 from "../assets/ifung10.png"
import envilope11 from "../assets/envilope11.png"
import Igiko from "../assets/Igiko.png"
import Manemane from "../assets/Manemane.png"

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const products = [

    
    
    {
      id: 1,
      img: Newfood44,
      name: 'NEW FOOD',
      description: '25 Kilograms',
      details: 'Premium wheat flour processed with care'
    },
    {
      id: 2,
      img: new10,
      name: 'NEW FOOD',
      description: '10 Kilograms',
      details: 'Traditional Rwandan flour blend'
    },
    {
      id: 3,
      img: new50,
      name: 'NEW FOOD',
      description: '5 Kilograms',
      details: 'Nutritious and authentic local flour'
    },
    {
      id: 4,
      img: Isezerano22,
      name: 'ISEZERANO',
      description: '25 Kilograms',
      details: 'Protein-rich flour for balanced nutrition'
    },
    {
      id: 5,
      img: Isez11,
      name: 'ISEZERANO',
      description: '10 Kilograms',
      details: 'Easy-to-store 10kg flour package'
    },
    {
      id: 6,
      img: Isez11,
      name: 'IFUNGURO RYIZA',
      description: '5 Kilograms',
      details: 'Easy-to-store 10kg flour package'
    },
    {
      id: 7,
      img: Ifunguro99,
      name: 'IFUNGURO RYIZA',
      description: '25 Kilograms',
      details: 'Easy-to-store 25kg flour package'
    },
    {
      id: 8,
      img: ifung10,
      name: 'IFUNGURO RYIZA',
      description: '10 Kilograms',
      details: 'Easy-to-store 10kg flour package'
    },
    {
      id: 9,
      img: ifung10,
      name: 'IFUNGURO RYIZA',
      description: '10 Kilograms',
      details: 'Easy-to-store 10kg flour package'
    },
    {
      id: 10,
      img: envilope11,
      name: 'ISEZERANO  ENVELOPE',
      description: '10 Kilograms',
      details: 'Easy-to-store 2kg flour package'
    },
    {
      id: 10,
      img: Igiko,
      name: 'IGIKOMA',
      description: '10 Kilograms',
      details: 'Easy-to-1tore 1kg flour package'
    },
    {
      id: 10,
      img: Manemane,
      name: 'MANEMANE',
      description: '10 Kilograms',
      details: 'Easy-to-store 25kg flour package'
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleHomeClick = () => {
    // Typically would use React Router, but here's a placeholder
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Company Logo and Name */}
          <div className="flex items-center space-x-3">
            <img 
              src={hawunga} 
              alt="Kawunga Logo" 
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl font-bold text-red-600">Kawunga Mills</span>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleHomeClick}
              className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
            >
              <Home className="mr-2" size={20} />
              Home
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <button 
                onClick={handleHomeClick}
                className="block w-full text-left py-2 text-gray-700 hover:bg-gray-100"
              >
                Home
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8">
          Our Products
        </h1>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full md:h-full object-cover"
              />
              <div className="p-2 md:p-4">
                <h2 className="text-sm md:text-xl font-semibold text-red-600 mb-1 md:mb-2 truncate">
                  {product.name}
                </h2>
                <p className="text-xs md:text-base text-gray-700 truncate">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 md:p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-red-600">
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-600 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-full h-full md:h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-sm md:text-base text-gray-700">
                {selectedProduct.details}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-6">
        <div className="container mx-auto px-2 py-3 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Kawunga Mills. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;