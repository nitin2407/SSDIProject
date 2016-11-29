app.service('skillService',function($http,$rootScope){	


	this.addSkill = function(dataObj){
		return $http.post('/addskill', dataObj);
	};


    this.increaseInterest = function(skillId){   	
      return $http.post('/increaseInterestedCount/'+ skillId);
    };

    this.decreaseInterest = function(skillId){      
      return $http.post('/decreaseInterestedCount/'+ skillId);
    };

    this.getSkills = function(){
        return $http.get('/skills');
    };

    this.getSkillIdParameter = function(url){

        var params = url.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == "id")
                return singleParam[1];
            }
    };

    this.getSkillById = function(skillId){
        return $http.get('/manageSkill/'+ skillId);
    };

    this.getSkillsByUser = function(){
        return $http.get('/skillByUser');
    };

    this.deleteSkillById = function(skillId){
        return $http.get('/deleteSkill/'+ skillId);
    };

    this.updateSkill = function(dataObj){
        return $http.post('/manageSkill', dataObj);
    }

	
});