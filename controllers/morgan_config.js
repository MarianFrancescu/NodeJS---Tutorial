const Morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const m = new Morgan('dev', {
    stream: fs.createWriteStream('./logs/morgan_access.log')
});

module.exports = m;