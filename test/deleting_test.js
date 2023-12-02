const User = require('../models/user');
const assert = require('assert');

// describe block
describe('Deleting test', ()=>{
    var testuser;
    beforeEach((done)=>{
        testuser = new User({name: 'Chapal', age: 35, email: 'chapalbuet@yahoo.com'});
        testuser.save().then(()=>{
            done();
        });
    });
    it('Deleting one record from db', (done)=>{
        User.findOneAndDelete({name: 'Chapal'}).then(()=>{
            User.findOne({name: 'Chapal'}).then(result=>{
                assert(result===null);
                done();
            })
        })
    })
})