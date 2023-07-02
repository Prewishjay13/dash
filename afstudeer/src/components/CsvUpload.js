import React, { useState } from 'react';
import Papa from 'papaparse';
import '../style.css';


export default function Csv() {

  const [data, setData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [headerValues, setHeaderValues] = useState([]);

  const handleCsvUpload = (event) => {
    
    const file = event.target.files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {

          results.data.map((o) => { o["isChecked"] = 0; });
          console.log("result1: " + results.data)
          const jsonData = JSON.stringify(results.data);
          console.log("result2: " + jsonData);

        const csvHeaders = Object.keys(results.data[0]);
        //const headerValues = {};

        // csvHeaders.forEach((header) => {
        //   headerValues[header] = results.data.map((row) => row[header]);
        // });
  
        const headerValues = csvHeaders.map((header) =>
        results.data.map((row) => row[header])
      );
     
        //logt de headers
        console.log('CSV Headers:', Object.keys(results.data[0]));
        setData(results.data);
        setCsvHeaders(csvHeaders); 
        setHeaderValues(headerValues);
      }
    });
  };


  const getHeaderValues = () => {
    return headerValues;
  };

  const handleCheckboxChange = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };
    return (
     <div className="upload">

        <input type="file" accept=".csv" onChange={handleCsvUpload} />

        <div>
          <button onClick={() => console.log(getHeaderValues())}>
            Get Header Values
          </button>
        </div>

      <div className="table-responsive">
      <table>
        <thead>
          <tr>
            {csvHeaders.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {data.map((row, i) => (
              <tr key={i}>
                {csvHeaders.map((header, j) => (
                 <React.Fragment key={j}>
                 {header === "isChecked" ? (
                   // Render custom content for "isChecked" header
                   <td>
                     {/* Your custom content for "isChecked" header */}
                     {/* For example, render a checkbox */}
                     <input
                       type="checkbox"
                       checked={row[header]}
                       onChange={() => handleCheckboxChange(i)}
                     />
                   </td>
                 ) : (
                   // Render regular column values for other headers
                   <td>{row[header]}</td>
                 )}
               </React.Fragment>))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>

  );
}
