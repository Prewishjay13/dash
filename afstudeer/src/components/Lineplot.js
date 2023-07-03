import React, { useState } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Lineplot() {
  const [data, setData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [file, setFile] = useState(null);
  const [colorMap, setColorMap] = useState({});

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleCheckboxChange = (header) => {
    setSelectedHeaders((prevSelectedHeaders) => {
      if (prevSelectedHeaders.includes(header)) {
        return prevSelectedHeaders.filter((selectedHeader) => selectedHeader !== header);
      } else {
        return [...prevSelectedHeaders, header];
      }
    });
  };

  const processData = (results) => {
    const csvHeaders = Object.keys(results.data[0]);
    setData(results.data);
    setCsvHeaders(csvHeaders);
    setSelectedHeaders([csvHeaders[0]]); // Set default selected header
    generateColorMap(csvHeaders);
  };

  const generateColorMap = (headers) => {
    const colorMap = {};
    headers.forEach((header, index) => {
      colorMap[header] = getColorByIndex(index);
    });
    setColorMap(colorMap);
  };

  const getColorByIndex = (index) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f5a', '#ca82da', '#5aafff', '#ff5aa8', '#ff0000', '#000000'];
    return colors[index % colors.length];
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        processData(results);
      },
    });
  };

  const renderCheckbox = (header) => {
    return (
      <label key={header}>
        <input
          type="checkbox"
          checked={selectedHeaders.includes(header)}
          onChange={() => handleCheckboxChange(header)}
        />
        {header}
      </label>
    );
  };

  return (
    <div className="container">
      <div className="upload-box">
        <input type="file" accept=".csv" onChange={(e) => parseCSV(e.target.files[0])} />
      </div>
      <div className="labels">
        {csvHeaders.length > 0 && csvHeaders.map((header) => renderCheckbox(header))}
      </div>
      {data.length > 0 && (
        <div className="line-chart">
          <div className="graph-label">Line Chart</div>
          <ResponsiveContainer width={1000} height={500}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedHeaders.map((header, index) => (
                <Line
                  key={header}
                  type="monotone"
                  dataKey={header}
                  stroke={colorMap[header]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
