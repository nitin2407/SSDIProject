app.service('skillService',function($http,$rootScope,$filter){	


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

    this.getPostsBySkillId = function(id){
        return $http.get('/discussionForum/' + id);
    }

    this.postDiscussion = function(reply,id){
        return $http.post('/postDiscussion/'+ reply + '/' + id);
    }

    this.enrollSkill = function(id){
        return $http.post('/enrollSkill/'+ id);
    }

    this.deEnrollSkill = function(id){
        return $http.post('/deEnrollSkill/'+ id);
    }

    this.formatTime = function(timings){
        if(timings != null){
            for (i = 0; i < timings.length; i++) {
                timings[i].toTime = new Date(timings[i].toTime);
                //timings[i].toTime = $filter('date')(timings[i].toTime, 'h:mm a');
                timings[i].fromTime = new Date(timings[i].fromTime);
                //timings[i].toTime = Date.parse(timings[i].toTime);
                //timings[i].fromTime = $filter('date')(timings[i].fromTime, 'h:mm a');
                
                //timings[i].fromTime = Date.parse(timings[i].fromTime);
                //$scope.today = 
  //alert($scope.today);
            }
        }
        return timings;
    }

	
});