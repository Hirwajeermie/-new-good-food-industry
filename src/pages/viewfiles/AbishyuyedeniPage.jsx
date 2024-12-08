import React, { useEffect, useRef, useState } from "react";
import { adcm, f, pS } from "../../../public/functions";

function AbishyuyeAmadeniPage() {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false),
  [date,setDate] = useState({
    start: null,
    stop: null
  })
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('pdebtsReport',pS)
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
    let recs = await f('pdebtsReport',pS)
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
        RAPORO YAMADENI YISHYUWE 
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
                  Izina RY'umukiliya
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  AMAFARANGA YARARIMO
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  AYO YISHYUYE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  UBURYO YISHYUYEMO
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  ASIGAYE
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
                    {item.client}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.debt)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.p_debt)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.pm)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.r_debt)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        {/* <div className="md:hidden space-y-4 mt-6">
          {formData.submittedData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold text-sm text-gray-700">Itariki</div>
                <div className="text-sm text-gray-600">{item.itariki}</div>

                <div className="font-semibold text-sm text-gray-700">Utanze Raporo</div>
                <div className="text-sm text-gray-600">{item.utanzeRaporo}</div>

                <div className="font-semibold text-sm text-gray-700">Izina RY'umukiliya</div>
                <div className="text-sm text-gray-600">{item.umukiliya}</div>

                <div className="font-semibold text-sm text-gray-700">AMAFARANGA YARARIMO</div>
                <div className="text-sm text-gray-600">{item.amafarangaYararimo}</div>

                <div className="font-semibold text-sm text-gray-700">AYO YISHYUYE</div>
                <div className="text-sm text-gray-600">{item.ayoYishyuye}</div>

                <div className="font-semibold text-sm text-gray-700">UBURYO YISHYUYEMO</div>
                <div className="text-sm text-gray-600">{item.uburyoYishyuyemo}</div>

                <div className="font-semibold text-sm text-gray-700">ASIGAYE</div>
                <div className="text-sm text-gray-600">{item.asigaye}</div>

                <div className="font-semibold text-sm text-gray-700">Icyongerwaho</div>
                <div className="text-sm text-gray-600">{item.comment}</div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default AbishyuyeAmadeniPage;