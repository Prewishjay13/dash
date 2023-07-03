import React, { useState } from "react";
import Papa from "papaparse";
import '../model.css'; // Import the CSS file for styling

export default function Models() {
  const [csvHeaders, setCSVHeaders] = useState([]);
  const [inputHeaders, setInputHeaders] = useState([]);
  const [outputHeaders, setOutputHeaders] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [csvData, setCSVData] = useState([]); // New state to hold the parsed CSV data

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        const headers = Object.keys(results.data[0]);
        setCSVHeaders(headers);
        setCSVData(results.data); // Store the parsed CSV data
        setInputHeaders([]);
        setOutputHeaders([]);
        setShowButton(true);
      },
    });
  };

  const handleCheckboxChange = (header, listType) => {
    if (listType === "input") {
      if (outputHeaders.includes(header)) {
        setOutputHeaders(outputHeaders.filter((h) => h !== header));
      }
      setInputHeaders((prevHeaders) =>
        prevHeaders.includes(header)
          ? prevHeaders.filter((h) => h !== header)
          : [...prevHeaders, header]
      );
    } else if (listType === "output") {
      if (inputHeaders.includes(header)) {
        setInputHeaders(inputHeaders.filter((h) => h !== header));
      }
      setOutputHeaders((prevHeaders) =>
        prevHeaders.includes(header)
          ? prevHeaders.filter((h) => h !== header)
          : [...prevHeaders, header]
      );
    }
  };

  const handleButtonClick = () => {
    const inputValues = inputHeaders.map((header) => {
      return {
        header: header,
        values: csvData.map((row) => row[header]),
      };
    });

    const outputValues = outputHeaders.map((header) => {
      return {
        header: header,
        values: csvData.map((row) => row[header]),
      };
    });

    setSelectedValues({
      input: inputValues,
      output: outputValues,
    });
    console.log(selectedValues);
  };

  const selectedHeaders = [...inputHeaders, ...outputHeaders];

  return (
    <div className="models-container">
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {csvHeaders.length > 0 && (
        <div className="header-list-container">
          <div className="header-list">
            <h3 className="header-title">Input Headers:</h3>
            <ul>
              {csvHeaders.map((header) => (
                <li key={header}>
                  <label>
                    <input
                      type="checkbox"
                      checked={inputHeaders.includes(header)}
                      onChange={() => handleCheckboxChange(header, "input")}
                    />
                    {header}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="header-list">
            <h3 className="header-title">Output Headers:</h3>
            <ul>
              {csvHeaders.map((header) => (
                <li key={header}>
                  <label>
                    <input
                      type="checkbox"
                      checked={outputHeaders.includes(header)}
                      onChange={() => handleCheckboxChange(header, "output")}
                    />
                    {header}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showButton && <button onClick={handleButtonClick}>Show Selected Values</button>}

      {selectedValues.input && selectedValues.input.length > 0 && (
        <div className="selected-values-container">
          <h3>Selected Input Values:</h3>
          <ul>
            {selectedValues.input.map((value, index) => (
              <li key={index}>
                <strong>{value.header}:</strong>
                <ul>
                  {value.values.map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedValues.output && selectedValues.output.length > 0 && (
        <div className="selected-values-container">
          <h3>Selected Output Values:</h3>
          <ul>
            {selectedValues.output.map((value, index) => (
              <li key={index}>
                <strong>{value.header}:</strong>
                <ul>
                  {value.values.map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
