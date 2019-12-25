const http = require('http');

const hostname = '127.0.0.1';
// const port = 3000;

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('hi! node');
});


server.listen(port, hostname, ()=>{
    console.log('server is running at http://${hostname}:${PORT}');
})

