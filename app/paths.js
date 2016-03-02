var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {
	var filePath = "./public/";
	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile(filePath+'index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	app.get('/admin', function(req, res){
	  res.sendfile(filePath+'admin.html');
	});
}
