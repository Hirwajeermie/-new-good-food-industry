import React, { useState, useMemo, useRef, useEffect } from 'react'
import { f, pS } from '../../../public/functions'

const IbisanzwePage = () => {

const  hasFetched = useRef(false),
  [records,setRecords] = useState([])

    useEffect(()=>{
      if (!hasFetched.current) {
        const fetchRecs = async ()=>{
          let schema = pS
          schema.body = JSON.stringify({date: {}})
          let recs = await f('packaging-report',pS)
           if (recs.success) {
          setRecords(recs.metadata.report)
        }
          // setTotalsn(
          //   recs.metadata.mainTotals
          // )
        }
        fetchRecs()
        hasFetched.current = true
      }
    },[]),
    [date,setDate] = useState({
      start: null,
      stop: null
    })


    async function handleSubmit(e) {
      e.preventDefault()
      let schema = pS
      schema.body = JSON.stringify({date})
      let recs = await f('packaging-report',pS)
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
          IBIGORI BYAKOBOWE
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
       
        
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-indigo-200">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-indigo-200 p-2 text-left">Date</th>
                <th className="border border-indigo-200 p-2 text-left">Utanze Raporo</th>
                <th className="border border-indigo-200 p-2 text-left">Ingano (KG)</th>
                <th className="border border-indigo-200 p-2 text-left">Ubwoko bwamafu</th>
                <th className="border border-indigo-200 p-2 text-left">Nimero yumufuka</th>
                <th className="border border-indigo-200 p-2 text-left">Buranda Yavuyemo</th>
                <th className="border border-indigo-200 p-2 text-left">Icyongeweho</th>
              </tr>
            </thead>
              {records.map((item, index) => {
                let isNFAvai = Object.values(item.new_food).find(el=> el),
                isIFAvai = Object.values(item.ifunguro).find(el=> el),
                 isISAvai = Object.values(item.isezerano).find(el=> el),
                 isMAAvai = Object.values(item.magaju).find(el=> el),
                 avai_f = []
                 isNFAvai? avai_f.push('NF'): null
                 isIFAvai? avai_f.push('IF'): null
                 isISAvai? avai_f.push('IS'): null
                 isMAAvai? avai_f.push('MA'): null
                 return (
                  <tbody key={index}>
                   <tr className="hover:bg-indigo-50">
                      <td className="border bg-gray-400 border-indigo-200 p-2">{item.date}</td>
                      <td className="border border-indigo-200 p-2">{item.reporter}</td>
                      <td className="border border-indigo-200 p-2">{item.incoming_c}kg</td>
                      <td className="border border-indigo-200 p-2">{avai_f.toString()}</td>
                      <td className="border border-indigo-200 p-2">{item.sack_no}</td>
                      <td className="border border-indigo-200 p-2">{item.waste_f}kg</td>
                      <td className="border border-indigo-200 p-2">{item.comment}</td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white border border-indigo-200">
                            <thead>
                              <tr className="bg-indigo-50">
                                <th colSpan="4" className="border border-indigo-200 p-2 text-left">IFU ZATEGANKWAGA KUVAMO</th>
                                <th colSpan="2" className="border border-indigo-200 p-2 text-left">NEW FOOD</th>
                                <th colSpan="2" className="border border-indigo-200 p-2 text-left">ISEZERANO</th>
                                <th colSpan="2" className="border border-indigo-200 p-2 text-left">IFUNGURO</th>
                                <th colSpan="2" className="border border-indigo-200 p-2 text-left">ISEZERANO ENVELOPE</th>
                                <th colSpan="2" className="border border-indigo-200 p-2 text-left">ENVELOPE</th>
                              </tr>
                              <tr className="bg-indigo-50">
                                <th className="border border-indigo-200 p-2">NF</th>
                                <th className="border border-indigo-200 p-2">IF</th>
                                <th className="border border-indigo-200 p-2">IS</th>
                                <th className="border border-indigo-200 p-2">MG</th>
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
                                {['25', '10', '5'].map((weight) => {
                                  // console.log(item)
                                  return (
                                          <tr key={weight} className="hover:bg-indigo-50">
                                            {weight === '25' && (
                                              <>
                                                <td rowSpan="3" className="border border-indigo-200 p-2">{item.f_e['NF']}kg</td>
                                                <td rowSpan="3" className="border border-indigo-200 p-2">{item.f_e['IF']}kg</td>
                                                <td rowSpan="3" className="border border-indigo-200 p-2">{item.f_e['IS']}kg</td>
                                                <td rowSpan="3" className="border border-indigo-200 p-2">{item.f_e['MA']}kg</td>
                                              </>
                                            )}
                                            <td className="border border-indigo-200 p-2">{weight}kg</td>
                                            <td className="border border-indigo-200 p-2">{item.new_food[weight]}</td>
                                            <td className="border border-indigo-200 p-2">{weight}kg</td>
                                            <td className="border border-indigo-200 p-2">{item.isezerano[weight]}</td>
                                            <td className="border border-indigo-200 p-2">{weight}kg</td>
                                            <td className="border border-indigo-200 p-2">{item.ifunguro[weight]}</td>
                                            <td className="border border-indigo-200 p-2">{weight}kg</td>
                                            <td className="border border-indigo-200 p-2">{item.magaju[weight]}</td>
                                            {weight === '25' && (
                                              <>
                                                <td rowSpan="3" className="border border-indigo-200 p-2">{2}kg</td>
                                                <td rowSpan="3" className="border border-indigo-200 p-2">{item.envelopes}</td>
                                              </>
                                            )}
                                          </tr>
                                      )
                                  })}
                                <tr className="font-bold bg-indigo-50">
                                  <td colSpan="4" className="border border-indigo-200 p-2">{Object.values(item.f_e).reduce((acc, curr) => acc + Number(curr), 0)}</td>
                                  <td className="border border-indigo-200 p-2">total</td>
                                  <td className="border border-indigo-200 p-2">{Object.entries(item.new_food).reduce((acc, [key,value]) => acc + (Number(key)*value), 0)}</td>
                                  <td className="border border-indigo-200 p-2">total</td>
                                  <td className="border border-indigo-200 p-2">{Object.entries(item.isezerano).reduce((acc, [key,value]) => acc + (Number(key)*value), 0)}</td>
                                  <td className="border border-indigo-200 p-2">total</td>
                                  <td className="border border-indigo-200 p-2">{Object.entries(item.ifunguro).reduce((acc, [key,value]) => acc + (Number(key)*value), 0)}</td>
                                  <td className="border border-indigo-200 p-2">total</td>
                                  <td className="border border-indigo-200 p-2">{Object.entries(item.magaju).reduce((acc, [key,value]) => acc + (Number(key)*value), 0)}</td>
                                  <td className="border border-indigo-200 p-2">total</td>
                                  <td className="border border-indigo-200 p-2">{item.envelopes * 2}</td>
                                </tr>
                              </tbody>
                            </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                 )
              })}
          </table>
        </div>
      </div>
    </div>
  )
}

export default IbisanzwePage