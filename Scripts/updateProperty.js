const mongooseConnection = require('../helpers/mongoose-connection');
mongooseConnection();
const User = require("../models/user");

User.findOneAndUpdate({email: 'chapalbuet@gmail.com'}, {role: 'Super Admin'}).then(()=>{
            
    User.findOne({email: 'chapalbuet@gmail.com'}).then(result=>{
        if(result.role === 'Super Admin'){
            console.log('Property succesfully updated');
        }
    })
});