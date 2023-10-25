function errorHandler(error, req, res, next){
    let status = error.status || 500
    let message = error.message || "Internal Server Error"
    

    switch (error.name){
        case "EmptyEmail" : 
            status = 400
            message = "Email cannot be empty"
        break;
        case "EmptyPassword" : 
            status = 400
            message = "Password cannot be empty"
        break;
        case "SequelizeUniqueConstraintError" :
            status = 400
            message = error.errors[0].message
        break;
        case "SequelizeValidationError" :
            status = 400
            message = error.errors[0].message
        break;
        case "JsonWebTokenError" :
            status = 401
            message = "Invalid token"
        break;
        case "Forbidden" : 
            status = 403
            message = "Forbidden"
        break;
        case "NotFound" :
            status = 404
            message = "Not Found"
        break;
        case "SequelizeDatabaseError" :
            status = 400
            message = error.errors[0].message
        case "InvalidFileExt" :
            status = 400
            message = error.message
        break
        case "EmptyImage" :
            status = 400
            message = "Image cannot be empty"
        break
        case "EmptyField" :
            status = 400
            message = "Field cannot be empty"
        break
        case "Insufficient" :
            status = 400
            message = "Insufficent point"
        break
    }

    res.status(status).json({message})
}

module.exports = errorHandler