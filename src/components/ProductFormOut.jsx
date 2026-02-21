// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { f, pS, ShowMessage } from '../../public/functions';

const ProductFormOut = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const [formData,setFormData] = useState({
    date: '',
    reporter: '',
    distributor: 'aa',
    loc: '',
    comment: '',
    pm: 'aa',
    p_name: 'aa',
    p_sold:{
      NF: [
        { ibiro: '', imifuka: 0, price: '', total: 0 },
        { ibiro: '', imifuka: 0, price: '', total: 0 },
        { ibiro: '', imifuka: 0, price: '', total: 0 }
      ],
      IS: [
        { ibiro: '', imifuka: 0, price: '', total: 0 },
        { ibiro: '', imifuka: 0, price: '', total: 0 },
        { ibiro: '', imifuka: 0, price: '', total: 0 }
      ],
      IF: [
        { ibiro: '', imifuka: 0, price: '', total: 0 },
        { ibiro: '', imifuka: 0, price: '', total: 0 },
        { ibiro: '', imifuka: 0, price: '', total: 0 }
      ],
      MA: [
        { ibiro: '', imifuka: 0, price: '', total: 0 },
        { ibiro: '', imifuka: 0, price: '', total: 0 },
        { ibiro: '', imifuka: 0, price: '', total: 0 }
      ],
      envelope: [{ ibiro: '', imifuka: 0, price: '', total: 0 }],
    }
  })
  ,
   [showM,setShowM] = useState(false),
    [message,setMessage] = useState('')
  const ProductRowSimple = ({ prefix, size, onValueChange,object,key }) => {
    let index
    size == '25'? index = 0: size == '10'? index = 1 : size == '5'? index = 2 : index = 0
    const seFdata = (e,size)=>{
      const { name, value } = e.target;
      const updatedFormData = { ...formData };
      updatedFormData.p_taken[object] = [...updatedFormData.p_taken[object]];
      updatedFormData.p_taken[object][index] = {
        ...updatedFormData.p_taken[object][index],
        ibiro: Math.round(Number(value) * Number(size)),
        imifuka: Math.round(Number(value)),
      };
    
      setFormData(updatedFormData);
      
    }
    return (
      <div className="grid grid-cols-2 gap-4 mb-2" key={key}>
        <input
          type="number"
          placeholder={`${prefix}:${size}KG`}
          defaultValue={formData.p_taken[object][index]?.ibiro || ''}
          name="ibiro"
          onBlur={(e) => seFdata(e, size)}
          className="w-full px-3 py-2 text-sm border rounded"
        />
        <input
          type="text"
          name="imifuka"
          value={formData.p_taken[object][index]?.imifuka || ''}
          readOnly
          className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
        />
      </div>
    );
  };
  
  const ProductRowDetailed = ({ prefix, size,object, onValueChange,key }) => {
    let index
    size == '25'? index = 0: size == '10'? index = 1 : size == '5'? index = 2 : index = 0
    const seFdata = (e,size)=>{
      const { name, value } = e.target;
      let objName = (name == 'imifuka') ? 'ibiro' : 'total'
      const updatedFormData = { ...formData };
      updatedFormData.p_sold[object] = [...updatedFormData.p_sold[object]];
      updatedFormData.p_sold[object][index] = {
        ...updatedFormData.p_sold[object][index],
        [name]: Number(value),
        [objName]: objName == 'ibiro' ? (Math.round(Number(value) * Number(size))) : Math.round(Number(value)) * Number(updatedFormData.p_sold[object][index].imifuka),
      };
      setFormData(updatedFormData);
      
    }
    return (
      <div className="grid grid-cols-4 gap-4 mb-2" key={key}>
        <input
          type="number"
          placeholder={`${prefix}:${size}KG`}
          defaultValue={formData.p_sold[object][index]?.imifuka || ''}
          onBlur={(e)=>seFdata(e,size)}
          name='imifuka'
          className="w-full px-3 py-2 text-sm border rounded"
        />
        <input
          type="text"
          value={formData.p_sold[object][index]?.ibiro || ''}
          readOnly
          className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
        />
        <input
          type="number"
          defaultValue={formData.p_sold[object][index]?.price || ''}
          onBlur={(e)=>seFdata(e,size)}
          name='price'
          className="w-full px-3 py-2 text-sm border rounded"
        />
        <input
          type="text"
          value={formData.p_sold[object][index]?.total || ''}
          readOnly
          className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
        />
      </div>
    );
  }
  
  const SimpleProductSection = ({ title, prefix, object }) => (
    <div className="bg-white rounded shadow-sm p-4">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <span className="text-sm font-medium">Imifuka</span>
        <span className="text-sm font-medium">Ibiro</span>
      </div>
      <ProductRowSimple prefix={prefix} object={object}  size="25" />
      <ProductRowSimple prefix={prefix} object={object} size="10" />
      <ProductRowSimple prefix={prefix} object={object} size="5" />
    </div>
  );
  
  const DetailedProductSection = ({ title,object, prefix }) => (
    <div className="bg-white rounded shadow-sm p-4">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-4 gap-4 mb-2">
        <span className="text-sm font-medium">Imifuka</span>
        <span className="text-sm font-medium">Ibiro</span>
        <span className="text-sm font-medium">Igiciro kumufuka</span>
        <span className="text-sm font-medium">Amafaranga yose hamwe yimifuka</span>
      </div>
      <ProductRowDetailed prefix={prefix} object={object} size="25" />
      <ProductRowDetailed prefix={prefix} object={object} size="10" />
      <ProductRowDetailed prefix={prefix} object={object} size="5" />
    </div>
  );
  
  const SimpleEnvelopeSection = () => {
    const seFdata = (e,size)=>{
      const { name, value } = e.target;
      const updatedFormData = { ...formData };
      updatedFormData.p_taken['envelope'] = [...updatedFormData.p_taken['envelope']];
      updatedFormData.p_taken['envelope'][0] = {
        ...updatedFormData.p_taken['envelope'][0],
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
            placeholder="IS:5KG"
            defaultValue={formData.p_taken['envelope'][0]?.ibiro || ''}
            onBlur={e=>seFdata(e,5)}
            className="w-full px-3 py-2 text-sm border rounded"
          />
          <input
            type="text"
            value={formData.p_taken['envelope'][0]?.imifuka || ''}
            readOnly
            className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
          />
        </div>
      </div>
    );
  };
  
  const DetailedEnvelopeSection = () => {
    const seFdata = (e,size)=>{
      const { name, value } = e.target;
      let objName = (name == 'imifuka') ? 'ibiro' : 'total'
      const updatedFormData = { ...formData };
      updatedFormData.p_sold['envelope'] = [...updatedFormData.p_sold['envelope']];
      updatedFormData.p_sold['envelope'][0] = {
        ...updatedFormData.p_sold['envelope'][0],
        [name]: Number(value),
        [objName]: objName == 'ibiro' ? (Math.round(Number(value) * Number(size))) : Math.round(Number(value)) * Number(updatedFormData.p_sold['envelope'][0].imifuka),
      };
      setFormData(updatedFormData);
      
    }
  
    return (
      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="font-medium mb-3">IS YA ENVELOPE</h3>
        <div className="grid grid-cols-4 gap-4 mb-2">
          <span className="text-sm font-medium">envelope</span>
          <span className="text-sm font-medium">Ibiro</span>
          <span className="text-sm font-medium">Igiciro kuri envelope</span>
          <span className="text-sm font-medium">Amafaranga yose hamwe kuri envelope</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="IS:5KG"
            name='imifuka'
            defaultValue={formData.p_sold['envelope'][0]?.imifuka || ''}
            onBlur={e=>seFdata(e,5)}
            className="w-full px-3 py-2 text-sm border rounded"
          />
          <input
            type="text"
            value={formData.p_sold['envelope'][0]?.ibiro || ''}
            readOnly
            className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
          />
          <input
            type="text"
            defaultValue={formData.p_sold['envelope'][0]?.price || ''}
            onBlur={e=>seFdata(e,5)}
            name='price'
            className="w-full px-3 py-2 text-sm border rounded"
          />
          <input
            type="text"
            value={formData.p_sold['envelope'][0]?.total || ''}
            readOnly
            className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
          />
        </div>
      </div>
      
    );
  },
  handleInputChange = (e)=>{
    const {name,value} = e.target;
    setFormData(prevD=>({
      ...prevD,
      [name]:value
    }))
  }

 const handleSubmit = async (e) => {
   e.preventDefault();
   const transformSData = (data) => {
    const proportions = [25, 10, 5];
    const result = {
        weights: {},
        pricings: {},
        totals: {}
    };
    if(data.length){
      data.forEach((item, index) => {
          data.length == 1 ? index = 2 : index
          const proportion = (data.length == 1) ? '5': proportions[index].toString() ; 
          result.weights[proportion] = item.imifuka;
          result.pricings[proportion] = parseFloat(item.price) || 0;
          result.totals[proportion] = parseFloat(item.total) || 0;
      });
  
      return result;

    }else{
      return data
    }
  }; 
  // const transformData = (data) => {
  //   const result = {
  //   };
  //   if(data.length){
  //     data.forEach((item, index) => {
  //         if (index == 0 && data.length > 1)  Object.assign(result,{'25': item.imifuka})
  //         if (index == 1 && data.length > 1)  Object.assign(result,{'10': item.imifuka})
  //         if (index == 2 && data.length > 1)  Object.assign(result,{'5': item.imifuka})
  //         if (index == 0 && data.length == 1)  Object.assign(result,{'2': item.imifuka})
  //     });
  
  //     return result;

  //   }else{
  //     return data
  //   }
  // }; 
  const emptyVar = Object.keys(formData).find((key)=> !formData[key] && key != 'date')
  if (emptyVar) return console.log(emptyVar)
  let nfd = structuredClone(formData)
  nfd.p_sold.NF = transformSData(nfd.p_sold.NF)
  nfd.p_sold.IS = transformSData(nfd.p_sold.IS)
  nfd.p_sold.IF = transformSData(nfd.p_sold.IF)
  nfd.p_sold.MA = transformSData(nfd.p_sold.MA)
  nfd.p_sold.envelope = transformSData(nfd.p_sold.envelope)
  const scheme = pS
  scheme.body = JSON.stringify(nfd)
  let res = await f('sales-nr',scheme)
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
      reporter: '',
      distributor: 'aa',
      loc: '',
      comment: '',
      pm: 'aa',
      p_name: 'aa',
      p_sold:{
        NF: [
          { ibiro: '', imifuka: 0, price: '', total: 0 },
          { ibiro: '', imifuka: 0, price: '', total: 0 },
          { ibiro: '', imifuka: 0, price: '', total: 0 }
        ],
        IS: [
          { ibiro: '', imifuka: 0, price: '', total: 0 },
          { ibiro: '', imifuka: 0, price: '', total: 0 },
          { ibiro: '', imifuka: 0, price: '', total: 0 }
        ],
        IF: [
          { ibiro: '', imifuka: 0, price: '', total: 0 },
          { ibiro: '', imifuka: 0, price: '', total: 0 },
          { ibiro: '', imifuka: 0, price: '', total: 0 }
        ],
        MA: [
          { ibiro: '', imifuka: 0, price: '', total: 0 },
          { ibiro: '', imifuka: 0, price: '', total: 0 },
          { ibiro: '', imifuka: 0, price: '', total: 0 }
        ],
        envelope: [{ ibiro: '', imifuka: 0, price: '', total: 0 }],
      }
    })
  }
  nfd = formData
 };
 return (
   <div className="min-h-screen bg-gray-50 p-6">
          {showM ? <ShowMessage message={message.message} decision={message.decision}/>: null}
     <div className="max-w-7xl mx-auto">
       <h1 className="text-xl font-bold mb-6 text-center text-indigo-600">
         UWAGEMUYE KWISOKO
       </h1>
       
       <form onSubmit={handleSubmit} className="space-y-8">
       
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-indigo-600">
           <div>
             <label htmlFor="date" className="block text-sm font-medium mb-1 text-indigo-600">Itariki</label>
             <input
               type="date"
               id="date"
               name="date"
               value={formData.date}
               onChange={handleInputChange}
               className="w-full px-3 py-2 border rounded"
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
           {/* <div>
             <label htmlFor="ugemuye" className="block text-sm font-medium mb-1 text-indigo-600">Umucuruzi</label>
             <input
               type="text"
               id="ugemuye"
               name="distributor"
               value={formData.distributor}
               onChange={handleInputChange}
               className="w-full px-3 py-2 border rounded"
               required
             />
           </div> */}
           <div>
             <label htmlFor="umucuruzi" className="block text-sm font-medium mb-1 text-indigo-600">Aho yakoreye</label>
             <input
               type="text"
               id="umucuruzi"
               value={formData.loc}
               onChange={handleInputChange}
               name="loc"
               className="w-full px-3 py-2 border rounded"
               required
             />
           </div>
         </div>

          {/*
         <div>
           <h2 className="text-lg font-bold mb-4 text-center text-indigo-600">IBYO YATWAYE</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-indigo-600">
             <SimpleProductSection title="NEW FOOD" object={'NF'} prefix="NF" />
             <SimpleProductSection title="IFUNGURO"  object={'IF'} prefix="IF" />
             <SimpleProductSection title="ISEZERANO"  object={'IS'} prefix="IS" />
             <SimpleProductSection title="MAGAJU"  object={'MA'} prefix="MA" />
             <SimpleEnvelopeSection object={'MA'} prefix="MA"/>
           </div>
         </div>
         */}
         <div>
           <h2 className="text-lg font-bold mb-4 text-indigo-600 text-center">IBYACURUJWE</h2>
           <div className="flex flex-col gap-6">
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-indigo-600">
               <DetailedProductSection title="NEW FOOD" object={'NF'} prefix="NF" />
               <DetailedProductSection title="IFUNGURO" object={'IF'} prefix="IF" />
             </div>
             
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-indigo-600">
               <DetailedProductSection title="ISEZERANO" object={'IS'} prefix="IS" />
               <DetailedProductSection title="MANEMANE" object={'MA'} prefix="MA" />
             </div>
             
             
             <div className="md:w-1/2 mx-auto text-indigo-600">
               <DetailedEnvelopeSection object={'MA'} prefix="MA"/>
             </div>
           </div>
         </div>

         {/* <div className="mb-2">
      <label className="block text-xs sm:text-sm font-medium text-indigo-600 mb-1 ">
        Uburyo bishyuyemo:
      </label>
      <select
        className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded border-indigo-300 
                      focus:ring focus:ring-indigo-200 "
        value={formData.pm}
        onChange={handleInputChange}
        name='pm'
      >
        <option value="">Hitamo</option>
        <option value="momo">Momo</option>
        <option value="cheque">Cheque</option>
        <option value="mobile_money">Mobile Money</option>
        <option value="cash">Cash</option>
      </select>

      {paymentMethod && (
        <p className="mt-1 text-xs text-indigo-600">
          Uhisemo: <span className="font-semibold">{formData.pm}</span>
        </p>
      )}
    </div> */}
    {/* <div>
             <label  className="block text-sm font-medium mb-1 text-indigo-600">Amazina y'uwishyuye</label>
             <input
               type="text"
               id="amazinay'uwishyuye"
               name="p_name"
               value={formData.p_name}
               onChange={handleInputChange}
               className="w-full px-3 py-2 border rounded"
               required
             />
           </div> */}
    
         <div className="flex justify-start">
           <div className="flex flex-col w-full">
             <label htmlFor="comment" className="mb-1 text-indigo-600">
               comments
             </label>
             <textarea
               id="comment"
               name='comment'
               value={formData.comment}
               onChange={handleInputChange}
                className="w-full border border-gray-300 rounded resize-none"
               rows="4"
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
 );
};

export default ProductFormOut;


