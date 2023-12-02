const express = require('express');
const PORT = 3000;
const app = express();

function logger(req, res, next){
    console.log(`[${Date.now()}] ${req.method} ${req.url}`);
    next();
}
app.use(logger);


app.get('/test',(req,res)=>{
    res.json({ok: true});
});

app.post('/user',(req,res)=>{
    res.json({ok: true});
});


app.listen(PORT,()=>console.log(`Server is now listening on port ${PORT}`));