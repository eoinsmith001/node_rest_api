// packages
var express    = require('express');
var app        = express();
var bodyParser =  require('body-parser');

// configure app to use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8090;

// api routes
var router = express.Router();
// test route
router.get('/', function(req,res) {
  res.json( {message:"wecome to the api"} );
});

// register routes
app.use('/api', router);
app.listen(port);
console.log( "Application running on port " + port );
