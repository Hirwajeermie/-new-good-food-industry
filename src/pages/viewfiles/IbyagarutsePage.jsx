import React, { useState, useMemo, useEffect, useRef } from 'react'
import { adcm, f, pS } from '../../../public/functions'

const IbyagarutsePage= () => {
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
        let recs = await f('returnsReport',pS)
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
    let recs = await f('returnsReport',pS)
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
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-4">
          RAPORO YIBYAGARUTSE
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
       
        
          <table className="min-w-full bg-white border border-indigo-200">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border  border-indigo-200 p-2 text-left">Date</th>
                <th className="border border-indigo-200 p-2 text-left">Utanze Raporo</th>
                <th className="border border-indigo-200 p-2 text-left">Icyongerwaho</th>
 
              </tr>
            </thead>
              {records.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr key={index} className="hover:bg-indigo-50">
                      <td className="border bg-gray-400 border-indigo-200 p-2">{item.date}</td>
                      <td className="border border-indigo-200 p-2">{item.reporter}</td>
                      <td className="border border-indigo-200 p-2">{item.comment}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                      <table className="min-w-full bg-white border border-indigo-200">
                          <thead>
                            <tr className="bg-indigo-50">
                              <th colSpan="2" className="border border-indigo-200 p-2 text-left">NEW FOOD</th>
                              <th colSpan="2" className="border border-indigo-200 p-2 text-left">ISEZERANO</th>
                              <th colSpan="2" className="border border-indigo-200 p-2 text-left">IFUNGURO</th>
                              <th colSpan="2" className="border border-indigo-200 p-2 text-left">IFUNGURO RYIZA</th>
                              <th colSpan="2" className="border border-indigo-200 p-2 text-left">ENVELOPE</th>
                            </tr>
                            <tr className="bg-indigo-50">
                              <th className="border border-indigo-200 p-2">IBIRO</th>
                              <th className="border border-indigo-200 p-2">IMIFUKA</th>
                              <th className="border border-indigo-200 p-2">IBIRO</th>
                              <th className="border border-indigo-200 p-2">IMIFUKA</th>
                              <th className="border border-indigo-200 p-2">IBIRO</th>
                              <th className="border border-indigo-200 p-2">IMIFUKA</th>
                              <th className="border border-indigo-200 p-2">IBIRO</th>
                              <th className="border border-indigo-200 p-2">IMIFUKA</th>
                              <th className="border border-indigo-200 p-2">IBIRO</th>
                              <th className="border border-indigo-200 p-2">IMIFUKA</th>
                            </tr>
                          </thead>
                          <tbody>
                          {['25', '10', '5'].map((weight) => (
                              <tr key={weight} className="hover:bg-indigo-50">
                                <td className="border border-indigo-200 p-2">{weight}kg</td>
                                <td className="border border-indigo-200 p-2">{item['new_food'][weight]}</td>
                                <td className="border border-indigo-200 p-2">{weight}kg</td>
                                <td className="border border-indigo-200 p-2">{item['isezerano'][weight]}</td>
                                <td className="border border-indigo-200 p-2">{weight}kg</td>
                                <td className="border border-indigo-200 p-2">{item['ifunguro'][weight]}</td>
                                <td className="border border-indigo-200 p-2">{weight}kg</td>
                                <td className="border border-indigo-200 p-2">{item['magaju'][weight]}</td>
                                {weight === '25' && (
                                  <>
                                    <td rowSpan="3" className="border border-indigo-200 p-2">{2}kg</td>
                                    <td rowSpan="3" className="border border-indigo-200 p-2">{item['envelope'][2]}</td>
                                  </>
                                )}
                              </tr>
                            ))}
                            <tr className="font-bold bg-indigo-50">
                                <td className="border border-indigo-200 p-2">Total:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.new_food).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2">Total:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.isezerano).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2">Total:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.ifunguro).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2">Total:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.magaju).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2">Total:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.envelope).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                              </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
          </table>
          </div>
      </div>
    
  )
}

export default IbyagarutsePage;