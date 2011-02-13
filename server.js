var express  = require('express'),
    haml     = require('haml'),
    mongoose = require('mongoose');
    app      = express.createServer();

app.configure(function() {
  app.set('view engine', 'haml');
  app.use(express.staticProvider(__dirname + '/public'));
  mongoose.connect('mongodb://localhost/reports');
});

var Schema   = mongoose.Schema,
    ObjectID = Schema.ObjectID;

var Report = new Schema({
  message         : String,
  location        : String,
  browser_name    : String,
  browser_version : String,
  line_number     : String
});

app.get('/', function(req, res) {
  res.render('index', {
    layout: false
  });
});

app.get('/errors', function(req, res) {
  var errorReport  = req.query.error;
  var report = mongoose.model('Report');
  var instance = new Report();

  var document = {
    message: errorReport.message,
    location: errorReport.location,
    browser_name: errorReport.browser_name,
    browser_version: errorReport.browser_version,
    line_number: errorReport.line_number
  };

  report.save(document);
});

console.log("Starting app on port 4567...");
app.listen(4567);
