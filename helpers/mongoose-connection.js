var mongoose = require("mongoose");
const mongoUrl = `mongodb://localhost:27017/temple`;
function mongooseConnection(){
    try{
        mongoose.connect(mongoUrl);
    } catch(error){
        console.log("could not connect: ",error);
    }

    const dbConnection = mongoose.connection;
    dbConnection.on('error',error=>{console.log('Connection error', error)});
    dbConnection.once('open',()=>{console.log("Connected to db!")});
}

module.exports = mongooseConnection;