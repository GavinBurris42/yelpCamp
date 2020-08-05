var express = require("express"),
	router = express.Router(),
	User = require("../models/user"),
	Campground = require("../models/campground"),
	passport = require("passport");

//Show Register Form
router.get("/register", function(req, res) {
	res.render("register", {page: "register"});
})

//Add User from form
router.post("/register", function(req, res) {
	var newUser = new User({
		username: req.body.username, 
		firstName: req.body.firstName, 
		lastName: req.body.lastName, 
		email: req.body.email, 
		profileImg: req.body.profileImg,
		aboutMe: req.body.aboutMe
	});
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

//User Show Page
router.get("/users/:id", function(req, res) {
	User.findById(req.params.id, function(err, foundUser) {
		if(err) {
			req.flash("error", "User not found");
			res.redirect("/campgrounds");
		} else {
			Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds) {
				if(err) {
					req.flash("error", "Campground not found");
					res.redirect("/campgrounds");
				} else {
					res.render("users/show", {user: foundUser, campgrounds: campgrounds});
				};
			})
		}		
	})
})

//Home page
router.get("/", function(req, res) {
	res.render("landing");
})

module.exports = router;
