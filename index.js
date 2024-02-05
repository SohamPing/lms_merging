const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.get('/', (req, res) => {
    // Send a simple text response
    res.send('Hello, world!');
  });

app.listen(process.env.PORT||3000,function(){
    console.log("Server started on port 3000");
});