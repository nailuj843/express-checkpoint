const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let movies = [
                {
                "id": 1,
                "title": "Midnight In Paris",
                "runtime": 96,
                "release_year": 2011,
                "director": "Woody Allen",
                },
                {
                "id": 2,
                "title": "Titanic",
                "runtime": 210,
                "release_year": 1997,
                "director": "James Cameron",
                },
                {
                "id": 3,
                "title": "From Paris With Love",
                "runtime": 94,
                "release_year": 2010,
                "director": "Pierre Morel",
                }
            ]

app.get('/movies', (req, res) => {
    // this should show anything url?name=value => {name: value}
    // http://localhost:3001/movies?title=titanic
    if(Object.keys(req.query).length > 0) {
        if(!req.query.title){
            res.status(400).send("Invalid titleQuery supplied")
        }
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(req.query.title.toLowerCase()))
        if(filteredMovies.length === 0){
            res.status(404).send("Your Query string returned no results")
        }
        res.status(200).send(filteredMovies)
    } else {
        res.send(movies)
    }
})

app.get('/movies/:id', (req, res) => {
    const movieId = req.params.id

    if(isNaN( parseInt(movieId) )){
        res.status(400).send("Invalid ID supplied")
    }

    let filteredMovies = movies.filter(movie => movie.id == movieId)

    if(filteredMovies.length === 0){
        res.status(404).send("Book ID not found")
    }

    res.send(filteredMovies)
})

app.post('/movies', (req, res) => {
    let newMovie = req.body
    movies.push(newMovie)

    res.send("you tried to post a movie\n" + JSON.stringify( movies))
})

app.delete('/movies/:id', (req, res) => {
    let movieId = req.params.id

    if(isNaN( parseInt(movieId) )){
        res.status(400).send("Invalid ID supplied")
    }

    movies = movies.filter(movie => movie.id != movieId)

    console.log(movies)
    res.status(200).send('you deleted a movie')
})

const port = 3001
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))