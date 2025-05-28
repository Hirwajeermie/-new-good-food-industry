import React, { useState } from 'react';
import { f, pS, ShowMessage } from '../../public/functions';

const ProductFormSack = () => {
  
  const [date, setDate] = useState('');
  const [utanzeRaporo, setUtanzeRaporo] = useState('');
  const [newFood, setNewFood] = useState('');
  const [ifunguro, setIfunguro] = useState('');
  const [isezerano, setIsezerano] = useState('');
  const [magaju, setMagaju] = useState('');
  const [inganoYaEnvelope, setInganoYaEnvelope] = useState('');
  const [isEnvelope5kg, setIsEnvelope2kg] = useState(0);
  const [successMessage, setSuccessMessage] = useState('')
  ,
   [showM,setShowM] = useState(false),
    [message,setMessage] = useState('')

  // const handleInganoChange = (e) => {
  //   const input = e.target.value;
  //   setIsEnvelope2kg(input);

    
  //   if (input && !isNaN(input)) {
  //     const inganoValue = parseInt(input, 10);
  //     setIsEnvelope2kg(Math.floor(inganoValue / 2));
  //   } else {
  //     setIsEnvelope2kg(''); // Reset IS envelope 2kg if input is cleared
  //   }
  // };

  const [newFoodIbiro, setNewFoodIbiro] = useState({ '25': 0, '10': 0, '5': 0 });
  const [ifunguroIbiro, setIfunguroIbiro] = useState({ '25': 0, '10': 0, '5': 0 });
  const [isezeranoIbiro, setIsezeranoIbiro] = useState({ '25': 0, '10': 0, '5': 0 });
  const [magajuIbiro, setMagajuIbiro] = useState({ '25': 0, '10': 0, '5': 0 });
  const [envelope, setEnvelope] = useState({ ingano: 0, isEnvelope: 0, buranda: 0 });
  const [comments, setComments] = useState('');
  // const [sack_no_NF, setSack_no_NF] = useState('');
  // const [sack_no_IF, setSack_no_IF] = useState('');
  // const [sack_no_IS, setSack_no_IS] = useState('');
  // const [sack_no_MA, setSack_no_MA] = useState('');


  // const handleCheckboxChange = (item) => {
  //   setSelectedAmafu((prev) => ({
  //     ...prev,
  //     [item]: !prev[item],
  //   }));
  // };

  const calculateTotal = (ibiro) => Object.entries(ibiro).reduce((acc, [key, value]) => { return acc +  value; }, 0);
  const calculateImifuka = (ibiroValue) => Math.floor(ibiroValue / 25);
  const icumiImifuka = (ibiroValue) => Math.floor(ibiroValue / 10);
  const bitanuImifuka = (ibiroValue) => Math.floor(ibiroValue / 5);

  const handleNewFoodChange = (key, value) => setNewFoodIbiro(prev => ({ ...prev, [key]: Math.round(Number(value)) }));
  const handleIfunguroChange = (key, value) => setIfunguroIbiro(prev => ({ ...prev, [key]: Math.round(Number(value)) }));
  const handleIsezeranoChange = (key, value) => setIsezeranoIbiro(prev => ({ ...prev, [key]: Math.round(Number(value)) }));
  const handleMagajuChange = (key, value) => setMagajuIbiro(prev => ({ ...prev, [key]: Math.round(Number(value)) }));
  // const handleEnvelopeChange = (key, value) => setEnvelope(prev => ({ ...prev, [key]: Math.round(Number(value)) }));
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        reporter: utanzeRaporo,
        date,
        new_food: newFoodIbiro,
        ifunguro: ifunguroIbiro,
        isezerano: isezeranoIbiro,
        magaju: magajuIbiro,
        envelope:  Number(isEnvelope5kg),
        comment: comments,
        // sack_no_IF,
        // sack_no_IS,
        // sack_no_MA,
        // sack_no_NF
    };

    
    setSuccessMessage('Form submitted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); 
    const scheme = pS
    scheme.body = JSON.stringify(formData)
    let res = await f('sacksController',scheme)
      setShowM(true)
      setMessage({
        message: res.message,
        decision: res.success
      })
      setTimeout(() => {
        setShowM(false);
      }, 3000)
    if (res.success) {
        setDate('');
        setUtanzeRaporo('');
        setInganoYaEnvelope('') ;
        setIsEnvelope2kg('');
        setNewFoodIbiro({ '25': 0, '10': 0, '5': 0 });
        setIfunguroIbiro({ '25': 0, '10': 0, '5': 0 });
        setIsezeranoIbiro({ '25': 0, '10': 0, '5': 0 });
        setMagajuIbiro({ '25': 0, '10': 0, '5': 0 });
        setEnvelope({ ingano: 0, isEnvelope: 0, buranda: 0 });
        setComments('');
        // setSack_no_NF('')
        // setSack_no_IF('')
        // setSack_no_IS('')
        // setSack_no_MA('')
    }
    // Reset form fields
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showM ? <ShowMessage message={message.message} decision={message.decision}/>: null}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
          RAPORO Y'IMIFUKA
        </h2>
        <form onSubmit={handleSubmit} className="bg-indigo-50 p-4 md:p-6 rounded-lg shadow-lg">
          {/* (Your form fields and structure here) */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
            <div>
              <label className="block text-indigo-700 font-medium mb-2">
              Itariki
              </label>
              <input 
                type="date" 
                placeholder="Enter name" 
                className="w-full p-2 border rounded-md" 
                value={date}
                name='date'
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-indigo-700 font-medium mb-2">
                Utanze Raporo
              </label>
              <input 
                type="" 
                className="w-full p-2 border rounded-md" 
                placeholder="Amazina" 
                value={utanzeRaporo}
                name='reporter'
                onChange={(e) => setUtanzeRaporo(e.target.value)}
                required
              />
            </div>
            
          </div>

        

      
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
            SITOKE Y'IMIFUKA
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
            <div>
              <h2 className="text-center text-white bg-indigo-500 py-2 font-semibold">NEW FOOD</h2>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-center text-indigo-600 font-medium">Ibiro</p>
                <p className="text-center text-indigo-600 font-medium">Ingano</p>
                {['25', '10', '5'].map((key, index) => (
                  <React.Fragment key={key}>
                    <input
                      type="number"
                    
                      placeholder={`NF: ${[25, 10, 5][index]}KG`}
                      className="bg-gray-200 p-2 rounded"
                      name='nf'
                      value={key}
                      disabled
                      readOnly
                    />
                    <input
                      type="text"
                      value={newFoodIbiro[key]}
                      onChange={(e) => handleNewFoodChange(key, e.target.value)}
                      className="bg-gray-200 p-2 rounded"
                      
                    />
                  </React.Fragment>
                ))}
                <p className="col-span-2 text-left font-bold text-indigo-600">
                  Total: IMIFUKA {calculateTotal(newFoodIbiro)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-center text-white bg-indigo-500 py-2 font-semibold">IFUNGURO RYIZA</h2>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-center text-indigo-600 font-medium">Ibiro</p>
                <p className="text-center text-indigo-600 font-medium">Ingano</p>
                {['25', '10', '5'].map((key, index) => (
                  <React.Fragment key={key}>
                    <input
                      type="number"
                      name='if'
                      placeholder={`IF: ${[25, 10, 5][index]}KG`}
                      className="bg-gray-200 p-2 rounded"
                      value={key}
                      disabled
                      readOnly
                    />
                    <input
                      type="text"
                      onChange={(e) => handleIfunguroChange(key, e.target.value)}
                      value={(ifunguroIbiro[key])}
                      className="bg-gray-200 p-2 rounded"
                      
                    />
                  </React.Fragment>
                ))}
                <p className="col-span-2 text-left font-bold text-indigo-600">
                  Total: IMIFUKA {calculateTotal(ifunguroIbiro)}
                </p>
              </div>
            </div>

      
            <div>
              <h2 className="text-center text-white bg-indigo-500 py-2 font-semibold">ISEZERANO</h2>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-center text-indigo-600 font-medium">Ibiro</p>
                <p className="text-center text-indigo-600 font-medium">Ingano</p>
                {['25', '10', '5'].map((key, index) => (
                  <React.Fragment key={key}>
                    <input
                      type="number"
                      name='is'
                      placeholder={`IS: ${[25, 10, 5][index]}KG`}
                      className="bg-gray-200 p-2 rounded"
                      readOnly
                      disabled
                      value={key}
                    />
                    <input
                      type="text"
                      value={(isezeranoIbiro[key])}
                      onChange={(e) => handleIsezeranoChange(key, e.target.value)}
                      className="bg-gray-200 p-2 rounded"
                      
                    />
                  </React.Fragment>
                ))}
                <p className="col-span-2 text-left font-bold text-indigo-600">
                  Total: IMIFUKA {calculateTotal(isezeranoIbiro)}
                </p>
              </div>
            </div>

          
            <div>
              <h2 className="text-center text-white bg-indigo-500 py-2 font-semibold">Manemane</h2>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-center text-indigo-600 font-medium">Ibiro</p>
                <p className="text-center text-indigo-600 font-medium">Ingano</p>
                {['25', '10', '5' ].map((key, index) => (
                  <React.Fragment key={key}>
                    <input
                      type="number"
                    name='mag'
                      placeholder={`IS E: ${[25, 10, 5, 2][index]}KG`}
                      className="bg-gray-200 p-2 rounded"
                      readOnly
                      disabled
                      value={key}
                      />
                    <input
                      type="text"
                      onChange={(e) => handleMagajuChange(key, e.target.value)}
                      value={(magajuIbiro[key])}
                      className="bg-gray-200 p-2 rounded"
                      
                    />
                  </React.Fragment>
                ))}
                <p className="col-span-2 text-left font-bold text-indigo-600">
                  Total: IMIFUKA {calculateTotal(magajuIbiro)}
                </p>
              </div>
            </div>
          </div>

      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-indigo-600 font-semibold mb-2 ">Isezerano Envelope</label>

           <input 
             type="number"
             value={5}
             placeholder="IS:5KG"
             name='envelope'
             className="bg-gray-200 p-2 rounded"
             readOnly
             disabled
          />
          <label className="block text-indigo-600 font-semibold mb-2">Ingano</label>
         <input
             type="number"
             placeholder="0"
             className="bg-gray-200 p-2 rounded"
             value={isEnvelope5kg}
             onChange={(e)=>setIsEnvelope2kg(e.target.value)}

          />
      </div>
          </div>
 
         <textarea
         className="mt-4 w-full p-2 rounded bg-gray-200"
         rows="4"
         placeholder="Enter comments here"
         value={comments}
         name='comment'
         onChange={ (e) => setComments(e.target.value)}
        />

          {/* Submit button */}
          <div className="mt-4 text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white p-2 rounded w-1/2"
            >
              Kubika
            </button>
          </div>
          {/* Display success message */}
        {successMessage && (
          <div className="text-center mb-4 p-2 bg-green-200 text-green-800 font-semibold rounded">
            {successMessage}
          </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default ProductFormSack;
