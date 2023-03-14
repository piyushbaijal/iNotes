const mongoose = require('mongoose');

const MongooseURI = "mongodb://localhost:27017/iNotes?"

// connect to mongoDB server using MongooseURI 
const connectToMongo = () => {
    mongoose.connect(MongooseURI, () => {
    })
}


module.exports = connectToMongo;



// mongodb://localhost:27017/