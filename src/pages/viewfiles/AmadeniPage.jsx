import React, { useState } from "react";

const initialFormData = {
  submittedData: [
    {
      itariki: "2024-01-15",
      utanzeRaporo: "Umushakada",
      umukiliya: "UMUSHINGA W'UBUCURUZI",
      amafarangaYararimo: "50000",
      ayoYishyuye: "30000",
      uburyoYishyuyemo: "Mobile Money",
      asigaye: "20000",
      comment: "Ibyatanzwe byose byagenze neza"
    }
  ]
};

function AmadeniPage() {
  const [formData] = useState(initialFormData);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
        RAPORO YAMADENI YISHYUWE 
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  Itariki
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  Utanze Raporo
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  Izina RY'umukiliya
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  AMAFARANGA YARARIMO
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  AYO YISHYUYE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  UBURYO YISHYUYEMO
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  ASIGAYE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                  Icyongerwaho
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.submittedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.itariki}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.utanzeRaporo}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.umukiliya}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.amafarangaYararimo}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.ayoYishyuye}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.uburyoYishyuyemo}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.asigaye}
                  </td>
                  <td className="border p-3 text-sm text-gray-600 md:table-cell">
                    {item.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="md:hidden space-y-4 mt-6">
          {formData.submittedData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold text-sm text-gray-700">Itariki</div>
                <div className="text-sm text-gray-600">{item.itariki}</div>

                <div className="font-semibold text-sm text-gray-700">Utanze Raporo</div>
                <div className="text-sm text-gray-600">{item.utanzeRaporo}</div>

                <div className="font-semibold text-sm text-gray-700">Izina RY'umukiliya</div>
                <div className="text-sm text-gray-600">{item.umukiliya}</div>

                <div className="font-semibold text-sm text-gray-700">AMAFARANGA YARARIMO</div>
                <div className="text-sm text-gray-600">{item.amafarangaYararimo}</div>

                <div className="font-semibold text-sm text-gray-700">AYO YISHYUYE</div>
                <div className="text-sm text-gray-600">{item.ayoYishyuye}</div>

                <div className="font-semibold text-sm text-gray-700">UBURYO YISHYUYEMO</div>
                <div className="text-sm text-gray-600">{item.uburyoYishyuyemo}</div>

                <div className="font-semibold text-sm text-gray-700">ASIGAYE</div>
                <div className="text-sm text-gray-600">{item.asigaye}</div>

                <div className="font-semibold text-sm text-gray-700">Icyongerwaho</div>
                <div className="text-sm text-gray-600">{item.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AmadeniPage;