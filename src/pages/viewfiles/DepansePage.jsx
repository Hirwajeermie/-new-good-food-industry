// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { adcm, f, pS, ShowMessage } from "../../../public/functions";

function DepansePage () {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false),
  [date,setDate] = useState({
    start: null,
    stop: null
  }),
  [showM,setShowM] = useState(false),
    [message,setMessage] = useState('')
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('expensesReport',pS)
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
    let recs = await f('expensesReport',pS)
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
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          RAPORO YA DEPANSE
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
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                 Discount
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Umucuruzi
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                KVCS
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Parking
                </th>
                
              </tr>
            </thead>
            
              {records.map((item, index) => {
                let addi =  (Object.entries(item).reduce((sum,[key,value])=>{return (key == 'diesel' || key == 'lifters' || key == 'boys' || key == 'driver' || key == 'room' || key == 'food' || key == 'travel' || key == 'r_amount' || key == 'inc_amount')? sum+= Number(value) : sum+=0},0))
                return (<tbody key={index}>
                  <tr className="hover:bg-gray-50">
                    <td className="border bg-gray-400 p-3 text-sm text-gray-600">{item.date}</td>
                    <td className="border p-3 text-sm text-gray-600">{item.reporter}</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.diesel)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.lifters)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.boys)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.driver)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.room)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.discount)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.seller)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.kvcs)} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(item.parking)} RWF</td>
                  </tr>
                  <tr>
                    <td colSpan={12}>
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
                              Andi mafaranga
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
                            <td className="border p-3 text-sm text-gray-600">{adcm(item.travel)} RWF</td>
                            <td className="border p-3 text-sm text-gray-600">{adcm(item.g_amount)} RWF</td>
                            <td className="border p-3 text-sm text-gray-600">{item.o_m} RWF</td>
                            <td className="border p-3 text-sm text-gray-600">{item.comment}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                </tbody>)
              })}
          </table>
        
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl mb-2 text-center">TOTAL YA DEPANSE ZAGARAGAYE</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-indigo-500">
            <thead className="bg-indigo-100">
            <tr className="bg-gray-100">
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
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                 Discount
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Umucuruzi
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                KVCS
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Parking
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Kurya
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Urugendo
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Andi mafaranga
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with dynamic data */}
              <tr className="hover:bg-gray-50">
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.diesel || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.lifters || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.boys || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.driver || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.room || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.discount || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.seller || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.kvcs || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.parking || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.food || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.travel || 0), 0))} RWF</td>
                    <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.g_amount || 0), 0))} RWF</td>
                    {/* <td className="border p-3 text-sm text-gray-600">{adcm(records.reduce((sum, elem) => sum + (elem.o_m || 0), 0))} RWF</td> */}
                  </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DepansePage ;
