var express = require('express');
const {createServer} = require('http')

const app = express();
const httpServer = createServer(app);

// ms = 1/1000 sec
httpServer.timeout = 5000;


const context = async ()=>{
    return {
        timestamp: performance.now()
    }
}


//./app.js
module.exports = app;
