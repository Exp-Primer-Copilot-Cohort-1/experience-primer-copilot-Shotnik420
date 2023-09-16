// Create web server application

var express = require('express'); // Load express module
var bodyParser = require('body-parser'); // Load body parser module
var app = express(); // Create express app
var http = require('http').Server(app); // Create http server
var io = require('socket.io')(http); // Create socket.io server
var mongoose = require('mongoose'); // Load mongoose module
var port = process.env.PORT || 3000; // Set port number

app.use(express.static(__dirname)); // Set static directory
app.use(bodyParser.json()); // Set body parser to json
app.use(bodyParser.urlencoded({extended: false})); // Set body parser to urlencoded

// Set mongoose connection
var dbUrl = 'mongodb://localhost:27017/comments';
var Message = mongoose.model('Message', {
  name: String,
  message: String
});

// Get request
app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

// Post request
app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) {
      sendStatus(500);
    }
    io.emit('message', req.body);
    res.sendStatus(200);
  });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected');
});

// Connect to mongoose
mongoose.connect(dbUrl, {useMongoClient: true}, (err) => {
  console.log('MongoDB connection', err);
});

// Set server to listen
var server = http.listen(port, () => {
  console.log('Server listening on port', server.address().port);
});
