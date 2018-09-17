const {
    app,
    runServer,
    closeServer
} = require('../server');

var chai = require('chai');

var chaiHttp = require('chai-http');

var Transaction = require('../models/transaction.js');
var Category = require('../models/category.js');
var Subcategory = require('../models/subcategory.js');

var should = chai.should();

chai.use(chaiHttp);

describe('budgeting-app-node-capstone', function () {
    it('should add an entry on POST', function () {
        chai.request(app)
            .post('/category/create')
            .send({
            categoryName: "testCategoryName",
            username: "testusername",
        })
            .then(function (err, res) {
            //should.equal(err, null);
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
        })
            .catch(err => console.log({
            err
        }));
    });
    it('Should Delete an entry', function () {

        chai.request(app)
            .delete('/delete-from-transaction-list/:id')
            .then(function (res) {
            res.should.have.status(201);
            done();
        })
            .catch(err => console.log({
            err
        }));

    });
    it('Should Get All Users entries', function () {

        chai.request(app)
            .get('/category/:user') //<-------????? Get request to '/entry-date/:user'
            .then(function (res) {
            res.should.have.status(201);
            done();
        })
            .catch(err => console.log({
            err
        }));
    });

});
