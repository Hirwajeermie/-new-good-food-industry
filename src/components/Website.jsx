


import React, { useState } from 'react';
import { Link, Element } from 'react-scroll';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import hawunga from "../assets/kawunga.png"
import Newfood1 from "../assets/Newfood1.png"
import Ifunguroryiza1 from "../assets/Ifunguroryiza1.png"
import Isezerano1 from "../assets/Isezerano1.png"
import Envelope1 from "../assets/Envelope1.png"
const ContactIcons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      {/* WhatsApp Icon with Tooltip */}
      <div className="group relative">
        <a
          href="https://wa.me/+250791938461"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
        <span className="absolute z-10 -left-32 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
          Chat on WhatsApp
        </span>
      </div>

      {/* Call Icon with Tooltip */}
      <div className="group relative">
        <a
          href="tel:+250791938461"
          className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <FaPhoneAlt className="w-6 h-6" />
        </a>
        <span className="absolute z-10 -left-24 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
          Call Now
        </span>
      </div>
    </div>
  );
};

const NewGoodFoodWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans bg-white text-gray-800 min-h-screen flex flex-col">
      {/* Navigation Section */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={hawunga}
              alt="NEW GOOD FOOD LTD Logo"
              className="w-10 h-10 mr-3 rounded-full object-cover"
            />
            <span className="font-bold text-lg md:text-xl text-indigo-600">NEW GOOD FOOD LTD</span>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none text-indigo-600"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={mobileMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`${mobileMenuOpen ? 'block absolute top-full left-0 w-full bg-white shadow-lg' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left p-4 md:p-0">
              {['Home', 'Our Products', 'About Us', 'Contact Us'].map((item) => (
                <li key={item} className="md:inline-block">
                  <Link 
                    to={item.toLowerCase().replace(' ', '-')} 
                    smooth={true} 
                    duration={500} 
                    offset={-70} 
                    className="block md:inline-block text-gray-700 hover:text-indigo-600 transition-colors duration-300 cursor-pointer py-2 md:py-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="flex-grow">
        {/* Header Section */}
        <Element name="home">
          <header className="bg-gradient-to-r from-white to-indigo-50 text-gray-800 pt-24 pb-16 mt-16">
            <div className="container mx-auto px-4 text-center">
              <div className="flex flex-col items-center mb-8">
                <img
                  src={hawunga}
                  alt="NEW GOOD FOOD LTD Logo"
                  className="w-20 h-20 mb-4 rounded-full shadow-md object-cover"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">NEW GOOD FOOD LTD</h1>
                <p className="text-xs md:text-sm uppercase tracking-widest text-gray-600 mb-3">Feed Yourself</p>
                <p className="text-lg md:text-xl font-semibold text-gray-700 max-w-2xl">
                  We Provide Best Kawunga In Rwanda
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  { 
                    title: 'Our Goal', 
                    text: 'Provide high-quality kawunga and maize flour at competitive prices.' 
                  },
                  { 
                    title: 'Our Mission', 
                    text: 'Deliver nutritious and affordable food products to our community.' 
                  }
                ].map(({ title, text }) => (
                  <div 
                    key={title} 
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-indigo-100"
                  >
                    <h3 className="text-xl font-semibold text-indigo-600 mb-3">{title}</h3>
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </header>
        </Element>

        {/* Products Section */}
        <Element name="our-products">
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-indigo-600 text-center mb-10">Our Products</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4">
                {[
                  { img: Newfood1, name: "NEWFOOD" },
                  { img: Ifunguroryiza1, name: "IFUNGURO RYIZA" },
                  { img: Isezerano1, name: "ISEZERANO" },
                  { img: Envelope1, name: "ISEZERANO ENVELOPE" },
                ].map(({ img, name }) => (
                  <div
                    key={name} 
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300"
                  >
                    <img 
                      src={img} 
                      alt={name} 
                      className="w-full h-20 md:h-full object-cover"
                    />
                    <div className="p-3 text-center bg-indigo-600 text-white text-sm md:text-base">
                      {name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <a 
                  href="/products" 
                  className="inline-block bg-indigo-600 text-white text-base md:text-lg font-semibold py-2 px-6 rounded shadow hover:bg-indigo-700 transition duration-300"
                >
                  View All Products
                </a>
              </div>
            </div>
          </section>
        </Element>

        {/* About Section */}
        <Element name="about-us">
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-10">
                {/* What We Sell Section */}
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                  <div className="border-b border-indigo-600 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-indigo-600">What We Sell</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      'NEW FOOD FLOUR', 'IFUNGURO RYIZA FLOUR', 'ISEZERANO FLOUR', 
                      'MAGAJU FLOUR', 'IS/ENVELOPE/5KG', 'KAWUNGA UMUHONDO', 'KAWUNGA UMWERU'
                    ].map(item => (
                      <div key={item} className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What We Provide Section */}
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-indigo-600 pb-4 mb-6">
                      <h2 className="text-2xl font-bold text-indigo-600">What We Provide</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      We specialize in processing high-quality kawunga directly from farms, ensuring pure, unadulterated flour that meets the highest standards of quality and nutrition.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-4">
                      <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-indigo-800 font-semibold">Quality Guaranteed</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-2">
                      Our commitment to excellence ensures you receive the best kawunga products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Element>

        {/* Contact Section */}
        <Element name="contact-us">
          <section className="bg-indigo-600 text-white py-13">
            <div className="container mx-auto px-2">
              <h2 className="text-3xl font-bold mb-10 py-5 text-center">Contact Us</h2>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Phone */}
                <div className="flex items-center space-x-4 bg-indigo-700 p-4 rounded-lg">
                  <div className="p-3 bg-indigo-800 rounded-full">
                    <FaPhoneAlt className="w-5 h-5" />
                  </div>
                  <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm">+250791785898</p>
              <p className="text-sm">+8617384878</p>
            </div>
          </div>
           {/* Email */}
           <div className="flex items-center space-x-4">
            <div className="p-4 bg-indigo-800 rounded-full">
              <FaEnvelope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-sm">muvunyi5743@gmail.com</p>
            </div>
          </div>
            {/* Location */}
            <div className="flex items-center space-x-4">
            <div className="p-4 bg-indigo-800 rounded-full">
              <FaMapMarkerAlt className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-sm">Shop Location: KABUGA YA MBERE, UMUHANDA KK133</p>
            </div>
          </div>
        </div>
            {/* Social Media */}
        <div className="mt-8">
          <p className="flex justify-center space-x-6">Follow us</p>
          <p className="flex justify-center space-x-6">newgoodfood_rwanda</p>
          <div className="flex justify-center space-x-6">
            <a href="https://www.instagram.com/newgoodfood_rwanda" target="_blank" rel="noopener noreferrer" className="p-3 bg-indigo-800 rounded-full hover:bg-indigo-700 transition duration-300">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/newgoodfood_rwanda" target="_blank" rel="noopener noreferrer" className="p-3 bg-indigo-800 rounded-full hover:bg-indigo-700 transition duration-300">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com/newgoodfood_rwanda" target="_blank" rel="noopener noreferrer" className="p-3 bg-indigo-800 rounded-full hover:bg-indigo-700 transition duration-300">
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
    
      

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Kawunga Mills. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Contact Icons */}
      <ContactIcons />
    </Element>
    </main>
    </div>
  );
};

export default NewGoodFoodWebsite;