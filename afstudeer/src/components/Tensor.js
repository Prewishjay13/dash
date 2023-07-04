import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import Papa from 'papaparse';
import '../knn.css';
export default function Tensor() {
  const [prediction, setPrediction] = useState('');
  const [machine, setMachine] = useState(null);
  const [normalizeValues, setNormalizeValues] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [selectedInputs, setSelectedInputs] = useState([]);
  const [selectedOutput, setSelectedOutput] = useState('');
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
    const normInput = userInput.sub(nc.inputMin).div(nc.inputMax.sub(nc.inputMin));
    const predictionTF = machine.predict(normInput);
    const unnormalizedPredictionTF = predictionTF.mul(nc.labelMax.sub(nc.labelMin)).add(nc.labelMin);
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
    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    const numFeatures = inputs[0].length;
    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 8, inputShape: [numFeatures] }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

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
      <p>Use TensorFlow to calculate your target values by selecting the right inputs and output.</p>

      <div className='input'>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>

      {csvData.length > 0 && (
        <>
          <div>
            <h2>Select the factors:</h2>
            {Object.keys(csvData[0]).map((key) => (
              <div key={key}>
                <input
                  type="checkbox"
                  value={key}
                  checked={selectedInputs.includes(key)}
                  onChange={handleInputCheckboxChange}
                />
                <label htmlFor={key}>{key}</label>
              </div>
            ))}
          </div>

          <div>
            <h2>Select Predicted Value:</h2>
            {Object.keys(csvData[0]).map((key) => (
              <div key={key}>
                <input
                  type="radio"
                  name="output"
                  value={key}
                  checked={selectedOutput === key}
                  onChange={handleOutputCheckboxChange}
                />
                <label htmlFor={key}>{key}</label>
              </div>
            ))}
          </div>
        
        <div className='train'>
          <button type="button" onClick={trainModel} disabled={isModelTrained || selectedInputs.length === 0 || !selectedOutput}>
            Train Model
          </button>
          </div>
          {isModelTrained && (
            <div>
              <h2>Enter Input Values:</h2>
              {selectedInputs.map((key) => (
                <div key={key}>
                  <label htmlFor={key}>{key}:</label>
                  <input
                    type="number"
                    id={key}
                    value={inputValues[key] || ''}
                    onChange={(e) => setInputValues({ ...inputValues, [key]: parseFloat(e.target.value) })}
                  />
                </div>
              ))}
              <button type="button" onClick={makePrediction}>
                Calculate
              </button>
            </div>
          )}
        </>
      )}

      {prediction && (
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>The calculated value is:{prediction}!</p>
      )}
    </div>
  );
}
