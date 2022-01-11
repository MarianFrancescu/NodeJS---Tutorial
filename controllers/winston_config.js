const path = require('path');
const {createLogger, transports, format} = require('winston');

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.json(),
        format.timestamp()
    ),
    transports: [
        new transports.File(
            {
                filename: path.join(__dirname, './../logs/winston.log')
            }
        )
    ]
});

module.exports = logger;