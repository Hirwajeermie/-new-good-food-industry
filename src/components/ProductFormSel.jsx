// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { adcm, f, pS, ShowMessage } from '../../public/functions';

const ProductFormSel = () => {
  const [formData, setFormData] = useState({
    date: '',
    reporter: '',
    distributor: '',
    g_amount: '',
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
    sack_no_NF: '',
    sack_no_IF: '',
    sack_no_IS: '',
    sack_no_MA: '',
    comment: '',
  })
  ,
   [showM,setShowM] = useState(false),
    [message,setMessage] = useState('')
  const handleGridInputChange = (fieldName, rowIndex, field, value) => {
    setFormData(prevData => {
      try {
        const newFlourData = [...prevData[fieldName]];
        newFlourData[rowIndex] = {
          ...newFlourData[rowIndex],
          [field]: value,
        };
  
        if (field === 'ibiro') {
          const proportion = fieldName === 'envelope' ? 2 : [25, 10, 5][rowIndex];
          newFlourData[rowIndex].imifuka = proportion ? Math.round(value) : '';
        }
        if (field === 'price' || field === 'ibiro') {
          newFlourData[rowIndex].total = (newFlourData[rowIndex].imifuka * newFlourData[rowIndex].price).toFixed(2) || '';
        }
  
        return {
          ...prevData,
          [fieldName]: newFlourData,
        };
        
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return prevData
      } 
    });
  };

  const ProductGrid = ({ title, fieldName, rows, isEnvelope, titleColor }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <h3 className={`${titleColor} text-center py-2 text-base font-semibold`}>
        {title}
      </h3>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-6 mb-4">
          <div className="text-center">
            <span className="text-xs sm:text-sm font-medium text-indigo-600">Imifuka</span>
          </div>
          <div className="text-center">
            <span className="text-xs sm:text-sm font-medium text-indigo-600">Ibiro</span>
          </div>
          <div className="text-center">
            <span className="text-xs sm:text-sm font-medium whitespace-pre-wrap text-indigo-600">
              Igiciro{'\n'}kumufuka
            </span>
          </div>
          <div className="text-center">
            <span className="text-xs sm:text-sm font-medium whitespace-pre-wrap text-indigo-600">
              Amafaranga yose{'\n'}kumifuka
            </span>
          </div>
        </div>

        {rows.map((row, index) => { return (
          <div key={index} className="grid grid-cols-4 gap-2 sm:gap-6 mb-4">
            <input
              type="number"
              defaultValue={row.ibiro}
              onBlur={(e) =>{ handleGridInputChange(fieldName, index, 'ibiro', e.target.value);e.preventDefault()}}
              placeholder={`${title.slice(0, 2)}:${isEnvelope ? 2 : [25, 10, 5][index]}`}
              className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
            />
            <input
              type="text"
              value={isEnvelope ?   Number(row.imifuka) * 5:  Number(row.imifuka) * [25, 10, 5][index]}
              readOnly
              className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded bg-gray-50"
            />
            <input
              type="number"
              defaultValue={row.price}
              onBlur={(e) => {handleGridInputChange(fieldName, index, 'price', e.target.value);e.preventDefault()}}
              className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
            />
            <input
              type="text"
              value={row.total}
              readOnly
              className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded bg-gray-50"
            />
          </div>
        )})}

        <div className="text-right font-bold mt-4 sm:mt-6 text-sm sm:text-base text-indigo-600">
          Total: {adcm(rows.reduce((sum, row) => sum + (parseFloat(row.total) || 0), 0).toFixed(2))} RWF
        </div>
      </div>
    </div>
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const transformData = (data) => {
      const proportions = [25, 10, 5];
      const result = {
          weights: {},
          pricings: {},
          totals: {}
      };
      if(data.length){
        data.forEach((item, index) => {
            data.length == 1 ? index = 2 : index
            const proportion = (data.length == 1) ? '2': proportions[index].toString(); 
            result.weights[proportion] = item.imifuka;
            result.pricings[proportion] = parseFloat(item.price);
            result.totals[proportion] = parseFloat(item.total);
        });
    
        return result;

      }else{
        return data
      }
    }; 
    const emptyVar = Object.keys(formData).find((key)=> !formData[key] && key != 'date')
    if (emptyVar) return console.log(emptyVar)
    let nfd = structuredClone(formData)
    nfd.NF = transformData(formData.NF)
    nfd.IS = transformData(formData.IS)
    nfd.IF = transformData(formData.IF)
    nfd.MA = transformData(formData.MA)
    nfd.envelope = transformData(nfd.envelope)
    const scheme = pS
    scheme.body = JSON.stringify(nfd)
    let res = await f('sales',scheme)
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
        distributor: '',
        g_amount: '',
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
        sack_no_NF: '',
        sack_no_IF: '',
        sack_no_IS: '',
        sack_no_MA: '',
        comment: '',
      })
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
            {showM ? <ShowMessage message={message.message} decision={message.decision}/>: null}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-500 text-center mb-6 sm:mb-8">
        KAWUNGA YAGIYE KWISOKO
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
                Utanze Raporo
              </label>
              <input
                type="text"
                name="reporter"
                value={formData.reporter}
                onChange={handleInputChange}
                className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
                Umucuruzi
              </label>
              <input
                type="text"
                name="distributor"
                value={formData.distributor}
                onChange={handleInputChange}
                className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
           {/*  <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
                umukiliya
              </label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
                required
              />
            </div> 
             */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
                Amafranga Arava Kw'isoko
              </label>
              <input
                type="text"
                name="g_amount"
                value={formData.g_amount}
                onChange={handleInputChange}
                className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
                required
              />
            </div>
            {/*
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
                Amafranga Asigaye
              </label>
              <input
                type="text"
                name="r_amount"
                value={formData.r_amount}
                onChange={handleInputChange}
                className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
                required
              />
            </div>
            */}
             <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
              Nimero Y'umufuka wa New Food
            </label>
            <input
              type="text"
              name="sack_no_NF"
              value={formData.sack_no_NF}
              onChange={handleInputChange}
              className="w-full max-w-md px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
              required
            />
             <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
              Nimero Y'umufuka w'Ifunguro ryiza
            </label>
            <input
              type="text"
              name="sack_no_IF"
              value={formData.sack_no_IF}
              onChange={handleInputChange}
              className="w-full max-w-md px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
              required
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
              Nimero Y'umufuka wa manemane
            </label>
            <input
              type="text"
              name="sack_no_IS"
              value={formData.sack_no_IS}
              onChange={handleInputChange}
              className="w-full max-w-md px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
              required
            />
             <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
              Nimero Y'umufuka wi Isezerano Envelope
            </label>
            <input
              type="text"
              name="sack_no_MA"
              value={formData.sack_no_MA}
              onChange={handleInputChange}
              className="w-full max-w-md px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
              required
            />
          </div>
          </div>

         

          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-8">
            <ProductGrid title="NEW FOOD" fieldName="NF" rows={formData.NF} titleColor="text-indigo-600" />
            <ProductGrid title="IFUNGURO RYIZA" fieldName="IF" rows={formData.IF} titleColor="text-indigo-600" />
            <ProductGrid title="ISEZERANO" fieldName="IS" rows={formData.IS} titleColor="text-indigo-600" />
            <ProductGrid title="MANEMANE" fieldName="MA" rows={formData.MA} titleColor="text-indigo-600" />
          </div>

          <div className="max-w-4xl text-indigo-600">
            <ProductGrid
              title="ISEZERANO ENVELOPE/5KG"
              fieldName="envelope"
              rows={formData.envelope}
              titleColor="text-indigo-600"
              isEnvelope={true}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 text-indigo-600">
              Comment
            </label>
            <textarea
              rows="3"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              required
              className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border rounded focus:outline-none focus:ring-1"
            />
          </div>

          <div className="flex justify-center gap-4 text-indigo-600">
            <button
              type="submit"
              className="w-48 sm:w-64 px-6 sm:px-8 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            >
              Kubika
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormSel;
