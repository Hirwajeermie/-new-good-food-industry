// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { adcm, f, pS } from "../../../public/functions";

const initialFormData = {
  firstTable: [
    {
      date: "2024-11-12",
      utanzeRaporo: "NYAMASWANTE",
      mazutu: "100",
      abakarani: "300",
      tandBoy: "400",
      shoferi: "300",
      shambre: "5000",
      
    },
  ],
  secondTable: [
    {
      kurya: "3000",
      urugendo: "7000",
      amafarangaAsabwa: "10000",
      amafarangaAverishije: "80000",
      amafarangaYose: "180000",
      icyongeweho: "Ibyatunganyijwe byose byagenze neza",
    },
  ],
};

function DepansePage () {
  const [formData] = useState(initialFormData);
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false)
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('expensesReport',pS)
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
          RAPORO YAMAFARANGA YASOHOTSE
        </h2>

        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3  text-left text-sm font-semibold text-gray-700">
                  ITARIKI
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  UTANZE RAPORO
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  MAZUTU
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  ABAKARANI
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  TAND BOY
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  Shoferi
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  Shambre
                </th>
                
              </tr>
            </thead>
            
              {records.map((item, index) => (
                <tbody key={index}>
                  <tr className="hover:bg-gray-50">
                    <td className="border bg-gray-400 p-3 text-sm text-gray-600">{item.date}</td>
                    <td className="border p-3 text-sm text-gray-600">{item.reporter}</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.diesel)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.lifters)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.boys)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.driver)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.room)} RWF</td>
                  </tr>
                  <tr>
                    <td colSpan={8}>
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            
                            <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                              Kurya
                            </th>
                            <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                              Urugendo
                            </th>
                            <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                              Amafaranga Asabwa
                            </th>
                            <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                              Amafaranga Averishije
                            </th>
                            <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                              Amafaranga Yose
                            </th>
                            <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                              Icyongeweho
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border p-3 text-sm text-gray-600">{adcm(item.food)} RWF</td>
                            <td className="border p-3 text-sm text-gray-600">{adcm(item.journey)} RWF</td>
                            <td className="border p-3 text-sm text-gray-600">{adcm(item.r_amount)} RWF</td>
                            <td className="border p-3 text-sm text-gray-600">{adcm(item.inc_amount)} RWF</td>
                            <td className="border p-3 text-sm text-gray-600">{adcm(item.g_amount)} RWF</td>
                            <td className="border p-3 text-sm text-gray-600">{item.comment}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                </tbody>
              ))}
          </table>
        
        </div>
      </div>
    </div>
  );
}

export default DepansePage ;
