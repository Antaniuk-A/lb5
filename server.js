const express = require('express');

const app = express();

const movies = require("./movies.json");

app.use(express.static('public'));

app.get('/movies', function (req, res) {
    res.json(movies);
});

app.listen(3000, function () {
    console.log('app listening on port 3000!');
});