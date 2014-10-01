var winston = require('winston');

var config  = require('../config')();

module.exports = {
    createLogger: function(name, label) {
        return winston.loggers.add(name, {
            console: {
                level: config.log.console.level,
                colorize: true,
                label: label
            },
            file: {
                level: config.log.file.level,
                filename: config.log.file.filename,
                json: false,
                label: label
            }
        });
    }
}