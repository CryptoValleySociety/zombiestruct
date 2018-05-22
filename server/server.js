const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build_webpack')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build_webpack', 'index.html'));
});

app.listen(3000, (err) => {
    if(err) {
        console.log('Error is starting server check port 3000')
    }
    console.log('Started server on port 3000')
});
