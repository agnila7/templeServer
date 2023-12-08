const User = require("../models/user");
const fs = require("fs");
var path = require('path');
const moment = require("moment");
const NodeRSA = require('node-rsa');

var keyPath = path.join(__dirname, '../helpers/private_key.txt');
const keyData = fs.readFileSync(keyPath).toString();
var key = new NodeRSA(keyData, {encryptionScheme: 'pkcs1'});

const login = (req, res) =>{
    User.findOne({ email: req.body.email}).then(record=>{
        if(record===null){
            res.send('email does not exist');
        }else if(record.email===req.body.email){
            const decryptedData = key.decrypt(Buffer.from(req.body.password, "base64"), 'utf8');
            console.log('decrypted data is ', decryptedData);

            if(record.password===decryptedData){
                res.send('login successful');
            }else{
                res.send('password incorrect');
            }
        }
    });
    }
const register = async (req, res)=>{
    try {
        User.findOne({email: req.body.email}).then(record=>{
            if(record!=null && record.email === req.body.email){
                res.send('User Already Exists!');
            }else {
                const user = new User({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.username,
                    role: req.body.role,
                    creation_date: moment().format("MMMM Do YYYY, h:mm:ss a")
                })
                
                user.save()
                res.status(200).json({ message: 'added!' })
            }
        })
    } catch (err) {
        console.log(err);
        res.send({ status: 'err', message: err });
    }
}
module.exports = {login,register}