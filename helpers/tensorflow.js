const tf = require(`@tensorflow/tfjs`)
const classRes = require(`./class_indices.json`)

const multer = require(`multer`)

const predict = async (image) => {
    try {
        let model = await tf.loadLayersModel(`./tensorflowjs-model/model.json`)

        const offset = tf.scalar(255)
        const tensorImage = tf.browser.fromPixels(image).resizeNearestNeighbor([223, 224]).expandDims()
        let tensorImage_scaled = tensorImage.div(offset)
    
        let prediction = await model.predict(tensorImage_scaled).data()

        let predicted_class = tf.argMax(prediction)
        class_index = Array.from(predicted_class.dataSync())[0]
        return { disease: classRes[class_index], confidence: parseFloat(prediction[class_idx]*100).toFixed(2) }
    } catch (error) {
        throw error
    }

}


module.exports = {
    predict,
}