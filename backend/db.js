const mongoose = require('mongoose');

// const MongooseURI = "mongodb://localhost:27017/iNotes?"
// const MongooseURI = process.env.MONGODB_URL


// connect to mongoDB server using MongooseURI 
// const connectToMongo = async () => {
//     await mongoose.connect(process.env.MONGODB_URL)
// }
const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false);

        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true
        })
        console.log(`mongoDb Connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;



// mongodb://localhost:27017/