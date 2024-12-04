import React, { useEffect, useRef, useState } from "react";
import { f, pS } from "../../../public/functions";



function MarketPage() {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false)
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('mrReport',pS)
        setRecords(recs.metadata.report)
      }
      fetchRecs()
      hasFetched.current = true
    }
  },[])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
        RAPORO YA MARKET REPORT
        </h2>
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
                Commande&it price  
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Returned&it price
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Expenses&it price
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Amadeni(names&amount)
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Abishyuye Amadeni(name&amount)
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Uburyo yishyuyemo
                </th>

                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Icyongeweho
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
                    {item.commande}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.returned}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.expenses}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.debts}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.p_debts}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.pm}
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

                <div className="font-semibold text-sm text-gray-700">Commande&it price</div>
                <div className="text-sm text-gray-600">{item.Commandeprice}</div>

                <div className="font-semibold text-sm text-gray-700">Returned&it price</div>
                <div className="text-sm text-gray-600">{item.Returnedprice}</div>

                <div className="font-semibold text-sm text-gray-700">Expenses&it price</div>
                <div className="text-sm text-gray-600">{item.Expensesprice}</div>

                <div className="font-semibold text-sm text-gray-700">Amadeni(names&amount)</div>
                <div className="text-sm text-gray-600">{item.Amadeni}</div>

                <div className="font-semibold text-sm text-gray-700">Abishyuye Amadeni(name&amount)</div>
                <div className="text-sm text-gray-600">{item.Abishyuyeamadeni}</div>

                <div className="font-semibold text-sm text-gray-700">Uburyo yishyuyemo</div>
                <div className="text-sm text-gray-600">{item.uburyoYishyuyemo}</div>
                
                <div className="font-semibold text-sm text-gray-700"> Icyongeweho</div>
                <div className="text-sm text-gray-600">{item.comment}</div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default MarketPage;