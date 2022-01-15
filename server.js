// server.js
// where your node app starts

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

// my work (inside this app.get,line 27-46)
app.get( '/api/:date?',
  function (req,res){
    
      const inputDate = (req.params.date != null)
        ? new Date(isNaN(req.params.date) 
          ? req.params.date 
          : parseInt(req.params.date))
        : new Date()

      const dateResponse = (inputDate.toString() != 'Invalid Date')
        ? (unixValue = inputDate.getTime(),
           utcValue = inputDate.toUTCString(),
           {unix: unixValue, utc: utcValue})
        : {error: 'Invalid Date'}

      res.send(dateResponse)

  }
)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
