(function() {
adminController.$inject = ['$scope','adminService'];
angular.module('adminApp').controller('adminController', adminController);

function adminController($scope,adminService){
			alert(1);
    		$scope.addRes = function()
								{
								    var htmlcontent = $('#loadhtml ');
								    htmlcontent.load('/Pages/Common/contact.html')
								    $compile(htmlcontent.contents())($scope);
								}
}


})();