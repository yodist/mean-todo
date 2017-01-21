// app/routes.js

//load the todo models

var Todo = require('./models/todo');

//expose the routes to our app with moduel.exports
module.exports = function(app) {

  // api -----------------------------
  // get all todos
  app.get('/api/todos', function(req, res) {
    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)

        res.json(todos);
    });
  });


  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {

    // create a todo, information comes from ajax request from angular
    Todo.create({
      text: req.body.text,
      done: false
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

  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if(err)
        res.send(err);

      Todo.find(function(err, todos) {
        if(err)
          res.send(err)
        res.json(todos);
      });
    });
  });
};
