// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { f, pS } from "../../../public/functions";

 function Buranda1Page() {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false)
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('leftoversReport',pS)
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
          RAPORO YA BURANDA YASEWE KUMUNSI
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
                  BURANDA YARIHARI
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  BURANDA YINJIYE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  BURANDA YASOHOTSE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  ICYONGERWAHO
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
                    {item.w_pre}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.w_incoming}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.w_tot}
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
export  default  Buranda1Page;

