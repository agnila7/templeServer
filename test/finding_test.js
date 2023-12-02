const User = require('../models/user');
const assert = require('assert');


// describe test

describe('Finding records',()=>{
    var testuser;
    beforeEach((done)=>{
        testuser = new User({name: 'Agnila', age: 30, email: 'baruaagnila7@gmail.com'});
        testuser.save().then(()=>{done();});
    })
    
    it('Find one user from db',(done)=>{
        User.findOne({name: 'Agnila'}).then(result=>{
            assert(result.name === 'Agnila');
            done();
        })

    })

    it('Find one user by id from db',(done)=>{
        User.findOne({_id: testuser._id}).then(result=>{
            assert(result._id.toString() === testuser._id.toString());
            done();
        })

    })


})