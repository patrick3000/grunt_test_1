'use strict';
var validator = require("email-validator");
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentSchema = new Schema({
	
  name: String,
  stars: String,
  comment: String,
  email: String,
  updated: { type: Date, default: Date.now }
});

// {"name":"Patrick","stars": "3", "comment": "this is a good restaurant","email": "pat33@yahoo.ie","updated": "02/12/12"}
// {"name":"joe nelson","stars": "1", "comment": "this is a bad restaurant","email": "joe44@yahoo.ie","updated": "09/09/12"}
// {"name":"jerry springer","stars": "5", "comment": "this is a good restaurant","email": "jrry55@yahoo.ie","updated": "12/12/12"}
// {"name":"nicky cole","stars": "5", "comment": "this is a good restaurant","email": "nicky66@yahoo.ie","updated": "16/11/16"}
// {"name":"Frank Sinatra","stars": "6", "comment": "this is a excellent restaurant","email": "frank77@yahoo.ie","updated": "14/11/14"}

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