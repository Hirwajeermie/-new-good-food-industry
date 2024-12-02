import React, { useState, useMemo, useEffect, useRef } from 'react'
import { adcm, f, pS } from '../../../public/functions'

const IbyasohotsePage = () => {
  const [records,setRecords] = useState([]),
  hasFetched = useRef(false)
  useEffect(()=>{
    if (!hasFetched.current) {
      const fetchRecs = async ()=>{
        let schema = pS
        schema.body = JSON.stringify({date: {}})
        let recs = await f('sales-nr-report',pS)
        setRecords(recs.metadata.report)
        // setTotals(
        //   recs.metadata.mainTotals
        // )
      }
      fetchRecs()
      hasFetched.current = true
    }
  },[])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-4">
          RAPORO YUWAGEMUYE IFU KWISOKO
        </h2>
       
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-indigo-200">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-indigo-200 p-2 text-left">Date</th>
                <th className="border border-indigo-200 p-2 text-left">Utanze Raporo</th>
                <th className="border border-indigo-200 p-2 text-left">Umucuruzi</th>
                <th className="border border-indigo-200 p-2 text-left">Aho yakoreye</th>
                <th className="border border-indigo-200 p-2 text-left">Uburyo bishyuyemo</th>
                <th className="border border-indigo-200 p-2 text-left">Icyongeweho</th>
                
              </tr>
            </thead>
              {records.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr className="hover:bg-indigo-50">
                      <td className="border bg-gray-400 border-indigo-200 p-2">{item.date}</td>
                      <td className="border border-indigo-200 p-2">{item.reporter}</td>
                      <td className="border border-indigo-200 p-2">{item.distributor}</td>
                      <td className="border border-indigo-200 p-2">{item.location}</td>
                      <td className="border border-indigo-200 p-2">{item.pm}</td>
                      <td className="border border-indigo-200 p-2">{item.comment}</td>
                    </tr>
                    <tr>
                      <td colSpan={6}>
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
                                <th colSpan="4" className="border border-indigo-200 p-2 text-center">IFUNGURO</th>
                                <th colSpan="4" className="border border-indigo-200 p-2 text-center">ISEZERANO ENVELOPE</th>
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
                                  <td className="border border-indigo-200 p-2">{item.p_sold.IS.weights[weight]}</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.IS.pricings[weight])}RWF</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.IS.totals[weight])} FRW</td>

                                  <td className="border border-indigo-200 p-2">{weight}kg</td>
                                  <td className="border border-indigo-200 p-2">{item.p_sold.MA.weights[weight]}</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.MA.pricings[weight])}RWF</td>
                                  <td className="border border-indigo-200 p-2">{adcm(item.p_sold.MA.totals[weight])} FRW</td>
                                  {weight === '25' && (
                                    <>
                                      <td rowSpan="3" className="border border-indigo-200 p-2">{2}kg</td>
                                      <td rowSpan="3" className="border border-indigo-200 p-2">{item.p_sold.envelope.weights[2]}</td>
                                      <td rowSpan="3" className="border border-indigo-200 p-2">{item.p_sold.envelope.pricings[2]} RWF</td>
                                      <td rowSpan="3" className="border border-indigo-200 p-2">{adcm(item.p_sold.envelope.totals[2])} FRW</td>
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