const Movie = require("../models/movie.model")

const createMovie = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            succss: false,
            error: 'Must Provide a Movie'
        })
    }

    const movie = new Movie(body)

    if (!movie) return res.status(400).json({ success: "success", err: "error" })

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: "Movie Created"
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                err,
                message: 'Movie Not Created'
            })
        })
}

const updateMovie = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            succss: false,
            error: 'Must Provide a Movie'
        })
    }

    Movie.findOne({
        _id: req.params.id
    }, (err, data) => {
        if (err)
            return res.status(404).json({
                success: false,
                err,
                message: 'Movie Not Found'
            })

        if (!data) {
            return res.status(400).json({
                success: false,
                message: "No Movie found"
            })
        }

        data.name = body.name;
        data.time = body.time;
        data.rating = body.rating;

        data
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: data._id,
                    message: "Movie Updated"
                })
            })
            .catch(err => {
                return res.status(404).json({
                    success: false,
                    err,
                    message: 'Movie Not Updated'
                })
            })


    })
}

const deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({
        _id: req.params.id
    }, (err, movie) => {
        if (err) return res.status(400).json({
            success: false, err
        })

        if (!movie) {
            return res.status(400).json({
                success: false,
                message: "No Movie found"
            })
        }

        return res.status(200).json({
            success: true,
            data: movie
        })
    }).catch(error => console.log(error))
}


const getMovieById = async (req, res) => {
    await Movie.findOne({
        _id: req.params.id
    }, (err, movie) => {
        if (err) return res.status(400).json({
            success: false, err
        })

        if (!movie) {
            return res.status(400).json({
                success: false,
                message: "No Movie found"
            })
        }

        return res.status(200).json({
            success: true,
            data: movie
        })
    }).catch(error => console.log(error))
}

const getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if (err) return res.status(400).json({
            success: false, err
        })

        // if (!movies.length) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "No Movie found"
        //     })
        // }

        return res.status(200).json({
            success: true,
            data: movies
        })
    }).catch(error => console.log(error))
}

module.exports = {
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    createMovie
}