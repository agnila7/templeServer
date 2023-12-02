const express = require('express');
const PORT = 3000;
const app = express();
const bodyParser = require("body-parser");
const appRoutes = require('./routes');
var cors = require("cors");
const mongooseConnection = require('./helpers/mongoose-connection');

function logger(req, res, next){
    console.log(`[${Date.now()}] ${req.method} ${req.url}`);
    next();
}
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use('/api',appRoutes);
app.use(logger);
// app.use((_,res)=>{
//     res.send({message: 'Not found!'})
// });

// app.get('/test',(req,res)=>{
//     res.json({ok: true});
// });

// app.post('/user',(req,res)=>{
//     res.json({ok: true});
// });

mongooseConnection();
app.listen(PORT,()=>console.log(`Server is now listening on port ${PORT}`));