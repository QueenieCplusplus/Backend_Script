var express = require('express');
var router = express.Router();

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
   fs.readFile('../views/filename.html', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
   });
}).listen(8080);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
