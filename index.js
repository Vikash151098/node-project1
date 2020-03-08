const express = require('express');
const winston=require('winston');
var app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db_conn')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listining on port ${port}...`));