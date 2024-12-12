import React, { useState, useEffect, useRef } from "react";
import { f, pS } from "../../public/functions";

function ProductFormCred() {
  const [formData, setFormData] = useState({
    reporter: "",
    client: "",
    debt: "",
    p_debt: "",
    p_name: "",
    pm: "",
    r_debt: "", 
    comment: "",
    date: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false)
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('gDebts',pS)
        setRecords(recs.metadata.report)
      }
      fetchRecs()
      hasFetched.current = true
    }
  },[])
  
  const paymentMethods = [
    { value: "", label: "Hitamo Uburyo" },
    { value: "Cash", label: "Cash" },
    { value: "Mobile Money", label: "Mobile Money" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Other", label: "Ubundi buryo" }
  ];
  const clientpayment  = records.map(rec=>({value: rec.id, label: rec.names}));
  clientpayment.unshift({value:'', label: 'hitamo uwishyuye'})
  const handleChange = (e) => {
    const { name, value } = e.target;
    name == 'client' ? changeVars(value) : null
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
  },
  changeVars = (value)=>{
    let target = records.find(r=> r.id == value) 
    if (target) {
      setFormData((prevData) => ({
        ...prevData, 
        debt: target.debt
      }));
    }
  }
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'reporter', 'client', 'debt', 
      'p_debt', 'pm', 'r_debt', 'comment','date'
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
      const scheme = pS
      scheme.body = JSON.stringify(formData)
      let res = await f('pdebtsController',scheme)
      if (res.success) {
        setFormData({
          reporter: "",
          client: "",
          debt: "",
          p_debt: "",
          p_name: "",
          pm: "",
          r_debt: "",
          comment: "",
          date: "",
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
              ABISHYUYE AMADENI 
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "date", label: "Itariki", type: "date" },
                { name: "reporter", label: "Utanze Raporo", type: "text" },
                { 
                  name: "client", 
                  label: "Umukiriya wishyuye", 
                  type: "select", 
                  options: clientpayment 
                },
                { name: "debt", label: "AMAFARANGA YARARIMO", type: "number", step: "0.01" },
                { name: "p_debt", label: "AYO YISHYUYE", type: "number", step: "0.01" },
                { name: "p_name", label: "AMAZINA Y'UWISHYUYE", type: "text", step: "0.01" },
                { 
                  name: "pm", 
                  label: "UBURYO YISHYUYEMO", 
                  type: "select", 
                  options: paymentMethods 
                },
                { name: "r_debt", label: "ASIGAYE", type: "number", step: "0.01" }
                
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

export default ProductFormCred;