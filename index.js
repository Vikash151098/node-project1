const express = require('express');
var app = express();

require('./startup/routes')(app);
require('./startup/db_conn')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listining on port ${port}...`));