import React, { useEffect, useRef, useState } from "react";
import { adcm, f, pS, ShowMessage } from "../../../public/functions";

function FacturePage() {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false),
  [date,setDate] = useState({
    start: null,
    stop: null
  }),[showM,setShowM] = useState(false),
    [message,setMessage] = useState('')
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('invoiceReport',pS)
          setShowM(true)
          setMessage({
            message: recs.message,
            decision: recs.success
          })
          setTimeout(() => {
            setShowM(false);
          }, 3000);
         if (recs.success) {
          setRecords(recs.metadata.report)
        }
      }
      fetchRecs()
      hasFetched.current = true
    }
  },[])

  async function handleSubmit(e) {
    e.preventDefault()
    let schema = pS
    schema.body = JSON.stringify({date})
    let recs = await f('invoiceReport',pS)
      setShowM(true)
      setMessage({
        message: recs.message,
        decision: recs.success
      })
      setTimeout(() => {
        setShowM(false);
      }, 3000);
     if (recs.success) {
          setRecords(recs.metadata.report)
        }
  }
  function handleChange(e) {
    const {name,value} = e.target
    setDate((prevD=>({
      ...prevD,
      [name]: value
    })))
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
{showM ? <ShowMessage message={message.message} decision={message.decision}/>: null}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
        FACTURE REPORT
        </h2>
        <div>
          <div  className="block md:inline-block text-gray-700 hover:text-indigo-600 transition-colors duration-300 cursor-pointer py-2 md:py-0 ">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-indigo-600">
                <div>
                <span className="m-5">
                <label className="text-black">Starting date</label>
                <input
                type="date" 
                name="start" 
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                />
               </span>
                </div>
                <div>
                <span className="m-5">
                <label className="text-black">Ending date</label>
                <input 
                type="date" 
                name="stop" 
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                />
               </span>
                </div>
              </div>
              <div className="p-3 px-4 pt-2 pb-3 space-y-1 ">
                <span>
                <button
                className="px-16 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-800"
                 type="submit">submit</button>
              </span>
              </div>
            </form>
          </div>
        </div>
        <div className="mb-6">
              <h2 className="text-xl mb-2 text-center">TOTAL</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-indigo-500">
                  <thead className="bg-indigo-100">
                  <tr className="bg-gray-100">
                  <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                    Amount Without VAT
                    </th>
                    <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                    VAT
                    </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Replace with dynamic data */}
                    <tr className="hover:bg-gray-50">
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.amount_vat || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.VAT || 0), 0))} RWF</td>
                        </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Itariki
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Utanze Raporo
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Supplier Tin
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Supplier Name
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Nature Of Goods
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Receipt Number
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Receipt Issue Date
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Amount Without VAT
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                VAT
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Icyongerwaho
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.date}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.reporter}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.s_tin}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.s_name)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.n_goods)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.r_number)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.r_date}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.amount_vat)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.VAT)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
export default FacturePage;
