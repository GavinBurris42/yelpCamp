var express = require("express"),
	router = express.Router({mergeParams: true}),
	Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	middleware = require("../middleware");

//NEW 
router.get("/new", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Campground not found")
			res.redirect("/campgrounds");
		} else {
			res.render("comments/new", {campground: foundCampground});
		}
	});
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
	//Get the comment from the form
	var comment = req.body.comment;
	// Find the Campground
	Campground.findById(req.params.id, function(err, campground) {
		if(err || !campground) {
			req.flash("error", "Campground not found")
			res.redirect("/campgrounds");
		} else {
			//Create the comment
			Comment.create(comment, function(err, comment) {
				if(err) {
					console.log(err);
					req.flash("error", "Something went wrong");
				} else {
					//add username and id to the comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//Add the Comment to the Campground
					campground.comments.push(comment);
					campground.save();
					//Redirect to the Campground
					req.flash("success", "Comment successfully created!");
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Comment not found");
			return res.redirect("/campgrounds");
		} else {
			Comment.findById(req.params.comment_id, function(err, foundComment) {
				if(err) {
					res.redirect("/campgrounds");
				} else {
					res.render("comments/edit", {campground: foundCampground, comment: foundComment});
				}
			});
		}
	});	
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	console.log(req.body.comment);
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
		if(err) {
			res.redirect("back");
		} else {
			req.flash("success", "Comment Updated!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			res.redirect("back");
		} else {
			Campground.findByIdAndUpdate(req.params.id, {$pull : {comments: req.params.comment_id}}, function(err, foundCampground) {
				if(err) {
					res.redirect("back");
				} else {
					req.flash("sucess", "Comment Deleted")
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		};
	});
});

module.exports = router;