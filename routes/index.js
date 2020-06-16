var express = require("express"),
	router = express.Router(),
	User = require("../models/user"),
	passport = require("passport");

//Show Register Form
router.get("/register", function(req, res) {
	res.render("register", {page: "register"});
})

//Add User from form
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username})
	if(req.body.adminCode === process.env.ADMIN_CODE) {
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			req.flash("error", err.message);
			res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome to YelpCamp " + user.username + "!");
			res.redirect("/campgrounds");
		})
	});
});

//Login Form
router.get("/login", function(req, res) {
	res.render("login", {page: "login"});
})

//Login User
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res) {});

//Logout User
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Logged You Out!")
	res.redirect("/campgrounds");
});

//Home page
router.get("/", function(req, res) {
	res.render("landing");
})

module.exports = router;
