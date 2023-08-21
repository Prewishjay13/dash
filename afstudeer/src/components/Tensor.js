import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";
import "../knn.css";

export default function Tensor() {
  const [prediction, setPrediction] = useState("");
  const [machine, setMachine] = useState(null);
  const [normalizeValues, setNormalizeValues] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [selectedInputs, setSelectedInputs] = useState([]);
  const [selectedOutput, setSelectedOutput] = useState("");
  const [isModelTrained, setIsModelTrained] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const makePrediction = () => {
    const userInput = tf.tensor2d([[...Object.values(inputValues)]]);
    const nc = normalizeValues;
    const normInput = userInput
      .sub(nc.inputMin)
      .div(nc.inputMax.sub(nc.inputMin));
    const predictionTF = machine.predict(normInput);
    const unnormalizedPredictionTF = predictionTF
      .mul(nc.labelMax.sub(nc.labelMin))
      .add(nc.labelMin);
    const prediction = Math.round(unnormalizedPredictionTF.dataSync()[0]);

    setPrediction(prediction);
  };

  const trainModel = async () => {
    const inputs = csvData.map((d) => selectedInputs.map((key) => d[key]));
    const outputs = csvData.map((d) => d[selectedOutput]);
    const [model, normValues] = await createNeuralNetwork(inputs, outputs);

    setMachine(model);
    setNormalizeValues(normValues);
    setIsModelTrained(true);
  };

  const createNeuralNetwork = async (inputs, outputs) => {
    const inputTensor = tf.tensor2d(inputs);
    const labelTensor = tf.tensor1d(outputs);

    const [inputMax, inputMin, labelMax, labelMin] = [
      inputTensor.max(0, false),
      inputTensor.min(0, false),
      labelTensor.max(),
      labelTensor.min(),
    ];
    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor
      .sub(labelMin)
      .div(labelMax.sub(labelMin));

    const numFeatures = inputs[0].length;
    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 8, inputShape: [numFeatures] }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    await model.fit(normalizedInputs, normalizedLabels, {
      epochs: 120,
    });

    return [model, { inputMin, inputMax, labelMin, labelMax }];
  };

  useEffect(() => {
    if (csvData.length > 0) {
      setIsModelTrained(false);
    }
  }, [csvData]);

  const handleInputCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedInputs([...selectedInputs, value]);
    } else {
      setSelectedInputs(selectedInputs.filter((input) => input !== value));
    }
  };

  const handleOutputCheckboxChange = (event) => {
    setSelectedOutput(event.target.value);
  };

  return (
    <div className="models-container">
      <h1 className="font-bold mb-2">
        Use TensorFlow to calculate your target values by selecting the right
        inputs and output.
      </h1>

      <div className="input">
        <input
          type="file"
          accept=".csv"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileUpload}
        />
      </div>

      {csvData.length > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Select wat you need for your prediction:</h2>
                <div className="card-actions justify-start">
                  <ul>
                    {Object.keys(csvData[0]).map((key) => (
                      <li key={key}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={key}
                          checked={selectedInputs.includes(key)}
                          onChange={handleInputCheckboxChange}
                        />
                        <label htmlFor={key}>
                          <span className="capitalize">{key}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Select wat you want to predict:</h2>
                <div className="card-actions justify-start">
                  <ul>
                    {Object.keys(csvData[0]).map((key) => (
                      <li key={key}>
                        <input
                          type="radio"
                          name="output"
                          className="radio"
                          value={key}
                          checked={selectedOutput === key}
                          onChange={handleOutputCheckboxChange}
                        />
                        <label htmlFor={key}>
                          <span className="capitalize">{key}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex my-4 justify-center">
            <div className="flex">
            <button
              type="button"
              className="btn btn-primary"
              onClick={trainModel}
              disabled={
                isModelTrained || selectedInputs.length === 0 || !selectedOutput
              }
            >
              Train Model
            </button>
            </div>

          {isModelTrained && (
            <div className="flex">
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Enter input values:</h2>
                  <div className="card-actions justify-start">
                    {selectedInputs.map((key) => (
                      <div key={key}>
                        <label className="label">
                          <span htmlFor={key} className="label-text">
                            <span className="capitalize">{key}:</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          className="input input-bordered w-full max-w-xs"
                          id={key}
                          value={inputValues[key] || ""}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              [key]: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={makePrediction}
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      )}

      {prediction && (
        <p className="bg-slate-100 p-2" >
          The calculated value is: {prediction}!
        </p>
      )}
    </div>
  );
}
