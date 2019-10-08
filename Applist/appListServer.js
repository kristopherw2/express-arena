const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan("common"));
app.use(cors());

const playstore = require('./playstore')

app.get('/apps', (req, res) => {
    const { sort, genre = "" } = req.query

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be rating or app');
        }    
    }

    if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card', ""].includes(genre)){
        return res
            .status(400)
            .send('Genre must be one of the following action, puzzle, strategy, casual, arcade, card')
    }


    const results = playstore
    .filter(app => 
        app
        .Genres
        .toLowerCase()
        .includes(genre.toLowerCase()))


    console.log(results)    
    if (sort) {
        results.sort((a, b) => {
            return a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0
        })
    }
    console.log(results)

    res
    .json(results)
})

app.listen(8000, () => {
    console.log('App server is running')
})