import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import knn from 'knear';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import '../knn.css';
export default function Knn () {

  const [kValue, setKValue] = useState(2);

  const machine = useRef(new knn.kNear(kValue));
  const [prediction, setPrediction] = useState('');
  const [formInputs, setFormInputs] = useState({});
  const [csvHeaders, setCSVHeaders] = useState([]);
  const [csvData, setCSVData] = useState([]);
  const [inputHeaders, setInputHeaders] = useState([]);
  const [outputHeaders, setOutputHeaders] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [chartData, setChartData] = useState([]);

  const makePrediction = () => {
    const inputValues = inputHeaders.map((header) => parseFloat(formInputs[header]));
    const pred = machine.current.classify(inputValues);
    setPrediction(pred);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        const headers = Object.keys(results.data[0]);
        setCSVHeaders(headers);
        setCSVData(results.data);
        setInputHeaders([]);
        setOutputHeaders([]);
        setShowButton(true);
        setChartData(results.data.map((row) => ({
          x: parseFloat(row[headers[0]]),
          y: parseFloat(row[headers[1]]),
        })));
      },
    });
  };

  const handleHeaderCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setInputHeaders((prevHeaders) => [...prevHeaders, name]);
    } else {
      setInputHeaders((prevHeaders) => prevHeaders.filter((header) => header !== name));
    }
  };

  const trainModel = () => {
    machine.current = new knn.kNear(kValue); // Update machine's k value
    const trainingData = csvData.map((row) => {
      const inputs = inputHeaders.map((header) => parseFloat(row[header]));
      const output = outputHeaders.map((header) => row[header]);
      return { inputs, output };
    });

    trainingData.forEach((data) => {
      const { inputs, output } = data;
      machine.current.learn(inputs, output);
    });
  };

  const handleKValueChange = (event) => {
    const newKValue = parseInt(event.target.value, 10);
    setKValue(newKValue);
  };

   return (
    <div className="container">
      <h2>KNN</h2>

      <section>
        <h3>Upload</h3>
        <div>
          <label htmlFor="k-value">K Value:</label>
          <input type="number" id="k-value" name="k-value" value={kValue} onChange={handleKValueChange} />
        </div>

        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </section>

      {showButton && (
        <section>
          <h3>Train</h3>
          <button type="button" onClick={trainModel}>
            Train Model
          </button>
        </section>
      )}

      {csvHeaders.length > 0 && (
        <section>
          <h3>Select Input and Output Headers</h3>
          <div>
            <strong>Input Headers:</strong>
            {csvHeaders.map((header) => (
              <div key={header}>
                <label>
                  <input
                    type="checkbox"
                    name={header}
                    checked={inputHeaders.includes(header)}
                    onChange={handleHeaderCheckboxChange}
                  />
                  {header}
                </label>
              </div>
            ))}
          </div>
          <div>
            <strong>Output Headers:</strong>
            {csvHeaders.map((header) => (
              <div key={header}>
                <label>
                  <input
                    type="checkbox"
                    name={header}
                    checked={outputHeaders.includes(header)}
                    onChange={(event) => {
                      const { name, checked } = event.target;
                      if (checked) {
                        setOutputHeaders((prevHeaders) => [...prevHeaders, name]);
                      } else {
                        setOutputHeaders((prevHeaders) =>
                          prevHeaders.filter((header) => header !== name)
                        );
                      }
                    }}
                  />
                  {header}
                </label>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3>Predict</h3>
        <form>
          {inputHeaders.map((header) => (
            <div key={header}>
              <label htmlFor={header}>{header}</label>
              <input type="number" id={header} name={header} onChange={handleInputChange} />
            </div>
          ))}
          <button type="button" onClick={makePrediction}>
            Predict!
          </button>
        </form>
        <p>Predicted Category: {prediction}</p>
      </section>

      {chartData.length > 0 && (
        <section>
          <h3>Graph</h3>
          <ScatterChart width={400} height={300}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name={csvHeaders[0]}>
              <Label value={csvHeaders[0]} offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis type="number" dataKey="y" name={csvHeaders[1]}>
              <Label value={csvHeaders[1]} angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Data" data={chartData} fill="#8884d8" />
            <Scatter
              name="Prediction"
              data={[
                { x: parseFloat(formInputs[inputHeaders[0]]), y: parseFloat(formInputs[inputHeaders[1]]) },
              ]}
              fill="red"
            />
          </ScatterChart>
        </section>
      )}
    </div>
  );
}
