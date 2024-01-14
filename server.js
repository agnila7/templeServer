const express = require('express');
const fs = require("fs");
const PORT = 3000;
const app = express();
const bodyParser = require("body-parser");
const appRoutes = require('./routes');
var https = require('https');
var cors = require("cors");
var constants = require("./helpers/constants");
const mongooseConnection = require('./helpers/mongoose-connection');

// var options = {
//     key: fs.readFileSync('/home/ec2-user/templeServer/certs/cert.key'),
//     cert: fs.readFileSync('/home/ec2-user/templeServer/certs/cert.crt')
//   };

var options = {
  key: fs.readFileSync('certs/cert.key'),
  cert: fs.readFileSync('certs/cert.crt')
};

function logger(req, res, next){
    console.log(`[${Date.now()}] ${req.method} ${req.url}`);
    next();
}
app.use(bodyParser.urlencoded());
app.use(express.static(constants.SERVED_DIRECTORY));
app.use(bodyParser.json());
app.use(cors());
app.use(logger);
app.use('/api',appRoutes);


mongooseConnection();
https.createServer(options, app).listen(PORT,()=>console.log(`Server is now listening on port ${PORT}`));