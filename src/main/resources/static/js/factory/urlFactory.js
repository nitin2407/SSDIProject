app.factory('urlFactory', function($window){
	
	var urlFactory = {};
	
	urlFactory.home = function(){ 
		return "http://" + $window.location.host + "/html/home.html"; 
	};

	urlFactory.index = function(){
		return "http://" + $window.location.host + "/index.html";	
	};

	urlFactory.signUp = function(){
		return "http://" + $window.location.host + "/html/signup_page.html";	
	};

	urlFactory.manageCourses = function(){
	 	return "http://" + $window.location.host + "/html/managecourses.html"; 
	};

	urlFactory.skillbyId = function(id){
	 	return "http://" + $window.location.host + "/html/courseEdit.html?id="+ id; 
	};

	return urlFactory;
	
});

app.factory('skillsFactory', function(){

	var skillsFactory = {};
	
	skillsFactory.categories = function(){
		var data = ['Study', 'Dance', 'Singing', 'Arts', 'Sports', 'Cooking'];
		return data;
	};


	

	return skillsFactory;

});


app.factory('userFactory', function(){

	var userFactory = {};

	var user={};
	
	userFactory.setUser = function(user){
		user = user;
	};

	userFactory.getUser = function(){
		return user;
	};

	return userFactory;

});
