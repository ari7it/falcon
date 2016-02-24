
// js/services/todos.js
angular.module('adminApp', [])

    // super simple service
    // each function returns a promise object 
    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('/api/todos');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/todos/' + id);
            }
        }
    })
    .service('loginService', function ($q,$http){
        return
        $http.get('/api/todos').then(function ($scope, result) {
            $scope.user = formData.userid;
        })
    });
