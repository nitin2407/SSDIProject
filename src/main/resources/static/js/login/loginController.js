app.controller('LoginCtrl',function($rootScope,$scope,$window,loginService,urlFactory) {
    
    loginService.userDetails().then(
      function (user, status, headers, config) {
          if(user.data.username!=null){
              $window.location.href = urlFactory.home();
          }
      });

    $scope.check = function () {

      $scope.dataObj = {
          username : $scope.user,
          password : $scope.pass
        };
        
        loginService.loginCheck($scope.dataObj).then(
          function (auth) {
            $rootScope.auth = auth.data;
            if (auth.data.allow == true) {
                $window.location.href = urlFactory.home();
            }
            else {
                swal({
                    title: 'Username/password invalid.',
                    type: 'error'
                });
              }
          },
          function (data) {
            swal({
                title: 'Unable to login.',
                type: 'error'
              });
          });
    };

    $scope.signup = function () {
      $window.location.href = urlFactory.signUp();
    };
});



app.controller('homeCntrl',function($rootScope,$scope,$http, $window,$timeout,$mdDialog,loginService,urlFactory,skillService,userFactory) {

        $scope.name = "";
        loginService.userDetails().then(
          function (user) {
              if(user.data.username==null){
                  swal({
                      title: 'Please login',
                      type :'warning'
                  });
                  $timeout(function(){
                      $window.location.href = urlFactory.index();
                  },2000);
              }
              else{
                  userFactory.setUser(user.data); 
                  $scope.name = user.data.fname;
                  $rootScope.username = user.data.username;
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
                /*controller: function($scope, $mdDialog){     
                },*/
                controller: DialogController,
                templateUrl: 'addSkillDialog.tmpl.htm',
                windowClass: 'large-Modal',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true    
            });
        };
        function DialogController($scope, $mdDialog,skillService,skillsFactory) {

            $scope.categories = skillsFactory.categories();
            //$scope.skill = [{name:'nitin',category:'study'}];
            $scope.categoryChoice = 'Study';
            $scope.choices = [{
                day: 'Monday',
                toTime: new Date(1970, 0, 1, 14, 57, 0),
                fromTime: new Date(1970, 0, 1, 14, 57, 0)
            }];
            $scope.days = [{name: 'Monday'}, {name: 'Tuesday'}, {name: 'Wednesday'}, {name: 'Thurday'}, {name: 'Friday'}, {name: 'Saturday'}, {name: 'Sunday'}];
            $scope.description = "";
            $scope.addNewChoice = function () {
                var newItemNo = $scope.choices.length + 1;
                $scope.choices.push({
                    day: 'Monday',
                    toTime: '+new Date(1970, 0, 1, 14, 57, 0)+',
                    fromTime: '+new Date(1970, 0, 1, 14, 57, 0)'
                });
            };

            $scope.removeChoice = function () {
                var lastItem = $scope.choices.length - 1;
                $scope.choices.splice(lastItem);
            };


            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };


            $scope.submitForm = function (isValid) {

                $scope.dataObj = {
                    skillName: $scope.skill_name,
                    category: $scope.categoryChoice,
                    time: $scope.choices,
                    skillDescription: $scope.description
                };

                if (isValid) {
                    skillService.addSkill($scope.dataObj).then(
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
                        });
                }
            };
          }

            $scope.logout = function () {
                loginService.logout().then(
                    function () {
                        $window.location.href = urlFactory.index();
                    });
            };

            $scope.clickInterest = function (skill) {

              
                 if(skill.isInterested)
                 {
                    skillService.increaseInterest(skill.skillId).then(
                      function () {
                        skill.isInterested = false;
                        skill.numberOfInterestedPeople = skill.numberOfInterestedPeople + 1;
                      })
                 }
                 else
                 {
                    skillService.decreaseInterest(skill.skillId).then(
                      function () {
                        skill.isInterested = true;
                        if(skill.numberOfInterestedPeople>0){
                          skill.numberOfInterestedPeople = skill.numberOfInterestedPeople - 1;
                        }
                      })  
                 }
            }

            $scope.viewSkill = function (id) {
              $window.location.href = urlFactory.skillPopUpbyId(id);
              //$window.location.href = urlFactory.skillHomebyId(id);
            }

      /*$scope.checkInterest = function(){ 
        return skillService.checkInterest($scope.username);
          function(interestCheck){
            if(interestCheck.data == "true"){
              return true;
            } 
            else{
              return false;
            }   
          }
        );
      }*/

});



