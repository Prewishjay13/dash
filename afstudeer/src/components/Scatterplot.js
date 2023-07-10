import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";

export default function Scatterplot() {
  const [data, setData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [file, setFile] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [showInputData, setShowInputData] = useState(false);

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
        return prevSelectedHeaders.filter(
          (selectedHeader) => selectedHeader !== header
        );
      } else {
        return [...prevSelectedHeaders, header];
      }
    });
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleShowInputData = () => {
    setShowInputData(true);
  };

  const combinedData = [...data, inputValues];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {file && (
          <div className="w-full max-w-xs">
            <p className="pb-3">
              Kies eerst de X waarde en vervolgens Y waarde.
            </p>
            <div className="space-y-2">
              {csvHeaders.map((header) => (
                <label key={header} className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedHeaders.includes(header)}
                    onChange={() => handleCheckboxChange(header)}
                  />
                  <span className="ml-2">{header}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      {file && (
        <div className="flex justify-center mt-4">
          <div className="w-full">
            <div className="text-center text-lg font-bold mb-4">
              Scatter Plot
            </div>

            <ScatterChart
              width={730}
              height={250}
              margin={{
                top: 20,
                right: 20,
                bottom: 10,
                left: 10,
              }}
            >
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
                  offset={-10}
                />
              </YAxis>
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter dataKey={selectedHeaders[1]} fill="#8884d8" />
            </ScatterChart>

            <ScatterChart width={600} height={350} data={combinedData}>
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
                  offset={-10}
                />
              </YAxis>
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter dataKey={selectedHeaders[1]} fill="#8884d8" />
              {showInputData && (
                <Scatter
                  name="Input Data"
                  data={[inputValues]}
                  fill="#ff0000"
                  shape="circle"
                  stroke="#000000"
                />
              )}
            </ScatterChart>
          </div>
        </div>
      )}
      {selectedHeaders.length > 0 && (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md">
            <h3 className="text-center text-lg font-bold mb-4">Input Values</h3>
            {selectedHeaders.map((header) => (
              <div key={header} className="mb-4">
                <label htmlFor={header} className="text-center block mb-2">
                  {header}
                </label>
                <input
                  type="number"
                  id={header}
                  name={header}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleShowInputData}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Show Input Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
