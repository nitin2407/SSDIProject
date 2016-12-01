
app.controller('skillsController', function($mdDialog,$rootScope, $http, $scope,skillService,userFactory){


    skillService.getSkills().then(
        function (skills) {
            angular.forEach(skills.data, function (value, index) {
                value.isInterested = true;
                for (i = 0; i < value.interestedUsers.length; i++) {
                    if (value.interestedUsers[i] == $rootScope.username) {
                        value.isInterested = false;
                        break;
                    }
                }
            });
            $rootScope.skills = skills.data;
        }
    );

    $scope.openSkill = function(id){
      $mdDialog.show({
        controller: ViewDialogController,
        templateUrl: 'viewSkillDialog.tmpl.htm',
        windowClass: 'large-Modal',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true,
        locals: {
          skillId: id
        }    
      });
    }

    function ViewDialogController($scope, $mdDialog, $window,$timeout,urlFactory,skillService,skillId) {

      $scope.skillId = skillId;
      $scope.isEnrolled = false;

      skillService.getSkillById($scope.skillId).then(
            function (skillDetails) {
                    $scope.skillDetails = skillDetails.data;
                    $scope.skill_ID = $scope.skillDetails.skillId;
                    $scope.skill_Name = $scope.skillDetails.skillName;
                    $scope.skill_Description = $scope.skillDetails.skillDescription;
                    $scope.cate_gory = $scope.skillDetails.category;
                    $scope.timings = $scope.skillDetails.time;
                    $scope.tutor = $scope.skillDetails.tutor;
            },
            function (data, status) {
                swal({
                    title: 'not able to retrieve skill details',
                    type: 'warning',
                    showCloseButton: true
                });
                $timeout(function () {
                    $window.location.href = urlFactory.home();
                }, 2000)
            });

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };

            $scope.enrollSkill = function(){

                skillService.enrollSkill($scope.skill_ID).then(
                  function(){
                    swal({
                      title: 'Skill enrolled',
                      type :'success'
                    });
                  });  
            }

    }

            
});


app.controller('MainController', function ($scope) {
    $scope.categories = ['study', 'dance', 'singing', 'arts', 'sports', 'cooking'];
    $scope.checked_category = [];

    $scope.filters = ['zipcode', 'city'];
    $scope.checked_filter = [];
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

    /*$scope.addFruit = function (category) {
        if ($scope.checked_category.indexOf(category) != -1) return;
        $scope.checked_category.push(category);
    };*/

});


app.controller('CourseControl',function($scope,$http, $window,$timeout,$location,urlFactory,loginService,skillService) {

        loginService.userDetails().then(
          function (user) {
              $scope.user = user.data;
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

        $scope.skillId = skillService.getSkillIdParameter(document.URL);

        $scope.timings = [{day: 'Monday',toTime: new Date(1970, 0, 1, 14, 57, 0),fromTime: new Date(1970, 0, 1, 14, 57, 0)}];
        
        skillService.getSkillById($scope.skillId).then(
          function (skillDetails) {
              $scope.skillDetails = skillDetails.data;
                  $scope.skill_ID = $scope.skillDetails.skillId;
                  $scope.skill_Name = $scope.skillDetails.skillName;
                  $scope.skill_Description = $scope.skillDetails.skillDescription;
                  $scope.cate_gory = $scope.skillDetails.category;
                  $scope.timings = $scope.skillDetails.time;
                  $scope.tutor = $scope.skillDetails.tutor;
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
        $scope.timings.push({day: 'Monday',toTime: new Date(1970, 0, 1, 14, 57, 0) ,fromTime: new Date(1970, 0, 1, 14, 57, 0) });
    };

    $scope.removeChoice = function () {
        var lastItem = $scope.timings.length - 1;
        $scope.timings.splice(lastItem);
    };

    $scope.updateskill = function () {
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

    $scope.openManageCourses = function () {
        var url = "http://" + $window.location.host + "/html/manageCourses.html";
        $window.location.href = url;
    };

    $scope.showSkill = function (tutor) {
        var result = $http.get('/skills/' + tutor);
        result.success(function (data) {
            $scope.skillDetails = data;
            alert(data.skillName);
        });
    };


});

//code for manageCourses page 
app.controller('manageSkillsCntrl', function ($scope, $http, $window, urlFactory, skillService) {

    skillService.getSkillsByUser().then(
        function (skills) {
            $scope.skills = skills.data;
        }
    );

    $scope.editSkill = function (id) {
        $window.location.href = urlFactory.skillbyId(id);
    }


    $scope.deleteSkill = function (id, index) {

        skillService.deleteSkillById(id).then(
            function (data) {
                $scope.skills.splice(index, 1);
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


app.controller('manageCtrl', function ($scope, $http, $window, $timeout, urlFactory, skillService, loginService) {
    $scope.name = "";
    loginService.userDetails().then(
        function (user) {
            $scope.user = user.data;
            if ($scope.user.username != null) {
                $scope.f_name = $scope.user.fname;
            }
            else {
                swal({
                    title: 'Please login',
                    type: 'warning'
                });
                $timeout(function () {
                    var url = "http://" + $window.location.host + "/index.html";
                    $window.location.href = url;
                }, 2000);
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


app.controller('courseHomeCntrl', function ($scope, $http, $window,$timeout,urlFactory,skillService,loginService) {


	//$scope.today = $filter('date')(new Date(), 'MM/dd/yy');
  //alert($scope.today);

  	loginService.userDetails().then(
          function (user) {
              $scope.user = user.data;
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
                  $scope.username = $scope.user.username;
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

  	$scope.skillId = skillService.getSkillIdParameter(document.URL);

  	skillService.getSkillById($scope.skillId).then(
          function (skillDetails) {
              $scope.skillDetails = skillDetails.data;
                  $scope.skill_ID = $scope.skillDetails.skillId;
                  $scope.skill_Name = $scope.skillDetails.skillName;
                  $scope.skill_Description = $scope.skillDetails.skillDescription;
                  $scope.cate_gory = $scope.skillDetails.category;
                  $scope.timings = $scope.skillDetails.time;
                  $scope.tutor = $scope.skillDetails.tutor;
                  skillService.getPostsBySkillId($scope.skillId).then(
                  	function(postDetails){
                  		$scope.posts = postDetails.data;	
                  	})
          },
          function (data, status) {
              swal({
                  title: 'not able to retrieve skill details',
                  type: 'warning',
                  showCloseButton: true
              });
              $timeout(function () {
                  var url = "http://" + $window.location.host + "/html/home.html";
                  $window.location.href = url;
              }, 2000)
          });

        	//$scope.posts = [];

        	$scope.reply_discussion = function() {
                var newItemNo = $scope.posts.length+1;
                $scope.posts.push({username: $scope.username ,data: $scope.reply});
                skillService.postDiscussion($scope.reply,$scope.skill_ID);
                $scope.reply = "";
            };

          $scope.logout = function () {
              loginService.logout().then(
                  function () {
                      $window.location.href = urlFactory.index();
                  });
          };
});

app.controller('enrolledSkillsController', function ($scope, $http) {

    var result = $http.get('/enrolledCoursesOfUser');
    result.success(function (data) {
        console.log(data);
        $scope.courses = data;
    });

    $scope.subscribeForEmailNotification = function(skillId){
        alert(skillId);
        var result = $http.get('/subscribeForEmailNotification/'+skillId);
        result.success(alert("Subscribed successfully"));
    }

});

app.controller('interestedSkillsController', function ($scope, $http) {
    var result = $http.get('/interestedCoursesOfUser');
    result.success(function (data) {
        console.log(data);
        $scope.courses = data;
    });
});





