import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function Tensor() {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);

  const trainModel = async () => {
    // Generate some training data
    const xs = tf.tensor2d([[1, 3], [2, 4], [3, 5], [4, 6]], [4, 2]);
    const ys = tf.tensor2d([[4], [6], [8], [10]], [4, 1]);

    // Define a simple sequential model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [2] }));

    // Compile the model
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Train the model
    await model.fit(xs, ys, { epochs: 100 });

    // Store the trained model
    setModel(model);
  };

  const makePrediction = () => {
    const output = model.predict(tf.tensor2d([[input1, input2]], [1, 2])).dataSync()[0];
    setPrediction(output.toFixed(2));
  };

  return (
    <div>
      <h2>TensorFlow Model</h2>

      {model ? (
        <div>
          <form>
            <div>
              <label htmlFor="input1">Input 1:</label>
              <input type="number" id="input1" value={input1} onChange={(e) => setInput1(parseFloat(e.target.value))} />
            </div>
            <div>
              <label htmlFor="input2">Input 2:</label>
              <input type="number" id="input2" value={input2} onChange={(e) => setInput2(parseFloat(e.target.value))} />
            </div>
            <button type="button" onClick={makePrediction}>
              Predict
            </button>
          </form>
          <p>Prediction: {prediction}</p>
        </div>
      ) : (
        <button type="button" onClick={trainModel}>
          Train Model
        </button>
      )}
    </div>
  );
}
