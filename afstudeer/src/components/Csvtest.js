import React, { useState } from 'react';
import Papa from 'papaparse';
import '../style.css';


export default function Csv({ handleBackClick, onSubmit }) {

  const [data, setData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [headerValues, setHeaderValues] = useState({});

  const handleCsvUpload = (e) => {
    
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        
        // console.log(results.data);
        const headers = Object.keys(results.data[0]);
        const values = {};

        headers.forEach((header) => {
          values[header] = results.data.map((row) => row[header]);
        });

        setCsvHeaders(headers);
        console.log('CSV Headers:', Object.keys(results.data[0]));
        setData(results.data);
        setHeaderValues(values);
        
      },
    });
  };


  const getHeaderValues = () => {
    return headerValues;
  };


    return (
     <div className="upload">

        <input type="file" accept=".csv" onChange={handleCsvUpload} />

        <div>
          <button onClick={() => console.log(getHeaderValues())}>
            Get Header Values
          </button>
        </div>

      <div className='header-names'>
        {csvHeaders.length > 0 && (
          <ul>
            {csvHeaders.map((header, index) => (
              <li key={index}>{header}</li>
            ))}
          </ul>
        )}
      </div>
      <div className='table'>
      {data.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>area</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
    </div>

  );
}
