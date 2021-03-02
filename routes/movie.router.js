const router = require('express').Router();
const MovieController = require("../controllers/movie.controller");

router.get("/movie", MovieController.getMovies)
router.get("/movie/:id", MovieController.getMovieById)
router.post("/movie", MovieController.createMovie)
router.put("/movie/:id", MovieController.updateMovie)
router.delete("/movie/:id", MovieController.deleteMovie)

module.exports = router;