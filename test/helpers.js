// Setup Chai expect globally
global.expect = require('chai').expect;

// Safe lightweight window/document mock for browser/JSDOM compatibility
global.window = global.window || {};
global.document = global.document || {
  createElement: function() { return {}; }
};
global.navigator = global.navigator || { userAgent: 'node.js' };

// Import all functions from index.js and attach them explicitly to global
const app = require('../index.js');
if (app && typeof app === 'object') {
  for (let key in app) {
    global[key] = app[key];
  }
}