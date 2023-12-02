const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/user');

describe('Saving records',()=>{
    it('Saving a record to mongodb',(done)=>{
        var testuser = new User({name: 'Chapal', age: 35});
        var testuser2 = new User({name: 'Agnila', age: 30, email: 'baruaagnila7@getMaxListeners.com'});
        testuser2.save().then(result=>{
            assert(testuser2.isNew === false);
            done();
        })
    })
})
