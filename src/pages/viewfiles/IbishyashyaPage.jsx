// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { adcm, f, pS, ShowMessage } from '../../../public/functions';

const IbishyashyaPage = () => {
    const [records,setRecords] = useState([]),
    [totals,setTotals] = useState(
      {
        added: 0,
        initamount: 0,
        mtotal : 0
      }
    ),
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
          let recs = await f('stock-1-report',pS)
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
              setTotals(
                recs.metadata.mainTotals
              )
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
      let recs = await f('stock-1-report',pS)
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
          setTotals(
            recs.metadata.mainTotals
          )
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
      {/* Title Section */}
      {showM ? <ShowMessage message={message.message} decision={message.decision}/>: null}
      <div className="mb-6">
      
        <h2 className="text-xl mt-2 text-center">RAPORO Y'IBIGORI BYINJIYE MU RUGANDA</h2>
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

      {/* Main Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse border border-indigo-500">
          <thead className="bg-indigo-100">
            <tr>
              <th className="border border-indigo-500 px-4 py-2">Itariki</th>
              <th className="border border-indigo-500 px-4 py-2">Amazina Y'ugemuye</th>
              <th className="border border-indigo-500 px-4 py-2">Plake y'Imodoka</th>
              <th className="border border-indigo-500 px-4 py-2">Ingano y'Ibyinjiye</th>
              <th className="border border-indigo-500 px-4 py-2">Ubwume bw'Ibigori</th>
              <th className="border border-indigo-500 px-4 py-2">Uruhumbu</th>
              <th className="border border-indigo-500 px-4 py-2">Igiciro</th>
              <th className="border border-indigo-500 px-4 py-2">Amafaranga Asabwa</th>
              <th className="border border-indigo-500 px-4 py-2">Amafaranga Yishyuwe</th>
              <th className="border border-indigo-500 px-4 py-2">Amafaranga Asigaye</th>
              <th className="border border-indigo-500 px-4 py-2">Utanze Raporo</th>
              <th className="border border-indigo-500 px-4 py-2">comment</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with dynamic data */}
            {
              records.map((element,index) => {
               return (
                <tr key={index} style={!element.dist_names ? {backgroundColor: '#ff000040'}: null}>
                    <td className="border bg-gray-400 border-indigo-500 px-4 py-2">({element.date})</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dist_names}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dist_plate_no}</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.weight)} KG</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dryness}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.moldness}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dist_names ? adcm(element.net_price) +'RWF': null}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dist_names ? adcm(element.gross_price) +'RWF': null}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dist_names ? adcm(element.amount_paid) +'RWF': null}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dist_names ? adcm(element.r_amount) +'RWF': null}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.reporter}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.comment}</td>
                </tr>)
              })
            }
            
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Subsection Table */}
      <div className="mb-6">
        <h2 className="text-xl mb-2 text-center">AMAKURU YUBUBIKO BUHARI</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-indigo-500">
            <thead className="bg-indigo-100">
              <tr>
                <th className="border border-indigo-500 px-4 py-2">Ingano y'Ibigori Byari Bihari</th>
                <th className="border border-indigo-500 px-4 py-2">Ingano y'Ibigori Byiyongereye</th>
                <th className="border border-indigo-500 px-4 py-2">Igiteranyo cy'Ibigori Bihari</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with dynamic data */}
              <tr>
                <td className="border border-indigo-500 px-4 py-2">{adcm(totals.initamount)} KG</td>
                <td className="border border-indigo-500 px-4 py-2">{adcm(totals.added)} KG</td>
                <td className="border border-indigo-500 px-4 py-2">{adcm(totals.mtotal)} KG</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IbishyashyaPage;
