import React, { useState } from 'react';

const View = () => {
  const [reporterName, setReporterName] = useState('NyamaNSWA'); // Example placeholder name
  const [additionalInfo, setAdditionalInfo] = useState('NABISOJE DATABUJAAA');
  return (
    <div className="container mx-auto p-4">
      {/* Title Section */}
      <div className="mb-6"> 
        <h1 className="text-2xl font-bold text-indigo-600">Utanze Raporo:{reporterName}</h1>
        <h2 className="text-xl mt-2 text-center">RAPORO Y'IBIGORI BYINJIYE MU RUGANDA</h2>
      </div>

    
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
            
            <tr>
            <td className="border border-indigo-500 px-4 py-2">05/11/2024</td>
              <td className="border border-indigo-500 px-4 py-2">PABLOSCH</td>
              <td className="border border-indigo-500 px-4 py-2">RAD 123B</td>
              <td className="border border-indigo-500 px-4 py-2">900 kg</td>
              <td className="border border-indigo-500 px-4 py-2">700kg</td>
              <td className="border border-indigo-500 px-4 py-2">200kg</td>
              <td className="border border-indigo-500 px-4 py-2">$5/kg</td>
              <td className="border border-indigo-500 px-4 py-2">$2500</td>
              <td className="border border-indigo-500 px-4 py-2">$2500</td>
              <td className="border border-indigo-500 px-4 py-2">$0</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
          <tbody>
            {/* Replace with dynamic data */}
            <tr>
            <td className="border border-indigo-500 px-4 py-2">06/11/2024</td>
              <td className="border border-indigo-500 px-4 py-2">BRUCES</td>
              <td className="border border-indigo-500 px-4 py-2">RAD 123B</td>
              <td className="border border-indigo-500 px-4 py-2">700 kg</td>
              <td className="border border-indigo-500 px-4 py-2">500kg</td>
              <td className="border border-indigo-500 px-4 py-2">200kg</td>
              <td className="border border-indigo-500 px-4 py-2">500Frw/kg</td>
              <td className="border border-indigo-500 px-4 py-2">40000Frw</td>
              <td className="border border-indigo-500 px-4 py-2">25000Frw</td>
              <td className="border border-indigo-500 px-4 py-2">15000Frw</td>
            </tr>
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
                <td className="border border-indigo-500 px-4 py-2">1000 kg</td>
                <td className="border border-indigo-500 px-4 py-2">500 kg</td>
                <td className="border border-indigo-500 px-4 py-2">1500 kg</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        <div className="mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Comments:{additionalInfo}</h1>
      </div>
      </div>
    </div>
  );
};

export default View;
