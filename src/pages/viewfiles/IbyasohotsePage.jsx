import React, { useState, useMemo, useEffect, useRef } from 'react'
import { adcm, f, pS, ShowMessage } from '../../../public/functions'

const IbyasohotsePage = () => {
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
        let recs = await f('sales-nr-report',pS)
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
    let recs = await f('sales-nr-report',pS)
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
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-4">
          RAPORO YUWAGEMUYE IFU KWISOKO
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
                {/* <th className="border border-indigo-200 p-2 text-left">Umucuruzi</th> */}
                <th className="border border-indigo-200 p-2 text-left">Aho yakoreye</th>
                {/* <th className="border border-indigo-200 p-2 text-left">Uburyo bishyuyemo</th> */}
                {/* <th className="border border-indigo-200 p-2 text-left">Amazina y'uwishyuye</th> */}
                <th className="border border-indigo-200 p-2 text-left">Icyongeweho</th>
                
              </tr>
            </thead>
              {records.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr className="hover:bg-indigo-50">
                      <td className="border bg-gray-400 border-indigo-200 p-2">{item.date}</td>
                      <td className="border border-indigo-200 p-2">{item.reporter}</td>
                      {/* <td className="border border-indigo-200 p-2">{item.distributor}</td> */}
                      <td className="border border-indigo-200 p-2">{item.loc}</td>
                      {/* <td className="border border-indigo-200 p-2">{item.pm}</td> */}
                      {/* <td className="border border-indigo-200 p-2">{item.p_name}</td> */}
                      <td className="border border-indigo-200 p-2">{item.comment}</td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                        {/*
                          <div className="overflow-x-auto">
                            <h2 className="text-2xl font-bold text-center text-indigo-800 mb-4">
                              IBYO YATWAYE
                            </h2>
                              <table className="min-w-full bg-white border border-indigo-200">
                                <thead>
                                  <tr className="bg-indigo-50">
                                    <th colSpan="2" className="border border-indigo-200 p-2 text-left">NEW FOO</th>
                                    <th colSpan="2" className="border border-indigo-200 p-2 text-left">ISEZERANO</th>
                                    <th colSpan="2" className="border border-indigo-200 p-2 text-left">IFUNGURO</th>
                                    <th colSpan="2" className="border border-indigo-200 p-2 text-left">MAGAJU</th>
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
                                      <td className="border border-indigo-200 p-2">{weight}</td>
                                      <td className="border border-indigo-200 p-2">{item.p_delivered['NF'][weight]}</td>
                                      <td className="border border-indigo-200 p-2">{weight}</td>
                                      <td className="border border-indigo-200 p-2">{item.p_delivered['IS'][weight]}</td>
                                      <td className="border border-indigo-200 p-2">{weight}</td>
                                      <td className="border border-indigo-200 p-2">{item.p_delivered['IF'][weight]}</td>
                                      <td className="border border-indigo-200 p-2">{weight}</td>
                                      <td className="border border-indigo-200 p-2">{item.p_delivered['MA'][weight]}</td>
                                      {weight === '25' && (
                                        <>
                                          <td rowSpan="3" className="border border-indigo-200 p-2">{5}</td>
                                          <td rowSpan="3" className="border border-indigo-200 p-2">{item.p_delivered['envelope'][5]}</td>
                                        </>
                                      )}
                                    </tr>
                                  ))}
                                  <tr className="font-bold bg-indigo-50">
                                    <td className="border border-indigo-200 p-2">Total:</td>
                                    <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_delivered.NF).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                    <td className="border border-indigo-200 p-2">Total:</td>
                                    <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_delivered.IS).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                    <td className="border border-indigo-200 p-2">Total:</td>
                                    <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_delivered.IF).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                    <td className="border border-indigo-200 p-2">Total:</td>
                                    <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_delivered.MA).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                    <td className="border border-indigo-200 p-2">Total:</td>
                                    <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_delivered.envelope).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>
                          */}
                          <div className="overflow-x-auto">
                            <h2 className="text-2xl font-bold text-center text-indigo-800 mb-4">
                              IBYO YACURUJE
                            </h2>
                          <table className="min-w-full bg-white border border-indigo-200">
                          
                            <thead>
                              <tr className="bg-indigo-50">
                                <th colSpan="4" className="border border-indigo-200 p-2 text-center">NEW FOOD</th>
                                <th colSpan="4" className="border border-indigo-200 p-2 text-center">ISEZERANO</th>
                                <th colSpan="4" className="border border-indigo-200 p-2 text-center">IFUNGURO RYIZA</th>
                                <th colSpan="4" className="border border-indigo-200 p-2 text-center">MANEMANE</th>
                                <th colSpan="4" className="border border-indigo-200 p-2 text-center">ENVELOPE</th>
                              </tr>
                              <tr className="bg-indigo-50">
                                {['NEW FOOD', 'ISEZERANO', 'IFUNGURO', 'MAGAJU', 'ENVELOPE'].map((section) => (
                                  <React.Fragment key={section}>
                                    <th className="border border-indigo-200 p-2">Ibiro</th>
                                    <th className="border border-indigo-200 p-2">Imifuka</th>
                                    <th className="border border-indigo-200 p-2">Igiciro kumufuka</th>
                                    <th className="border border-indigo-200 p-2">Amafaranga yose hamwe </th>
                                  </React.Fragment>
                                ))}
                              </tr>       
                            </thead>
                            <tbody>
                              {['25', '10', '5'].map((weight) => (
                                <tr key={weight} className="hover:bg-indigo-50">
                                  <td className="border border-indigo-200 p-2">{weight}kg</td>
                                  <td className="border border-indigo-200 p-2">{item.p_sold.NF.weights[weight]}</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.NF.pricings[weight])} RWF</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.NF.totals[weight])} FRW</td>


                                  <td className="border border-indigo-200 p-2">{weight}kg</td>
                                  <td className="border border-indigo-200 p-2">{item.p_sold.IS.weights[weight]}</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.IS.pricings[weight])} RWF</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.IS.totals[weight])} FRW</td>


                                  <td className="border border-indigo-200 p-2">{weight}kg</td>
                                  <td className="border border-indigo-200 p-2">{item.p_sold.IF.weights[weight]}</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.IF.pricings[weight])}RWF</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.IF.totals[weight])} FRW</td>

                                  <td className="border border-indigo-200 p-2">{weight}kg</td>
                                  <td className="border border-indigo-200 p-2">{item.p_sold.MA.weights[weight]}</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.MA.pricings[weight])}RWF</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.MA.totals[weight])} FRW</td>
                                  {weight === '25' && (
                                    <>
                                      <td rowSpan="3" className="border border-indigo-200 p-2">{5}kg</td>
                                      <td rowSpan="3" className="border border-indigo-200 p-2">{item.p_sold.envelope.weights[5]}</td>
                                      <td rowSpan="3" className="border border-indigo-200 p-2">{item.p_sold.envelope.pricings[5]} RWF</td>
                                      <td rowSpan="3" className="border border-indigo-200 p-2">{adcm(item.p_sold.envelope.totals[5])} FRW</td>
                                    </>
                                  )}
                                </tr>
                              ))}
                              <tr className="font-bold bg-indigo-50">
                                <td className="border border-indigo-200 p-2">Weight:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_sold.NF.weights).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2" colSpan="2">Total&nbsp;{adcm(Object.values(item.p_sold.NF.totals).reduce((sum,index)=>(sum+ (index)),0))} RWF</td>
                                <td className="border border-indigo-200 p-2">Weight:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_sold.IS.weights).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2" colSpan="2">Total&nbsp;{adcm(Object.values(item.p_sold.IS.totals).reduce((sum,index)=>(sum+ (index)),0))} RWF</td>
                                <td className="border border-indigo-200 p-2">Weight:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_sold.IF.weights).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2" colSpan="2">Total&nbsp;{adcm(Object.values(item.p_sold.IF.totals).reduce((sum,index)=>(sum+ (index)),0))} RWF</td>
                                <td className="border border-indigo-200 p-2">Weight:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_sold.MA.weights).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2" colSpan="2">Total&nbsp;{adcm(Object.values(item.p_sold.MA.totals).reduce((sum,index)=>(sum+ (index)),0))} RWF</td>
                                <td className="border border-indigo-200 p-2">Weight:</td>
                                <td className="border border-indigo-200 p-2">{adcm(Object.entries(item.p_sold.envelope.weights).reduce((sum,[key,index])=>(sum+ (key*index)),0))} KG</td>
                                <td className="border border-indigo-200 p-2" colSpan="2">Total&nbsp;{adcm(Object.values(item.p_sold.envelope.totals).reduce((sum,index)=>(sum+ (index)),0))} RWF</td>
                              </tr>
                              
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
              )})}
          </table>
        </div>
      </div>
    </div>
  )
}

export default IbyasohotsePage