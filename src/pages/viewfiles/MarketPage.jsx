import React, { useEffect, useRef, useState } from "react";
import { adcm, f, pS, ShowMessage } from "../../../public/functions";



function MarketPage() {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false),
  [date,setDate] = useState({
    start: null,
    stop: null
  })
  ,
  [showM,setShowM] = useState(false),
    [message,setMessage] = useState('')
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('mrReport',pS)
        
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
    let recs = await f('mrReport',pS)
    
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
        RAPORO YA MARKET REPORT
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
                Commande
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Ibyagarutse
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Expenses
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Amadeni
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Abishyuye Amadeni
                </th>
                {/* <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Uburyo yishyuyemo
                </th>*/}
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Amafaranga Bishyuye Cash
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Amafaranga Bishyuye Kuri Telephone
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Amafaranga Bishyuye Kuri Bank
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Total
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Amafaranga yaverishijwe
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Icyongeweho
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => {
                let inc_money = Number(item.total) - Number(item.commande)
                return(
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.date}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.reporter}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.commande)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.returned)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.expenses)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.debts)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.p_debts)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.cash)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.phone)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.bank)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {adcm(item.total)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell" style={inc_money == item.commande ? {backgroundColor :'#00800059'}: {backgroundColor: '#ff000057'}}>
                    {adcm(inc_money)}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.comment}
                  </td>
                </tr>
              )})}
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