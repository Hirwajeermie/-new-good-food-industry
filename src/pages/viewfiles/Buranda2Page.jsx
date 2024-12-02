// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { adcm, f, pS } from "../../../public/functions";



 function Buranda2Page() {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false)
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('leftoverOutReport',pS)
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
          RAPORO YA BURANDA YASOHOTSE KUMUNSI
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  ITARIKI
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  UTANZE RAPORO
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  IZINA RY'UMUKIRIYA
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  IBIRO YATWAYE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  IGICIRO
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  AMAFARANGA YOSE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  AMAFARANGA ASIGAJE KWISHYURA
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  UBURYO BIISHYUYEMO
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  ICYONGEWEHO
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border bg-gray-400 p-3 text-sm text-gray-600">
                    {item.date}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.reporter}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.client}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.weight}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.price)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.g_amount)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.r_amount)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {adcm(item.pm)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
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
export  default Buranda2Page;
