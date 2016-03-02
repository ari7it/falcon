
(function() {
angular.module('adminApp',['ngCookies']).controller('AdminController', AdminController);
AdminController.$inject= ['$scope', '$http', '$cookies'];
function AdminController($scope, $http, $cookies){
			$scope.toBeShown = true;
    		$scope.addRes = function(){
								    var htmlcontent = $('#loadhtml ');
								    htmlcontent.load('/Pages/Common/contact.html')
								    //$compile(htmlcontent.contents())($scope);
			}
			if(!$cookies.get('loginStatus')){
					$scope.logged = false;
				}else{
					$scope.logged = true;
					$scope.adminName = $cookies.get('loginStatusu');
				}
			

	}
})();



			




