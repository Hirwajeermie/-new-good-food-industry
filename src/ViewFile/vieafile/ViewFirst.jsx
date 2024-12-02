// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { adcm, f, pS } from '../../../public/functions';

const View = () => {
    const [reporterName, setReporterName] = useState('nyamanswa');
    const [additionalInfo, setAdditionaLInfo] = useState('databuja nabisoje'),
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
        let recs = await f('stock-1-report',pS)
        setRecords(recs.metadata.report)
        setTotals(
          recs.metadata.mainTotals
        )
      }
      fetchRecs()
    },[])
  return (
    <div className="container mx-auto p-4">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Utanze Raporo:{reporterName}</h1>
        <h2 className="text-xl mt-2 text-center">RAPORO Y'IBIGORI BYINJIYE MU RUGANDA</h2>
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
            </tr>
          </thead>
          <tbody>
            {/* Replace with dynamic data */}
            {
              records.map((element,index) => {
               return (
                <tr key={index}>
                    <td className="border border-indigo-500 px-4 py-2">({element.date})</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dist_names}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dist_plate_no}</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.weight)} KG</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.dryness}</td>
                    <td className="border border-indigo-500 px-4 py-2">{element.moldness}</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.net_price)} RWF</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.gross_price)} RWF</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.amount_paid)} RWF</td>
                    <td className="border border-indigo-500 px-4 py-2">{adcm(element.r_amount)} RWF</td>
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
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-indigo-600">comments:{additionalInfo}</h1>
            
        </div>
      </div>
    </div>
  );
};

export default View;
