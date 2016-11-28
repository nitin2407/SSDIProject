app.service('loginService',function($http){
	

	this.userDetails = function(){
		return $http.get('/home');
	}


    this.loginCheck = function(dataObj){   	
      return $http.post('/login', dataObj);
    }

    this.logout = function(){
    	return $http.get('/logout');
    }


	
});