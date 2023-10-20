

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
            message = error.error[0].message
        break;
        case "SequelizeValidationError" :
            status = 400
            message = error.error[0].message
        break;
        case "Unauthorized" :
            status = 401
            message = "User not found"
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
        break
    }

    res.status(status).json({message})
}

module.exports = errorHandler