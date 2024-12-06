 
 import React, { useState } from 'react';
import { f, pS } from '../../public/functions';
 
 


 const ProductFormBack = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [formData,setFormData] = useState({
    date: '',
    reporter: '',
    comment: '',
    NF: [
      { ibiro: '', imifuka: 0},
      { ibiro: '', imifuka: 0},
      { ibiro: '', imifuka: 0}
    ],
    IS: [
      { ibiro: '', imifuka: 0},
      { ibiro: '', imifuka: 0},
      { ibiro: '', imifuka: 0}
    ],
    IF: [
      { ibiro: '', imifuka: 0},
      { ibiro: '', imifuka: 0},
      { ibiro: '', imifuka: 0}
    ],
    MA: [
      { ibiro: '', imifuka: 0},
      { ibiro: '', imifuka: 0},
      { ibiro: '', imifuka: 0}
    ],
    envelope: [{ ibiro: '', imifuka: 0}],
    
  })
  const ProductRowSimple = ({ prefix, size, onValueChange }) => {
    let index
      size == '25'? index = 0: size == '10'? index = 1 : size == '5'? index = 2 : index = 0
      const seFdata = (e,size)=>{
        const { name, value } = e.target;
        const updatedFormData = { ...formData };
        updatedFormData[prefix] = [...updatedFormData[prefix]];
        updatedFormData[prefix][index] = {
          ...updatedFormData[prefix][index],
          ibiro: Number(value),
          imifuka: Math.round(Number(value) / Number(size)),
        };
      
        setFormData(updatedFormData);
        
      }  
      return (
        <div className="grid grid-cols-2 gap-4 mb-2">
          <input
            type="number"
            placeholder={`${prefix}:${size}KG`}
            defaultValue={formData[prefix][index]?.ibiro || ''}
            name="ibiro"
            onBlur={(e) => seFdata(e, size)}
            className="w-full px-3 py-2 text-sm border rounded"
          />
          <input
            type="text"
            name="imifuka"
            value={formData[prefix][index]?.imifuka || ''}
            readOnly
            className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
          />
        </div>
      );
   };
   const SimpleProductSection = ({ title, prefix }) => (
     <div className="bg-white rounded shadow-sm p-4">
       <h3 className="font-medium mb-3">{title}</h3>
       <div className="grid grid-cols-2 gap-4 mb-2">
         <span className="text-sm font-medium">Ibiro</span>
         <span className="text-sm font-medium">Imifuka</span>
       </div>
       <ProductRowSimple prefix={prefix} size="25" />
       <ProductRowSimple prefix={prefix} size="10" />
       <ProductRowSimple prefix={prefix} size="5" />
     </div>
   );
   
   const SimpleEnvelopeSection = () => {
    const seFdata = (e,size)=>{
      const { name, value } = e.target;
      const updatedFormData = { ...formData };
      updatedFormData['envelope'] = [...updatedFormData['envelope']];
      updatedFormData['envelope'][0] = {
        ...updatedFormData['envelope'][0],
        ibiro: value,
        imifuka: Math.round(Number(value) / Number(size)),
      };
      setFormData(updatedFormData);
    }
    return (
      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="font-medium mb-3">IS YA ENVELOPE</h3>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <span className="text-sm font-medium">Ibiro</span>
          <span className="text-sm font-medium">Imifuka</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="IS:2KG"
            defaultValue={formData['envelope'][0]?.ibiro || ''}
            onBlur={e=>seFdata(e,2)}
            className="w-full px-3 py-2 text-sm border rounded"
          />
          <input
            type="text"
            value={formData['envelope'][0]?.imifuka || ''}
            readOnly
            className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
          />
        </div>
      </div>
    );
   };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true);
    const transformData = (data) => {
      const result = {
      };
      if(data.length){
        data.forEach((item, index) => {
            if (index == 0 && data.length > 1)  Object.assign(result,{'25': item.imifuka})
            if (index == 1 && data.length > 1)  Object.assign(result,{'10': item.imifuka})
            if (index == 2 && data.length > 1)  Object.assign(result,{'5': item.imifuka})
            if (index == 0 && data.length == 1)  Object.assign(result,{'2': item.imifuka})
        });
    
        return result;
  
      }else{
        return data
      }
    }; 
    let nfd = structuredClone(formData)
    nfd.NF = transformData(nfd.NF)
    nfd.IS = transformData(nfd.IS)
    nfd.IF = transformData(nfd.IF)
    nfd.MA = transformData(nfd.MA)
    nfd.envelope = transformData(nfd.envelope)
    const scheme = pS
    scheme.body = JSON.stringify(nfd)
    let res = await f('returnsController',scheme)
    nfd = formData
    if (res.success) {
      setFormData({
        date: '',
        reporter: '',
        comment: '',
        NF: [
          { ibiro: '', imifuka: 0},
          { ibiro: '', imifuka: 0},
          { ibiro: '', imifuka: 0}
        ],
        IS: [
          { ibiro: '', imifuka: 0},
          { ibiro: '', imifuka: 0},
          { ibiro: '', imifuka: 0}
        ],
        IF: [
          { ibiro: '', imifuka: 0},
          { ibiro: '', imifuka: 0},
          { ibiro: '', imifuka: 0}
        ],
        MA: [
          { ibiro: '', imifuka: 0},
          { ibiro: '', imifuka: 0},
          { ibiro: '', imifuka: 0}
        ],
        envelope: [{ ibiro: '', imifuka: 0}],
        
      })
    }

    
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setFormData(prevD=>({
      ...prevD,
      [name]:value
    }))
  }
   return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {showPopup && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
          Your report has been submitted successfully!!!
        </div>
      )}
    
     <div className="min-h-screen bg-gray-50 p-6">
       <div className="max-w-7xl mx-auto">
         <h1 className="text-xl font-bold mb-6 text-center text-indigo-600">
           IBYAGARUTSE
         </h1>
        
         <form onSubmit={handleSubmit} className="space-y-8">
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <div>
               <label htmlFor="date" className="block text-sm font-medium mb-1 text-indigo-600">Itariki</label>
               <input
                 type="date"
                 id="date"
                 name="date"
                 value={formData.date}
                 onChange={handleInputChange}
                 className="w-full px-3 py-2 border rounded"
                 required
               />
             </div>
             <div>
               <label htmlFor="utanzeRaporo" className="block text-sm font-medium mb-1 text-indigo-600">Utanze Raporo</label>
               <input
                 type="text"
                 id="utanzeRaporo"
                 name="reporter"
                 value={formData.reporter}
                 onChange={handleInputChange}
                 className="w-full px-3 py-2 border rounded"
                 required
               />
             </div>
           </div>
 
           
           <div>
             <h2 className="text-lg font-bold mb-4 text-center text-indigo-600">IBYAGARUTSE</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-indigo-600">
               <SimpleProductSection title="NEW FOOD" prefix="NF" />
               <SimpleProductSection title="IFUNGURO RYIZA" prefix="IF" />
               <SimpleProductSection title="ISEZERANO" prefix="IS" />
               <SimpleProductSection title="ISEZERANO ENVELOPE" prefix="MA" />
               <SimpleEnvelopeSection />
             </div>
           </div>
           <div className="flex justify-start">
             <div className="flex flex-col w-full w-full">
               <label htmlFor="comment" className="mb-1 text-indigo-600">
                 comments
               </label>
               <textarea
                 id="comment"
                 className="w-full border border-gray-300 rounded resize-none"
                 rows="4"
                 name="comment"
                 value={formData.comment}
                 onChange={handleInputChange}
                 placeholder="Add your comment here..."
               ></textarea>
             </div>
           </div>
<div className="flex justify-center">
<button
  type="submit"
  className="px-16 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-800"
>
  Kubika
</button>
</div>
</form>
</div>
</div>
</div>
);
};

export default ProductFormBack;