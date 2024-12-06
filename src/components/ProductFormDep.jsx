import { useState } from "react";
import { f, pS } from "../../public/functions";

const ExpenseBox = ({ title, value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium">{title}</label>
    <input
      type="number"
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="0"
      value={value}
      onChange={(e) => onChange(title, e.target.value)}
    />
  </div>
);

const ProductFormDep= () => {
  const [formData, setFormData] = useState({
    date: "",
    reporter: "",
    comment: "",
    expenses: {
      Mazutu: "",
      Abakarani: "",
      Tandboy: "",
      Shoferi: "",
      Shambre: "",
      Kurya: "",
      Urugendo: "",
      Amafarangaasabwakubyacurujwe: "",
      Amafarangaaverishije: "",
      Andimafaranga: "",
    },
  });

  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [field]: value,
      },
    }));
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let nfd = structuredClone(formData)
    nfd.expenses = {
      diesel: nfd.expenses['Mazutu'],
      lifters: nfd.expenses['Abakarani'],
      boys: nfd.expenses['Tandboy'],
      driver: nfd.expenses['Shoferi'],
      room: nfd.expenses['Shambre'],
      food: nfd.expenses['Kurya'],
      travel: nfd.expenses['Urugendo'],
      r_amount: nfd.expenses['Amafaranga asabwa kubyacurujwe'],
      inc_amount: nfd.expenses['Amafaranga averishijwe'],
      g_amount: nfd.expenses['Andi mafaranga'],
    }
    const scheme = pS
    scheme.body = JSON.stringify(nfd)
    let res = await f('expensesController',scheme)
    if (res.success) {
      setFormData({
        date: "",
        reporter: "",
        comment: "",
        expenses: {
          Mazutu: "",
          Abakarani: "",
          Tandboy: "",
          Shoferi: "",
          Shambre: "",
          Kurya: "",
          Urugendo: "",
          Amafarangaasabwakubyacurujwe: "",
          Amafarangaaverishije: "",
          Andimafaranga: "",
        },
      })
    }
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    
    // setFormData({
    //   date: "",
    //   reporter: "",
    //   comment: "",
    //   expenses: {
    //     MAZUTU: "",
    //     ABAKARANI: "",
    //     TANDBOY: "",
    //     SHOFERI: "",
    //     SHAMBRE: "",
    //     KURYA: "",
    //     URUGENDO: "",
    //     AMAFARANGAASABWAKUBYACURUJWE: "",
    //     AMAFARANGAAVERISHIJE: "",
    //     ANDIMAFARANDA: "",
    //   },
    // });
  };

 
  const firstRowExpenses = ["Mazutu", "Abakarani", "Tandboy"];
  const secondRowExpenses = ["Shoferi", "Shambre", "Kurya"];
  const thirdRowExpenses = ["Urugendo", "Amafaranga asabwa kubyacurujwe","Amafaranga averishijwe"];
  const fouthRowExpenses = ["Andi mafaranga"];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {showMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg">
            Form submitted successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-xl font-bold text-center text-indigo-700 mb-6">
            AMAFARANGA YASOHOTSE
          </h1>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-indigo-500">Itariki</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.date}
                onChange={(e) => handleFieldChange("date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-indigo-500">Utanze raporo</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.reporter}
                onChange={(e) => handleFieldChange("reporter", e.target.value)}
                required
              />
            </div>
          </div>

        
          <div className="space-y-6">
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-indigo-500">
              {firstRowExpenses.map((expense) => (
                <ExpenseBox
                  key={expense}
                  title={expense}
                  value={formData.expenses[expense]}
                  onChange={handleInputChange}
                />
              ))}
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-indigo-500">
              {secondRowExpenses.map((expense) => (
                <ExpenseBox
                  key={expense}
                  title={expense}
                  value={formData.expenses[expense]}
                  onChange={handleInputChange}
                />
              ))}
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-indigo-500">
              {thirdRowExpenses.map((expense) => (
                <ExpenseBox
                  key={expense}
                  title={expense}
                  value={formData.expenses[expense]}
                  onChange={handleInputChange}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-indigo-500">
              {fouthRowExpenses.map((expense) => (
                <ExpenseBox
                  key={expense}
                  title={expense}
                  value={formData.expenses[expense]}
                  onChange={handleInputChange}
                />
              ))}
            </div>

            
          </div>

         
          <div className="flex flex-col w-full">
            <label
              htmlFor="comment"
              className="mb-1 text-indigo-500 font-medium"
            >
              Icyongerwaho
            </label>
            <textarea
              id="comment"
              name="comment"
              className="w-full lg:w-1/2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Icyongerwaho..."
              value={formData.comment}
              onChange={(e) => handleFieldChange("comment", e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="px-12 sm:px-24 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-800 transition-colors"
            >
              Kubika
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormDep;