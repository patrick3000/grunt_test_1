'use strict';
var validator = require("email-validator");
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentSchema = new Schema({
	
  name: String,
  comment: String,
  email: String,
  updated: { type: Date, default: Date.now }
});

// {"name":"Patrick", "address":"dingle","age": "24","email": "none","updated": "12/12/12"}

/*
commentSchema.path('address').validate(function (v) {
	
	if(v.length>40 || v.length <5){
		return false
	}
   return true
},'comment address should be between 5 and 40 characters');




commentSchema.path('email').validate(function (v) {
	
	return validator.validate(v);
	
	
},'you must enter a valid email');

*/



module.exports = mongoose.model('comment', commentSchema);