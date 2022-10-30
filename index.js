var fs = require('fs');
var moment = require('moment');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const directoryPath = path.join(__dirname, 'savedlogs');
console.log(directoryPath);

app.get('/createlogfile', (req, res) => {

    fs.writeFile(directoryPath +'/'+ String(moment().format('DD-MM-YYYY:hh:mm:ss'))+'.txt', String(moment().format('DD-MM-YYYY:hh:mm:ss')), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    res.send('Log file created');
  });
  

  app.get('/displaylogfiles', (req, res) => {

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        file_list = []
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            file_list.push(file); 
        });
        res.send(file_list);
    });
  });
  
  // starting the server
  app.listen(3001, () => {
    console.log('listening on port 3001');
  });