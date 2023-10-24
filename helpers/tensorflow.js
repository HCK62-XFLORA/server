const tf = require(`@tensorflow/tfjs-node`)
const classRes = require(`./class_indices.json`)

const path = require(`path`)
const fs = require(`fs`)

const multer = require(`multer`)
const sharp = require(`sharp`)

const storage = multer.diskStorage({ destination: (req, file, callback) => { callback(null, `./helpers/images`)}, filename: (req, file, callback) => { callback(null, Date.now().toString() + path.extname(file.originalname)) } })

const uploadLocal = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const fileExts = [`.png`, `.jpg`, `.jpeg`];

        const isAllowedExt = fileExts.includes(
            path.extname(file.originalname.toLowerCase())
        );

        const isAllowedMimeType = file.mimetype.startsWith("image/");
        if(isAllowedExt && isAllowedMimeType) return callback(null, true)
        return callback({ name: `InvalidFileExt`, message: `This file type is not allowed!` })
    }
})

const uploadSingle = uploadLocal.single(`image`)

const predict = async (imagepath) => {
    try {
        const image = fs.readFileSync(imagepath)

        const offset = tf.scalar(255)
        let tensorImage = tf.node.decodeImage(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat().div(offset)

        let model = await tf.loadLayersModel(`file://./helpers/tensorflowjs-model/model.json`)
    
        let prediction = await model.predict(tensorImage).data()

        let predicted_class = tf.argMax(prediction)
        class_index = Array.from(predicted_class.dataSync())[0]
        fs.unlinkSync(imagepath)
        return { disease: classRes[class_index], confidence: parseFloat(prediction[class_index]*100).toFixed(2) }
    } catch (error) {
        throw error
    }
}

module.exports = {
    predict,
    uploadSingle
}