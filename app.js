var Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	express    = require("express"),
	seedDB     = require("./seeds"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	app 	   = express();

var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb+srv://GavinBurris:v7R*FyJvdA$75Bi@cluster0-sucrt.mongodb.net/<dbname>?retryWrites=true&w=majority", {
	useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}).then(() => {
	console.log("Connected to DB");
}).catch(err => {
	console.log("Error: ", err.message);
});

mongoose.set('useUnifiedTopology', true);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Foo Foo Cuddly Poops",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, function() {
	console.log("YelpCamp Server Has Started!");
})