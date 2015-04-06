/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
var fs = require('fs');
var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  var datos = fs.readFileSync('dataset.json', 'utf8');
  res.send(datos);
};
