const http = require('http');
const fs = require("fs");

const file = fs.readFileSync("data.json",'utf-8');
const server = http.createServer((req,res) => {
    res.setHeader("Content-Type",'application/json')
    res.end(file);
})

server.listen(8080);