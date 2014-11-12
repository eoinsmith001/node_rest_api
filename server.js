// packages
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear       = require('./app/models/bear');

// configure app to use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8090;
mongoose.connect('mongodb://localhost:27017');

// api routes
var router = express.Router();

// use this middleware for all requests!
router.use( function(req,res,next) {
  console.log( "something is happening" );
  next();
});

// test route
router.get('/', function(req,res) {
  res.json( {message:"wecome to the api"} );
});

// routes ending in /bears
router.route( '/bears' )
  // Create / POST
  .post(function(req,res) {
    var bear = new Bear();
    bear.name = req.body.name;
    // save and err check
    bear.save( function(err) {
      if (err)
        res.send(err);
      res.json({message: "Bear Created!"});
    });
  })
  // GET
  .get(function(req,res) {
    Bear.find(function(err,bears){
      if (err)
        res.send(err);
      res.json(bears);
    });
  });

// routes ending in /bears/:bear_id
router.route( '/bears/:bear_id' )
  .get(function(req,res) {
    // get a single bear by id
    Bear.findById(req.params.bear_id, function(err,bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  })
  .put(function(req,res) {
    // update a bear by id
    Bear.findById(req.params.bear_id, function(err,bear) {
      if (err)
        res.send(err);
      console.log(bear);
      bear.name = req.body.name;  // update
      bear.save(function(err) {
	if (err)
	  res.send(err);
	res.json({message: "Bear updated, " + bear.name});
      });
    });
  })
  .delete(function(req,res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err,bear) {
      if(err)
	res.send(err);
      res.json({message: "Successful Delete"});
    });
  });

// register routes
app.use('/api', router);
app.listen(port);
console.log( "Application running on port " + port );
// ----
