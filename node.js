import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input);
      const res = await axios.post('http://localhost:5000/bfhl', jsonInput);
      setResponse(res.data);
    } catch (error) {
      console.error('Invalid JSON or API call failed', error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOptions([...e.target.selectedOptions].map(o => o.value));
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredData = {};
    if (selectedOptions.includes('Alphabets')) filteredData.alphabets = response.alphabets;
    if (selectedOptions.includes('Numbers')) filteredData.numbers = response.numbers;
    if (selectedOptions.includes('Highest alphabet')) filteredData.highest_alphabet = response.highest_alphabet;

    return (
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea value={input} onChange={handleInputChange} placeholder='Enter JSON here'></textarea>
      <button onClick={handleSubmit}>Submit</button>
      <select multiple onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest alphabet">Highest alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;
