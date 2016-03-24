'use strict';
var validator = require("email-validator");
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var restaurant_reviewSchema = new Schema({
  name: String,
  address: String,
  age: { type: Number, min: 0, max: 120 },
  email: String,
  updated: { type: Date, default: Date.now }
});

// {"name":"Patrick", "address":"dingle","age": "24","email": "none","updated": "12/12/12"}


restaurant_reviewSchema.path('address').validate(function (v) {
	
	if(v.length>40 || v.length <5){
		return false
	}
   return true
},'restaurant_review address should be between 5 and 40 characters');




restaurant_reviewSchema.path('email').validate(function (v) {
	
	return validator.validate(v);
	
	
},'you must enter a valid email');





module.exports = mongoose.model('restaurant_review', restaurant_reviewSchema);