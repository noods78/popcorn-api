var fs = require('fs');

module.exports = function(env) {
	env = env || process.env.NODE_ENV;
	return require('./config/' + env + '.json');
};