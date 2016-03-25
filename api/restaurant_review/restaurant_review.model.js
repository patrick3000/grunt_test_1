'use strict';
var validator = require("email-validator");
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var restaurant_reviewSchema = new Schema({
  name: String
  /*
  restaurant_name: String,
  stars: { type: Number, min: 0, max: 8 },
  cusine: String,
  updated: { type: Date, default: Date.now }
  */
});

// {"name":"Patrick", "restaurant_name":"the courthouse","stars": "4","cusine": "french food, Thai","updated": "09/09/09"}
// {"name":"lance", "restaurant_name":"the three pigs","stars": "3","cusine": "Thai","updated": "09/09/00"}
// {"name":"micheal", "restaurant_name":"the hideout","stars": "4","cusine": "Italian","updated": "04/09/01"}
// {"name":"jacob", "restaurant_name":"nancy road roast","stars": "5","cusine": "chinese","updated": "06/09/04"}
// {"name":"nigel", "restaurant_name":"the tavern in","stars": "2","cusine": "sish and chips","updated": "07/09/14"}
/*
restaurant_reviewSchema.path('address').validate(function (v) {
	
	if(v.length>40 || v.length <5){
		return false
	}
   return true
},'restaurant_review address should be between 5 and 40 characters');




restaurant_reviewSchema.path('email').validate(function (v) {
	
	return validator.validate(v);
	
	
},'you must enter a valid email');
*/




module.exports = mongoose.model('restaurant_review', restaurant_reviewSchema);