/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { f, pS, ShowMessage } from '../../public/functions';

const ProductFormPre = () => {
  const [formData, setFormData] = useState({
    date: '',
    incoming_c: '',
    waste_f: '',
    prepared_c: '',
    reporter: '',
    comment: ''
  })
  ,
   [showM,setShowM] = useState(false),
    [message,setMessage] = useState('')



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevD=>({ ...prevD, [name]: value }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyVar = Object.keys(formData).find((key)=> !formData[key].length && key != 'date')
    if (emptyVar) return
    const scheme = pS
    scheme.body = JSON.stringify(formData)
    let res = await f('record-prepared-c',scheme)
            setShowM(true)
      setMessage({
        message: res.message,
        decision: res.success
      })
      setTimeout(() => {
        setShowM(false);
      }, 3000)
    if (res.success) {
      setFormData({
        date: '',
        incoming_c: '',
        waste_f: '',
        prepared_c: '',
        reporter: '',
        comment: ''
      })
    }
  };
  

  return (
    <div className="mx-auto p-4">
      {showM ? <ShowMessage message={message.message} decision={message.decision}/>: null}
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">IBIGORI BIGIYE GUTUNGANYWA</h2>
      <form onSubmit={handleSubmit} className="bg-indigo-50 p-6 rounded-lg shadow-lg">
        
    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Itariki</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-gray-700">Ibigori bigiye Kugosorwa</label>
            <input
              type="text"
              name="incoming_c"
              value={formData.incoming_c}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded py-2 px-3"
              placeholder="Enter Ibigori Kugosorwa"
            />
          </div>
          <div>
            <label className="block text-gray-700">Imyanda Yavuyemo</label>
            <input
              type="text"
              name="waste_f"
              value={formData.waste_f}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded py-2 px-3"
              placeholder="Enter Imyanda Yavuyemo"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Ibigori bigiye Gukoborwa</label>
            <input
              type="text"
              name="prepared_c"
              value={formData.prepared_c}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded py-2 px-3"
              placeholder="Enter Gukoborwa"
            />
          </div>
          <div>
            <label className="block text-gray-700">Utanze Raporo</label>
            <input
              type="text"
              name="reporter"
              value={formData.reporter}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded py-2 px-3"
              placeholder="Enter Utanze Raporo"
            />
          </div>
        </div>

    
        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded py-2 px-3"
            placeholder="Enter any comments"
            rows="3"
          />
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition duration-200">
            Submit
          </button>
        </div>
       
      </form>
    </div>
  );
};

export default ProductFormPre;
