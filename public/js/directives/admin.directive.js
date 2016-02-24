var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;
var baseUrl = currentScriptPath.substring(0, currentScriptPath.indexOf('/js'));
angular.module("adminApp", ['ngCookies'])
.directive("logged", function () {
			var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = baseUrl+'/templates/adminHome.html';
            return directive;
	})
.directive("loginForm", function () {
			var directive = {};
            directive.restrict = 'E';
			directive.templateUrl = baseUrl+'/templates/login.html';
			directive.controller = function($scope, $element, $http, $cookies,$window) {
				if(!$cookies.get('loginStatus')){
					$scope.logged = false;
				}else{
					$scope.logged = true;
					$scope.adminName = $cookies.get('loginStatusu');
				}
				$scope.signOut = function(){
					$cookies.remove('loginStatus');
					$cookies.remove('loginStatusu');
					$window.location.reload();
				}
				$scope.validate = function(entereduserid,enteredpassword){
						var user = entereduserid;
						

						// when landing on the page, get all todos and show them
						 $http.get('/api/todos')
							.success(function(data) {
								$scope.todos = data;
								console.log(data);
								data.some(function(value,key){
									if(value.userid===entereduserid){
										if(data[key].password===enteredpassword){
											$scope.logged = true;
											$scope.adminName = data[key].userid;
											$cookies.put('loginStatus', true);
											$cookies.put('loginStatusu',data[key].userid);
										}else{
											$scope.errusername = false;
											$scope.errpassword = true;
										}
											return true;
									}else{
											$scope.errusername = true;
											$scope.errpassword = false;
									}
								});
							})
							.error(function(data) {
								console.log('Error: ' + data);
							});
							
							
								/*$http.post('/api/todos', $scope.formData)
									.success(function(data) {
										$scope.formData = {}; // clear the form so our user is ready to enter another
										$scope.todos = data;
										console.log(data);
									})
									.error(function(data) {
										console.log('Error: ' + data);
									});*/
							
				}
			}
            return directive;
	});	

	
