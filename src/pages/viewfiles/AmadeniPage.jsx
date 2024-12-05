import React, { useEffect, useRef, useState } from "react";
import { adcm, f, pS } from "../../../public/functions";


 function AmadeniPage() {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false)
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('debtsReport',pS)
        setRecords(recs.metadata.report)
      }
      fetchRecs()
      hasFetched.current = true
    }
  },[])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          AMADENI YATANZWE KUMUNSI
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  Itariki
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  Utanze Raporo
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  Izina RY'umukiliya
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  IBYO YATWAYE (KG)
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  AMAFARANGA ASABWA (RWF)
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  AYO YISHYUYE (RWF)
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  ASIGAYE (RWF)
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  ICYONGEWEHO
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3 text-sm text-gray-600">
                    {item.date}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.reporter}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.client}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.weight)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.g_amount)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.p_amount)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.r_amount)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.comment)}
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
export  default AmadeniPage;

