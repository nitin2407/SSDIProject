app.service('loginService',function($http){
	
	/*this.dataObj = {
        username : $scope.user,
        password : $scope.pass
      };*/


	this.userDetails = function(){
		return $http.get('/home');
	};


    this.loginCheck = function(dataObj){   	
      return $http.post('/login', dataObj);
    };

    this.logout = function(){
    	return $http.get('/logout');
    }


	
});