'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./modal.cjs.production.min.js');
} else {
  module.exports = require('./modal.cjs.development.js');
}