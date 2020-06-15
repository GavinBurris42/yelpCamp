var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data= [
	{
		name: "Hammock", 
		image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80", 
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at tristique nibh. Maecenas pharetra porttitor elit in consectetur. Quisque velit diam, hendrerit at luctus porta, blandit in orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut maximus, mauris nec pellentesque commodo, mauris enim porttitor risus, in dapibus diam turpis eu dolor. Nulla eget purus elementum, tincidunt dui ac, consequat sem. Duis vitae faucibus dui, non vehicula augue. Phasellus tortor tellus, tempor a augue vel, commodo maximus purus. Fusce ac urna a elit pulvinar lobortis id ac mauris. In ut lacus augue. Vestibulum mollis est nec pharetra luctus. In tristique scelerisque placerat. Nullam condimentum commodo lacinia. Vivamus varius urna at dignissim sollicitudin. Mauris molestie mi eu scelerisque iaculis. Vestibulum iaculis vel lectus quis tempor."
	},
	{
		name: "Cooking", 
		image: "https://images.unsplash.com/photo-1466220549276-aef9ce186540?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80", 
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at tristique nibh. Maecenas pharetra porttitor elit in consectetur. Quisque velit diam, hendrerit at luctus porta, blandit in orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut maximus, mauris nec pellentesque commodo, mauris enim porttitor risus, in dapibus diam turpis eu dolor. Nulla eget purus elementum, tincidunt dui ac, consequat sem. Duis vitae faucibus dui, non vehicula augue. Phasellus tortor tellus, tempor a augue vel, commodo maximus purus. Fusce ac urna a elit pulvinar lobortis id ac mauris. In ut lacus augue. Vestibulum mollis est nec pharetra luctus. In tristique scelerisque placerat. Nullam condimentum commodo lacinia. Vivamus varius urna at dignissim sollicitudin. Mauris molestie mi eu scelerisque iaculis. Vestibulum iaculis vel lectus quis tempor."
	},
	{
		name: "Sunset", 
		image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60", 
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at tristique nibh. Maecenas pharetra porttitor elit in consectetur. Quisque velit diam, hendrerit at luctus porta, blandit in orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut maximus, mauris nec pellentesque commodo, mauris enim porttitor risus, in dapibus diam turpis eu dolor. Nulla eget purus elementum, tincidunt dui ac, consequat sem. Duis vitae faucibus dui, non vehicula augue. Phasellus tortor tellus, tempor a augue vel, commodo maximus purus. Fusce ac urna a elit pulvinar lobortis id ac mauris. In ut lacus augue. Vestibulum mollis est nec pharetra luctus. In tristique scelerisque placerat. Nullam condimentum commodo lacinia. Vivamus varius urna at dignissim sollicitudin. Mauris molestie mi eu scelerisque iaculis. Vestibulum iaculis vel lectus quis tempor."
	}
]

function seedDB() {
	Campground.deleteMany({}, function(err) {
		if(err) {
			console.log(err);
		// } else {
			Comment.deleteMany({}, function(err) {
				if(err) {
				console.log(err);
			} else {
			// data.forEach(function(seed) {
			// 	Campground.create(seed, function(err, campground) {
			// 		if(err) {
			// 			console.log(err);
			// 		} else {
			// 			console.log("Added A Campground");
			// 			//Create a Comment
			// 			Comment.create({
			// 				text: "this place is dope AF",
			// 				author: "Obama"
			// 			}, function(err, comment) {
			// 				if(err) {
			// 					console.log(err);
			// 				} else {
			// 					console.log("Comment created");
			// 					campground.comments.push(comment);
			// 					campground.save();
			// 				}
			// 			});
			// 		}
			// 	})
			// });
			// console.log("Removed all campgrounds")
			}
			});
	//add a few campgrounds
		}
	});
}

module.exports = seedDB;
		
		
		
		
		
		
		
		