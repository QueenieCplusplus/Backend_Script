# FS_and_URL_NodeApp

# Features

* Read files

* Create files

* Update files

* Delete files

* Rename files

# code for index.js

    var http = require('http');
    var fs = require('fs');

    http.createServer(function(req, res){
      fs.readFile('../dirname/filename.html', callback)

    }).listen(8080);



