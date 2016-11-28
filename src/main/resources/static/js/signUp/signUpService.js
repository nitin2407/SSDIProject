app.service('signUpService',function($http){
	
	this.register = function(dataObj){
		return $http.post('/signup', dataObj);
	}

	this.editProfile = function(dataObj){
		return $http.post('/profile', dataObj);
	}

	
});