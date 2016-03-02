// load the todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

    	// routes ======================================================================

        app.get('/collections/:RestBarDetails', function(req, res, next) {
          req.collection.find({} ,{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
            if (e) return next(e)
            res.send(results)
          })
        });

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, RestBarDetails) {
            
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(RestBarDetails); // return all todos in JSON format
        });
    });

    app.get('/', function(req, res, next) {
      res.send('please select a collection, e.g., /collections/messages')
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            userid : req.body.userid,
			password : req.body.password,
            done : true
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

};