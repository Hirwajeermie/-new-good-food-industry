/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { f, pS, setData } from '../../public/functions';

const ProductForm = () => {
  
  const [formVars,setFormVars] = useState({
      dist_names: '',
      dist_plate_no: '',
      weight: '',
      dryness: '',
      moldness: '',
      net_price: '',
      gross_price: '',
      amount_paid: '',
      reporter: '',
      comment: '',
      r_amount: '',
      date: ''
  }),
  changeVals = (e)=>{
    let{name,value} = e.target;
    setFormVars(prevD=>({
      ...prevD,
      [name]: value
    }))
  }
  async function recProd(e) {
    e.preventDefault()
    const emptyVar = Object.keys(formVars).find((key)=> !formVars[key].length && key != 'date')
    if (emptyVar) return
    const scheme = pS
    scheme.body = JSON.stringify(formVars)
    let res = await f('record-stock-1',scheme)
  }
  setData('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiU1lTVEVNIiwiaWF0IjoxNzMwOTM4OTAzfQ.7kFnr-c5ssp195JqBxn3eIY_GzCBUirSaFCU8_4I64w')
  return (
    <form onSubmit={recProd}>
<div className="p-6 bg-indigo-100 min-h-screen">

    
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center font-semibold text-indigo-600 mb-4">IBIGORI BISHYASHYA BY'INJIYE MURU STOKE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            placeholder="Itariki"
            name='date'
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
            onChange={changeVals}
            
          />
          <input
            type="text"
            name='dist_names'
            onChange={changeVals}
            placeholder="Amazina y'ubigemuye"
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Plake y'imodoka"
            name='dist_plate_no'
            onChange={changeVals}
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
        </div>

        <h2 className="text-center font-semibold text-indigo-600 mb-4">IBIGORI BAZANYE</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="weight"
            onChange={changeVals}
            placeholder="Ingano y'ibyinjiye"
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            name='dryness'
            onChange={changeVals}
            placeholder="Ubwume bw'ibigori"
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            name='moldness'
            onChange={changeVals}
            placeholder="Uruhumbu"
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Igiciro"
            name='net_price'
            onChange={changeVals}
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            name='gross_price'
            placeholder="Amafaranga asabwa"
            onChange={changeVals}
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            name='amount_paid'
            placeholder="Amafaranga y'ishyuwe"
            onChange={changeVals}
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
           <input
            type="text"
            name='r_amount'
            onChange={changeVals}
            placeholder="Amafaranga asigaye"
            className="p-2 border rounded-md w-full focus:outline-none focus:border-indigo-500"
          />
       {/* </div>
        <h2 className="text-center font-semibold text-indigo-600 mb-4">AMAKURU Y'UBUBIKO BWOSE BUHARI</h2>
        <div className="mb-4">
        <div className="mb-4">
        <div>
        <div className="space-y-4">
  <div className="flex items-center space-x-2">
    <label htmlFor="input1" 
    className="w-1/2 h-6 text-right font-medium text-indigo-600">IBIGORI BYARI BISAZWE MUBUBIKO:</label>
    <input
      id="input1"
      type="text"
      className="flex-1  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>

  <div className="flex items-center space-x-2">
    <label htmlFor="input2" 
    className="w-1/2 h-6 text-right font-medium text-indigo-600">IBIGORI BISHYASHYA :</label>
    <input
      id="input2"
      type="text"
      className="flex-1  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
  <div className="flex items-center space-x-2">
    <label htmlFor="input2" 
    className=" w-1/2 h-6 text-right font-medium text-indigo-600">IGITERANYO CY'IBIGORI BYOSE HAMWE:</label>
    <input
      id="input2"
      type="text"
      className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
</div>

       
      </div>
  
</div>
 */}
  
</div>



        
        <textarea
          placeholder="Utanze raporo"
          name='reporter'
          onChange={changeVals}
          className="p-2 border rounded-md w-1/3 h-12 :outline-none focus:border-indigo-500"
          rows="3"
        ></textarea>
        <textarea
          placeholder="Comment"
          name='comment'
          onChange={changeVals}
          className="p-2 border rounded-md w-full h-28 mb-4 focus:outline-none focus:border-indigo-500"
          rows="2"
        ></textarea>

        <button className="mx-auto block w-1/3 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Kubika</button>
      </div>
    </div>
    </form>
  );
};

export default ProductForm;