/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { adcm, f, pS, ShowMessage } from '../../../public/functions';

const Ibigiyegutunganywa = () => {
  const [additionalInfo, setAdditionalInfo] = useState('THIS COMMENTS FOR REPORT'),
  [records,setRecords] = useState([]),
  [date,setDate] = useState({
    start: null,
    stop: null
  }),
  [showM,setShowM] = useState(false),
    [message,setMessage] = useState(''),
    [totals,setTotals]= useState({})
  useEffect(()=>{
    const fetchRecs = async ()=>{
      let schema = pS
      schema.body = JSON.stringify({date: {}})
      let recs = await f('preparation-report',pS)
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
          setTotals(recs.metadata.mainTotals)
        }
    }
    fetchRecs()
  },[])

  async function handleSubmit(e) {
    e.preventDefault()
    let schema = pS
    schema.body = JSON.stringify({date})
    let recs = await f('preparation-report',pS)
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
    <div className="container mx-auto p-4">
            {showM ? <ShowMessage message={message.message} decision={message.decision}/>: null}
      <div className="mb-6">
       
        <h2 className="text-xl mt-2 text-center">RAPORO Y&apos;IBIGORI BIGIYE GUTUNGANYWA</h2>
      </div>
      
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
        <div className="mb-6">
              <h2 className="text-xl mb-2 text-center">IBYAGOSOWE</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-indigo-500">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="border border-indigo-500 px-4 py-2">Igiteranyo cy'Ibigori Byagosowe bisigaye</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Replace with dynamic data */}
                    <tr>
                      <td className="border border-indigo-500 px-4 py-2">{adcm(totals.mtotal)} KG</td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
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
        {/* Subsection Table */}

    </div>
  );
};

export default Ibigiyegutunganywa;
