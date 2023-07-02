import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Chart () {
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
         //results.data.map((o) => (o["isChecked"] = false));

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
    <div>
      <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      {file && (
        <div>
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
      {file && (
        <ScatterChart width={1000} height={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={selectedHeaders[0]} />
          <YAxis dataKey={selectedHeaders[1]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#8884d8" />
        </ScatterChart>
      )}
    </div>
  );
};


