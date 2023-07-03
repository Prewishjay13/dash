import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Label } from "recharts";

export default function Scatterplot () {
  const [data, setData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          const csvHeaders = Object.keys(results.data[0]);
          setData(results.data);
          setCsvHeaders(csvHeaders);
        },
      });
    }
  }, [file]);

  const handleCheckboxChange = (header) => {
    setSelectedHeaders((prevSelectedHeaders) => {
      if (prevSelectedHeaders.includes(header)) {
        return prevSelectedHeaders.filter((selectedHeader) => selectedHeader !== header);
      } else {
        return [...prevSelectedHeaders, header];
      }
    });
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    
    <div className="container">
      <div className="upload-box">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      <div className="labels">
      {file && (
        <div className="check-labels">
          {csvHeaders.map((header) => (
            <label key={header}>
              <input
                type="checkbox"
                checked={selectedHeaders.includes(header)}
                onChange={() => handleCheckboxChange(header)}
              />
              {header}
            </label>
          ))}
        </div>
      )}
      </div>
         {file && (
            <div className="scatter-chart">
            <div className="graph-label">
              Scatter Plot
            </div>
            <ScatterChart width={1000} height={500} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={selectedHeaders[0]}>
                <Label
                  value={selectedHeaders[0]}
                  className="graph-label-x"
                  position="insideBottom"
                  offset={-10}
                />
              </XAxis>
              <YAxis>
                <Label
                  value={selectedHeaders[1]}
                  className="graph-label-y"
                  position="insideLeft"
                  angle={-90}
                  offset={10}
                />
              </YAxis>
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter dataKey={selectedHeaders[1]} fill="#8884d8" />
            </ScatterChart>
          </div>
        )}
      </div>
  );
};

