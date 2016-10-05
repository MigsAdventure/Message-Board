const fs = require('fs');
const fileName = 'data.json';



  fs.readFile(fileName, (err, buffer) => {
  let messages = JSON.parse(buffer);
  console.log('messsages:', messages)
  messages.push('blank');

  fs.writeFile(fileName, JSON.stringify(messages), err => {
    console.log('done!')
  })
}) 



