import React from "react";
import '../style.css';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import Papa from "papaparse";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs";
import { createNeuralNetwork } from "./createNeuralNetwork.js"

function Home () {
    const [csvHeaders, setCSVHeaders] = useState([]);
  const [inputHeaders, setInputHeaders] = useState([]);
  const [outputHeaders, setOutputHeaders] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [csvData, setCSVData] = useState([]);

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

    
    trainModel(inputValues, outputValues);
  };

  const trainModel = (inputValues, outputValues) => {
    // Convert the input and output values into tensors
    const inputTensors = inputValues.map((input) => tf.tensor(input.values));
    const outputTensors = outputValues.map((output) => tf.tensor(output.values));

    // Perform model training using TensorFlow.js APIs
    // Replace this code with your actual TensorFlow.js model training code
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
    model.fit(inputTensors, outputTensors, { epochs: 10 })
      .then(() => {
        console.log("Model trained successfully!");
        predictModel(model, inputTensors);
      })
      .catch((error) => {
        console.error("Model training failed:", error);
      })
      .finally(() => {
        // Clean up the tensors
        inputTensors.forEach((tensor) => tensor.dispose());
        outputTensors.forEach((tensor) => tensor.dispose());
      });
  };

  const predictModel = (model, inputTensors) => {
    // Perform model prediction using TensorFlow.js APIs
    // Replace this code with your actual TensorFlow.js model prediction code
    const predictions = model.predict(inputTensors);
    predictions.array().then((result) => {
      console.log("Model predictions:", result);
    });
  };

  const selectedHeaders = [...inputHeaders, ...outputHeaders];
return ( 
//  <Link to="/posts" className="nav-item">  
//     <div className="box-one">
//         <h>Home Page</h>
//         <p>Welcome to the Home page. This is where</p>
//     </div>
// </Link>

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

export default Home;
