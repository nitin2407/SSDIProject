


app.controller('skillsController', function($rootScope, $http, $scope,skillService){
    
	skillService.getSkills().then(
    	function (data) {
        	$rootScope.skills = data;
    	});
});



app.controller('MainController', function($scope,skillsFactory) {
    $scope.categories = skillsFactory.categories();
    $scope.checked_category = [];
     /*$scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };

      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };*/

});



app.controller('homeCntrl',function($scope,$http, $window,$timeout,$mdDialog,loginService,urlFactory) {
        $scope.name = "";
       	loginService.userDetails().then(
        	function (data) {
            	if(data.username==null){
                	swal({
                    	title: 'Please login',
                    	type :'warning'
                	});
                	$timeout(function(){
                    	$window.location.href = urlFactory.index();
                	},2000);
            	}
            	else{
                	$scope.name = $scope.user.fname;
            	}
            },
            function (data,status) {
            	swal({
                    title: 'Please login',
                    type :'warning',
                    showCloseButton: true
                });
            	$timeout(function(){
                	$window.location.href = urlFactory.index();
            	},2000);
        	});

        $scope.openDialog = function(){
            $mdDialog.show({
                controller: function($scope, $mdDialog){     
                },
                controller: DialogController,
                templateUrl: '/addSkillDialog.htm',
                windowClass: 'large-Modal',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true    
            });
        };
        function DialogController($scope, $mdDialog,skillService,loginService,skillsFactory) {

            $scope.categories = skillsFactory.categories();
            //$scope.skill = [{name:'nitin',category:'study'}];
            $scope.categoryChoice = 'Study';
            $scope.choices = [{day: 'Monday',toTime: new Date(1970, 0, 1, 14, 57, 0),fromTime: new Date(1970, 0, 1, 14, 57, 0)}];
            $scope.days = [{name:'Monday'},{name:'Tuesday'},{name:'Wednesday'},{name:'Thurday'},{name:'Friday'},{name:'Saturday'},{name:'Sunday'}];
            $scope.description="";
                $scope.addNewChoice = function() {
                  var newItemNo = $scope.choices.length+1;
                  $scope.choices.push({day: 'Monday',toTime:'+new Date(1970, 0, 1, 14, 57, 0)+',fromTime:'+new Date(1970, 0, 1, 14, 57, 0)'});
                };
            
                $scope.removeChoice = function() {
                  var lastItem = $scope.choices.length-1;
                  $scope.choices.splice(lastItem);
                };


            $scope.hide = function() {
              $mdDialog.hide();
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };


            $scope.submitForm = function(isValid) {

            	this.dataObj = {
        			skillName: $scope.skill_name,
			        category: $scope.categoryChoice,
			        time: $scope.choices,
			        skillDescription: $scope.description
			    };

                if(isValid) {
                    skillService.addSkill(dataObj).then{
                    	function (data, status) {
                        	$mdDialog.cancel();
                        	swal({
                            	title: "skill added",
                            	type: "success"
                        	});
                    	},
                    	function (data, status) {
                        	swal({
                            	title: "Unable to add skill details",
                            	type: "error"
                        	});
                    	};
                    };
                }
            };
        }

        $scope.logout = function () {
            loginService.logout().then(
            	function () {
                $window.location.href = urlFactory.index();
            });
        };

        $scope.clickInterest=function (id){
        	skillService.increaseInterest(id).then{
        		function(){
        			$window.location.href = urlFactory.index();		
        		};	
        	};            
        };
});


app.controller('signUpCntrl',function($scope,$http, $window,$timeout,urlFactory,signUpService) {

    $scope.cancel = function () {
        $window.location.href = urlFactory.index();
    };

    $scope.submitForm = function(isValid) {
        if(isValid) {
            var dataObj = {
                username: $scope.email,
                password: $scope.pass,
                address: {
                    addressLine1: $scope.addr1, addressLine2: $scope.addr2,
                    city: $scope.city, state: $scope.state, zip_code: $scope.zipcode
                },
                fname: $scope.f_name,
                lname: $scope.l_name,
                phoneNumber: $scope.ph_number
            };

            signUpService.register(dataObj).then(
            	function (data, status) {
	                swal({
	                    title: 'User created',
	                    type: 'success'
	                });
	                //alert("user created");
	                $timeout(function() {
	                    $window.location.href = urlFactory.index();
	                },2000)
            	},
            	function (data, status) {
	                if(status==409){
	                    swal({
	                        title: "Username already exists",
	                        type: "info"
	                    });
	                    //alert("username already exists");
	                }
	                else{
	                    swal({
	                        title: "User not created",
	                        type: "error"
	                    });
	                }
            });
        }
    };
});


//for profile page
app.controller('profileCntrl',function($scope,$http, $window,$timeout,urlFactory,signUpService) {

    loginService.userDetails().then(
    	function (data) {
	        $scope.user=data;
	        if($scope.user.username==null){
	            //alert("please login");
	            swal({
	                title: 'Please login',
	                type :'warning'
	            });
	            $timeout(function() {
	                $window.location.href = urlFactory.index();
	            },2000)
	        }
	        else{
	            $scope.f_name=$scope.user.fname;
	            $scope.l_name=$scope.user.lname;
	            $scope.email=$scope.user.username;
	            $scope.pass=$scope.user.password;
	            $scope.cnfPass=$scope.pass;
	            $scope.ph_number=$scope.user.phoneNumber;
	            $scope.addr1=$scope.user.address.addressLine1;
	            $scope.addr2=$scope.user.address.addressLine2;
	            $scope.city=$scope.user.address.city;
	            $scope.state=$scope.user.address.state;
	            $scope.zipcode=$scope.user.address.zip_code;
	        }
    	},
    	function (data,status) {
	        swal({
	            title: 'Please login',
	            type :'warning',
	            showCloseButton: true
	        });
	        $timeout(function(){
	            $window.location.href = urlFactory.index();
	        },2000)
    	});

    $scope.cancel = function () {
        $window.location.href = urlFactory.home();
    };

    $scope.logout = function () {
            loginService.logout().then(
            	function () {
                $window.location.href = urlFactory.index();
            });
        };

    $scope.submitForm = function(isValid) {
        if(isValid) {
            var dataObj = {
                username: $scope.email,
                password: $scope.pass,
                address: {
                    addressLine1: $scope.addr1, addressLine2: $scope.addr2,
                    city: $scope.city, state: $scope.state, zip_code: $scope.zipcode
                },
                fname: $scope.f_name,
                lname: $scope.l_name,
                phoneNumber: $scope.ph_number
            };
            signUpService.editProfile(dataObj).then(
            	function (data, status, headers, config) {
	                swal({
	                    title: "User details saved",
	                    type: "success"
	                });
	            },
            	function (data, status) {
	                swal({
	                    title: "Unable to save user details",
	                    type: "error"
	                });
            	});
        }
    };

    $scope.openManageCourses = function(){                     
        $window.location.href = urlFactory.manageCourses();            
    };          
             
    $scope.showSkill = function(tutor){

        var result=$http.get('/skills/'+tutor);         
        result.success(function (data) {            
            $scope.skillDetails = data;                   
        });         
    };
});



app.controller('CourseControl',function($scope,$http, $window,$timeout,$location,urlFactory,loginService,skillService) {

        loginService.userDetails().then(
	       	function (data) {
	            $scope.user = data;
	            if($scope.user.username==null){
	                swal({
	                    title: 'Please login',
	                    type :'warning'
	                });
	                $timeout(function(){
	                    $window.location.href = urlFactory.index();
	                },2000);
	            }
	            else{
	                $scope.f_name = $scope.user.fname;
	            }
	        },
        	function (data,status) {
	            swal({
	                    title: 'Please login',
	                    type :'warning',
	                    showCloseButton: true
	                });
	            $timeout(function(){
	                $window.location.href = urlFactory.index();
	            },2000);

	        });



        /*var params = document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == "id")
                $scope.skillId = singleParam[1];
            }*/

        $scope.skillId = skillService.getSkillIdParameter();

        $scope.timings = [{day: 'Monday',toTime: new Date(1970, 0, 1, 14, 57, 0),fromTime: new Date(1970, 0, 1, 14, 57, 0)}];
        
        skillService.getSkillById($scope.skillId).then(
	        function (data) {
	            $scope.skillDetails = data;
	                $scope.skill_ID = $scope.skillDetails.skillId;
	                $scope.skill_Name = $scope.skillDetails.skillName;
	                $scope.skill_Description = $scope.skillDetails.skillDescription;
	                $scope.cate_gory = $scope.skillDetails.category;
	                $scope.timings = $scope.skillDetails.time;
	        },
        	function (data, status) {
	            swal({
	                title: 'not able to retrieve skill details',
	                type: 'warning',
	                showCloseButton: true
	            });
	            $timeout(function () {
	                var url = "http://" + $window.location.host + "/html/manageCourses.html";
	                $window.location.href = url;
	            }, 2000)
        	});

        $scope.cancel = function () {
            $window.location.href = urlFactory.manageCourses();
        };

		$scope.logout = function () {
            loginService.logout().then(
               	function () {
		            $window.location.href = urlFactory.index();
		    });
		};

    $scope.addNewChoice = function() {
        var newItemNo = $scope.timings.length+1;
        $scope.timings.push({day: 'Monday',toTime:'+new Date(1970, 0, 1, 14, 57, 0)+',fromTime:'+new Date(1970, 0, 1, 14, 57, 0)'});
    };

    $scope.removeChoice = function() {
        var lastItem = $scope.timings.length-1;
        $scope.timings.splice(lastItem);
    };

        $scope.updateskill = function() {
                var dataObj = {
                    skillName: $scope.skill_Name,
                    category: $scope.cate_gory,
                    time: $scope.timings,
                    skillDescription: $scope.skill_Description,
                    //category: $scope.cate_gory,
                    //skillName: $scope.skill_Name,
                    //skillDescription: $scope.skill_Description,
                    skillId: $scope.skillId
                };

                skillService.updateSkill(dataObj).then(
					function (data) {
	                    swal({
	                         title: "Skill details saved.",
	                         type: "success"
	                    });
                	},
                	function (data, status) {
                    swal({
                         title: "Unable to save skill details",
                         type: "error" 
                     });
                	}
                );
        };

        $scope.openManageCourses = function(){
            var url = "http://" + $window.location.host + "/html/manageCourses.html";
            $window.location.href = url;
        };

        $scope.showSkill = function(tutor){
            var result=$http.get('/skills/'+tutor);
            result.success(function (data) {
                $scope.skillDetails = data;
                alert(data.skillName);
            });
        };



});

//code for manageCourses page 
app.controller('manageSkillsCntrl', function($scope, $http,$window,urlFactory,skillService) {
    
   	skillService.getSkillsByUser().then(
    	function (data) {
        	$scope.skills = data;
    	}
    );

    $scope.editSkill = function (id) {
        $window.location.href = urlFactory.skillbyId();
    }


    $scope.deleteSkill = function (id,index) {

    	skillService.deleteSkillById(id).then(
        	function (data) {
	            $scope.skills.splice(index,1);
	            swal({
	                title: "Skill Deleted",
	                type: "success"
	            });
        	},
        	function (data, status) {
	            if (status == 404) {
	                swal({
	                    title: "Skill cannot be deleted",
	                    type: "info"
	                });
	            }
        	}
        );
    };
});


    app.controller('manageCtrl', function ($scope, $http, $window,$timeout,urlFactory,skillService,loginService) {
        $scope.name = "";
        loginService.userDetails().then(
        	function (data) {
	            $scope.user = data;
	            if ($scope.user.username != null) {
	                    $scope.f_name = $scope.user.fname;
	                }
	            else{
	                swal({
	                    title: 'Please login',
	                    type :'warning'
	                });
	                $timeout(function(){
	                    var url = "http://" + $window.location.host + "/index.html";
	                    $window.location.href = url;
	                },2000);
	            }
        	}
        );
        
       $scope.logout = function () {
            loginService.logout().then(
            	function () {
                $window.location.href = urlFactory.index();
            });
        };
    });





