const  mongoose  = require('mongoose');
const Author = require('../models/author');
const assert = require('assert');

describe('nesting records', ()=>{

    beforeEach('drop author collection',(done)=>{
        mongoose.connection.collections.authors.drop(()=>{
            done();
        });
    });

    var testauthor
    it('saving nested record to db',(done)=>{
        testauthor = new Author({
            name: 'Humayun Ahmed',
            age: 36,
            books: [
                {
                    title: 'Ami Himu',
                    page: 190
                }
            ]
        });

        testauthor.save().then(()=>{
            Author.findOne({name: 'Humayun Ahmed'}).then(result=>{
                assert(result.books[0].title==='Ami Himu');
                done();
            })
        });
    });

    it('Adds a book to an author',(done)=>{
        testauthor = new Author({
            name: 'Humayun Ahmed',
            age: 36,
            books: [
                {
                    title: 'Ami Himu',
                    page: 190
                }
            ]
        });

        testauthor.save().then(()=>{
            Author.findOne({_id: testauthor._id}).then(record=>{
                record.books.push({title:'Jyotsna', page: 36});
                record.save().then(()=>{
                    Author.findOne({_id: testauthor._id}).then(record=>{
                        assert(record.books.length===2);
                        done();
                    })
                })
            })
        });
    })
})