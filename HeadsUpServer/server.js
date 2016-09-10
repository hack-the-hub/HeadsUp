
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

var routes = require('./routes');
var journeys = require('./journeys');
var stops = require('./stops');
journeys.init();
routes.init();
stops.init();

app.use(express.static(path.join(__dirname, '../')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var router = express.Router();

router.use(function(req, res, next) {
    // Authenticate a user here?
    next();
});

router.route('/routes')
  .get(function(req, res) {
    res.json(routes.collection);
});

router.route('/stops')
  .get(function(req, res) {
    res.json(stops.collection);
});

router.route('/stops/:stopName')
  .get(function(req, res) {
    var stop = stops.collection.filter(function(obj) {
      return obj.stopName == req.params.stopName;
    });
    res.json(stop);
});

router.route('/journeys')
  .get(function(req, res) {
    res.json(journeys.collection);
})
  .post(function(req, res) {
    var journey = {
      id: journeys.collection.length,
      routeId: req.body.routeId,
      long: req.body.long,
      latt: req.body.latt
    };
    journeys.collection.push(journey);
    res.json(journey);
})
.put(function(req, res) {
  var id = req.body.id;
  console.log(id);
  journeys.collection[id].long = req.body.long;
  journeys.collection[id].latt = req.body.latt;
  res.json("okay");
});

router.route('/journeys/getByRoute/:routeId')
  .get(function(req, res) {
    var list = journeys.collection.filter(function(obj) {
      return obj.routeId == req.params.routeId;
    });
    res.json(list);
});

app.use('/api', router);

app.listen(1337);
console.log("Translink bus tracking working on port 1337");
