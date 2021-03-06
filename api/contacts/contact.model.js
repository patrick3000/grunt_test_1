'use strict';
var validator = require("email-validator");
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  address: String,
  age: { type: Number, min: 0, max: 120 },
  email: String,
  updated: { type: Date, default: Date.now }
});


var sendgrid  = require('sendgrid')('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');
sendgrid.send({
  to:       'patrickirish1992@yahoo.ie',
  from:     'other@example.com',
  subject:  'Hello World',
  text:     'My first email through SendGrid.'
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
// {"name":"Patrick", "address":"dingle","age": "24","email": "none","updated": "12/12/12"}
//{"name":"Patrick", "address":"dingle","age": "24","email": "none","updated": "12/12/12"}

//{"name":"Patrick", "address":"dingle","age": "24","email": "patrickirish1992@yahoo.ie","updated": "12/12/12"}

/*
ContactSchema.path('address').validate(function (v) {
	
	if(v.length>40 || v.length <5){
		return false
	}
   return true
},'contact address should be between 5 and 40 characters');




ContactSchema.path('email').validate(function (v) {
	
	return validator.validate(v);
	
	
},'you must enter a valid email');
*/




module.exports = mongoose.model('Contact', ContactSchema);