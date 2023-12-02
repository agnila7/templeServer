const mongoose= require('mongoose');

// connect to db before test run

before((done)=>{
    //connect to mongodb

    mongoose.connect('mongodb://localhost/testMongoos');

    mongoose.connection.once('open',()=>{
        console.log('connection has been made to db.....');
        done();
    }).on('error',(error)=>{
        console.log('Connection error:', error)
    });


});

// drop the user collection before each test

beforeEach((done)=>{
    // drop the collection
    mongoose.connection.collections.users.drop().then(()=>{
        done();
    })
})

