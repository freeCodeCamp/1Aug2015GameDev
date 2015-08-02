var express = require("express");
var app = express();
var fs = require('fs');

// serve static files from the public directory
app.use(express.static(__dirname + '/'));

// bind the server to the port that c9 gives us
app.listen(process.env.PORT);