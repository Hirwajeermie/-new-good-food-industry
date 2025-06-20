import React, { useState, useEffect, useRef } from 'react';
import { adcm, f, pS, ShowMessage } from '../../../public/functions';

const IbyagurishijwePage = () => {
  const [marketData, setMarketData] = useState([]),
  [records,setRecords] = useState([])
  ,hasFetched = useRef(false),
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
        let recs = await f('sales-report',pS)
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
        // setTotals(
        //   recs.metadata.mainTotals
        // )
      }
      fetchRecs()
      hasFetched.current = true
    }
  },[])
  async function handleSubmit(e) {
    e.preventDefault()
    let schema = pS
    schema.body = JSON.stringify({date})
    let recs = await f('sales-report',pS)
    setShowM(true)
      setMessage({
        message: recs.message,
        decision: recs.success
      })
      setTimeout(() => {
        setShowM(false);
      }, 3000);
    setRecords(recs.metadata.report)
    console.log(date)
  }
  function handleChange(e) {
    const {name,value} = e.target
    setDate((prevD=>({
      ...prevD,
      [name]: value
    })))
  }

  return (
    <div className="w-full p-4 space-y-8">
            {showM ? <ShowMessage message={message.message} decision={message.decision}/>: null}
      {/* Market Data Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4 text-center">Amakuru Yibyagiye Kw'isoko</h2>

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
          <table className="min-w-full border-collapse border">
            <thead>
              <tr>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">Date</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">Utanze Raporo</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">Umucuruzi</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">Amafaranga Arava Kw'isoko</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">No Y'umufuka wa New Food</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">No Y'umufuka w'Ifunguro ryiza</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">No Y'umufuka wi Isezerano</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">No Y'umufuka wi Isezerano Envelope</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">No Y'umufuka wa manemane</th>
                <th className="border bg-indigo-100 p-2 text-left text-indigo-500">Icyongerwaho</th>
              </tr>
            </thead>
              {records.map((item, index) => (
                <tbody key={index}>
                  <tr key={index}>
                    <td className="border bg-gray-400 p-2">{item.date}</td>
                    <td className="border p-2">{item.reporter}</td>
                    <td className="border p-2">{item.distributor}</td>
                    <td className="border p-2">{adcm(item.g_amount)}</td>
                    <td className="border p-2">{item.sack_no_NF}</td>
                    <td className="border p-2">{item.sack_no_IF}</td>
                    <td className="border p-2">{item.sack_no_IS}</td>
                    <td className="border p-2">{item.sack_no_ISENV}</td>
                    <td className="border p-2">{item.sack_no_MA}</td>
                    <td className="border p-2">{item.comment}</td>
                  </tr>
                  <tr>
                    <td colSpan={10}>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border">
                          <thead>
                            <tr>
                              <th colSpan="4" className="border bg-gray-100 p-2 text-left text-indigo-500">NEW FOOD</th>
                              <th colSpan="4" className="border bg-gray-100 p-2 text-left text-indigo-500">IFUNGURO</th>
                              <th colSpan="4" className="border bg-gray-100 p-2 text-left text-indigo-500">ISEZERANO</th>
                              <th colSpan="4" className="border bg-gray-100 p-2 text-left text-indigo-500">MANEMANE</th>
                              <th colSpan="4" className="border bg-gray-100 p-2 text-left text-indigo-500">IS ENVELOPE/5KG</th>
                            </tr> 
                            <tr className="bg-gray-50">
                              {['NEW FOOD', 'IFUNGURO', 'ISEZERANO', 'MAGAJU'].map(product => (
                                <React.Fragment key={product}>
                                  <th className="border p-2">ibiro</th>
                                  <th className="border p-2">imifuka</th>
                                  <th className="border p-2">Igiciro (RWF)</th>
                                  <th className="border p-2">total (RWF)</th>
                                </React.Fragment>
                              ))}
                              <th className="border p-2">ibiro</th> 
                              <th className="border p-2">envelope</th>
                              <th className="border p-2">Igiciro (RWF)</th>
                              <th className="border p-2">total (RWF)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[0, 1, 2].map((rowIndex) => (
                              <tr key={rowIndex}>
                                {[1,2,3,4,5].map((data,index) => {
                                  if (index == 5 && rowIndex > 0) {
                                    return null;
                                  }
                                  let currentI = null
                                  index == 0 ? currentI = 'new_food': index == 1 ? currentI = 'ifunguro' : index == 2 ? currentI= 'isezerano' : index == 3 ? currentI= 'magaju': index == 4 ? currentI = 'envelope': null
                                  let unit = Number(Object.keys(item[currentI].weights).reverse()[rowIndex]) || null,
                                  count = Number(Object.values(item[currentI].weights).reverse()[rowIndex]) || null,
                                  price = Number(Object.values(item[currentI].pricings).reverse()[rowIndex]) || null
                                  return (
                                    <React.Fragment key={`${currentI}-${rowIndex}`}>
                                      <td className="border p-2">
                                        <input
                                          value={unit}
                                          className="w-full bg-gray-50"
                                        />
                                      </td>
                                      <td className="border p-2">
                                        <input
                                          value={count}
                                          className="w-full bg-gray-50"
                                        />
                                      </td>
                                      <td className="border p-2">
                                        <input

                                          value={adcm(price)}
                                          className="w-full bg-gray-50"
                                        />
                                      </td>
                                      <td className="border p-2">
                                        <input
                                          value={adcm(count*price)}
                                          className="w-full bg-gray-50"
                                        />
                                      </td>
                                    </React.Fragment>
                                  );
                                })}
                              </tr>
                            ))}
                            <tr className="bg-gray-200 font-bold">
                              {[1,2,3,4,5].map((data, index) => {
                                let currentI = null
                                index == 0 ? currentI = 'new_food': index == 1 ? currentI = 'ifunguro' : index == 2 ? currentI= 'isezerano' : index == 3 ? currentI= 'magaju': index == 4 ? currentI = 'envelope': null
                                let count = (Object.values(item[currentI].weights).reverse()),
                                price = (Object.values(item[currentI].pricings).reverse()),
                                totals = count.map((el,i)=> el*price[i])
                                // const totalOfTotals = data.reduce((sum, row) => sum + (row.imifuka || row.envelope || 0) * row.igiciro, 0);

                                return (
                                  <td key={`${currentI}-total`} colSpan="4" className="border p-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-indigo-600">Total:</span>
                                      <span>{adcm(totals.reduce((sum,data)=> sum+ data,0))}</span>
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>

                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default IbyagurishijwePage;