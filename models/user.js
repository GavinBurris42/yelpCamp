var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");
	

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	profileImg: {
		type: String,
		default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
	},
	firstName: String,
	lastName: String,
	email: String,
	aboutMe: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);