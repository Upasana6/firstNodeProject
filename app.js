const express = require('express');
const mongoose = require('mongoose');
const app = express()
var bodyParser = require('body-parser')

const Movie = require('./database.js')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// GET 
app.get('/', (req, res)=>{
    console.log(req.url);
    res.send('Home Page');
});

app.get('/movieList', (req, res)=>{
    console.log('movie list')

    Movie.find({}, (err, movie)=>{
        var movieList = {};
        movie.forEach((m)=>{
            movieList[m._id] = m;
        })
        console.log(`Sending ${movie}`);
        res.send(movieList);
    })
})


app.get('/movieList/:id', (req, res)=>{
    console.log(`id is ${req.params.id}`)

    Movie.findById(req.params.id)
    .exec()
    .then((data)=>{
        console.log(data)
        res.status(200).json(data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

// POST
app.post('/addMovie', (req, res)=>{
    console.log(`Posting Movie ${req.body}`);

    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        movieName: req.body.movieName,
        description: req.body.description,
        rating: req.body.rating,
        url: req.body.url
    });
    movie.save().then(result=>{
        console.log(result);
    }).catch(err=> console.log(`error : ${err}`));
    res.status(201).json({
        message: "Posting request",
        createdMovie: movie
    })
})


// DELETE
app.delete('/deleteMovie', (req,res)=>{
    console.log(`Deleting data with id: ${req.body.id}`)

    Movie.findByIdAndDelete(req.body._id)
    .exec()
    .then((data)=>res.send(data))
    .catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
})


//PUT
app.put('/modifyMovie', (req, res)=>{
    console.log(`Modifing data: ${req.body._id}`)

    Movie.findOneAndUpdate({_id: req.body._id}, {description: req.body.description}, {returnOriginal: false})
    .exec()
    .then((data)=>{
        console.log(`Modifed data: ${data}`)
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
})

mongoose
  .connect("mongodb://localhost:27017/moviesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
    app.listen(8080, () => {
      console.log(`server is listening on port 8080`);
    });
  })
  .catch((err) => {
    console.log("ERROR IN DATABASE CONNECTION");
    console.log(err);
  });