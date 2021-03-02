process.env.NODE_ENV = 'test';

let Movie = require("../models/movie.model")
let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe('Movies', () => {
    beforeEach((done) => {
        Movie.deleteMany({}, (err) => {
            done();
        })
    })


    describe('/POST book', () => {
        it('it should POST a Movie ', (done) => {
            let movie = {
                name: "Step Up",
                rating: 8.2,
                time: ["14.30", "16.30", "22.30"]
            }
            chai.request(server)
                .post('/api/movie')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true)
                    res.body.should.have.property('message').eql('Movie Created');
                    // res.body.errors.should.have.property('time');
                    // res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('it should not POST a book without name field', (done) => {
            let movie = {
                rating: 8.2,
                time: ["14.30", "16.30", "22.30"]
            }
            chai.request(server)
                .post('/api/movie')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(400)
                    // res.should.have.property("success").eql(false)
                    // res.should.have.property("err");
                    done();

                })
        })



    })

    describe('/GET movie', () => {
        it('should GET all the Movies', (done) => {
            chai.request(server)
                .get("/api/movie")
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.length.should.be.eql(0);

                    done();
                })
        })
    })


    describe('/GET/:id Movie', () => {
        it('should GET a movie by the given id', (done) => {
            let movie = new Movie({
                name: "BLADE",
                rating: 6.5,
                time: [10.30, 12.30]
            })
            movie.save((err, mov) => {
                chai.request(server)
                    .get(`/api/movie/${mov.id}`)
                    .send(movie)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('data')
                            .which.is.an('object')
                            .and.has.property('_id')
                        done();

                    })
            })
        })
    })

    describe('/PUT/:id movie', () => {
        it('should update a movie with given id', (done) => {
            let movie = new Movie({
                name: "Terminator",
                rating: 8.5,
                time: [5.30]
            })
            movie.save((err, mov) => {
                chai.request(server)
                    .put(`/api/movie/${mov.id}`)
                    .send({
                        name: "Terminator",
                        rating: 8.6,
                        time: [5.30]
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object')
                        res.body.should.have.property('message').eql("Movie Updated")
                        done();
                    })
            })
        })
    })

    describe('/DELETE/:id movie', () => {
        it('should Delete a movie by a given id', (done) => {
            let movie = new Movie({
                name: "Star-Wars- Episode IV",
                rating: 9.5,
                time: [5.30, 16.30]
            })
            movie.save((err, mov) => {
                chai.request(server)
                    .delete(`/api/movie/${mov.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('success').eql(true)
                        res.body.data.should.have.property('rating').eql(9.5)
                        done()
                    })
            })
        })
    })

})
