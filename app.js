const express = require('express')
const app = express()

console.log('Hello World')

app.get('/', (req, res)=>{
    console.log(req.url);
    res.send('Home Page');
});

app.get('/movieList', (req, res)=>{
    console.log('movie list')
    res.status(200).send('Movies')
})

app.post('/addMovie', (req, res)=>{

})

app.get('/movieList/:id', (req, res)=>{
    console.log(`id is ${req.params.id}`)
    res.status(200).send(`Movie no ${req.params.id}`)
})

app.listen(8000)
