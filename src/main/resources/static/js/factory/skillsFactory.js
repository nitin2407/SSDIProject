app.factory('skillsFactory', function($window){

	var skillsFactory = {};
	
	skillsFactory.categories = function(){
		var data = ['Study', 'Dance', 'Singing', 'Arts', 'Sports', 'Cooking'];
		return data;
	};



	return skillsFactory;

});