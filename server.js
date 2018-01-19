// Ensure db files are stored in .data so they dont become 
// part of the glitch project files
var PouchDB = require('pouchdb').defaults({prefix: '.data/'});

var express = require('express');
var app = express();

// Serve public assets
app.use(express.static('public'));

// Mount a server instance of pouchdb @ /db
app.use('/db', require('pouchdb-express-router')(PouchDB));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
