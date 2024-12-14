import React, { useState, useMemo, useRef, useEffect } from 'react'
import { adcm, f, pS } from '../../../public/functions'

const IbisanzwePage = () => {

const  hasFetched = useRef(false),
  [records,setRecords] = useState([])

    useEffect(()=>{
      if (!hasFetched.current) {
        const fetchRecs = async ()=>{
          let schema = pS
          schema.body = JSON.stringify({date: {}})
          let recs = await f('sacksReport',pS)
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
    },[])
    const [date,setDate] = useState({
      start: null,
      stop: null
    })


    async function handleSubmit(e) {
      e.preventDefault()
      let schema = pS
      schema.body = JSON.stringify({date})
      let recs = await f('sacksReport',pS)
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
          RAPORO Y'IMIFUKA
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
       
        
        <div className="w-full overflow-x-auto mb-6">
          <table className="w-full bg-white border border-indigo-200 text-sm md:text-base">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-indigo-200 p-2 text-left">Date</th>
                <th className="border border-indigo-200 p-2 text-left">Utanze Raporo</th>
                <th className="border border-indigo-200 p-2 text-left">Icyongeweho</th>
              </tr>
            </thead>
              {records.map((item, index) => {
                return(<tbody key={index}>
                  <tr key={index} className="hover:bg-indigo-50" style={!item.reporter ? {background: '#ff000040'}: {}}>
                    <td className="border bg-gray-400 border-indigo-200 p-2">{item.date}</td>
                    <td className="border border-indigo-200 p-2">{item.reporter}</td>
                    <td className="border border-indigo-200 p-2">{item.comment}</td>
                  </tr>
                  <tr style={!item.reporter ? {background: '#ff000040'}: {}}>
                    <td colSpan={4}>
                      <div className="w-full overflow-x-auto">
                        <table className="w-full bg-white border border-indigo-200 text-sm md:text-base">
                          <thead>
                            <tr className="bg-indigo-50">
                              {['NEW FOOD', 'ISEZERANO', 'IFUNGURO', 'ISEZERANO ENVELOPE', 'ENVELOPE'].map((section) => (
                                <React.Fragment key={section}>
                                  <th colSpan="3" className="border border-indigo-200 p-2 text-center">{section}</th>
                                </React.Fragment>
                              ))}
                            </tr>
                            <tr className="bg-indigo-50">
                              {['NEW FOOD', 'ISEZERANO', 'IFUNGURO', 'MAGAJU', 'ENVELOPE'].map((section) => (
                                <React.Fragment key={section}>
                                  <th className="border border-indigo-200 p-2">{!item.reporter ? 'Ibiro': 'Ibiro' }</th>
                                  <th className="border border-indigo-200 p-2">{!item.reporter ? 'Imifuka yasohotse': 'Imifuka yiyongeye' }</th>
                                  <th className="border border-indigo-200 p-2">{!item.reporter ? 'Imifuka yasigaye': 'Imifuka yosehamwe' }</th>
                                </React.Fragment>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {['25', '10', '5'].map((weight) => {console.log(item.ls.envelope);return (
                              <tr key={weight} className="hover:bg-indigo-50">
                                 <td className="border border-indigo-200 p-2">{Number(weight)}</td>
                                <td className="border border-indigo-200 p-2">{item.ls.NF[weight]}</td>
                                <td className="border border-indigo-200 p-2">{item.r_sacks.NF[weight]}</td>

                                <td className="border border-indigo-200 p-2">{Number(weight)}</td>
                                <td className="border border-indigo-200 p-2">{item.ls.IS[weight]}</td>
                                <td className="border border-indigo-200 p-2">{item.r_sacks.IS[weight]}</td>
                               
                                <td className="border border-indigo-200 p-2">{Number(weight)}</td>
                                <td className="border border-indigo-200 p-2">{item.ls.IF[weight]}</td>
                                <td className="border border-indigo-200 p-2">{item.r_sacks.IF[weight]}</td>

                                <td className="border border-indigo-200 p-2">{Number(weight)}</td>
                                <td className="border border-indigo-200 p-2">{item.ls.MA[weight]}</td>
                                <td className="border border-indigo-200 p-2">{item.r_sacks.MA[weight]}</td>
                                {weight === '25' && (
                                  <>
                                    <td rowSpan="3" className="border border-indigo-200 p-2">{(Number('2'))}</td>
                                    <td rowSpan="3" className="border border-indigo-200 p-2">{item.ls.envelope['2'] || item.ls.envelope.toString()}</td>
                                    <td rowSpan="3" className="border border-indigo-200 p-2">{item.r_sacks.envelope['2'].toString()}</td>

                                  </>
                                )}
                              </tr>
                            )})}
                            {/* <tr className="font-bold bg-indigo-50">
                              <td className="border border-indigo-200 p-2">{}</td>
                              <td className="border border-indigo-200 p-2">{adcm(Object.values(item.ls.NF).reduce((sum,index)=>(sum+ (index)),0))}</td>
                              <td className="border border-indigo-200 p-2" colSpan="2">Total:  {adcm(Object.entries(item.ls.NF).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                              
                              <td className="border border-indigo-200 p-2"></td>
                              <td className="border border-indigo-200 p-2">{adcm(Object.values(item.ls.IS).reduce((sum,index)=>(sum+ (index)),0))}</td>
                              <td className="border border-indigo-200 p-2" colSpan="2">Total: {adcm(Object.entries(item.ls.IS).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                              
                              <td className="border border-indigo-200 p-2"></td>
                              <td className="border border-indigo-200 p-2">{adcm(Object.values(item.ls.IF).reduce((sum,index)=>(sum+ (index)),0))}</td>
                              <td className="border border-indigo-200 p-2" colSpan="2">Total: {adcm(Object.entries(item.ls.IF).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                              
                              <td className="border border-indigo-200 p-2"></td>
                              <td className="border border-indigo-200 p-2">{adcm(Object.values(item.ls.MA).reduce((sum,index)=>(sum+ (index)),0))}</td>
                              <td className="border border-indigo-200 p-2" colSpan="2">Total: {adcm(Object.entries(item.ls.MA).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                              
                              <td className="border border-indigo-200 p-2">{adcm(item.ls.envelope['2']* Number('2'))}</td>
                              <td className="border border-indigo-200 p-2">{item.ls.envelope['2']}</td>
                              <td className="border border-indigo-200 p-2" colSpan="2">Total</td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>)
              })}
          </table>
        </div>
      </div>
    </div>
  )
}

export default IbisanzwePage