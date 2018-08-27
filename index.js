// Importing Node modules and initializing Express
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      mongoose = require('mongoose'),
      router = require('./router'),
      cors = require('cors'),
      socketEvents = require('./socketEvents').realtime,
      config = require('./config/main');

      
// Setting up the database Connection
mongoose.connect(config.database, { useNewUrlParser: true });  
app.use(cors());
app.options('*', cors());

// Setting up basic middlewares for all Express requests

//Log requests to API using morgan
app.use(logger('dev'));
app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
// Adding bodyParser to parse urlEncoded bodies to Json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Start the server
var  server = app.listen(config.port);
// Setting up the socket server
var  io = require('socket.io').listen(server);
// Socket events
socketEvents(io);  
// rest routing
router(app);  

console.log('server running on port ' + config.port);


