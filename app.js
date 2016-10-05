const PORT = 8000;
const anyBody = require('body/any');
const http = require('http');


const server = http.createServer((req, res) => {
  anyBody(req, (err,body) => {
    console.log('body: ', body); 
    res.end('ok');
    });
});

server.listen(PORT, err => {
  console.log(err || 'Server listening...')
});