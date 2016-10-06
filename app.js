const PORT = 8000;
const anyBody = require('body/any');
const http = require('http');
const fs = require('fs');
const fileName = 'data.json';
const uuid = require('uuid');
const moment = require('moment');

let newMessage = [];

const server = http.createServer((req, res) => {
  let {method, url} = req;
  console.log(`${method} ${url}`)

  // anyBody(req, (err,body) => {
  //   console.log('body: ', body); 
  //   res.end('ok');
  //   });

  let urlChunks = url.split('/')

  let [, path, msgId] = urlChunks;
  // console.log('path: ', path);
  // console.log('msgId: ', msgId);
  // console.log(`${path}/${msgId}`)

  switch(method) {
    case 'GET' : {
      switch(`${path}/${msgId}`) {


        case 'messages/undefined' : {
              fs.readFile(fileName, (err,buffer) => {
                let messages = JSON.parse(buffer);
                 res.end(JSON.stringify(messages));
              }) //end of fs.readFile
            }break;

        case `messages/${msgId}`: {

              fs.readFile(fileName, (err, buffer) => {
                let messages = JSON.parse(buffer);
                let searchedMessage = messages.map( message => {
                  console.log('message.id: ', message.id)
                  console.log('msgId: ', msgId)
                  if (message.id === msgId) {
                    return message;
                  } else {
                    console.log('didnt work')
                  }
                })

                res.end(JSON.stringify(searchedMessage))
              })
             
        }break;

      } //end of switch path for GET

    }break; //end of case GET
      

    case 'POST' : {
      switch(path) {
        case 'messages' : {
              anyBody(req, (err,body) => {
                fs.readFile(fileName, (err,buffer) => {
                  let messages = JSON.parse(buffer);
                  body.id = uuid();
                  body.time = moment().format('lll');

                  messages.push(body);

                  fs.writeFile(fileName, JSON.stringify(messages), err => {
                  res.end(`Wrote new message to file: \n ${JSON.stringify(body)}`);
                  }) //end of fs.writeFile
                }) //end of fs.readFile
               
              }); //end of anyBody

        }break;

      }// end of switch path for POST

    }break;//end of case POST
     

    case 'PUT' : {

    }break;//end of case PUT
     
    
    case 'DELETE' : {
      switch(`${path}/${msgId}`) {

        case `messages/${msgId}` : {
              fs.readFile(fileName,(err,buffer) => {
                let messages = JSON.parse(buffer);
                 let newMessages = messages.filter(message => {
                  if (msgId !== message.id ) {
                    return message;
                  } else {
                    console.log('didnt work')
                  }
                }) //end of map

                 fs.writeFile(fileName, JSON.stringify(newMessages), err => {
                  res.end(`Current Messages: \n ${JSON.stringify(newMessages)}`);
                 })
                
              })
            }
        }

    }break; //end of case DELETE

    default:
      res.statusCode = 404;
      res.end('Not Found')
  } //end of switch method


});//end of server


server.listen(PORT, err => {
  console.log(err || 'Server listening...')
});