var express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	middleware = require("../middleware/index");

//INDEX
router.get("/", function(req, res) {
	//Get campgrounds from DB
	Campground.find({}, function(err, campgrounds) {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds, page: "campgrounds"});
		}
	})
})

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
})

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var description = req.body.description
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image: image, description: description, author: author};
	// Store new campground in DB
	Campground.create(newCampground, function(err, newCampground) {
		if(err) {
			console.log(err);
		} else {
			console.log(newCampground);
			req.flash("success", "Campground Created!")
			res.redirect("/campgrounds");
		}
	})
})

//SHOW
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err || !foundCampground){
			req.flash("error", "Campground not found!");
			return res.redirect("back");
		}
		res.render("campgrounds/show", {campground: foundCampground});
	});
});

//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err || !foundCampground){
			req.flash("error", "Campground not found!");
			res.redirect("/campgrounds");
		}
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground ,function(err, campground) {
		if(err) {
			req.flash("error", "Campground not found!");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground Updated!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			res.redirect("/campgrounds");
		} else {
			Comment.remove({_id: {$in: campground.comments}}, function(err){
				if(err) {
					res.redirect("/campgrounds");
				} else {
					campground.remove();
					req.flash("success", "Campground deleted!");
					res.redirect("/campgrounds");
				};
			});
		}
	});
});

module.exports = router;