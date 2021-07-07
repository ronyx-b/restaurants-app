const express = require('express');
const app = express();
const path =  require('path');

app.use('/', express.static(path.join(__dirname)));

app.listen(8089, function() { console.log('Server listening on port 8089'); })