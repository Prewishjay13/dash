import * as tf from '@tensorflow/tfjs'

export const createNeuralNetwork = async (inputs, outputs) => {
    // todo wrap in tf.tidy()
    // tensors maken van de inputs en outputs, let op dat alle data NUMBERS zijn!
    const inputTensor = tf.tensor2d(inputs)
    const labelTensor = tf.tensor1d(outputs)



    const [inputMax, inputMin, labelMax, labelMin] = [inputTensor.max(0,false), inputTensor.min(0,false), labelTensor.max(), labelTensor.min()]
    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin))
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin))


    // het aantal features waarop je wil trainen. in het voorbeeld van autos is het horsepower, weight
    const numFeatures = inputs[0].length
    const model = tf.sequential()
    console.log(`training on ${numFeatures} features`)

    // de eerste layer moet ook het aantal inputs meekrijgen. de laatste layer is voor het aantal outputs.
    model.add(tf.layers.dense({ units: 8, inputShape: [numFeatures] }))
    model.add(tf.layers.dense({ units: 1 }))
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
    
    // use low epochs or comment this out while coding other parts of the app - training takes time!
    await model.fit(normalizedInputs, normalizedLabels, {
         epochs: 5
    })
    console.log("finished training")
    // return the model for making predictions, and the values needed for normalising / unnormalising
    return [model, { inputMin, inputMax, labelMin, labelMax }]    
}