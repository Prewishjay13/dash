import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import knn from "knear";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";
import "../knn.css";
export default function Knn() {
  const [kValue, setKValue] = useState(2);

  const machine = useRef(new knn.kNear(kValue));
  const [prediction, setPrediction] = useState("");
  const [formInputs, setFormInputs] = useState({});
  const [csvHeaders, setCSVHeaders] = useState([]);
  const [csvData, setCSVData] = useState([]);
  const [inputHeaders, setInputHeaders] = useState([]);
  const [outputHeaders, setOutputHeaders] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [chartData, setChartData] = useState([]);

  const makePrediction = () => {
    const inputValues = inputHeaders.map((header) =>
      parseFloat(formInputs[header])
    );
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
        setChartData(
          results.data.map((row) => ({
            x: parseFloat(row[headers[0]]),
            y: parseFloat(row[headers[1]]),
          }))
        );
      },
    });
  };

  const handleHeaderCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setInputHeaders((prevHeaders) => [...prevHeaders, name]);
    } else {
      setInputHeaders((prevHeaders) =>
        prevHeaders.filter((header) => header !== name)
      );
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
    <div className="models-container">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Chooses your name?</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            accept=".csv"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="number"
            id="k-value"
            className="input input-bordered w-full max-w-xs"
            name="k-value"
            value={kValue}
            onChange={handleKValueChange}
          />
        </div>
      </div>

      {showButton && (
        <div className="train">
          <button className="btn btn-primary my-2" onClick={trainModel}>
            Train Model
          </button>
        </div>
      )}

      {csvHeaders.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Selected input values:</h2>
                <div className="card-actions justify-start">
                  <ul>
                    {csvHeaders.map((header) => (
                      <li key={header}>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            name={header}
                            checked={inputHeaders.includes(header)}
                            onChange={handleHeaderCheckboxChange}
                          />
                          <span className="capitalize">{header}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Select predicted value:</h2>
                <div className="card-actions justify-start">
                  <ul>
                    {csvHeaders.map((header) => (
                      <li key={header}>
                        <label>
                          <input
                            type="checkbox"
                            name={header}
                            className="checkbox"
                            checked={outputHeaders.includes(header)}
                            onChange={(event) => {
                              const { name, checked } = event.target;
                              if (checked) {
                                setOutputHeaders((prevHeaders) => [
                                  ...prevHeaders,
                                  name,
                                ]);
                              } else {
                                setOutputHeaders((prevHeaders) =>
                                  prevHeaders.filter(
                                    (header) => header !== name
                                  )
                                );
                              }
                            }}
                          />
                           <span className="capitalize">{header}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <section>
        <div className="form-container py-4">
          <h3 className="font-bold">Predict</h3>
          <form>
            {inputHeaders.map((header) => (
              <div key={header}>
                <label className="label">
                  <span htmlFor={header} className="label-text">Selected input: <span className="font-bold capitalize">{header}</span></span>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="number"
                  id={header}
                  name={header}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <button type="button" className="btn btn-primary mt-2" onClick={makePrediction}>
              Predict!
            </button>
          </form>
        </div>
        <p className="bg-slate-100 p-2">Predicted Category: <span className="font-bold">{prediction}</span></p>
      </section>

      {chartData.length > 0 && (
        <section>
          <h3>Graph</h3>
          <ScatterChart width={400} height={300}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name={csvHeaders[0]}>
              <Label
                value={csvHeaders[0]}
                offset={-5}
                position="insideBottom"
              />
            </XAxis>
            <YAxis type="number" dataKey="y" name={csvHeaders[1]}>
              <Label value={csvHeaders[1]} angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Data" data={chartData} fill="#8884d8" />
            <Scatter
              name="Prediction"
              data={[
                {
                  x: parseFloat(formInputs[inputHeaders[0]]),
                  y: parseFloat(formInputs[inputHeaders[1]]),
                },
              ]}
              fill="red"
            />
          </ScatterChart>
        </section>
      )}
    </div>
  );
}
