const User = require("../models/user");
const fs = require("fs");
var path = require('path');
const moment = require("moment");
const NodeRSA = require('node-rsa');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var keyPath = path.join(__dirname, '../helpers/private_key.txt');
const keyData = fs.readFileSync(keyPath).toString();
var key = new NodeRSA(keyData, {encryptionScheme: 'pkcs1'});

const login = (req, res) =>{
    User.findOne({ email: req.body.email}).then(record=>{
        if(record===null){
            res.status(401).send({msg: 'Incorrect Email Address'});
        }else if(record.email===req.body.email){
            const decryptedData = key.decrypt(Buffer.from(req.body.password, "base64"), 'utf8');

            bcrypt.compare(decryptedData, record.password, function(err, result) {
                if (result) {
                    let loggedInUser = {name: record.name, email: record.email, role: record.role};
                    let token = jwt.sign(loggedInUser, keyData, {algorithm: "RS256"});
                    res.status(200).send({token});
                }else{
                    res.status(401).send({msg: 'Incorrect Password'});
                }
            });
        }
    });
    }
const register = async (req, res)=>{
    try {
        User.findOne({email: req.body.email}).then(record=>{
            if(record!=null && record.email === req.body.email){
                res.status(409).send({msg: 'Email Address already in use'});
            }else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {

                    // store hash in the database
                    const user = new User({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        role: req.body.role,
                        creation_date: moment().format("MMMM Do YYYY, h:mm:ss a")
                    });
                    user.save().then(record=>{
                        let loggedInUser = {name: record.name, email: record.email, role: record.role};
                        let token = jwt.sign(loggedInUser, keyData, {algorithm: "RS256"});
                        res.status(200).json({ token });
                    });
                });
            }
        })
    } catch (err) {
        res.status(400).send({ status: 'err', msg: err });
    }
}

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send({msg: 'Unauthorized Req'});
    }
    let token = req.headers.authorization.split(' ')[1];
    let payload = jwt.verify(token, keyData);
    if(!payload){
        return res.status(401).send({msg: 'Unauthorized Req'});
    }
    console.log(payload);
    req.userName = payload.name;
    next();
}

function verifyAdmin(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send({msg: 'Unauthorized Req'});
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token){
        try{
            payload = jwt.verify(token, keyData);
        }catch (error){
            return res.status(401).send({msg: 'Unauthorized Req'+ error});
        }
    }else {
        return res.status(401).send({msg: 'Unauthorized Req'});
    }
    
    
    if(!payload || (payload.role!= 'Admin' && payload.role!= 'Super Admin')){
        return res.status(401).send({msg: 'Unauthorized Req'});
    }
    
    req.userName = payload.name;
    next();
}

module.exports = {login,register, verifyToken, verifyAdmin};