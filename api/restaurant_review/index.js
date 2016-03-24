'use strict';

var _ = require('lodash');
var restaurant_review = require('./restaurant_review.model');

// Get list of restaurant_reviews
exports.index = function(req, res) {
          // Connect to the db
   restaurant_review.find(function (err, restaurant_reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, restaurant_reviews);
  });

} ;

// Creates a new restaurant_review in datastore.
exports.create = function(req, res) {
  restaurant_review.create(req.body, function(err, restaurant_review) {
    if(err) { return handleError(res, err); }
    return res.json(201, restaurant_review);
  });
};

// Updates an existing restaurant_review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  restaurant_review.findById(req.params.id, function (err, restaurant_review) {
    if (err) { return handleError(res, err); }
    if(!restaurant_review) { return res.send(404); }
    var updated = _.merge(restaurant_review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, restaurant_review);
    });
  });
};

// delete an existing restaurant_review in datastore.
exports.delete = function(req, res) {
    restaurant_review.findById(req.params.id, function (err, restaurant_review) {
    if(err) { return handleError(res, err); }
    if(!restaurant_review) { return res.send(404); }
    restaurant_review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};