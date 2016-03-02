(function() {
var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;
var baseUrl = currentScriptPath.substring(0, currentScriptPath.indexOf('/js'));
var app = angular.module("adminApp", ['ngCookies']);
app.directive("logged", function () {
			return{
				restrict : 'E',
				templateUrl : baseUrl+'/templates/adminHome.html',
				controller : ['$scope', '$cookies', '$window' , '$compile' , '$http', function($scope, $cookies, $window , $compile, $http){
					$scope.signOut = function(){
						$cookies.remove('loginStatus');
						$cookies.remove('loginStatusu');
						$window.location.reload();
					}
					$scope.restaurant = function(buttonOf){
						
								    var htmlcontent = $('section');
								    if(buttonOf == 'addRest'){
								    	htmlcontent.load('/subpages/restaurant/addRest.html');
								    }else if(buttonOf == 'viewRest'){
								    	
								    	
									    $http.get('/RestBarDetails')
									        .success(function(data) {
									            //$scope.todos = data;
									            console.log(data);
									        })
									        .error(function(data) {
									            console.log('Error: ' + data);
									        });

								    }else if(buttonOf == 'delRest'){
								    	htmlcontent.load('/subpages/restaurant/delRest.html');
								    }
								    
								    //$compile(htmlcontent.contents())($scope);
					}	
				}]
			}
	})
app.directive("loginForm", function () {
	return{
		restrict : 'E',
		templateUrl : baseUrl+'/templates/login.html',
		link : function($scope) {
			//alert("in directive");
		},
		controller: ['$scope', '$cookies', '$http', function ($scope,$cookies,$http){
			$scope.toBeShown = true;
    		
				if(!$cookies.get('loginStatus')){
					$scope.logged = false;
				}else{
					$scope.logged = true;
					$scope.adminName = $cookies.get('loginStatusu');
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
							
						
															
				}
		}]
	}
});	

})();
