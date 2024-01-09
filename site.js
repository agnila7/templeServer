const express = require('express');
const PORT = 443;
var https = require('https');
var http = require('http');
const path = require('path');
var fs = require('fs');


var options = {
    key: fs.readFileSync('/home/ec2-user/templeServer/certs/cert.key'),
    cert: fs.readFileSync('/home/ec2-user/templeServer/certs/cert.crt')
};


const app = express();

// redirect http to https
redirectServer = http.createServer(app);
app.use(function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
redirectServer.listen(80);


app.use(express.static(__dirname + '/dist/TempleWebsite'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/TempleWebsite/index.html')));
https.createServer(options, app).listen(PORT,()=>console.log(`Server is now listening on port ${PORT}`));
