// use the express framework
var express = require('express');
var app = express();

var fs = require('fs');
var code_hash = fs.readFileSync('code_hash.txt','utf8');
console.log (code_hash);
console.log('The IPADDRESS is:', process.env.IP);
console.log('The message is:', process.env.AZ);
console.log('The hash is: %s', code_hash);

var ipaddress = process.env.IP;
var message = process.env.AZ;

// morgan: generate apache style logs to the console
var morgan = require('morgan')
app.use(morgan('combined'));

// express-healthcheck: respond on /health route for LB checks
app.use('/health', require('express-healthcheck')());

// main route
app.get('/', function (req, res) {
  res.set({
  'Content-Type': 'text/plain'
})
  res.send(`Hello Dockercon!  I have been up for ` + process.uptime() + 'ms');
});

// health route - variable subst is more pythonic just as an example
var server = app.listen(8080, function() {
  var port = server.address().port;
  console.log('Example app listening on port %s!', port);
});

// export the server to make tests work
module.exports = server;
