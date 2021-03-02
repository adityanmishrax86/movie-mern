const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const morgan = require('morgan')
const config = require("config")
const cors = require('cors')
const PORT = 4001

const db = require("./db");
const movieRouter = require("./routes/movie.router");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB Connection Error: '))

if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'))
}

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api", movieRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app; //for Testing