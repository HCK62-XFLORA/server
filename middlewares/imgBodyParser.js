require(`dotenv`).config()

const S3 = require(`aws-sdk/clients/s3`)
const multer = require(`multer`)
const multers3 = require(`multer-s3`)

const path = require(`path`)

const bucket = `xflorabucket/threadImages`
const s3 = new S3({
    region: process.env.REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
})

const upload = multer({ 
    storage: multers3({
        s3,
        bucket,
        metadata: (req, file, callback) => {
            callback(null, { fieldName: file.fieldname })
        },
        key: (req, file, callback) => {
            callback(null, Date.now().toString() + path.extname(file.originalname) )
        },
        contentType: multers3.AUTO_CONTENT_TYPE
    }), 
    fileFilter: (req, file, callback) => {
        const fileExts = [`.png`, `.jpg`, `.jpeg`];

        const isAllowedExt = fileExts.includes(
            path.extname(file.originalname.toLowerCase())
        );

        const isAllowedMimeType = file.mimetype.startsWith("image/");
        if(isAllowedExt && isAllowedMimeType) return callback(null, true)
        return callback({ name: `InvalidFileExt`, message: `This file type is not allowed!` })
    },
    limits: 2 * 1024 * 1024 
})

module.exports = {
    upload
}