/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { adcm, f, pS } from '../../../public/functions';

const Ibigiyegutunganywa = () => {
  const [additionalInfo, setAdditionalInfo] = useState('THIS COMMENTS FOR REPORT'),
  [records,setRecords] = useState([]),
  [totals,setTotals] = useState(
    {
      added: 0,
      initamount: 0,
      mtotal : 0
    }
  )
  useEffect(()=>{
    const fetchRecs = async ()=>{
      let schema = pS
      schema.body = JSON.stringify({date: {}})
      let recs = await f('preparation-report',pS)
      setRecords(recs.metadata.report)
      setTotals(
        recs.metadata.mainTotals
      )
    }
    fetchRecs()
  },[])
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
       
        <h2 className="text-xl mt-2 text-center">RAPORO Y&apos;IBIGORI BIGIYE GUTUNGANYWA</h2>
      </div>
      

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse border border-indigo-500">
          <thead className="bg-indigo-100">
            <tr>
              <th className="border border-indigo-500 px-4 py-2">Itariki</th>
              <th className="border border-indigo-500 px-4 py-2">UTANZE RAPORO</th>
              <th className="border border-indigo-500 px-4 py-2">INGANO YIBIGIYE KUGOSORWA</th>
              <th className="border border-indigo-500 px-4 py-2">INGANO YIMYANDA YAVUYEMO</th>
              <th className="border border-indigo-500 px-4 py-2">IBIGORI BIGIYE GUKOBORWA</th>
              <th className="border border-indigo-500 px-4 py-2">Comments</th>
            </tr>
          </thead>
          <tbody>
          {
              records.map((element,index) => {
               return (
                <tr key={index}>
                    <td className="border bg-gray-400 border-indigo-500 px-4 py-2">({element.date})</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.reporter}</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.incoming_c)} KG</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.waste_f)} KG</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.prepared_c)} KG</td> 
                    <td className="border border-indigo-500 px-4 py-2">{element.comment}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    

    </div>
  );
};

export default Ibigiyegutunganywa;
