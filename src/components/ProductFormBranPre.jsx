// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { f, pS } from "../../public/functions";

function ProductFormBranPre() {
  const [formData, setFormData] = useState({
    date: "",
    reporter: "",
    buranda1: "",
    buranda2: "",
    buranda3: "",
    comment: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

   
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      
      if (name === "buranda1" || name === "buranda2") {
        const buranda1 = parseFloat(updatedData.buranda1) || 0;
        const buranda2 = parseFloat(updatedData.buranda2) || 0;
        updatedData.buranda3 = buranda1 + buranda2;
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setIsSubmitted(true);
    const scheme = pS
    scheme.body = JSON.stringify(formData)
    let res = await f('leftoversController',scheme)
    setFormData({
      date: "",
      reporter: "",
      buranda1: "",
      buranda2: "",
      buranda3: "",
      comment: "",
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Section */}
          <div className="space-y-6">
            <h1 className="text-xl font-bold text-center text-indigo-700">
              BURANDA YASEWE 
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-600 mb-1">
                  Itariki
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-indigo-300 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-600 mb-1">
                  Utanze raporo
                </label>
                <input
                  type="text"
                  name="reporter"
                  value={formData.reporter}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-indigo-300 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-600 mb-1">
                  Buranda yarihari
                </label>
                <input
                  type="number"
                  name="buranda1"
                  value={formData.buranda1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-indigo-300 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-600 mb-1">
                  Buranda yinjiye
                </label>
                <input
                  type="number"
                  name="buranda2"
                  value={formData.buranda2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-indigo-300 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-600 mb-1">
                  Buranda yose hamwe
                </label>
                <input
                  type="number"
                  name="buranda3"
                  value={formData.buranda3}
                  readOnly
                  className="w-full px-3 py-2 border rounded border-indigo-300 bg-gray-100 text-gray-500"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-indigo-600 mb-1">
                Icyongerwaho
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-indigo-300 focus:ring focus:ring-indigo-200"
                cols="40"
                rows="3"
              ></textarea>
            </div>

            
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
              >
                KUBIKA
              </button>
            </div>
          </div>
          
          {isSubmitted && (
            <div className="text-center text-green-600 font-medium">
              Successfully submitted!!!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProductFormBranPre;
