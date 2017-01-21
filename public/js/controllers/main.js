// js/controllers/main.js

angular.module('todoController', [])

  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    // GET ========================================
    // when landing on page,get all todos and show them
    // use the service to get all the todos
    Todos.get()
      .success(function(data) {
        $scope.todos = data;
      });

      // CREATE ======================================
      // when submitting the add form, send the text to the node API
      $scope.createTodo = function() {

        // validate the formdata to make sure that something is there
        // if form is empty, nothing will happern
        // people can't just hold enter to kepp adding the same to-do anymore
        if (!$.isEmptyObject($scope.formData)) {
          // call the create function from our service (returns a promise object)
          Todos.create($scope.formData)
            // if successful creation, call our get function to get all the new todos
            .success(function(data) {
              $scope.formData = {}; // clear the form so our user is ready
              $scope.todos = data; // assign our new list of todos
            });
        }
      };

      // DELETE =====================================
      // delete a todo after checking it
      $scope.deleteTodo = function(id) {
        Todos.delete(id)
        // if successful creation, call our get function to get all the new todos
          .success(function(data) {
            $scope.todos = data; // assign our new list of todos
          });
        };
      });
