var Campground = require("../models/campground"),
	Comment = require("../models/comment");

var middlewareOBJ = {};

middlewareOBJ.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} 
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
}

middlewareOBJ.checkCampgroundOwnership = function(req, res, next) {
	//Is user logged in
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err || !foundCampground) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				//Does owner own the campground
				if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
				   	next();
				   } else {
					   req.flash("error", "Permission denied!");
					   res.redirect("back");
				   }
			}
		});	
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareOBJ.checkCommentOwnership = function(req, res, next) {
	//Is user logged in
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				//Does owner own the comment
				if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
				   	next();
				   } else {
					   req.flash("error", "You don't have permission to do that");
					   res.redirect("back");
				   }
			}
		});	
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

module.exports = middlewareOBJ;