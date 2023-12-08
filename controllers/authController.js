const User = require("../models/user");
const moment = require("moment");
const NodeRSA = require('node-rsa');
const key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
'MIIEogIBAAKCAQEAjv3fKIQFHpS4VtofUzCnkT6i4/RcvKpH7JUGcArC+AXp2QLv\n'+
'9d/q/0wfaV7Y1rigQu+2segowTRbGv/7plNBrz5aAbCTkichHUNmukQaiNXDKPRa\n'+
'LtIXS2Y5Rx4fodXfX3ga4pJjy7SBLml/A97/3jBcJoBLMRM/Zfx5gfekmtKuKL3L\n'+
'J3TAuGry85PXjfKP3+nAKoFY7uX5cXwmyzUHSo+JC8SBf5zCGkkbSRkB/Eg88h/X\n'+
'C38eXsmgkZlseOlsZap5+mvVwJ2gCj23A38p+x2OeNrHGr3GrrPeZMedOgZLNFNK\n'+
'jafnHopPN2Ct8rZMtp0bt7WN+zK5npJ96H4QUQIDAQABAoIBAAW/yVgsrrQDEMJV\n'+
'NMs4epRJa2005wGi6w9lEoQwupQUUMmr55AAN8eZ/O1Upe1EMRVf4/2VMwZJn5wf\n'+
'TLPsRwjPvfixa82FizxM+HVmxZZY2ebspC+bvNoIOydT27u7CKcjAhm3/xEyqbr+\n'+
'/N9f+POrCBl4MQ3BE1x7YTtLhK/A1zSfzG6RzAKfQmQn57eo8WN2sSWhqY+OD3O8\n'+
'3KH2OO+MWH+EgWM/N3A5Ktob6v3hmTzgZ0TZkj+AnkRriuohajtBPfKa7xctxIfz\n'+
'PRfJGxzga3CTJjwuaUhbjlITfG+dXRWzT5i+sZGKEjYQ+dHqswUYEDWqZMZ2IkkT\n'+
'TunDx8ECgYEA3xOI+0dnkf+D4dzUk7ib7hXsygUVBVEfV7A4H9JQqi8f+CQkMu6E\n'+
'cXx6sncs3wKdPS8wYBu//XK+7jvdpf1TISM7NKqf1oD5CcrTBgziYr1Vl5UU0Onx\n'+
'nSEsGUnCxAn5Rae2v25klUu+WGr4Zq+DtQa0gHCFIFIhv9MuWzGIalkCgYEApBiC\n'+
'VdB8E2Gh5FuZrcXsiRKN2wJFpAnY/kPPT0WPdhkTp3UtxZqnjM8Z/Nr65OnfKLbT\n'+
'eF6EcDE6a+UNvZONUhekGkmXLM2AR5SklzcaaGvHvUczkcx420T441sovtlow5Nf\n'+
'skUHDcsPN/mprIHPsjrtb0s2BTv4tkCZFeIgJrkCgYAb0Ai1I5rzJgNgZrMOU+cF\n'+
'ETC7o1SSnCGnQi5NMWCjR0raGk91Fi3nJFj75UXv7BiEp1yFrxAJ3oOVmlsxNdtm\n'+
'd0kLcPaKvPvPz7zttS+IlgiU5J56yaA5MgiYgozI+mFc4OM1DON3hcEOrw+XZeyq\n'+
'5lIc7Wp7tCHHE+JktlFGyQKBgC3yyvQah9Opf/qAh7y38i7DqkMMFNIFC+TOugr5\n'+
'cF1iUjWOwz1Uu9va1e0OqDhXIGy3HOnUlYMQ1coGfl16JpU5F3Ng7drWxDfG8HuD\n'+
'K3rXyzs957vIpILJgmOvT+541DQHXUF+wKXlGSLUXuV2B+FhTMDgL4UxsMffuL3+\n'+
'7n/JAoGARg4LqVkpW83UJy1VeUn4MuAUqZ4vmzFUfGhKf8xGHyBigc4W+C6UFU71\n'+
'EodQRu+NFVqkXAAF3IsT74ZpaBzGwEf4qYTxCDQUsjcB1aH/hFduGDSLD9E9HhyU\n'+
'iR1GgL0IoF2rMII9C0T6DsBcs3v7dRoiOtB7qPRWCHzA1kzAiX8=\n'+
                      '-----END RSA PRIVATE KEY-----');
key.setOptions({
    encryptionScheme: "pkcs1"
});
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