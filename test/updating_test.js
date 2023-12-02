const User = require('../models/user');
const assert = require('assert');

describe('updating test',()=>{
    var testuser;
    beforeEach((done)=>{
        testuser = new User({name: 'Rahamatullah', age: 99, email: 'arbazrahmatullah@gmail.com'});
        testuser.save().then(()=>{
            done();
        });
    });


    it('updating one record',(done)=>{
        
        User.findOneAndUpdate({_id: testuser._id}, {name: 'Rahamat tui mori ja'}).then(()=>{
            
            User.findOne({_id: testuser._id}).then(result=>{
                assert(result.name === 'Rahamat tui mori ja');
                done();
            })
        });
    });

    it('increment the age by one',(done)=>{
        User.updateMany({}, {$inc: {age: 1}}).then(()=>{
            User.findOne({name: 'Rahamatullah'}).then(result=>{
                assert(result.age===100);
                done();
            })
        });
    })
})