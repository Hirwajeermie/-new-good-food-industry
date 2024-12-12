import React, { useState, useEffect } from "react";
import { f, pS } from "../../public/functions";

function ProductFormMarket() {
  const [formData, setFormData] = useState({
    date: "",
    reporter: "",
    commande: "",
    returned: "",
    expenses: "",
    debts:"",
    p_debts:"",
    cash: "",
    phone: "",
    bank: "", 
    comment: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  
  // const paymentMethods = [
  //   { value: "", label: "Hitamo Uburyo" },
  //   { value: "Cash", label: "Cash" },
  //   { value: "Mobile Money", label: "Mobile Money" },
  //   { value: "Bank Transfer", label: "Bank Transfer" },
  //   { value: "Credit Card", label: "Credit Card" },
  //   { value: "Other", label: "Ubundi buryo" }
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value
    }));

    
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'date', 'reporter', 'commande', 
      'returned', 'expenses', 'debts', 'p_debts',
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = `${field} is required`;
      }
    });

    
    if (formData.amafarangaYararimo && parseFloat(formData.amafarangaYararimo) < 0) {
      newErrors.amafarangaYararimo = "Amount cannot be negative";
    }

    if (formData.ayoYishyuye && parseFloat(formData.ayoYishyuye) < 0) {
      newErrors.ayoYishyuye = "Amount cannot be negative";
    }

    if (formData.asigaye && parseFloat(formData.asigaye) < 0) {
      newErrors.asigaye = "Amount cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      
      setIsSubmitted(true);


       let schema = pS
        schema.body = JSON.stringify(formData)
        let recs = await f('mrController',pS)
        if (recs.success) {
          setFormData({
            date: "",
            reporter: "",
            commande: "",
            returned: "",
            expenses: "",
            debts:"",
            cash: "",
            phone: "",
            bank: "", 
            p_debts:"",
            comment: "",
          });
        }
    }
  };

  useEffect(() => {
    let timer;
    if (isSubmitted) {
      timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isSubmitted]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-6">
              MARKET REPORT 
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "date", label: "Itariki", type: "date" },
                { name: "reporter", label: "Utanze Raporo", type: "text" },
                { name: "commande", label: "commande&it price", type: "number" },
                { name: "returned", label: "Returned&it price", type: "number", step: "0.01" },
                { name: "expenses", label: "Expenses&it price", type: "number", step: "0.01" },
                { name: "debts", label: "Amadeni(Name&Amount)", type: "number", step: "0.01" },
                { name: "p_debts", label: "Abishyuye Amadeni(Name&Amount)", type: "number", step: "0.01" },
                { name: "cash", label: "Amafaranga Bishyuye Cash", type: "number", step: "0.01" },
                { name: "phone", label: "Amafaranga Bishyuye Kuri Telephone", type: "number", step: "0.01" },
                { name: "bank", label: "Amafaranga Bishyuye Kuri Bank", type: "number", step: "0.01" },
               
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="block text-sm font-medium text-indigo-600 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded 
                        ${errors[field.name] 
                          ? 'border-red-500 focus:ring-red-200' 
                          : 'border-indigo-300 focus:ring-indigo-200'}
                        focus:outline-none focus:ring-2`}
                      required
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      step={field.step || "1"}
                      className={`w-full px-3 py-2 border rounded 
                        ${errors[field.name] 
                          ? 'border-red-500 focus:ring-red-200' 
                          : 'border-indigo-300 focus:ring-indigo-200'}
                        focus:outline-none focus:ring-2`}
                      required
                    />
                  )}
                  {errors[field.name] && (
                    <p className="absolute text-xs text-red-500 mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-600 mb-1">
                Icyongerwaho 
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-indigo-300 
                  focus:outline-none focus:ring-2 focus:ring-indigo-200"
                rows="3"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 text-white 
                  px-6 py-2 rounded hover:bg-indigo-700 
                  transition-colors duration-300 ease-in-out 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 
                  focus:ring-offset-2"
              >
                KUBIKA
              </button>
            </div>

            {isSubmitted && (
              <div 
                className="text-center text-green-700 font-medium mt-4 
                  bg-green-50 p-3 rounded-md border border-green-200 
                  animate-pulse"
              >
                Successfully submitted!!!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductFormMarket;
