import * as tf from '@tensorflow/tfjs'

export const createNeuralNetwork = async (inputs, outputs) => {
    // tensors maken van de inputs en outputs, let op dat alle data NUMBERS zijn!
    const inputTensor = tf.tensor2d(inputs)
    const labelTensor = tf.tensor1d(outputs)

    const [inputMax, inputMin, labelMax, labelMin] = [inputTensor.max(0,false), inputTensor.min(0,false), labelTensor.max(), labelTensor.min()]
    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin))
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin))

    // bouw het model met 2 features: horsepower, weight
    const numFeatures = inputs[0].length
    const model = tf.sequential()
    model.add(tf.layers.dense({ units: 8, inputShape: [numFeatures] }))
    model.add(tf.layers.dense({ units: 1 }))
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
    // aantal epochs instellen
    await model.fit(normalizedInputs, normalizedLabels, { epochs: 5 })
    return [model, { inputMin, inputMax, labelMin, labelMax }]    
}