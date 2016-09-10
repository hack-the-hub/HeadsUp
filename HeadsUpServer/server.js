
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

var routes = require('./routes');
routes.init();
app.use(express.static(path.join(__dirname, 'public')));
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

app.use('/api', router);

app.listen(1337);
console.log("Translink bus tracking working on port 1337");
