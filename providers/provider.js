var _ = require('underscore')
  , EventEmitter = require('events').EventEmitter;

var helpers = require('../lib/helpersv2.js');

module.exports = Provider;

function Provider() {
    this.log = helpers.createLogger();
    this.log.info('Provider Instantiated');
    EventEmitter.call(this);
}

// Extend Provider with EventEmitter
Provider.prototype = Object.create(EventEmitter.prototype, {
    constructor: {
        value: Provider,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

// Helper function to correctly set up the prototype chain, for subclasses.
// Inspired by Backbonejs and Node.js inherits
Provider.extend = function(instProps, statProps) {
    var baseclass = this;
    var subclass;

    if (instProps && _.has(instProps, 'constructor')) {
        subclass = instProps.constructor;
    } else {
        subclass = function() { 
            return baseclass.apply(this, arguments);
        };
    }

    _.extend(subclass, baseclass, statProps);

    subclass.prototype = Object.create(baseclass.prototype, {
        constructor: {
            value: subclass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (instProps) 
        _.extend(subclass.prototype, instProps);

    subclass.__super__ = baseclass;

    return subclass;
}