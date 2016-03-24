'use strict';

var _ = require('lodash');
var comment = require('./comment.model');

// Get list of comments
exports.index = function(req, res) {
          // Connect to the db
   comment.find(function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, comments);
  });

} ;

// Creates a new comment in datastore.
exports.create = function(req, res) {
  comment.create(req.body, function(err, comment) {
    if(err) { return handleError(res, err); }
    return res.json(201, comment);
  });
};

// Updates an existing comment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, comment);
    });
  });
};

// delete an existing comment in datastore.
exports.delete = function(req, res) {
    comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};