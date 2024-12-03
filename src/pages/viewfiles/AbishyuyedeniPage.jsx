import React, { useState } from "react";

const initialFormData = {
  exampleData: [
    {
      date: "2024-11-12",
      utanzeRaporo: "NYAMASWANTE",
      umukiliya:"PABLOSCH",
     ibyoYatwaye: "100",
     amafarangaAsabwa: "300",
     ayoYishyuye: "400",
      asigaye: "3500",
      icyongeweho: "Ibyatunganyijwe byose byagenze neza",
    },
  ],
};

 function AbishyuyedeniPage() {
  const [formData] = useState(initialFormData);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          AMADENI YATANZWE KUMUNSI
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  Itariki
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  Utanze Raporo
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  Izina RY'umukiliya
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  IBYO YATWAYE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  AMAFARANGA ASABWA
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  AYO YISHYUYE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  ASIGAYE
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                  ICYONGEWEHO
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.exampleData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3 text-sm text-gray-600">
                    {item.date}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.utanzeRaporo}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.umukiliya}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.ibyoYatwaye}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.amafarangaAsabwa}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.ibyoYatwaye}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.asigaye}
                  </td>
                  <td className="border p-3 text-sm text-gray-600">
                    {item.icyongeweho}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export  default AbishyuyedeniPage;

