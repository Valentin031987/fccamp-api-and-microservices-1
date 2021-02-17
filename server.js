// server.js
// where your node app starts
const isUTCDate = (date) => new Date(date).toString() != 'Invalid Date'
const isUnixDate = (date) => !isNaN(date)

const dateToUTC = (date) => new Date(date).toUTCString()
const dateToUnix = (date) => new Date(date).valueOf()

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function (req, res) {
  res.json({unix: dateToUnix(new Date()), utc: dateToUTC(new Date())});
});

app.get("/api/timestamp/:data?", function (req, res) {
  const dateReceived = req.param('data');
  const obj = {unix: '', utc: ''}

  if(isUTCDate(dateReceived)){
    obj.utc = dateToUTC(dateReceived)
    obj.unix = dateToUnix(dateReceived)
  }else{
    if(isUnixDate(dateReceived)){
      obj.utc = dateToUTC(Number.parseInt(dateReceived))
      obj.unix = dateToUnix(Number.parseInt(dateReceived))
    }else{
      res.json({ error : "Invalid Date" })
      return
    }
  }
  res.json(obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
