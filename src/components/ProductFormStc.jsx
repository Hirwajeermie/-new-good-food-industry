import React, { useState } from 'react';
import { f, pS } from '../../public/functions';


const ProductFormStc = () => {
  const [formData, setFormData] = useState({
    date: '',
    reporter: '',
    sack_no: '',
    NF: [
        { ibiro: '', imifuka: 0,current: 0, total: 0},
        { ibiro: '', imifuka: 0,current: 0, total: 0},
        { ibiro: '', imifuka: 0,current: 0, total: 0}
      ],
      IS: [
        { ibiro: '', imifuka: 0,current: 0, total: 0},
        { ibiro: '', imifuka: 0,current: 0, total: 0},
        { ibiro: '', imifuka: 0,current: 0, total: 0}
      ],
      IF: [
        { ibiro: '', imifuka: 0,current: 0, total: 0},
        { ibiro: '', imifuka: 0,current: 0, total: 0},
        { ibiro: '', imifuka: 0,current: 0, total: 0}
      ],
      MA: [
        { ibiro: '', imifuka: 0,current: 0, total: 0},
        { ibiro: '', imifuka: 0,current: 0, total: 0},
        { ibiro: '', imifuka: 0,current: 0, total: 0}
      ],
      envelope: [{ ibiro: '', imifuka: 0,current: 0, total: 0}],
    comment: ''
  });
  const ProductRowDetailed = ({ prefix, size, onValueChange }) => {
    let index
      size == '25'? index = 0: size == '10'? index = 1 : size == '5'? index = 2 : index = 0
      const seFdata = (e,size)=>{
        const { name, value } = e.target;
        let objName = (name == 'ibiro') ? 'imifuka' : 'total'
        const updatedFormData = { ...formData };
        updatedFormData[prefix] = [...updatedFormData[prefix]];
        updatedFormData[prefix][index] = {
          ...updatedFormData[prefix][index],
          [name]: Number(value),
          [objName]: objName == 'imifuka' ? (Math.round(Number(value) / Number(size))) : Math.round(Number(value)) + Number(updatedFormData[prefix][index].imifuka),
        };
        setFormData(updatedFormData);
        
      }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
        <input
          type="number"
           defaultValue={formData[prefix][index]?.ibiro || ''}
          onBlur={(e)=>seFdata(e,size)}
          placeholder={`${prefix}:${size}KG`}
          name='ibiro'
          className="w-full px-3 py-2 text-sm border rounded"
        />
        <input
          type="text"
          value={formData[prefix][index]?.imifuka || ''}
          readOnly
          className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
        />
        <input
          type="text"
          defaultValue={formData[prefix][index]?.current || ''}
          onBlur={(e)=>seFdata(e,size)}
          placeholder={`${prefix}:${size}KG`}
          name='current'
          className="w-full px-3 py-2 text-sm border rounded"
        />
        <input
          type="text"
          value={formData[prefix][index]?.total || ''}
          readOnly
          className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
        />
      </div>
    );
  };
  
  const DetailedProductSection = ({ title, prefix }) => (
    <div className="bg-white rounded shadow-sm p-4">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
        <span className="text-sm font-medium">Ibiro By'akozwe</span>
        <span className="text-sm font-medium">Imifuka yakozwe</span>
        <span className="text-sm font-medium">Imifuka yari hari </span>
        <span className="text-sm font-medium">Imifuka yose iri muri stoke </span>
      </div>
      <ProductRowDetailed prefix={prefix} size="25" />
      <ProductRowDetailed prefix={prefix} size="10" />
      <ProductRowDetailed prefix={prefix} size="5" />
    </div>
  );
  
  const DetailedEnvelopeSection = () => {

  
    const seFdata = (e,size)=>{
      const { name, value } = e.target;
      let objName = (name == 'ibiro') ? 'imifuka' : 'total'
      const updatedFormData = { ...formData };
      updatedFormData['envelope'] = [...updatedFormData['envelope']];
      updatedFormData['envelope'][0] = {
        ...updatedFormData['envelope'][0],
        [name]: Number(value),
        [objName]: objName == 'imifuka' ? (Math.round(Number(value) / Number(size))) : Math.round(Number(value)) + Number(updatedFormData['envelope'][0].imifuka),
      };
      setFormData(updatedFormData);
      
    }
  
    return (
      <div className="bg-white rounded shadow-sm p-4">
        <h3 className="font-medium mb-3">IS YA ENVELOPE</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
          <span className="text-sm font-medium">Ibiro By'akozwe</span>
          <span className="text-sm font-medium">Envelope yakozwe</span>
          <span className="text-sm font-medium">Envelope zari zihari </span>
          <span className="text-sm font-medium">Envelope zose ziri muri stoke</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="IS:5KG"
            defaultValue={formData['envelope'][0]?.ibiro || ''}
            name='ibiro'
            onBlur={e=>seFdata(e,5)}
            className="w-full px-3 py-2 text-sm border rounded"
          />
          <input
            type="text"
           value={formData['envelope'][0]?.imifuka || ''}
            readOnly
            className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
          />
          <input
            type="text"
           defaultValue={formData['envelope'][0]?.current || ''}
            onBlur={e=>seFdata(e,5)}
            name='current'
            className="w-full px-3 py-2 text-sm border rounded"
          />
          <input
            type="text"
            value={formData['envelope'][0]?.total || ''}
            readOnly
            className="w-full px-3 py-2 text-sm border rounded bg-gray-100"
          />
        </div>
      </div>
    );
  };
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    const transformSData = (data) => {
      const proportions = [25, 10, 5];
      const result = {
          incoming: {},
          current: {},
          totals: {}
      };
      if(data.length){
        data.forEach((item, index) => {
            data.length == 1 ? index = 2 : index
            const proportion = proportions[index].toString(); 
            result.incoming[proportion] = item.imifuka;
            result.current[proportion] = parseFloat(item.current) || 0;
            result.totals[proportion] = parseFloat(item.total) || 0;
        });
    
        return result;
  
      }else{
        return data
      }
    };
    const emptyVar = Object.keys(formData).find((key)=> !formData[key] && key != 'date')
    if (emptyVar) return
    let nfd = structuredClone(formData)
    nfd.NF = transformSData(nfd.NF)
    nfd.IS = transformSData(nfd.IS)
    nfd.IF = transformSData(nfd.IF)
    nfd.MA = transformSData(nfd.MA)
    nfd.envelope = transformSData(nfd.envelope)
    const scheme = pS
    scheme.body = JSON.stringify(nfd)
    let res = await f('stockController',scheme)
    if (res.success) {
      setFormData({
        date: '',
        reporter: '',
        sack_no: '',
          NF: [
              { ibiro: '', imifuka: 0,current: 0, total: 0},
              { ibiro: '', imifuka: 0,current: 0, total: 0},
              { ibiro: '', imifuka: 0,current: 0, total: 0}
            ],
            IS: [
              { ibiro: '', imifuka: 0,current: 0, total: 0},
              { ibiro: '', imifuka: 0,current: 0, total: 0},
              { ibiro: '', imifuka: 0,current: 0, total: 0}
            ],
            IF: [
              { ibiro: '', imifuka: 0,current: 0, total: 0},
              { ibiro: '', imifuka: 0,current: 0, total: 0},
              { ibiro: '', imifuka: 0,current: 0, total: 0}
            ],
            MA: [
              { ibiro: '', imifuka: 0,current: 0, total: 0},
              { ibiro: '', imifuka: 0,current: 0, total: 0},
              { ibiro: '', imifuka: 0,current: 0, total: 0}
            ],
            envelope: [{ ibiro: '', imifuka: 0,current: 0, total: 0}],
        comment: ''
      })
    }
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    // e.target.reset();
    // setFormData({
    //   date: '',
    //   reporter: '',
    //   sack_no: '',
    //   comment: ''
    // });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {showSuccessMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
            form submitted successfully!!!
          </div>
        )}

        <h1 className="text-lg sm:text-xl font-bold mb-6 text-center text-indigo-600">
          AMAKURU Y'IFU ZINJIYE MURI STOCK
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-indigo-600">
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
              <label htmlFor="reporter" className="block text-sm font-medium mb-1 text-indigo-600">Utanze Raporo</label>
              <input
                type="text"
                id="reporter"
                name="reporter"
                value={formData.reporter}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="sack_no" className="block text-sm font-medium mb-1 text-indigo-600">Numero Y'umufuka</label>
              <input
                type="text"
                id="sack_no"
                name="sack_no"
                value={formData.sack_no}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-indigo-600">
                <DetailedProductSection title="NEW FOOD" prefix="NF" />
                <DetailedProductSection title="IFUNGURO RYIZA" prefix="IF" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-indigo-600">
                <DetailedProductSection title="ISEZERANO" prefix="IS" />
                <DetailedProductSection title="MAGAJU" prefix="MA" />
              </div>
              
              <div className="md:w-1/2 mx-auto text-indigo-600">
                <DetailedEnvelopeSection />
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="flex flex-col w-full">
              <label htmlFor="comment" className="mb-1 text-indigo-800">
                Icyongerwaho
              </label>
              <textarea
                id="comment"
                name="comment"
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
              className="px-10 sm:px-16 py-2 sm:py-3 bg-indigo-500 text-white rounded hover:bg-indigo-800"
            >
              Kubika
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormStc;