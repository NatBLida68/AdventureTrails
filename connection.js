const mongoose = require('mongoose');
let connectingOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}
let connection = {}
connection.createConnection = () => {
    return mongoose.connect('mongodb://localhost:27017/myImagesDb',connectingOptions )
}

const imgSchema = mongoose.Schema({
    name:String,
    img:{
        data:Buffer,
        contentType:String
    }
})


let throwError = (message, statusCode) => {
    let err = new Error(message);
    err.status = statusCode
    throw err;
}
connection.getImagesCollection = () => {
    return connection.createConnection().then((database) => {
        return database.model('Images', imgSchema)
    }).catch((error) => {
        throwError('Database Connection Failed', 500)
    })
}


module.exports = connection;