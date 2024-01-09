const express = require('express');
const PORT = 443;
var https = require('https');
const path = require('path');
var fs = require('fs');


var options = {
    key: fs.readFileSync('/home/ec2-user/templeServer/certs/cert.key'),
    cert: fs.readFileSync('/home/ec2-user/templeServer/certs/cert.crt')
  };




const app = express();
app.use(express.static(__dirname + '/dist/TempleWebsite'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
https.createServer(options, app).listen(PORT,()=>console.log(`Server is now listening on port ${PORT}`));
