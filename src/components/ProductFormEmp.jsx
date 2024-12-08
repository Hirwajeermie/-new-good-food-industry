import React, { useState, useEffect, useRef } from "react";
import { f, pS } from "../../public/functions";

const ProductFormEmp= () => {
  const [workers, setWorkers] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false),
  [records,setRecords] = useState([]),
  hasFetched = useRef(false)
  // useEffect(()=>{
  //   if (!hasFetched.current) {
  //     const fetchRecs = async ()=>{
  //       let schema = pS
  //       schema.body = JSON.stringify({date: {}})
  //       let recs = await f('employeesReport',pS)
  //       setWorkers(recs.metadata.report)
  //     }
  //     fetchRecs()
  //     hasFetched.current = true
  //   }
  // },[])
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const addWorker = () => {
    setWorkers([
      ...workers,
      {name: "", phone: "", jobTitle: "", salary: "", saving: "", social: "", salaryAdvance: "", remainSalary: "" },
    ]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const worker  = workers.findLast((element) => true);
    const scheme = pS
    scheme.body = JSON.stringify(worker)
    let res = await f('employeesController',scheme)
    if(res.success){
      setWorkers([])
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    // setWorkers([])
  };

 
  const SuccessAlert = () => (
    <div className="fixed top-4 right-4 flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      <span>Workers data submitted successfully!</span>
    </div>
  );

  return (
    <div className="w-full min-h-screen p-2 sm:p-4">
      {showSuccess && <SuccessAlert />}
      
      <h1 className="text-indigo-600 text-xl sm:text-2xl font-bold mb-4 text-center">
        AHUZURIZWA IMISHAHARA Y'ABAKOZI
      </h1>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
          <thead>
          <tr className="bg-indigo-500 text-white">
              <th className="border border-gray-300 p-1 sm:p-2 text-left w-[15%]">Names</th>
              <th className="border border-gray-300 p-1 sm:p-2 text-left w-[10%] hidden sm:table-cell">Phone</th>
              <th className="border border-gray-300 p-1 sm:p-2 text-left w-[14%] hidden md:table-cell">Job Title</th>
              <th className="border border-gray-300 p-1 sm:p-2 text-left w-[10%] hidden md:table-cell">Salary</th>
              <th className="border border-gray-300 p-1 sm:p-2 text-left w-[9%] hidden lg:table-cell">Saving</th>
              <th className="border border-gray-300 p-1 sm:p-2 text-left w-[10%] hidden lg:table-cell">Social</th>
              <th className="border border-gray-300 p-1 sm:p-2 text-left w-[9%] hidden lg:table-cell">Salary Advance</th>
              <th className="border border-gray-300 p-1 sm:p-2 text-left w-[9%] hidden lg:table-cell">Remain Salary</th>
            </tr>
            
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-300 p-1 sm:p-2">
                  <input
                    type="text"
                    value={worker.names}
                    onChange={(e) => {
                      const updatedWorkers = [...workers];
                      updatedWorkers[index].name = e.target.value;
                      setWorkers(updatedWorkers);
                    }}
                    className="w-full p-1 sm:p-2 text-xs sm:text-sm rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Full name"
                  />
                </td>
                <td className="border border-gray-300 p-1 sm:p-2 hidden sm:table-cell">
                  <input
                    type="tel"
                    value={worker.phone}
                    onChange={(e) => {
                      const updatedWorkers = [...workers];
                      updatedWorkers[index].phone = e.target.value;
                      setWorkers(updatedWorkers);
                    }}
                    className="w-full p-1 sm:p-2 text-xs sm:text-sm rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Phone"
                  />
                </td>
                <td className="border border-gray-300 p-1 sm:p-2 hidden md:table-cell">
                  <input
                    type="text"
                    value={worker.title}
                    onChange={(e) => {
                      const updatedWorkers = [...workers];
                      updatedWorkers[index].jobTitle = e.target.value;
                      setWorkers(updatedWorkers);
                    }}
                    className="w-full p-1 sm:p-2 text-xs sm:text-sm rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Job Title"
                  />
                </td>
                <td className="border border-gray-300 p-1 sm:p-2 hidden md:table-cell">
                  <input
                    type="text"
                    value={worker.salary}
                    onChange={(e) => {
                      const updatedWorkers = [...workers];
                      updatedWorkers[index].salary = e.target.value;
                      setWorkers(updatedWorkers);
                    }}
                    className="w-full p-1 sm:p-2 text-xs sm:text-sm rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Salary"
                  />
                </td>
                <td className="border border-gray-300 p-1 sm:p-2 hidden lg:table-cell">
                  <input
                    type="text"
                    value={worker.saving}
                    onChange={(e) => {
                      const updatedWorkers = [...workers];
                      updatedWorkers[index].saving = e.target.value;
                      setWorkers(updatedWorkers);
                    }}
                    className="w-full p-1 sm:p-2 text-xs sm:text-sm rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Saving"
                  />
                </td>
                <td className="border border-gray-300 p-1 sm:p-2 hidden lg:table-cell">
                  <input
                    type="text"
                    value={worker.social}
                    onChange={(e) => {
                      const updatedWorkers = [...workers];
                      updatedWorkers[index].social = e.target.value;
                      setWorkers(updatedWorkers);
                    }}
                    className="w-full p-1 sm:p-2 text-xs sm:text-sm rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Social"
                  />
                </td>
                <td className="border border-gray-300 p-1 sm:p-2 hidden lg:table-cell">
                  <input
                    type="text"
                    value={worker.advance}
                    onChange={(e) => {
                      const updatedWorkers = [...workers];
                      updatedWorkers[index].salaryAdvance = e.target.value;
                      setWorkers(updatedWorkers);
                    }}
                    className="w-full p-1 sm:p-2 text-xs sm:text-sm rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Salary Advance"
                  />
                </td>
                <td className="border border-gray-300 p-1 sm:p-2 hidden lg:table-cell">
                  <input
                    type="text"
                    value={worker.r_salary}
                    onChange={(e) => {
                      const updatedWorkers = [...workers];
                      updatedWorkers[index].remainSalary = e.target.value;
                      setWorkers(updatedWorkers);
                    }}
                    className="w-full p-1 sm:p-2 text-xs sm:text-sm rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Remain Salary"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={addWorker}
          className="bg-indigo-500 text-white px-4 py-2 rounded text-sm hover:bg-indigo-600 transition-colors duration-200"
        >
          Add New Worker
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-4 py-2 rounded text-sm transition-colors duration-200 ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default ProductFormEmp;